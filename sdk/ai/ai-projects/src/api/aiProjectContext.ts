// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
<<<<<<< /tmp/azsdk-dev-toollwiWH1/result/src/api/aiProjectContext.ts
import { KnownVersions } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
||||||| /tmp/azsdk-dev-toollwiWH1/base/sdk/ai/ai-projects/generated/api/aiProjectContext.ts
import { KnownVersions } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
=======
import { KnownApiVersions } from "../models/models.js";
import type { Client, ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/core-auth";
import { SDK_VERSION } from "../constants.js";
>>>>>>> /tmp/azsdk-dev-toollwiWH1/custom/sdk/ai/ai-projects/src/api/aiProjectContext.ts

export interface AIProjectContext extends Client {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownApiVersions} that the service accepts. */
  apiVersion: KnownApiVersions;
}

/** Optional parameters for the client. */
export interface AIProjectClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownApiVersions} that the service accepts. */
  apiVersion?: KnownApiVersions;
}

export function createAIProject(
<<<<<<< /tmp/azsdk-dev-toollwiWH1/result/src/api/aiProjectContext.ts
  endpointParam: string,
  credential: KeyCredential | TokenCredential,
||||||| /tmp/azsdk-dev-toollwiWH1/base/sdk/ai/ai-projects/generated/api/aiProjectContext.ts
  endpointParam: string,
  credential: TokenCredential,
=======
  endpoint: string,
  credential: TokenCredential,
>>>>>>> /tmp/azsdk-dev-toollwiWH1/custom/sdk/ai/ai-projects/src/api/aiProjectContext.ts
  options: AIProjectClientOptionalParams = {},
): AIProjectContext {
  const endpointUrl = options.endpoint ?? String(endpoint);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-ai-projects/${SDK_VERSION}`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} ${userAgentInfo}`
    : `${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
<<<<<<< /tmp/azsdk-dev-toollwiWH1/result/src/api/aiProjectContext.ts
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://ai.azure.com/.default"],
      apiKeyHeaderName: options.credentials?.apiKeyHeaderName ?? "api-key",
    },
||||||| /tmp/azsdk-dev-toollwiWH1/base/sdk/ai/ai-projects/generated/api/aiProjectContext.ts
    credentials: { scopes: options.credentials?.scopes ?? ["https://ai.azure.com/.default"] },
=======
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://ai.azure.com/.default"],
    },
>>>>>>> /tmp/azsdk-dev-toollwiWH1/custom/sdk/ai/ai-projects/src/api/aiProjectContext.ts
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  const apiVersion = options.apiVersion ?? KnownApiVersions.v1;
  return { ...clientContext, apiVersion } as AIProjectContext;
}
