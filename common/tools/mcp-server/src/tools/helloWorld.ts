// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// A basic schema can be used to describe parameters for the tool.
// All MCP tools use the Zod schema library to describe their parameters.
export const helloWorldSchema = z.object({
  workspaceRoot: z.optional(z.string()),
});

export type HelloWorldSchema = z.infer<typeof helloWorldSchema>;

export async function helloWorld(_args: HelloWorldSchema): Promise<CallToolResult> {
  return {
    content: [
      {
        type: "text",
        text: `All systems go!`,
      },
    ],
  };
}
