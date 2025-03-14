// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IdentityClient } from "./identityClient.js";
import { TokenCredentialOptions } from "../tokenCredentialOptions.js";
import { NetworkRequestOptions, NetworkResponse } from "@azure/msal-node";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";

export class sniIdentityClient extends IdentityClient {
    constructor(options: TokenCredentialOptions) {
        super(options);
    }
async sendGetRequestAsync<T>(
    url: string,
    options?: NetworkRequestOptions,
  ): Promise<NetworkResponse<T>> {
    if(url.includes("/token")) {
      return super.sendGetRequestAsync(url, options);
    }
    else{
          const caFile = process.env.AZURE_KUBERNETES_CA_FILE;
            const caData = process.env.AZURE_KUBERNETES_CA_DATA;
            if (caFile && caData) {
              throw new CredentialUnavailableError(
                `${credentialName}: is unavailable. Both AZURE_KUBERNETES_CA_FILE and AZURE_KUBERNETES_CA_DATA are provided. Please provide only one of them.`,
              );
            }
            if(caFile) {
              const caData = readFileSync(caFile);
              certPool.addCert(forge.pki.certificateFromPem(caData));
            }
        const request = createPipelineRequest({
          url,
          method: "GET",
          body: options?.body,
          headers: createHttpHeaders(options?.headers),
          abortSignal: this.generateAbortSignal("noCorrelationId"),
          tlsSettings: {
            servername: this.tokenCredentialOptions?.tlsOptions?.servername, // Use the provided server name if available
            ca: this.tokenCredentialOptions?.tlsOptions?.ca, // Use the provided CA certificate if available
          },
        });
        const response = await this.sendRequest(request);    
        return {
          body: response.bodyAsText ? JSON.parse(response.bodyAsText) : undefined,
          headers: response.headers.toJSON(),
          status: response.status,
        };

    }

  }

}