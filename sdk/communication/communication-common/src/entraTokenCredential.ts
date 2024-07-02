// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "@azure/core-auth";
import { TokenCredential } from "@azure/identity";
import { TokenCredential as AcsTokenCredential, CommunicationGetTokenOptions } from "./communicationTokenCredential";
import { AbortSignalLike } from "@azure/abort-controller";
import { Client, getClient } from "@azure-rest/core-client";
import { HttpClient, createDefaultHttpClient, createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";

interface ExchangeTokenResponse {
  accessToken: {
      token: string;
      expiresOn: string;
  }
}

export interface EntraCommunicationTokenCredentialOptions {
  /**
   * The Azure Communication Service resource endpoint URL, e.g. https://myResource.communication.azure.com.
   */
  resourceEndpoint: string;
  /**
   * The Entra ID token credential.
   */
  tokenCredential: TokenCredential;
  /**
   * The scopes for retrieving the Entra ID access token.
   */
  scopes: string[];
}

/**
 * EntraTokenCredential
 */
export class EntraTokenCredential implements AcsTokenCredential {
  private isPending: Promise<AccessToken> | null;
  private result = {
    entraToken: undefined as string | undefined,
    acsToken: { token: "", expiresOnTimestamp: 0 }
  };
  private client: Client;
  private httpClient: HttpClient;

  constructor(private options: EntraCommunicationTokenCredentialOptions) {
    this.client = getClient(options.resourceEndpoint);
    this.httpClient = createDefaultHttpClient();

    // immediately fetch the token to pre-warm
    this.isPending = this.getToken();
  }

  public async getToken(options?: CommunicationGetTokenOptions): Promise<AccessToken> {
    if (options?.abortSignal?.aborted) {
      return { token: "", expiresOnTimestamp: 0 };
    }

    // we're awaiting the token fetch, so we don't want to start another one
    // however, we're ignoring the new abortSignal, unfortunately
    if (!this.isPending) {
      this.isPending = this.getTokenInternal(options);
    }

    try {
      await this.isPending;
    } finally {
      this.isPending = null;
    }

    return this.result.acsToken;
  }

  public async getTokenInternal(options?: CommunicationGetTokenOptions): Promise<AccessToken> {
    let getTokenOptions = options?.abortSignal ? { abortSignal: options.abortSignal } : undefined;
    const token = await this.options.tokenCredential.getToken(this.options.scopes, getTokenOptions);

    if (token === null) {
      this.result = {
        entraToken: undefined,
        acsToken: { token: "", expiresOnTimestamp: 0 }
      };
    }
    else if (this.result.acsToken.token === "" || token.token !== this.result.entraToken) {
      const acsToken = await this.exchangeEntraToken(this.options.resourceEndpoint, token.token, getTokenOptions);
      this.result = {
        entraToken: token.token,
        acsToken
      };
    }

    return this.result.acsToken;
  }

  public dispose(): void {
    /* intentionally empty */
  }

  private async exchangeEntraToken(resourceEndpoint: string, entraToken: string, options?: { abortSignal: AbortSignalLike }): Promise<AccessToken> {
    const request = createPipelineRequest({
      url: `${resourceEndpoint}/access/entra:exchangeToken`,
      method: "POST",
      headers: createHttpHeaders({
        Authorization: `Bearer ${entraToken}`
      }),
      abortSignal: options?.abortSignal
    });
    const response = await this.client.pipeline.sendRequest(this.httpClient, request);

    if (response.status != 200 || !response.bodyAsText) {
        throw new Error(`Failed to exchange entra token. Status: ${response.status}, Body: ${response.bodyAsText}`);
    }
    const json = JSON.parse(response.bodyAsText) as ExchangeTokenResponse;
    return {
          token: json.accessToken.token,
          expiresOnTimestamp: Date.parse(json.accessToken.expiresOn)
    };
  }
}
