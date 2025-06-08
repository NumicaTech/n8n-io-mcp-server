import { MCPTool } from "mcp-framework";
import { z } from "zod";

// TypeScript interfaces for API responses
interface Node {
  id: number;
  name: string;
  icon?: string;
  displayName?: string;
  [key: string]: any;
}

interface WorkflowSearchResult {
  id: number;
  name: string;
  totalViews: number;
  description: string;
  createdAt: string;
  nodes?: Node[];
  [key: string]: any;
}

interface SearchResponse {
  workflows: WorkflowSearchResult[];
  totalWorkflows: number;
  [key: string]: any;
}

// Filtered output interface
interface FilteredWorkflow {
  id: number;
  name: string;
  totalViews: number;
  description: string;
  createdAt: string;
}

// Search results response interface
interface SearchTemplatesResponse {
  results: FilteredWorkflow[];
  totalCount: number;
}

interface SearchTemplatesInput {
  query: string;
  limit?: number;
}

class SearchTemplatesTool extends MCPTool<SearchTemplatesInput> {
  name = "search-templates";
  description = "Search n8n workflow templates using the n8n API's search functionality across names, descriptions, and node types. Returns both the top N results and the total count of all matching workflows.";

  schema = {
    query: {
      type: z.string().min(2),
      description: "Search query for matching (minimum 2 characters)",
    },
    limit: {
      type: z.number().min(1).max(100).optional(),
      description: "Number of results to return (default 10, max 100)",
    },
  };

  private getBaseUrl(): string {
    return process.env.N8N_API_BASE_URL || 'https://api.n8n.io/api';
  }


  private filterWorkflowFields(workflow: WorkflowSearchResult): FilteredWorkflow {
    return {
      id: workflow.id,
      name: workflow.name,
      totalViews: workflow.totalViews,
      description: workflow.description,
      createdAt: workflow.createdAt,
    };
  }

  async execute(input: SearchTemplatesInput): Promise<SearchTemplatesResponse> {
    try {
      const baseUrl = this.getBaseUrl();
      const limit = input.limit || 10;
      
      // Make HTTP GET request to search endpoint with search query parameter
      const searchUrl = `${baseUrl}/templates/search?search=${encodeURIComponent(input.query)}`;
      const response = await fetch(searchUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: SearchResponse = await response.json();
      
      if (!data.workflows || !Array.isArray(data.workflows)) {
        throw new Error('Invalid response format: missing workflows array');
      }
      
      // Get total count from API response
      const totalCount = data.workflows.length;
      
      // Apply limit and filter fields - limit client-side since API may not support it
      const limitedResults = data.workflows
        .slice(0, limit)
        .map(workflow => this.filterWorkflowFields(workflow));
      
      return {
        results: limitedResults,
        totalCount: totalCount
      };
      
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to search templates: ${error.message}`);
      }
      throw new Error('Failed to search templates: Unknown error');
    }
  }
}

export default SearchTemplatesTool;