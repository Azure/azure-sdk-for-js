import { CredentialUnavailable } from "./errors";
import {
  PublicClientApplication,
  Configuration,
  AuthorizationCodeRequest,
  AuthenticationResult,
} from "@azure/msal-node";
import {IdentityClient, TokenCredentialOptions} from "./identityClient";
import { AccessToken } from "@azure/core-http";
import { credentialLogger } from "../util/logging";

let msalExt: any;
try {
  msalExt = require("@azure/msal-node-extension");
} catch (er) {
  msalExt = null;
}

const logger = credentialLogger("InteractiveBrowserCredential");

async function createPersistence(cachePath?: string): Promise<
  | {
      cachePlugin?: {
        readFromStorage: () => Promise<string>;
        writeToStorage: (getMergedState: (oldState: string) => string) => Promise<void>;
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
    }
  }

  // On Mac, uses keychain.
  if (process.platform === "darwin") {
    let keychainPersistence = await msalExt.KeychainPersistence.create(cachePath, "serviceName", "accountName");

    return {
      cachePlugin: new msalExt.PersistenceCachePlugin(keychainPersistence)
    }
  }

  // On Linux, uses  libsecret to store to secret service. Libsecret has to be installed.
  if (process.platform === "linux") {
    let libSecretPersistence = await msalExt.LibSecretPersistence.create(cachePath, "serviceName", "accountName");

    return {
      cachePlugin: new msalExt.PersistenceCachePlugin(libSecretPersistence)
    }
  }

  // fall back to using plain text file. Not recommended for storing secrets.
  let filePersistence = await msalExt.FilePersistence.create(cachePath);

  return {
    cachePlugin: new msalExt.PersistenceCachePlugin(filePersistence)
  }
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
  private clientId: string;
  private tenantId: string;
  private authorityHost: string;
  private cachePath?: string;

  constructor(clientId: string, tenantId: string, authorityHost: string, persistenceEnabled: boolean, authenticationRecord?: AuthenticationRecord, cachePath?: string, options?: TokenCredentialOptions) {
    this.identityClient = new IdentityClient(options);
    this.clientId = clientId;
    this.tenantId = tenantId;
    this.authorityHost = authorityHost;
    this.cachePath = cachePath;
    this.persistenceEnabled = persistenceEnabled;
    this.authenticationRecord = authenticationRecord;
  }

  async preparePublicClientApplication() {
    // If we've already initialized the public client application, return
    if (this.pca) {
      return;
    }

    // If we need to load the plugin that handles persistence, go ahead and load it
    let plugin = undefined;
    if (this.persistenceEnabled && this.authenticationRecord) {
      plugin = await createPersistence(this.cachePath);
    }

    // Construct the public client application, since it hasn't been initialized, yet
    const knownAuthorities = this.tenantId === "adfs" ? [this.authorityHost] : [];
    const publicClientConfig: Configuration = {
      auth: {
        clientId: this.clientId,
        authority: this.authorityHost,
        knownAuthorities: knownAuthorities
      },
      cache: plugin,
      system: { networkClient: this.identityClient }
    };
    this.pca = new PublicClientApplication(publicClientConfig);
    this.pca.getAuthCodeUrl
  }

  async acquireTokenFromCache(): Promise<AccessToken | null> {
    if (!this.persistenceEnabled || !this.authenticationRecord) {
      throw new AuthenticationRequired();
    }

    await this.preparePublicClientApplication();

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

  async getAuthCodeUrl(request: { scopes: string[], redirectUri: string }): Promise<string> {
    await this.preparePublicClientApplication();

    return this.pca!.getAuthCodeUrl(request);
  }

  async acquireTokenByCode(request: AuthorizationCodeRequest): Promise<AuthenticationResult> {
    return this.pca!.acquireTokenByCode(request);
  }
}
