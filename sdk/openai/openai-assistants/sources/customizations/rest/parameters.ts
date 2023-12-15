// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ToolDefinition } from "./models.js";

export interface UploadFileBodyParam {
  body?: { file: File; purpose: string; filename?: string };
}

export interface CreateAssistantFileBodyParam {
  body?: { file_id: string };
}

export interface CreateRunBodyParam {
  body?: {
    assistant_id: string;
    model?: string;
    instructions?: string;
    tools?: Array<ToolDefinition>;
    metadata?: Record<string, string>;
  };
}