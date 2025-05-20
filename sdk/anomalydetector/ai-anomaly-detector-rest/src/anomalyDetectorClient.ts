// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import type { KeyCredential } from "@azure/core-auth";
import type { AnomalyDetectorClient } from "./clientDefinitions.js";
import type { APIVersion } from "./models.js";

/** The optional parameters for the client */
export interface AnomalyDetectorClientOptions extends ClientOptions {
  /** Api Version */
  apiVersion?: APIVersion;
}

/**
 * Initialize a new instance of `AnomalyDetectorClient`
 * @param endpointParam - Supported Azure Cognitive Services endpoints (protocol and host name, such as
 * https://westus2.api.cognitive.microsoft.com).
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpointParam: string,
  credentials: KeyCredential,
  { apiVersion = "v1.1", ...options }: AnomalyDetectorClientOptions = {},
): AnomalyDetectorClient {
  const endpointUrl =
    options.endpoint ??
    options.baseUrl ??
    `${endpointParam}/anomalydetector/${apiVersion}`;
  const userAgentInfo = `azsdk-js-@azure-rest/ai-anomaly-detector/1.0.0`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
    loggingOptions: {
      logger: options.loggingOptions?.logger ?? logger.info,
    },
    credentials: {
      apiKeyHeaderName:
        options.credentials?.apiKeyHeaderName ?? "Ocp-Apim-Subscription-Key",
    },
  };
  const client = getClient(
    endpointUrl,
    credentials,
    options,
  ) as AnomalyDetectorClient;

  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });

  return client;
}
