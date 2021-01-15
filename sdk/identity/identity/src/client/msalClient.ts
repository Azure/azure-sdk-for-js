// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CredentialUnavailable } from "./errors";
import {
  PublicClientApplication,
  Configuration,
  AuthorizationCodeRequest,
  AuthenticationResult,
  DeviceCodeRequest,
  ConfidentialClientApplication,
  ClientCredentialRequest,
  NetworkRequestOptions,
  NetworkResponse,
  INetworkModule
} from "@azure/msal-node";
import axios, { AxiosRequestConfig } from "axios";

import { IdentityClient, TokenCredentialOptions } from "./identityClient";
import { AccessToken } from "@azure/core-http";
import { credentialLogger } from "../util/logging";
import { NodeAuthOptions } from "@azure/msal-node/dist/config/Configuration";

const logger = credentialLogger("InteractiveBrowserCredential");

/**
 * The record to use to find the cached tokens in the cache
 */
export interface AuthenticationRecord {
  /**
   * The associated authority, if used
   */
  authority?: string;

  /**
   * The home account Id
   */
  homeAccountId: string;

  /**
   * The login environment, eg "login.windows.net"
   */
  environment: string;

  /**
   * The associated tenant ID
   */
  tenantId: string;

  /**
   * Local, tenant-specific account identifer for this account object, usually used in legacy cases
   */
  localAccountId: string;

  /**
   * The username of the logged in account
   */
  username: string;
}

export class AuthenticationRequired extends CredentialUnavailable {}

export class MsalClient {
  private persistenceEnabled: boolean;
  private authenticationRecord: AuthenticationRecord | undefined;
  private identityClient: IdentityClient;
  private pca: PublicClientApplication | undefined;
  private cca: ConfidentialClientApplication | undefined;
  private msalConfig: NodeAuthOptions;

  constructor(
    msalConfig: NodeAuthOptions,
    persistenceEnabled: boolean,
    authenticationRecord?: AuthenticationRecord,
    options?: TokenCredentialOptions
  ) {
    this.identityClient = new IdentityClient(options);
    this.msalConfig = msalConfig;
    this.persistenceEnabled = persistenceEnabled;
    this.authenticationRecord = authenticationRecord;
  }

  async prepareClientApplications(): Promise<void> {
    // If we've already initialized the public client application, return
    if (this.pca) {
      return;
    }

    // Construct the public client application, since it hasn't been initialized, yet
    const clientConfig: Configuration = {
      auth: this.msalConfig,
      cache: undefined,
      system: { networkClient: this.identityClient }
    };

    this.pca = new PublicClientApplication(clientConfig);
  }

  async acquireTokenFromCache(scopes: string[]): Promise<AccessToken | null> {
    await this.prepareClientApplications();

    if (!this.persistenceEnabled || !this.authenticationRecord) {
      throw new AuthenticationRequired();
    }

    const silentRequest = {
      account: this.authenticationRecord!,
      scopes
    };

    try {
      const response = await this.pca!.acquireTokenSilent(silentRequest);
      logger.info("Successful silent token acquisition");
      return {
        expiresOnTimestamp: response.expiresOn.getTime(),
        token: response.accessToken
      };
    } catch (e) {
      throw new AuthenticationRequired("Could not authenticate silently using the cache");
    }
  }

  async getAuthCodeUrl(request: { scopes: string[]; redirectUri: string }): Promise<string> {
    await this.prepareClientApplications();

    return this.pca!.getAuthCodeUrl(request);
  }

  async acquireTokenByCode(request: AuthorizationCodeRequest): Promise<AuthenticationResult> {
    await this.prepareClientApplications();

    return this.pca!.acquireTokenByCode(request);
  }

  async acquireTokenByDeviceCode(request: DeviceCodeRequest): Promise<AuthenticationResult> {
    await this.prepareClientApplications();

    return this.pca!.acquireTokenByDeviceCode(request);
  }

  async acquireTokenByClientCredential(
    request: ClientCredentialRequest
  ): Promise<AuthenticationResult> {
    await this.prepareClientApplications();

    return this.cca!.acquireTokenByClientCredential(request);
  }
}

export enum HttpMethod {
  GET = "get",
  POST = "post"
}
/**
 * This class implements the API for network requests.
 */
export class HttpClient implements INetworkModule {
  constructor() {
    axios.defaults.validateStatus = () => true;
  }

  /**
   * Http Get request
   * @param url -
   * @param options -
   */
  async sendGetRequestAsync<T>(
    url: string,
    options?: NetworkRequestOptions
  ): Promise<NetworkResponse<T>> {
    const request: AxiosRequestConfig = {
      method: HttpMethod.GET,
      url: url,
      headers: options && options.headers
    };

    const response = await axios(request);
    const out = {
      headers: response.headers,
      body: response.data as T,
      status: response.status
    };
    return out;
  }

  /**
   * Http Post request
   * @param url -
   * @param options -
   */
  async sendPostRequestAsync<T>(
    url: string,
    options?: NetworkRequestOptions
  ): Promise<NetworkResponse<T>> {
    const request: AxiosRequestConfig = {
      method: HttpMethod.POST,
      url: url,
      data: (options && options.body) || "",
      headers: options && options.headers
    };

    const response = await axios(request);
    const out = {
      headers: response.headers,
      body: response.data as T,
      status: response.status
    };

    return out;
  }
}
