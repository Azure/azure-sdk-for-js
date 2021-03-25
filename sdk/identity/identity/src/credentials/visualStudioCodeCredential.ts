// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, AccessToken, GetTokenOptions } from "@azure/core-http";
import { TokenCredentialOptions, IdentityClient } from "../client/identityClient";
import fs from "fs";
import os from "os";
import path from "path";

let keytar: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  keytar = require("keytar");
} catch (er) {
  keytar = null;
}

import { CredentialUnavailable } from "../client/errors";
import { credentialLogger, formatSuccess, formatError } from "../util/logging";
import { AzureAuthorityHosts } from "../constants";
import { checkTenantId } from "../util/checkTenantId";

const CommonTenantId = "common";
const AzureAccountClientId = "aebc6443-996d-45c2-90f0-388ff96faa56"; // VSC: 'aebc6443-996d-45c2-90f0-388ff96faa56'
const VSCodeUserName = "VS Code Azure";
const logger = credentialLogger("VisualStudioCodeCredential");

// Map of unsupported Tenant IDs and the errors we will be throwing.
const unsupportedTenantIds: Record<string, string> = {
  adfs: "The VisualStudioCodeCredential does not support authentication with ADFS tenants."
};

function checkUnsupportedTenant(tenantId: string): void {
  // If the Tenant ID isn't supported, we throw.
  const unsupportedTenantError = unsupportedTenantIds[tenantId];
  if (unsupportedTenantError) {
    throw new CredentialUnavailable(unsupportedTenantError);
  }
}

type VSCodeCloudNames = "AzureCloud" | "AzureChina" | "AzureGermanCloud" | "AzureUSGovernment";

const mapVSCodeAuthorityHosts: Record<VSCodeCloudNames, string> = {
  AzureCloud: AzureAuthorityHosts.AzurePublicCloud,
  AzureChina: AzureAuthorityHosts.AzureChina,
  AzureGermanCloud: AzureAuthorityHosts.AzureGermany,
  AzureUSGovernment: AzureAuthorityHosts.AzureGovernment
};

/**
 * Attempts to load a specific property from the VSCode configurations of the current OS.
 * If it fails at any point, returns undefined.
 */
export function getPropertyFromVSCode(property: string): string | undefined {
  const settingsPath = ["User", "settings.json"];
  // Eventually we can add more folders for more versions of VSCode.
  const vsCodeFolder = "Code";
  const homedir = os.homedir();

  function loadProperty(...pathSegments: string[]): string | undefined {
    const fullPath = path.join(...pathSegments, vsCodeFolder, ...settingsPath);
    const settings = JSON.parse(fs.readFileSync(fullPath, { encoding: "utf8" }));
    return settings[property];
  }

  try {
    let appData: string;
    switch (process.platform) {
      case "win32":
        appData = process.env.APPDATA!;
        return appData ? loadProperty(appData) : undefined;
      case "darwin":
        return loadProperty(homedir, "Library", "Application Support");
      case "linux":
        return loadProperty(homedir, ".config");
      default:
        return;
    }
  } catch (e) {
    logger.info(`Failed to load the Visual Studio Code configuration file. Error: ${e.message}`);
    return;
  }
}

/**
 * Provides options to configure the Visual Studio Code credential.
 */
export interface VisualStudioCodeCredentialOptions extends TokenCredentialOptions {
  /**
   * Optionally pass in a Tenant ID to be used as part of the credential
   */
  tenantId?: string;
}

/**
 * Connect to Azure using the credential provided by the VSCode extension 'Azure Account'.
 * Once the user has logged in via the extension, this credential can share the same refresh token
 * that is cached by the extension.
 */
export class VisualStudioCodeCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private tenantId: string;
  private cloudName: VSCodeCloudNames;

  /**
   * Creates an instance of VisualStudioCodeCredential to use for automatically authenticating via VSCode.
   *
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(options?: VisualStudioCodeCredentialOptions) {
    // We want to make sure we use the one assigned by the user on the VSCode settings.
    // Or just `AzureCloud` by default.
    this.cloudName = (getPropertyFromVSCode("azure.cloud") || "AzureCloud") as VSCodeCloudNames;

    // Picking an authority host based on the cloud name.
    const authorityHost = mapVSCodeAuthorityHosts[this.cloudName];

    this.identityClient = new IdentityClient({
      authorityHost,
      ...options
    });

    if (options && options.tenantId) {
      checkTenantId(logger, options.tenantId);

      this.tenantId = options.tenantId;
    } else {
      this.tenantId = CommonTenantId;
    }
    checkUnsupportedTenant(this.tenantId);
  }

  /**
   * Runs preparations for any further getToken request.
   */
  private async prepare(): Promise<void> {
    // Attempts to load the tenant from the VSCode configuration file.
    const settingsTenant = getPropertyFromVSCode("azure.tenant");
    if (settingsTenant) {
      this.tenantId = settingsTenant;
    }
    checkUnsupportedTenant(this.tenantId);
  }

  /**
   * The promise of the single preparation that will be executed at the first getToken request for an instance of this class.
   */
  private preparePromise: Promise<void> | undefined;

  /**
   * Runs preparations for any further getToken, but only once.
   */
  private prepareOnce(): Promise<void> | undefined {
    if (this.preparePromise) {
      return this.preparePromise;
    }
    this.preparePromise = this.prepare();
    return this.preparePromise;
  }

  /**
   * Returns the token found by searching VSCode's authentication cache or
   * returns null if no token could be found.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                `TokenCredential` implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    _options?: GetTokenOptions
  ): Promise<AccessToken> {
    await this.prepareOnce();
    if (!keytar) {
      throw new CredentialUnavailable(
        "Visual Studio Code credential requires the optional dependency 'keytar' to work correctly"
      );
    }

    let scopeString = typeof scopes === "string" ? scopes : scopes.join(" ");

    // Check to make sure the scope we get back is a valid scope
    if (!scopeString.match(/^[0-9a-zA-Z-.:/]+$/)) {
      const error = new Error("Invalid scope was specified by the user or calling client");
      logger.getToken.info(formatError(scopes, error));
      throw error;
    }

    if (scopeString.indexOf("offline_access") < 0) {
      scopeString += " offline_access";
    }

    // findCredentials returns an array similar to:
    // [
    //   {
    //     account: "",
    //     password: "",
    //   },
    //   /* ... */
    // ]
    const credentials = await keytar.findCredentials(VSCodeUserName);

    // If we can't find the credential based on the name, we'll pick the first one available.
    const { password } =
      credentials.find((cred: { account: string }) => cred.account === this.cloudName) ||
      credentials[0] ||
      {};

    // Assuming we found something, the refresh token is the "password" property.
    const refreshToken = password;

    if (refreshToken) {
      const tokenResponse = await this.identityClient.refreshAccessToken(
        this.tenantId,
        AzureAccountClientId,
        scopeString,
        refreshToken,
        undefined
      );

      if (tokenResponse) {
        logger.getToken.info(formatSuccess(scopes));
        return tokenResponse.accessToken;
      } else {
        const error = new CredentialUnavailable(
          "Could not retrieve the token associated with Visual Studio Code. Have you connected using the 'Azure Account' extension recently?"
        );
        logger.getToken.info(formatError(scopes, error));
        throw error;
      }
    } else {
      const error = new CredentialUnavailable(
        "Could not retrieve the token associated with Visual Studio Code. Did you connect using the 'Azure Account' extension?"
      );
      logger.getToken.info(formatError(scopes, error));
      throw error;
    }
  }
}
