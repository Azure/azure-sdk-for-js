// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ConfidentialClientApplication,
  Configuration,
  PublicClientApplication,
} from "@azure/msal-node";
import { DeviceCodeResponse } from "@azure/msal-common";
import {
  AzureCliCredential,
  InteractiveBrowserCredential,
  ManagedIdentityCredential,
} from "@azure/identity";
import { CloudInfo, CloudSettings } from "./cloudSettings";
import { TokenCredential } from "@azure/core-auth";

export declare type TokenResponse = {
  tokenType: string;
  accessToken: string;
};

interface TokenType {
  tokenType: string;
  accessToken: string;
}

const BEARER_TYPE = "Bearer";

/**
 * This base class abstracts token acquisition for all implementations.
 * The class is build for Lazy initialization, so that the first call, take on instantiation of 'heavy' long-lived class members
 */
export abstract class TokenProviderBase {
  kustoUri: string;
  scopes!: string[];

  abstract acquireToken(): Promise<TokenResponse>;

  context(): Record<string, any> {
    return {};
  }

  protected constructor(kustoUri: string) {
    this.kustoUri = kustoUri;
    if (kustoUri != null) {
      const suffix = (!this.kustoUri.endsWith("/") ? "/" : "") + ".default";
      this.scopes = [kustoUri + suffix];
    }
  }
}

/**
 * Basic Token Provider keeps and returns a token received on construction
 */
export class BasicTokenProvider extends TokenProviderBase {
  token: string;

  constructor(kustoUri: string, token: string) {
    super(kustoUri);
    this.token = token;
  }

  acquireToken(): Promise<TokenResponse> {
    return Promise.resolve<TokenResponse>({
      tokenType: BEARER_TYPE,
      accessToken: this.token,
    });
  }
}

/**
 * Callback Token Provider generates a token based on a callback function provided by the caller
 */
export class CallbackTokenProvider extends TokenProviderBase {
  callback: () => Promise<string>;

  constructor(kustoUri: string, callback: () => Promise<string>) {
    super(kustoUri);
    this.callback = callback;
  }

  async acquireToken(): Promise<TokenResponse> {
    const token = await this.callback();
    return { tokenType: BEARER_TYPE, accessToken: token };
  }
}

/**
 * Token providers that require cloud settings to be configured - msal and azure identity
 */
abstract class CloudSettingsTokenProvider extends TokenProviderBase {
  protected cloudInfo!: CloudInfo;
  protected initialized: boolean;

  abstract initClient(): void;

  abstract acquireTokenWithCloudSettings(): Promise<TokenType | null>;

  additionalCloudSettingsInit(): void {}

  protected constructor(kustoUri: string) {
    super(kustoUri);
    this.initialized = false;
  }

  async acquireToken(): Promise<TokenResponse> {
    if (!this.initialized) {
      if (this.cloudInfo == null) {
        this.cloudInfo = await CloudSettings.getInstance().getCloudInfoForCluster(this.kustoUri);
        let resourceUri = this.cloudInfo.KustoServiceResourceId;
        if (this.cloudInfo.LoginMfaRequired) {
          resourceUri = resourceUri.replace(".kusto.", ".kustomfa.");
        }
        this.scopes = [resourceUri + "/.default"];
        this.additionalCloudSettingsInit();
        this.initClient();
      }
      this.initialized = true;
    }

    const token = await this.acquireTokenWithCloudSettings();
    if (token) {
      return { tokenType: token.tokenType, accessToken: token.accessToken };
    }
    throw new Error("Failed to get token from msal");
  }

  context(): Record<string, any> {
    return {
      ...super.context(),
      kustoUri: this.kustoUri,
    };
  }
}

/**
 * Acquire a token from MSAL
 */
abstract class MsalTokenProvider extends CloudSettingsTokenProvider {
  protected cloudInfo!: CloudInfo;
  protected authorityId: string;
  protected authorityUri!: string;

  protected constructor(
    kustoUri: string,
    authorityId: string,
    private clientId: string | undefined
  ) {
    super(kustoUri);
    this.authorityId = authorityId;
  }

  commonOptions(): Configuration {
    return {
      auth: {
        clientId: this.clientId!,
        knownAuthorities: [this.cloudInfo.LoginEndpoint],
        authority: this.authorityUri,
      },
    };
  }

  additionalCloudSettingsInit() {
    this.authorityUri = CloudSettings.getAuthorityUri(this.cloudInfo, this.authorityId);
    if (!this.clientId) {
      this.clientId = this.cloudInfo.KustoClientAppId;
    }
  }

  context(): Record<string, any> {
    return {
      ...super.context(),
      authorityId: this.authorityId,
    };
  }
}

export abstract class AzureIdentityProvider extends CloudSettingsTokenProvider {
  private credential!: TokenCredential;

  constructor(kustoUri: string, protected authorityId?: string, private timeoutMs?: number) {
    super(kustoUri);
  }

  initClient(): void {
    this.credential = this.getCredential();
  }

  async acquireTokenWithCloudSettings(): Promise<TokenType | null> {
    const response = await this.credential.getToken(this.scopes, {
      requestOptions: {
        timeout: this.timeoutMs,
      },
      tenantId: this.authorityId,
    });
    if (response === null) {
      throw new Error("Failed to get token from msal");
    }
    return { tokenType: BEARER_TYPE, accessToken: response.token };
  }

  context(): Record<string, any> {
    let base: Record<string, any> = {
      ...super.context(),
      kustoUri: this.kustoUri,
      authorityId: this.authorityId,
    };
    if (this.timeoutMs) {
      base = { ...base, timeoutMs: this.timeoutMs };
    }

    return base;
  }

  abstract getCredential(): TokenCredential;
}

/**
 * MSI Token Provider obtains a token from the MSI endpoint
 * The args parameter is a dictionary conforming with the ManagedIdentityCredential initializer API arguments
 */
export class MsiTokenProvider extends AzureIdentityProvider {
  constructor(
    kustoUri: string,
    protected clientId?: string,
    authorityId?: string,
    timeoutMs?: number
  ) {
    super(kustoUri, authorityId, timeoutMs);
  }

  getCredential(): TokenCredential {
    return this.clientId
      ? new ManagedIdentityCredential(this.clientId)
      : new ManagedIdentityCredential();
  }

  context(): Record<string, any> {
    return {
      ...super.context(),
      clientId: this.clientId,
    };
  }
}

/**
 * AzCli Token Provider obtains a refresh token from the AzCli cache and uses it to authenticate with MSAL
 */
export class AzCliTokenProvider extends AzureIdentityProvider {
  getCredential(): TokenCredential {
    return new AzureCliCredential();
  }
}

/**
 * UserPromptProvider will pop up a login prompt to acquire a token.
 */
export class UserPromptProvider extends AzureIdentityProvider {
  // The default port is 80, which can lead to permission errors, so we'll choose another port
  readonly MinPort = 20000;
  readonly MaxPort = 65536;

  constructor(
    kustoUri: string,
    authorityId: string,
    timeoutMs?: number,
    private loginHint?: string
  ) {
    super(kustoUri, authorityId, timeoutMs);
  }

  getCredential(): TokenCredential {
    return new InteractiveBrowserCredential({
      loginHint: this.loginHint,
      redirectUri: `http://localhost:${this.getRandomPortInRange()}/`,
    });
  }

  private getRandomPortInRange() {
    return Math.floor(Math.random() * (this.MaxPort - this.MinPort) + this.MinPort);
  }

  context(): Record<string, any> {
    let base = super.context();
    if (this.loginHint) {
      base = { ...base, loginHint: this.loginHint };
    }
    return base;
  }
}

/**
 * Acquire a token from MSAL with username and password
 */
export class UserPassTokenProvider extends MsalTokenProvider {
  userName: string;
  password: string;
  homeAccountId?: string;
  msalClient!: PublicClientApplication;

  constructor(kustoUri: string, userName: string, password: string, authorityId: string) {
    super(kustoUri, authorityId, undefined);
    this.userName = userName;
    this.password = password;
  }

  initClient(): void {
    this.msalClient = new PublicClientApplication(this.commonOptions());
  }

  async acquireTokenWithCloudSettings(): Promise<TokenType | null> {
    let token = null;
    if (this.homeAccountId != null) {
      const account = await this.msalClient.getTokenCache().getAccountByHomeId(this.homeAccountId);
      if (account) {
        token = await this.msalClient.acquireTokenSilent({
          account,
          scopes: this.scopes,
        });
      }
    }
    if (token == null) {
      token = await this.msalClient.acquireTokenByUsernamePassword({
        scopes: this.scopes,
        username: this.userName,
        password: this.password,
      });
      this.homeAccountId = token?.account?.homeAccountId;
    }
    return token;
  }

  context(): Record<string, any> {
    return {
      ...super.context(),
      userName: this.userName,
      homeAccountId: this.homeAccountId,
    };
  }
}

/**
 * Acquire a token from MSAL with Device Login flow
 */
export class DeviceLoginTokenProvider extends MsalTokenProvider {
  deviceCodeCallback: (response: DeviceCodeResponse) => void;
  homeAccountId?: string;
  msalClient!: PublicClientApplication;

  constructor(
    kustoUri: string,
    deviceCodeCallback: (response: DeviceCodeResponse) => void,
    authorityId: string
  ) {
    super(kustoUri, authorityId, undefined);
    this.deviceCodeCallback = deviceCodeCallback;
  }

  initClient(): void {
    this.msalClient = new PublicClientApplication(this.commonOptions());
  }

  async acquireTokenWithCloudSettings(): Promise<TokenType | null> {
    let token = null;
    if (this.homeAccountId != null) {
      const account = await this.msalClient.getTokenCache().getAccountByHomeId(this.homeAccountId);
      if (account) {
        token = await this.msalClient.acquireTokenSilent({
          account,
          scopes: this.scopes,
        });
      }
    }
    if (token == null) {
      token = await this.msalClient.acquireTokenByDeviceCode({
        scopes: this.scopes,
        deviceCodeCallback: this.deviceCodeCallback,
      });
      this.homeAccountId = token?.account?.homeAccountId;
    }
    return token;
  }
}

/**
 * Acquire a token from MSAL with application id and Key
 */
export class ApplicationKeyTokenProvider extends MsalTokenProvider {
  msalClient!: ConfidentialClientApplication;

  constructor(
    kustoUri: string,
    private appClientId: string,
    private appKey: string,
    authorityId: string
  ) {
    super(kustoUri, authorityId, appClientId);
  }

  initClient(): void {
    const commonOptions = this.commonOptions();
    const clientConfig = {
      ...commonOptions,
      auth: {
        ...commonOptions.auth,
        clientSecret: this.appKey,
      },
    };
    this.msalClient = new ConfidentialClientApplication(clientConfig);
  }

  acquireTokenWithCloudSettings(): Promise<TokenType | null> {
    return this.msalClient.acquireTokenByClientCredential({
      scopes: this.scopes,
    });
  }

  context(): Record<string, any> {
    return { ...super.context(), clientId: this.appClientId };
  }
}

/**
 * Acquire a token from MSAL using application certificate
 * Passing the public certificate is optional and will result in Subject Name & Issuer Authentication
 */
export class ApplicationCertificateTokenProvider extends MsalTokenProvider {
  msalClient!: ConfidentialClientApplication;

  constructor(
    kustoUri: string,
    private appClientId: string,
    private certThumbprint: string,
    private certPrivateKey: string,
    private certX5c?: string,
    authorityId?: string
  ) {
    super(kustoUri, authorityId!, appClientId);
  }

  initClient(): void {
    const commonOptions = this.commonOptions();
    const clientConfig = {
      ...commonOptions,
      auth: {
        ...commonOptions.auth,
        clientCertificate: {
          thumbprint: this.certThumbprint,
          privateKey: this.certPrivateKey,
          x5c: this.certX5c,
        },
      },
    };
    this.msalClient = new ConfidentialClientApplication(clientConfig);
  }

  acquireTokenWithCloudSettings(): Promise<TokenType | null> {
    return this.msalClient.acquireTokenByClientCredential({
      scopes: this.scopes,
    });
  }

  context(): Record<string, any> {
    return {
      ...super.context(),
      clientId: this.appClientId,
      thumbprint: this.certThumbprint,
    };
  }
}
