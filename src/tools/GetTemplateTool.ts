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

interface WorkflowData {
  nodes: any[];
  connections: any;
  [key: string]: any;
}

interface User {
  name: string;
  username: string;
  bio?: string;
  verified: boolean;
  links: any[];
  avatar: string;
  [key: string]: any;
}

interface FullWorkflow {
  id: number;
  name: string;
  views: number;
  recentViews: number;
  totalViews: number;
  createdAt: string;
  description: string;
  workflow: WorkflowData;
  lastUpdatedBy: number;
  workflowInfo: any;
  user: User;
  nodes: Node[];
  categories: any[];
  image: any[];
  [key: string]: any;
}

interface GetWorkflowResponse {
  workflow: FullWorkflow;
}

// Filtered output interface
interface FilteredWorkflow {
  id: number;
  name: string;
  totalViews: number;
  description: string;
  createdAt: string;
  workflow: WorkflowData;
  nodes: Node[];
}

interface GetTemplateInput {
  workflowId: number;
}

class GetTemplateTool extends MCPTool<GetTemplateInput> {
  name = "get-template";
  description = "Retrieve a specific n8n workflow template by ID";

  schema = {
    workflowId: {
      type: z.number(),
      description: "The ID of the workflow to retrieve",
    },
  };

  private getBaseUrl(): string {
    return process.env.N8N_API_BASE_URL || 'https://api.n8n.io/api';
  }

  private filterWorkflowFields(workflow: FullWorkflow): FilteredWorkflow {
    return {
      id: workflow.id,
      name: workflow.name,
      totalViews: workflow.totalViews,
      description: workflow.description,
      createdAt: workflow.createdAt,
      workflow: workflow.workflow,
      nodes: workflow.nodes,
    };
  }

  async execute(input: GetTemplateInput): Promise<FilteredWorkflow> {
    try {
      const baseUrl = this.getBaseUrl();
      
      // Make HTTP GET request to get specific workflow
      const response = await fetch(`${baseUrl}/templates/workflows/${input.workflowId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Workflow with ID ${input.workflowId} not found`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: GetWorkflowResponse = await response.json();
      
      if (!data.workflow) {
        throw new Error('Invalid response format: missing workflow object');
      }
      
      // Filter and return only the specified fields
      return this.filterWorkflowFields(data.workflow);
      
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get template: ${error.message}`);
      }
      throw new Error('Failed to get template: Unknown error');
    }
  }
}

export default GetTemplateTool;