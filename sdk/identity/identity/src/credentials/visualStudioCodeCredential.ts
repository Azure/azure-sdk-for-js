// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { credentialLogger } from "../util/logging.js";
import {
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
} from "../util/tenantIdUtils.js";
import { AzureAuthorityHosts } from "../constants.js";
import { CredentialUnavailableError } from "../errors.js";
import type { VisualStudioCodeCredentialOptions } from "./visualStudioCodeCredentialOptions.js";
import { checkTenantId } from "../util/tenantIdUtils.js";
import { readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { createMsalClient, MsalClient } from "../msal/nodeFlows/msalClient.js";
import { ensureScopes } from "../util/scopeUtils.js";
import { hasVSCodePlugin, vsCodeAuthRecordPath } from "../msal/nodeFlows/msalPlugins.js";
import { deserializeAuthenticationRecord } from "../msal/utils.js";
import { readFile } from "node:fs/promises";
import { AuthenticationRecord } from "../msal/types.js";

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
    const settings = JSON.parse(readFileSync(fullPath, { encoding: "utf8" }));
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
 * Connects to Azure using the user account signed in through the Azure Resources extension in Visual Studio Code.
 * Once the user has logged in via the extension, this credential can share the same refresh token
 * that is cached by the extension.
 */
export class VisualStudioCodeCredential implements TokenCredential {
  private tenantId: string;
  private additionallyAllowedTenantIds: string[];
  private cloudName: VSCodeCloudNames;
  private msalClient: MsalClient | undefined;
  private options: VisualStudioCodeCredentialOptions;

  /**
   * Creates an instance of VisualStudioCodeCredential to use for automatically authenticating via VSCode.
   *
   * **Note**: `VisualStudioCodeCredential` is provided by a plugin package:
   * `@azure/identity-vscode`. If this package is not installed, then authentication using
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

  /**
   * Runs preparations for any further getToken request:
   *   - Validates that the plugin is available.
   *   - Loads the authentication record from VSCode if available.
   *   - Creates the MSAL client with the loaded plugin and authentication record.
   */
  private async prepare(): Promise<void> {
    const tenantId =
      processMultiTenantRequest(
        this.tenantId,
        this.options,
        this.additionallyAllowedTenantIds,
        logger,
      ) || this.tenantId;

    if (!hasVSCodePlugin() || !vsCodeAuthRecordPath) {
      throw new CredentialUnavailableError(
        "Visual Studio Code Authentication is not available." +
          " Ensure you have have Azure Resources Extension installed in VS Code," +
          " signed into Azure via VS Code, installed the @azure/identity-vscode package," +
          " and properly configured the extension.",
      );
    }

    // Load the authentication record directly from the path
    const authenticationRecord = await this.loadAuthRecord(vsCodeAuthRecordPath);

    const authorityHost = mapVSCodeAuthorityHosts[this.cloudName];
    this.msalClient = createMsalClient(VSCodeClientId, tenantId, {
      ...this.options,
      authorityHost,
      isVSCodeCredential: true,
      brokerOptions: {
        enabled: true,
        parentWindowHandle: new Uint8Array(0),
        useDefaultBrokerAccount: true,
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
    // Load the plugin and authentication record only once
    await this.prepareOnce();

    if (!this.msalClient) {
      throw new CredentialUnavailableError(
        "Visual Studio Code Authentication failed to initialize." +
          " Ensure you have have Azure Resources Extension installed in VS Code," +
          " signed into Azure via VS Code, installed the @azure/identity-vscode package," +
          " and properly configured the extension.",
      );
    }

    const scopeArray = ensureScopes(scopes);
    return this.msalClient.getTokenByInteractiveRequest(scopeArray, options || {});
  }

  /**
   * Loads the authentication record from the specified path.
   * @param authRecordPath - The path to the authentication record file.
   * @returns The authentication record or undefined if loading fails.
   */
  private async loadAuthRecord(authRecordPath: string): Promise<AuthenticationRecord | undefined> {
    try {
      const authRecordContent = await readFile(authRecordPath, { encoding: "utf8" });
      return deserializeAuthenticationRecord(authRecordContent);
    } catch (error: any) {
      logger.info(`Failed to read or parse VS Code authentication record: ${error.message}`);
      return undefined;
    }
  }
}
