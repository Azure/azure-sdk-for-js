// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as coreClient from "@azure/core-client";
import type { TokenCredential } from "@azure/core-auth";
import {
  AzureMonitorExporterClient,
  type AzureMonitorExporterClientOptionalParams,
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
export class ApplicationInsightsClient extends AzureMonitorExporterClient {
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

    const clientOptions: AzureMonitorExporterClientOptionalParams = {
      ...(rest as AzureMonitorExporterClientOptionalParams),
      host: host ?? endpoint ?? (rest as { baseUri?: string }).baseUri,
      endpoint: endpoint ?? (rest as { baseUri?: string }).baseUri,
    };

    if (scopes) {
      clientOptions.credentials = { scopes };
    }

    super(credential, clientOptions);
  }
}
