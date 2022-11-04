// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { KeyCredential } from "@azure/core-auth";
import { AnomalyDetectorRestClient } from "./clientDefinitions";

/**
 * Initialize a new instance of the class AnomalyDetectorRestClient class.
 * @param Endpoint type: string Supported Cognitive Services endpoints (protocol and hostname, for example: https://westus2.api.cognitive.microsoft.com).
 * @param ApiVersion type: string Anomaly Detector API version (for example, v1.1).
 * @param credentials type: KeyCredential
 */
export default function createClient(
  Endpoint: string,
  credentials: KeyCredential,
  options: ClientOptions & { apiVersion?: string } = {}
): AnomalyDetectorRestClient {
  const apiVersion = options.apiVersion ?? "v1.1";
  const baseUrl = options.baseUrl ?? `${Endpoint}/anomalydetector/${apiVersion}`;

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

  const client = getClient(baseUrl, credentials, options) as AnomalyDetectorRestClient;

  return client;
}
