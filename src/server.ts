import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

import { chromium } from "playwright";

const server = new Server(
  {
    name: "grocery-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

//working search item function when just "milk" is sent from mcp inspector
// function searchItem(item: string) {

//   console.error("Raw item:", item);

//   const cleanItem = item.trim().toLowerCase();

//   console.error("Clean item:", cleanItem);

//   const data: Record<string, any> = {
//     milk: {
//       store: "Swiggy",
//       price: 58,
//       available: true,
//     },
//     bread: {
//       store: "Zepto",
//       price: 42,
//       available: true,
//     },
//   };

//   return data[cleanItem] || {
//     available: false,
//     received: cleanItem
//   };
// }

//working version 1
// async function searchItem(item: string) {

//   const browser = await chromium.launch({
//     headless: false   // keep visible for debugging
//   });

//   const page = await browser.newPage();

//   try {

//     await page.goto(
//       "https://www.zeptonow.com/search",
//       {
//         waitUntil: "networkidle",
//         timeout: 60000
//       }
//     );

//     console.error("Page loaded");

//     // More reliable selector
//     const searchSelector =
//       'input[placeholder*="Search for"]';

//     await page.waitForSelector(
//       searchSelector,
//       { timeout: 60000 }
//     );

//     console.error("Search box found");

//     await page.fill(
//       searchSelector,
//       item
//     );

//     console.error("Typed item");

//     await page.keyboard.press("Enter");

//     // Wait for results
//     await page.waitForTimeout(5000);

//     // Debug page content
//     console.error(
//       "URL:",
//       page.url()
//     );

//     // Grab visible text first
//     const bodyText = await page.textContent("body");

//     await browser.close();

//     return {
//       available: true,
//       snippet: bodyText?.slice(0, 500)
//     };

//   } catch (err: any) {

//     console.error(err);

//     await browser.close();

//     return {
//       available: false,
//       error: err.message
//     };
//   }
// }

//working version 2 
// async function searchItem(item: string) {

//   const browser = await chromium.launch({
//     headless: false
//   });

//   const page = await browser.newPage();

//   try {

//     await page.goto(
//       `https://www.zeptonow.com/search?query=${encodeURIComponent(item)}`,
//       {
//         waitUntil: "networkidle",
//         timeout: 60000
//       }
//     );

//     console.error("Search page loaded");

//     await page.waitForTimeout(5000);

//     // Grab visible text
//     const text = await page.locator("body").innerText();

//     await browser.close();

//     return {
//       available: true,
//       snippet: text.slice(0, 1000)
//     };

//   } catch (err: any) {

//     await browser.close();

//     return {
//       available: false,
//       error: err.message
//     };
//   }
// }

export async function searchItem(item: string) {

  const browser = await chromium.launch({
    headless: false
  });

  const page = await browser.newPage();

  try {

    await page.goto(
      "https://www.zeptonow.com",
      {
        waitUntil: "domcontentloaded",
        timeout: 60000
      }
    );

    console.error("Homepage loaded");

    // Give React page time
    await page.waitForTimeout(5000);

    // Open location popup
    await page.getByText("Select Location").click();

    console.error("Location popup opened");

    const locationInput =
      'input[placeholder*="Search"]';

    await page.waitForSelector(
      locationInput,
      { timeout: 30000 }
    );

    await page.fill(
      locationInput,
      "Wakad Pune"
    );

    console.error("Typed location");

    await page.waitForTimeout(3000);

    await page.locator("text=Wakad").first().click();

    console.error("Location selected");

    await page.waitForTimeout(5000);

    // Search product
    await page.goto(
      `https://www.zeptonow.com/search?query=${encodeURIComponent(item)}`,
      {
        waitUntil: "domcontentloaded",
        timeout: 60000
      }
    );

    console.error("Search page loaded");

    await page.waitForTimeout(5000);

    const text = await page
      .locator("body")
      .innerText();

const lines = text
  .split("\n")
  .map(l => l.trim())
  .filter(Boolean);

const products = [];

for (let i = 0; i < lines.length; i++) {

  if (lines[i].startsWith("₹")) {

    const price = Number(
      lines[i]
        .replace("₹", "")
        .replace(/[^\d]/g, "")
    );

    // Search nearby lines for real product name
    let product = "";

    for (
      let j = i + 1;
      j <= Math.min(i + 8, lines.length - 1);
      j++
    ) {

      const candidate = lines[j];

      const invalid =
        candidate.startsWith("₹") ||
        candidate === "ADD" ||
        candidate.startsWith("(") ||     // rating count
        /^\d+(\.\d+)?$/.test(candidate) || // rating number
        candidate.includes("OFF") ||
        candidate.includes("pack") ||
        candidate.includes("ml") ||
        candidate.length < 5;

      if (!invalid) {
        product = candidate;
        break;
      }
    }

    if (product && price) {

      products.push({
        name: product,
        price
      });
    }
  }
}

// Remove duplicates
const uniqueProducts =
  products.filter(
    (p, index, self) =>
      index ===
      self.findIndex(
        x => x.name === p.name
      )
  );

console.error(uniqueProducts);

await browser.close();

return {
  location: "Wakad Pune",
  available: uniqueProducts.length > 0,
  products: uniqueProducts.slice(0, 5)
};

  } catch (err: any) {

    console.error(err);

    await browser.close();

    return {
      available: false,
      error: err.message
    };
  }
}

server.setRequestHandler(
  ListToolsRequestSchema,
  async () => ({
    tools: [
      {
        name: "search_grocery",
        description: "Search grocery item price and stock",
        inputSchema: {
          type: "object",
          properties: {
            item: {
              type: "string",
            },
          },
          required: ["item"],
        },
      },
    ],
  })
);

server.setRequestHandler(
  CallToolRequestSchema,
  async (request) => {

    console.error(
      "Full args:",
      request.params.arguments
    );

    if (request.params.name === "search_grocery") {

      const item = String(
        request.params.arguments?.item ?? ""
      );

      const result = await searchItem(item);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    throw new Error("Unknown tool");
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);