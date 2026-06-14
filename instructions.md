# Grocery MCP - Setup & Run Instructions

## Overview
Grocery MCP is a TypeScript-based Model Context Protocol (MCP) server that integrates Playwright for web automation and Zod for schema validation.

## Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** (Node package manager)
- **Git** (to clone the repository)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/JiteshPL/grocery-mcp.git
cd grocery-mcp
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required dependencies:
- `@modelcontextprotocol/sdk` - Model Context Protocol SDK
- `playwright` - Browser automation library
- `zod` - TypeScript-first schema validation
- Dev dependencies: `tsx`, `typescript`, `@types/node`

## Running the Project

### Development Mode
To run the project in development mode with auto-reload:

```bash
npm run dev
```

This command executes `tsx src/server.ts`, which starts the MCP server using the TypeScript transpiler.

## Testing with MCP Inspector

### Overview
MCP Inspector is a tool provided by Anthropic to test and debug MCP servers. It provides a web interface to interact with your server, inspect capabilities, and test tools.

### Installation

#### Global Installation (Recommended)
```bash
npm install -g @modelcontextprotocol/inspector
```

#### Or Install Locally
```bash
npm install --save-dev @modelcontextprotocol/inspector
```

### Running MCP Inspector

#### 1. Start Your MCP Server
In one terminal window, run your server:
```bash
npm run dev
```

Note the server's connection details (usually `stdio` or a specific port if configured).

#### 2. Launch MCP Inspector
In another terminal window:

```bash
mcp-inspector
```

Or if installed locally:
```bash
npx @modelcontextprotocol/inspector
```

#### 3. Connect to Your Server
- The inspector will open a web interface (typically at `http://localhost:5173` or similar)
- Configure the server connection:
  - **Command**: `tsx src/server.ts`
  - **Transport**: Select `stdio` (standard input/output)
- Click "Connect" to establish the connection

### Testing Your MCP Server

Once connected, you can:

1. **View Capabilities**: See all tools and resources your server exposes
2. **Inspect Schema**: Review the input/output schemas for each tool
3. **Execute Tools**: Test individual tools with different parameters
4. **View Logs**: Monitor real-time server output and requests/responses
5. **Debug**: Check request/response payloads and error messages

### Example Testing Workflow

1. Start the MCP server: `npm run dev`
2. Launch inspector: `mcp-inspector` (in another terminal)
3. Connect with command: `tsx src/server.ts`
4. In the inspector UI:
   - Navigate to "Tools" section
   - Select a tool to test
   - Provide test parameters
   - Click "Execute" to run the tool
   - Review the response in the inspector

### Troubleshooting Inspector Connection

| Issue | Solution |
|-------|----------|
| Connection refused | Ensure your MCP server is running with `npm run dev` |
| "Cannot connect" error | Check that the server command is correct and the port is not in use |
| No tools visible | Verify your server is properly exporting tools in `src/server.ts` |
| Timeout errors | Increase the timeout in inspector settings or check server logs |

## Project Structure
```
grocery-mcp/
├── src/
│   └── server.ts          # Main server entry point
├── package.json           # Project metadata and dependencies
├── tsconfig.json          # TypeScript configuration
└── instructions.md        # This file
```

## Key Technologies

| Technology | Purpose |
|-----------|---------|
| **TypeScript** | Type-safe JavaScript development |
| **Model Context Protocol SDK** | Protocol implementation for AI model communication |
| **Playwright** | Browser automation and web scraping |
| **Zod** | Runtime schema validation |
| **tsx** | TypeScript execution without build step |
| **MCP Inspector** | Web interface for testing and debugging MCP servers |

## Common Tasks

### Run Server
```bash
npm run dev
```

### Test with Inspector
```bash
# Terminal 1
npm run dev

# Terminal 2
mcp-inspector
```

### Check TypeScript Compilation
```bash
npx tsc --noEmit
```

### Install New Dependencies
```bash
npm install <package-name>
```

## Troubleshooting

### Port Already in Use
If the server fails to start due to a port conflict, check which process is using the port and terminate it, or modify the port in `src/server.ts`.

### Playwright Installation Issues
If you encounter Playwright browser download issues:
```bash
npx playwright install
```

### TypeScript Errors
Ensure you're using a compatible Node.js version:
```bash
node --version
```

### Inspector Not Found
If `mcp-inspector` command is not recognized:
```bash
# Install globally
npm install -g @modelcontextprotocol/inspector

# Or use npx
npx @modelcontextprotocol/inspector
```

## Additional Resources
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP Inspector Guide](https://modelcontextprotocol.io/docs/tools/inspector)
- [Playwright Documentation](https://playwright.dev/)
- [Zod Documentation](https://zod.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## Support
For issues or questions, refer to the project repository or create an issue on GitHub.
