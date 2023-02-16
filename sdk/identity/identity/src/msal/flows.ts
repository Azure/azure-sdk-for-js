// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "@azure/core-auth";
import { AuthenticationRecord } from "./types";
import { CredentialFlowGetTokenOptions } from "./credentials";
import { CredentialLogger } from "../util/logging";

/**
 * Union of the constructor parameters that all MSAL flow types take.
 * @internal
 */
export interface MsalFlowOptions {
  logger: CredentialLogger;
  clientId?: string;
  tenantId?: string;
  authorityHost?: string;
  authenticationRecord?: AuthenticationRecord;
  disableAutomaticAuthentication?: boolean;
  disableInstanceDiscovery?: boolean;
  getAssertion?: () => Promise<string>;
}

/**
 * The common methods we use to work with the MSAL flows.
 * @internal
 */
export interface MsalFlow {
  /**
   * Allows for any setup before any request is processed.
   */
  init(options?: CredentialFlowGetTokenOptions): Promise<void>;
  /**
   * Tries to load the active account, either from memory or from MSAL.
   */
  getActiveAccount(): Promise<AuthenticationRecord | undefined>;
  /**
   * Tries to retrieve the token silently using MSAL.
   */
  getTokenSilent(scopes?: string[], options?: CredentialFlowGetTokenOptions): Promise<AccessToken>;
  /**
   * Calls to the implementation's doGetToken method.
   */
  getToken(scopes?: string[], options?: CredentialFlowGetTokenOptions): Promise<AccessToken>;
}
