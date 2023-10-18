// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { credentialLogger, formatError, formatSuccess } from "../util/logging";
import {
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
} from "../util/tenantIdUtils";
import { AzureAuthorityHosts } from "../constants";
import { CredentialUnavailableError } from "../errors";
import { IdentityClient } from "../client/identityClient";
import { VisualStudioCodeCredentialOptions } from "./visualStudioCodeCredentialOptions";
import { VSCodeCredentialFinder } from "./visualStudioCodeCredentialPlugin";
import { checkTenantId } from "../util/tenantIdUtils";
import fs from "fs";
import os from "os";
import path from "path";

const CommonTenantId = "common";
const AzureAccountClientId = "aebc6443-996d-45c2-90f0-388ff96faa56"; // VSC: 'aebc6443-996d-45c2-90f0-388ff96faa56'
const logger = credentialLogger("VisualStudioCodeCredential");

let findCredentials: VSCodeCredentialFinder | undefined = undefined;

export const vsCodeCredentialControl = {
  setVsCodeCredentialFinder(finder: VSCodeCredentialFinder): void {
    findCredentials = finder;
  },
};

// Map of unsupported Tenant IDs and the errors we will be throwing.
const unsupportedTenantIds: Record<string, string> = {
  adfs: "The VisualStudioCodeCredential does not support authentication with ADFS tenants.",
};

function checkUnsupportedTenant(tenantId: string): void {
  // If the Tenant ID isn't supported, we throw.
  const unsupportedTenantError = unsupportedTenantIds[tenantId];
  if (unsupportedTenantError) {
    throw new CredentialUnavailableError(unsupportedTenantError);
  }
}

type VSCodeCloudNames = "AzureCloud" | "AzureChina" | "AzureGermanCloud" | "AzureUSGovernment";

const mapVSCodeAuthorityHosts: Record<VSCodeCloudNames, string> = {
  AzureCloud: AzureAuthorityHosts.AzurePublicCloud,
  AzureChina: AzureAuthorityHosts.AzureChina,
  AzureGermanCloud: AzureAuthorityHosts.AzureGermany,
  AzureUSGovernment: AzureAuthorityHosts.AzureGovernment,
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
  } catch (e: any) {
    logger.info(`Failed to load the Visual Studio Code configuration file. Error: ${e.message}`);
    return;
  }
}

/**
 * Connects to Azure using the credential provided by the VSCode extension 'Azure Account'.
 * Once the user has logged in via the extension, this credential can share the same refresh token
 * that is cached by the extension.
 *
 * It's a [known issue](https://github.com/Azure/azure-sdk-for-js/issues/20500) that this credential doesn't
 * work with [Azure Account extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account)
 * versions newer than **0.9.11**. A long-term fix to this problem is in progress. In the meantime, consider
 * authenticating with {@link AzureCliCredential}.
 */
export class VisualStudioCodeCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private tenantId: string;
  private additionallyAllowedTenantIds: string[];
  private cloudName: VSCodeCloudNames;

  /**
   * Creates an instance of VisualStudioCodeCredential to use for automatically authenticating via VSCode.
   *
   * **Note**: `VisualStudioCodeCredential` is provided by a plugin package:
   * `@azure/identity-vscode`. If this package is not installed and registered
   * using the plugin API (`useIdentityPlugin`), then authentication using
   * `VisualStudioCodeCredential` will not be available.
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
      ...options,
    });

    if (options && options.tenantId) {
      checkTenantId(logger, options.tenantId);
      this.tenantId = options.tenantId;
    } else {
      this.tenantId = CommonTenantId;
    }

    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(
      options?.additionallyAllowedTenants
    );

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
    if (!this.preparePromise) {
      this.preparePromise = this.prepare();
    }
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
    options?: GetTokenOptions
  ): Promise<AccessToken> {
    await this.prepareOnce();

    const tenantId =
      processMultiTenantRequest(
        this.tenantId,
        options,
        this.additionallyAllowedTenantIds,
        logger
      ) || this.tenantId;

    if (findCredentials === undefined) {
      throw new CredentialUnavailableError(
        [
          "No implementation of `VisualStudioCodeCredential` is available.",
          "You must install the identity-vscode plugin package (`npm install --save-dev @azure/identity-vscode`)",
          "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
          "`useIdentityPlugin(vsCodePlugin)` before creating a `VisualStudioCodeCredential`.",
          "To troubleshoot, visit https://aka.ms/azsdk/js/identity/vscodecredential/troubleshoot.",
        ].join(" ")
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
    const credentials = await findCredentials();

    // If we can't find the credential based on the name, we'll pick the first one available.
    const { password: refreshToken } =
      credentials.find(({ account }) => account === this.cloudName) ?? credentials[0] ?? {};

    if (refreshToken) {
      const tokenResponse = await this.identityClient.refreshAccessToken(
        tenantId,
        AzureAccountClientId,
        scopeString,
        refreshToken,
        undefined
      );

      if (tokenResponse) {
        logger.getToken.info(formatSuccess(scopes));
        return tokenResponse.accessToken;
      } else {
        const error = new CredentialUnavailableError(
          "Could not retrieve the token associated with Visual Studio Code. Have you connected using the 'Azure Account' extension recently? To troubleshoot, visit https://aka.ms/azsdk/js/identity/vscodecredential/troubleshoot."
        );
        logger.getToken.info(formatError(scopes, error));
        throw error;
      }
    } else {
      const error = new CredentialUnavailableError(
        "Could not retrieve the token associated with Visual Studio Code. Did you connect using the 'Azure Account' extension? To troubleshoot, visit https://aka.ms/azsdk/js/identity/vscodecredential/troubleshoot."
      );
      logger.getToken.info(formatError(scopes, error));
      throw error;
    }
  }
}
