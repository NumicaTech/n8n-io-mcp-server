import { MCPServer } from "mcp-framework";
import { join } from 'path';

const server = new MCPServer({
    basePath: join(import.meta.dirname, './index.js')
});
server.start();