// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import OpenAI from "openai";

export function overwriteOpenAIClient(openaiClient: OpenAI): OpenAI {
  const responsesCreate = openaiClient.responses.create.bind(openaiClient.responses);
  openaiClient.responses.create = ((...args: Parameters<typeof responsesCreate>) => {
    const [body, options = {}] = args;
    const nextBody = { ...body, ...(options.body || {}) };
    const { body: _, ...nextOptions } = options;
    const response = responsesCreate(nextBody, nextOptions);
    return response;
  }) as typeof responsesCreate;
  return openaiClient;
}
