// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/api/aiProjectContext.ts
import pkgJson from "@azure/ai-projects/package.json" with { type: "json" };
import { KnownVersions } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/api/aiProjectContext.ts
import { KnownVersions } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
=======
import { KnownApiVersions } from "../models/models.js";
import type { Client, ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/core-auth";
import { SDK_VERSION } from "../constants.js";
import type { GenAITracingOptions } from "../tracing/configuration.js";
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/api/aiProjectContext.ts

export interface AIProjectContext extends Client {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownApiVersions} that the service accepts. */
  apiVersion: KnownApiVersions;
  /** The endpoint URL for this client. */
  endpoint: string;
}

/** Optional parameters for the client. */
export interface AIProjectClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownApiVersions} that the service accepts. */
  apiVersion?: KnownApiVersions;
  /**
   * Options for configuring GenAI tracing for this client instance.
   * When provided, GenAI tracing is enabled for all supported operations performed through this client.
   * When omitted, no GenAI spans or metrics are emitted.
   */
  tracingOptions?: GenAITracingOptions;
}

export function createAIProject(
  endpoint: string,
  credential: TokenCredential,
  options: AIProjectClientOptionalParams = {},
): AIProjectContext {
  const endpointUrl = options.endpoint ?? String(endpoint);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/api/aiProjectContext.ts
  const userAgentInfo = `azsdk-js-ai-projects/${pkgJson.version}`;
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/api/aiProjectContext.ts
  const userAgentInfo = `azsdk-js-ai-projects/1.0.0-beta.1`;
=======
  const userAgentInfo = `azsdk-js-ai-projects/${SDK_VERSION}`;
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/api/aiProjectContext.ts
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} ${userAgentInfo}`
    : `${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://ai.azure.com/.default"],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  const apiVersion = options.apiVersion ?? KnownApiVersions.v1;
  return { ...clientContext, apiVersion, endpoint: endpointUrl } as AIProjectContext;
}
