import { searchItem } from "./server.js";
import { checkAlert } from "./alerts.js";

async function run() {

  const result =
    await searchItem("milk");

  console.log(
    "Search Result:",
    result
  );

  if (
    result.available &&
    result.products
  ) {

    const alerts =
      checkAlert(
        result.products,
        30
      );

    console.log(
      "Alert Matches:",
      alerts
    );
  }
}

run();