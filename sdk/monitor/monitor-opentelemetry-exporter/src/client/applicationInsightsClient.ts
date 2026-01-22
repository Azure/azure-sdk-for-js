// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as coreClient from "@azure/core-client";
import type { TokenCredential } from "@azure/core-auth";
import {
  ApplicationInsightsClient as GeneratedApplicationInsightsClient,
  type ApplicationInsightsClientOptionalParams as GeneratedApplicationInsightsClientOptionalParams,
} from "../generated/index.js";

/** Mirrors the historical optional params surface for the public API. */
export interface ApplicationInsightsClientOptionalParams extends coreClient.ServiceClientOptions {
  /** Application Insights Breeze endpoint override. */
  endpoint?: string;
  /** Host portion used to build the Breeze endpoint. */
  host?: string;
}

/**
 * Back-compat wrapper to construct the generated AzureMonitorExporterClient without touching generated code.
 */
export class ApplicationInsightsClient extends GeneratedApplicationInsightsClient {
  constructor(
    options: ApplicationInsightsClientOptionalParams & { credential?: TokenCredential } = {},
  ) {
    const { credential, credentialScopes, endpoint, host, ...rest } = options;
    const scopes =
      credentialScopes !== undefined
        ? Array.isArray(credentialScopes)
          ? credentialScopes
          : [credentialScopes]
        : undefined;

    const clientOptions: GeneratedApplicationInsightsClientOptionalParams &
      coreClient.ServiceClientOptions & { endpoint?: string } = {
        ...(rest as GeneratedApplicationInsightsClientOptionalParams & coreClient.ServiceClientOptions),
        host: host ?? endpoint ?? (rest as { baseUri?: string }).baseUri,
      };

    const resolvedEndpoint = endpoint ?? (rest as { baseUri?: string }).baseUri;
    if (resolvedEndpoint) {
      clientOptions.endpoint = resolvedEndpoint;
    }

    if (scopes) {
      clientOptions.credentials = { scopes };
    }

    super(credential, clientOptions);
  }
}
