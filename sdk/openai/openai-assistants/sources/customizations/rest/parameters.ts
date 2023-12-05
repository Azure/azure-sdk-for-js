// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface UploadFileBodyParam {
  body?: { file: File; purpose: string; filename?: string };
}

export interface CreateAssistantFileBodyParam {
  body?: { file_id: string };
}