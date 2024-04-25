// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ToolDefinition } from "../../generated/src/rest/models.js";

export interface UploadFileBodyParam {
  body?: { file: File; purpose: string; filename?: string };
}

export interface CreateAssistantFileBodyParam {
  body?: { file_id: string };
}

export interface CreateRunBodyParam {
  body?: {
    assistant_id: string;
    model?: string | null;
    instructions?: string | null;
    additional_instructions?: string | null;
    tools?: Array<ToolDefinition> | null;
    metadata?: Record<string, string> | null;
  };
}
