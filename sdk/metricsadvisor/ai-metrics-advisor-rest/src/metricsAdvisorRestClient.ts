// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import { MetricsAdvisorRestClientLike } from "./clientDefinitions";
import {
  createMetricsAdvisorKeyCredentialPolicy,
  MetricsAdvisorKeyCredential,
  X_API_KEY_HEADER_NAME,
} from "./metricsAdvisorKeyCredentialPolicy";

export default function MetricsAdvisorRestClient(
  endpoint: string,
  credentials: TokenCredential | MetricsAdvisorKeyCredential,
  options: ClientOptions = {}
): MetricsAdvisorRestClientLike {
  const baseUrl = options.baseUrl ?? `${endpoint}/metricsadvisor/v1.0`;
  const DEFAULT_COGNITIVE_SCOPE = "https://cognitiveservices.azure.com/.default";

  options = {
    ...options,
    credentials: {
      scopes: [DEFAULT_COGNITIVE_SCOPE],
      apiKeyHeaderName: X_API_KEY_HEADER_NAME
    }
  };

  const client = getClient(
    baseUrl,
    credentials,
    options
  ) as MetricsAdvisorRestClientLike;
  if (!isTokenCredential(credentials)) {
    client.pipeline.addPolicy(createMetricsAdvisorKeyCredentialPolicy(credentials));
  }
  return client;
}
