// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary the constants used in the Azure AI Agents samples.
 */

import type { RunsCreateRunOptionalParams } from "@azure/ai-agents";

export const createAndPollDefaultOptions: RunsCreateRunOptionalParams = {
  pollingOptions: {
    intervalInMs: 2000,
  },
  onResponse: (response): void => {
    console.log(`Received response with status: ${response.parsedBody.status}`);
  },
};
