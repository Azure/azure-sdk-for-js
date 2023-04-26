// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { KeyCredential } from "@azure/core-auth";
import { AnomalyDetectorClient } from "./clientDefinitions";

export interface AnomalyDetectorClientOptions extends ClientOptions {
  apiVersion?: string;
}

/**
 * Initialize a new instance of `AnomalyDetectorClient`
 * @param endpoint type: string, Supported Azure Cognitive Services endpoints (protocol and host name, such as
 * https://westus2.api.cognitive.microsoft.com).
 * @param credentials type: KeyCredential, uniquely identify client credential
 * @param options type: AnomalyDetectorClientOptions, the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credentials: KeyCredential,
  options: AnomalyDetectorClientOptions = {}
): AnomalyDetectorClient {
  const apiVersion = options.apiVersion ?? "v1.1";
  const baseUrl =
    options.baseUrl ?? `${endpoint}/anomalydetector/${apiVersion}`;

  options = {
    ...options,
    credentials: {
      apiKeyHeaderName: "Ocp-Apim-Subscription-Key",
    },
  };

  const userAgentInfo = `azsdk-js-ai-anomaly-detector-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
  };

  const client = getClient(
    baseUrl,
    credentials,
    options
  ) as AnomalyDetectorClient;

  return client;
}
