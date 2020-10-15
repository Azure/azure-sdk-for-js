import { CredentialUnavailable } from "./errors";
import {
  PublicClientApplication,
  Configuration,
  AuthorizationCodeRequest,
  AuthenticationResult,
  DeviceCodeRequest,
  ConfidentialClientApplication,
  ClientCredentialRequest,
  TokenCacheContext
} from "@azure/msal-node";
import { IdentityClient, TokenCredentialOptions } from "./identityClient";
import { AccessToken } from "@azure/core-http";
import { credentialLogger } from "../util/logging";
import { NodeAuthOptions } from "@azure/msal-node/dist/config/Configuration";

let msalExt: any;
try {
  msalExt = require("@azure/msal-node-extension");
} catch (er) {
  msalExt = null;
}

const logger = credentialLogger("InteractiveBrowserCredential");

async function createPersistence(
  cachePath?: string
): Promise<
  | {
      cachePlugin?: {
        beforeCacheAccess: (tokenCacheContext: TokenCacheContext) => Promise<void>;
        afterCacheAccess: (tokenCacheContext: TokenCacheContext) => Promise<void>;
      };
    }
  | undefined
> {
  console.log("process platform:", process.platform);

  // On Windows, uses a DPAPI encrypted file
  if (process.platform === "win32") {
    let filePersistence = await msalExt.FilePersistenceWithDataProtection.create(
      cachePath,
      msalExt.DataProtectionScope.LocalMachine
    );

    return {
      cachePlugin: new msalExt.PersistenceCachePlugin(filePersistence)
    };
  }

  // On Mac, uses keychain.
  if (process.platform === "darwin") {
    let keychainPersistence = await msalExt.KeychainPersistence.create(
      cachePath,
      "serviceName",
      "accountName"
    );

    return {
      cachePlugin: new msalExt.PersistenceCachePlugin(keychainPersistence)
    };
  }

  // On Linux, uses  libsecret to store to secret service. Libsecret has to be installed.
  if (process.platform === "linux") {
    let libSecretPersistence = await msalExt.LibSecretPersistence.create(
      cachePath,
      "serviceName",
      "accountName"
    );

    return {
      cachePlugin: new msalExt.PersistenceCachePlugin(libSecretPersistence)
    };
  }

  // fall back to using plain text file. Not recommended for storing secrets.
  let filePersistence = await msalExt.FilePersistence.create(cachePath);

  return {
    cachePlugin: new msalExt.PersistenceCachePlugin(filePersistence)
  };
}

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
  private tenantId: string;
  private cachePath?: string;
  private msalConfig: NodeAuthOptions;

  constructor(
    msalConfig: NodeAuthOptions,
    tenantId: string,
    persistenceEnabled: boolean,
    authenticationRecord?: AuthenticationRecord,
    cachePath?: string,
    options?: TokenCredentialOptions
  ) {
    this.identityClient = new IdentityClient(options);
    this.msalConfig = msalConfig;
    this.tenantId = tenantId;
    this.cachePath = cachePath;
    this.persistenceEnabled = persistenceEnabled;
    this.authenticationRecord = authenticationRecord;
  }

  async prepareClientApplications() {
    // If we've already initialized the public client application, return
    if (this.pca && this.cca) {
      return;
    }

    // If we need to load the plugin that handles persistence, go ahead and load it
    let plugin = undefined;
    if (this.persistenceEnabled && this.authenticationRecord) {
      plugin = await createPersistence(this.cachePath);
    }

    // Construct the public client application, since it hasn't been initialized, yet
    const knownAuthorities = this.tenantId === "adfs" ? [this.msalConfig.authority!] : [];
    this.msalConfig.knownAuthorities = knownAuthorities;

    const clientConfig: Configuration = {
      auth: this.msalConfig,
      cache: plugin,
      system: { networkClient: this.identityClient }
    };

    this.pca = new PublicClientApplication(clientConfig);
    this.cca = new ConfidentialClientApplication(clientConfig);
  }

  async acquireTokenFromCache(): Promise<AccessToken | null> {
    await this.prepareClientApplications();

    if (!this.persistenceEnabled || !this.authenticationRecord) {
      throw new AuthenticationRequired();
    }

    const silentRequest = {
      account: this.authenticationRecord!,
      scopes: ["https://vault.azure.net/user_impersonation", "https://vault.azure.net/.default"]
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
