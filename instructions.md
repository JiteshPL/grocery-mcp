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

## Common Tasks

### Run Server
```bash
npm run dev
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

## Additional Resources
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Playwright Documentation](https://playwright.dev/)
- [Zod Documentation](https://zod.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## Support
For issues or questions, refer to the project repository or create an issue on GitHub.
