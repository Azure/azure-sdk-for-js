// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type AccessToken, type TokenCredential } from "@azure/core-auth";
import {
  type TokenCredential as AcsTokenCredential,
  type CommunicationGetTokenOptions,
} from "./communicationTokenCredential.js";
import { type AbortSignalLike } from "@azure/abort-controller";
import { type Client, getClient } from "@azure-rest/core-client";
import {
  type HttpClient,
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";

const TeamsExtensionScopePrefix = "https://auth.msft.communication.azure.com/";
const CommunicationClientsScopePrefix = "https://communication.azure.com/clients/";
const TeamsExtensionEndpoint = "/access/teamsExtension/:exchangeAccessToken";
const TeamsExtensionApiVersion = "2025-06-30";
const CommunicationClientsEndpoint = "/access/entra/:exchangeAccessToken";
const CommunicationClientsApiVersion = "2025-03-02-preview";

export interface ExchangeTokenResponse {
  identity: string;
  accessToken: {
    token: string;
    expiresOn: string;
  };
}

/**
 * The Entra Communication Token Options.
 */
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
  scopes?: string[];
}

/**
 * Represents a credential that exchanges an Entra token for an Azure Communication Services (ACS) token, enabling access to ACS resources.
 */
export class EntraTokenCredential implements AcsTokenCredential {
  private isPending: Promise<AccessToken> | null;
  private result = {
    entraToken: undefined as string | undefined,
    acsToken: { token: "", expiresOnTimestamp: 0 },
  };
  private client: Client;
  private httpClient: HttpClient;

  constructor(private options: EntraCommunicationTokenCredentialOptions) {
    this.client = getClient(options.resourceEndpoint);
    this.httpClient = createDefaultHttpClient();
    this.options = options;
    this.options.scopes = this.options.scopes || [
      "https://communication.azure.com/clients/.default",
    ];

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

  private async getTokenInternal(options?: CommunicationGetTokenOptions): Promise<AccessToken> {
    const getTokenOptions = options?.abortSignal ? { abortSignal: options.abortSignal } : undefined;
    const token = await this.options.tokenCredential.getToken(
      this.options.scopes
        ? this.options.scopes
        : ["https://communication.azure.com/clients/.default"],
      getTokenOptions,
    );
    const currentDateTime = new Date();
    const tokenExpiresOn = new Date(this.result.acsToken.expiresOnTimestamp);

    if (token === null) {
      this.result = {
        entraToken: undefined,
        acsToken: { token: "", expiresOnTimestamp: 0 },
      };
    } else if (
      this.result.acsToken.token === "" ||
      token.token !== this.result.entraToken ||
      tokenExpiresOn < currentDateTime
    ) {
      const acsToken = await this.exchangeEntraToken(
        this.options.resourceEndpoint,
        token.token,
        getTokenOptions,
      );
      this.result = {
        entraToken: token.token,
        acsToken,
      };
    }

    return this.result.acsToken;
  }

  public dispose(): void {
    this.result = {
      entraToken: undefined,
      acsToken: { token: "", expiresOnTimestamp: 0 },
    };
  }

  private async exchangeEntraToken(
    resourceEndpoint: string,
    entraToken: string,
    options?: { abortSignal: AbortSignalLike },
  ): Promise<AccessToken> {
    const request = createPipelineRequest({
      url: this.createRequestUri(resourceEndpoint),
      method: "POST",
      headers: createHttpHeaders({
        Authorization: `Bearer ${entraToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      abortSignal: options?.abortSignal,
      body: JSON.stringify({}),
    });
    const response = await this.client.pipeline.sendRequest(this.httpClient, request);

    if (response.status !== 200 || !response.bodyAsText) {
      throw new Error(
        `Service request failed. Status: ${response.status}, Body: ${response.bodyAsText}`,
      );
    }
    const json = JSON.parse(response.bodyAsText) as ExchangeTokenResponse;
    return {
      token: json.accessToken.token,
      expiresOnTimestamp: Date.parse(json.accessToken.expiresOn),
    };
  }

  private createRequestUri(resourceEndpoint: string): string {
    const [endpoint, apiVersion] = this.determineEndpointAndApiVersion();
    const requestUri = `${resourceEndpoint}${endpoint}?api-version=${apiVersion}`;
    return requestUri;
  }

  private determineEndpointAndApiVersion(): [string, string] {
    if (!this.options.scopes || this.options.scopes.length === 0) {
      throw new Error(
        `Scopes validation failed. Ensure all scopes start with either {TeamsExtensionScopePrefix} or {CommunicationClientsScopePrefix}.`,
      );
    } else if (this.options.scopes.every((scope) => scope.startsWith(TeamsExtensionScopePrefix))) {
      return [TeamsExtensionEndpoint, TeamsExtensionApiVersion];
    } else if (
      this.options.scopes.every((scope) => scope.startsWith(CommunicationClientsScopePrefix))
    ) {
      return [CommunicationClientsEndpoint, CommunicationClientsApiVersion];
    } else {
      throw new Error(
        `Scopes validation failed. Ensure all scopes start with either {TeamsExtensionScopePrefix} or {CommunicationClientsScopePrefix}.`,
      );
    }
  }
}
