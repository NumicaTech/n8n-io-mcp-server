# n8n MCP Server

[![CI](https://github.com/NumicaTech/n8n-io-mcp-server/actions/workflows/ci.yml/badge.svg)](https://github.com/NumicaTech/n8n-io-mcp-server/actions/workflows/ci.yml)
[![Deploy](https://github.com/NumicaTech/n8n-io-mcp-server/actions/workflows/publish.yml/badge.svg)](https://github.com/NumicaTech/n8n-io-mcp-server/actions/workflows/publish.yml)
[![npm version](https://badge.fury.io/js/@numica%2Fn8n-io-mcp-server.svg)](https://badge.fury.io/js/@numica%2Fn8n-io-mcp-server)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

A Model Context Protocol (MCP) server that provides tools for discovering and exploring public n8n workflow templates from the n8n community gallery at https://n8n.io/workflows/. This server enables AI assistants to search and retrieve workflow templates through a standardized interface.

## Quick Start

Get started in seconds! No setup or credentials required - just run the server and start exploring n8n workflow templates.

### 1. Run the Server

```bash
# Run directly with npx (recommended - always uses latest version)
npx -y @numica/n8n-io-mcp-server@latest
```

### 2. Configure Your MCP Client

Add to your MCP client configuration (e.g., Claude Desktop):

```json
{
  "mcpServers": {
    "n8n-io-mcp-server": {
      "command": "npx",
      "args": ["-y", "@numica/n8n-io-mcp-server@latest"]
    }
  }
}
```

### 3. Start Using

The server provides two main tools:
- **`search-templates`** - Search through thousands of n8n workflow templates
- **`get-template`** - Get complete workflow details by ID

That's it! No personal n8n instance or credentials needed - the server accesses publicly available templates.

## Features

- **Template Discovery**: Search through the entire n8n community template library
- **Search Capability**: Search across workflow names, descriptions, and node types
- **Detailed Retrieval**: Get complete workflow definitions including nodes, connections, and configurations
- **Performance Optimization**: Caching for improved search performance and reduced API calls
- **Community Focus**: Access to thousands of public workflow templates shared by the n8n community

## Available Tools

### Template Discovery Tools
- `search-templates` - Search n8n workflow templates
  - Searches workflow names, descriptions, and node types
  - Returns optimized results with workflow summaries
  - Supports customizable result limits (1-100 templates)

- `get-template` - Retrieve complete details for a specific workflow template
  - Get full workflow definition including all nodes and connections
  - Complete node configurations and parameter settings
  - Ready-to-import workflow structure
  - Detailed metadata and creator information

## Installation

### Global Installation

```bash
# Install globally for repeated use
npm install -g @numica/n8n-io-mcp-server
```

### From Source

```bash
git clone https://github.com/NumicaTech/n8n-io-mcp-server.git
cd n8n-io-mcp-server
npm install
npm run build
```

## Usage

### Command Line

```bash
# Run the MCP server (recommended - always latest)
npx -y @numica/n8n-io-mcp-server@latest

# Or if installed globally
n8n-io-mcp-server

# Or run specific version
npx @numica/n8n-io-mcp-server@0.1.0
```

### Configuration

The server connects to the public n8n.io API to access workflow templates. No personal n8n instance or credentials are required since it only accesses publicly available templates.

#### Environment Variables

The server uses the following environment variables for configuration:

- `N8N_API_BASE_URL` - Base URL for the n8n API (default: `https://api.n8n.io/api`)
  - For production usage, the default value should be used
  - Custom URLs are primarily needed for development environments

#### API Endpoints

The server accesses these n8n.io API endpoints:
- `{baseUrl}/templates/search` - For searching workflow templates
- `{baseUrl}/templates/workflows/{workflowId}` - For retrieving specific workflow details

No additional configuration is needed - the server works out of the box with default settings.

## Requirements

- Node.js >= 18.0.0
- Internet connection to access n8n.io public API
- No personal n8n instance or credentials required

## Development

This server is built using the [mcp-framework](https://github.com/QuantGeekDev/mcp-framework), which provides a structured approach to developing Model Context Protocol servers.

### Setup

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Scripts

- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start the MCP server

## Contributing

We welcome contributions! This project uses automated deployment through GitHub Actions.

### Development Workflow

1. **Fork the repository** and clone your fork
2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and ensure they follow the coding standards
4. **Build your changes**:
   ```bash
   npm run build
   ```
5. **Commit your changes** with a clear commit message
6. **Push to your fork** and create a pull request

### Automated Deployment

- **Continuous Integration**: All pull requests and pushes to `main` automatically run CI across Node.js versions 16, 18, and 20
- **Automatic NPM Publishing**: Creating a new GitHub release automatically deploys to NPM
- **Version Management**: Ensure `package.json` version matches your release tag

### Creating a Release

1. Update the version in `package.json`:
   ```bash
   npm version patch  # or minor, major
   ```
2. Push changes and tags:
   ```bash
   git push origin main --tags
   ```
3. Create a GitHub release using the pushed tag
4. The GitHub Action will automatically publish to NPM

## License

MIT

## Support

For issues and questions, please use the GitHub issue tracker.

## Disclaimer

This MCP server uses an API from n8n.io that is not officially documented and may be subject to changes or breakage at any time. While we monitor for changes and will attempt to adapt to any modifications as quickly as possible, there may be periods where functionality is temporarily unavailable due to upstream API changes. Please report any issues through the GitHub issue tracker so we can address them promptly.