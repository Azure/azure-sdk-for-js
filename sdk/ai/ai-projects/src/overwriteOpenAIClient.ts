// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type OpenAI from "openai";

export function overwriteOpenAIClient(openaiClient: OpenAI): OpenAI {
  const responsesCreate = openaiClient.responses.create.bind(openaiClient.responses);
  openaiClient.responses.create = ((...args: Parameters<typeof responsesCreate>) => {
    const [body, rawOptions] = args;
    const options = (rawOptions ?? {}) as Record<string, any>;
    const nextBody = { ...(body as Record<string, unknown>), ...(options.body || {}) };
    const { body: _, ...nextOptions } = options;
    return responsesCreate(nextBody as typeof body, nextOptions as typeof rawOptions);
  }) as typeof responsesCreate;
  return openaiClient;
}
