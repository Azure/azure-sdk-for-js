// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { credentialLogger } from "../util/logging.js";
import {
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
} from "../util/tenantIdUtils.js";
import { AzureAuthorityHosts } from "../constants.js";
import { AuthenticationError, CredentialUnavailableError } from "../errors.js";
import type { VisualStudioCodeCredentialOptions } from "./visualStudioCodeCredentialOptions.js";
import { checkTenantId } from "../util/tenantIdUtils.js";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createMsalClient, MsalClient } from "../msal/nodeFlows/msalClient.js";
import { AuthenticationRecord } from "../msal/types.js";
import { ensureScopes } from "../util/scopeUtils.js";
import { deserializeAuthenticationRecord } from "../msal/utils.js";
import { useIdentityPlugin } from "../plugins/consumer.js";

const CommonTenantId = "common";
const VSCodeClientId = "aebc6443-996d-45c2-90f0-388ff96faa56";
const logger = credentialLogger("VisualStudioCodeCredential");

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
 * versions newer than **0.9.11**. A long-term fix to this problem is in the meantime, consider
 * authenticating with {@link AzureCliCredential}.
 */
export class VisualStudioCodeCredential implements TokenCredential {
  private tenantId: string;
  private additionallyAllowedTenantIds: string[];
  private cloudName: VSCodeCloudNames;
  private msalClient!: MsalClient;
  private options: VisualStudioCodeCredentialOptions;

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
    this.options = options || {};

    // We want to make sure we use the one assigned by the user on the VSCode settings.
    // Or just `AzureCloud` by default.
    this.cloudName = (getPropertyFromVSCode("azure.cloud") || "AzureCloud") as VSCodeCloudNames;

    if (options && options.tenantId) {
      checkTenantId(logger, options.tenantId);
      this.tenantId = options.tenantId;
    } else {
      this.tenantId = CommonTenantId;
    }

    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(
      options?.additionallyAllowedTenants,
    );

    checkUnsupportedTenant(this.tenantId);
  }

  private async loadBrokerPlugin() {
    try {
      // @ts-ignore
      const { nativeBrokerPlugin } = await import("@azure/identity-broker");
      return nativeBrokerPlugin;
    } catch (error) {
      // Package not installed, return null or fallback
      logger.info("The @azure/identity-broker package is not installed.");
      return undefined;
    }
  }

  private loadVSCodeAuthRecord(): AuthenticationRecord | undefined {
    const authRecordPath = path.join(os.homedir(), ".azure", "ms-azuretools.vscode-azureresourcegroups", "authRecord.json");

    if (!fs.existsSync(authRecordPath)) {
      logger.info(`The Visual Studio Code authentication record file does not exist.`);
      return undefined;
    }

    const authRecordContent = fs.readFileSync(authRecordPath, { encoding: 'utf8' });
    return deserializeAuthenticationRecord(authRecordContent);
  }

  /**
   * Runs preparations for any further getToken request.
   */
  private async prepare(): Promise<void> {
    // check if broker is available
    // check and parse authentication record
    const tenantId =
      processMultiTenantRequest(
        this.tenantId,
        this.options,
        this.additionallyAllowedTenantIds,
        logger,
      ) || this.tenantId;

    const nativeBrokerPlugin = await this.loadBrokerPlugin();
    const authenticationRecord = this.loadVSCodeAuthRecord();

    if (!nativeBrokerPlugin || !authenticationRecord) {
      throw new CredentialUnavailableError("Visual Studio Code Authentication is not available."
        + " Ensure you have @azure/identity-broker dependency installed, "
        + " signed into Azure via VS Code, and have Azure Resources Extension installed in VS Code."
      );
    }

    useIdentityPlugin(nativeBrokerPlugin);

    const authorityHost = mapVSCodeAuthorityHosts[this.cloudName];
    this.msalClient = createMsalClient(VSCodeClientId, tenantId, {
      ...this.options,
      authorityHost,
      brokerOptions: {
        enabled: true,
        parentWindowHandle: new Uint8Array(0)
      },
      authenticationRecord,
    });
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
    options?: GetTokenOptions,
  ): Promise<AccessToken> {
    await this.prepareOnce();

    // at this point we know the broker works
    const scopeArray = ensureScopes(scopes);
    const token = await this.msalClient.getTokenByInteractiveRequest(scopeArray, options || {});
    if (!token) {
      throw new AuthenticationError(400, {
        error: `VisualStudioCodeCredential authentication failed.`,
      });
    }
    return token;
  }
}
