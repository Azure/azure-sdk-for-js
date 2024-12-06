// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthenticationRecord } from "../types.js";
import type { MsalFlow, MsalFlowOptions } from "./flows.js";

import type { BrowserLoginStyle } from "../../credentials/interactiveBrowserCredentialOptions.js";
import type { LogPolicyOptions } from "@azure/core-rest-pipeline";
import type { MultiTenantTokenCredentialOptions } from "../../credentials/multiTenantTokenCredentialOptions.js";
import { AccessToken } from "@azure/core-auth";
import type { CredentialFlowGetTokenOptions } from "../credentials.js";

/**
 * Union of the constructor parameters that all MSAL flow types take.
 * Some properties might not be used by some flow types.
 */
export interface MsalBrowserFlowOptions extends MsalFlowOptions {
  tokenCredentialOptions: MultiTenantTokenCredentialOptions;
  redirectUri?: string;
  loginStyle: BrowserLoginStyle;
  loginHint?: string;
  /**
   * Allows users to configure settings for logging policy options, allow logging account information and personally identifiable information for customer support.
   */
  loggingOptions?: LogPolicyOptions & {
    /**
     * Allows logging account information once the authentication flow succeeds.
     */
    allowLoggingAccountIdentifiers?: boolean;
    /**
     * Allows logging personally identifiable information for customer support.
     */
    enableUnsafeSupportLogging?: boolean;
  };
}

/**
 * The common methods we use to work with the MSAL browser flows.
 * @internal
 */
export interface MsalBrowserFlow extends MsalFlow {
  login(scopes?: string[]): Promise<AuthenticationRecord | undefined>;
  handleRedirect(): Promise<AuthenticationRecord | undefined>;
}

/**
 * The common methods we use to work with the MSAL browser flows.
 * @internal
 */
export interface MsalBrowserClient extends MsalFlow {
  getActiveAccount(): Promise<AuthenticationRecord | undefined>;
  getToken(
    scopes: string[],
    options: CredentialFlowGetTokenOptions,
  ): Promise<AccessToken>;
}
