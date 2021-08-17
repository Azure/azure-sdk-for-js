// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-auth";
import { TokenCredentialOptions } from "../client/identityClient";
import { MsalFlow } from "../msal/flows";
import { MsalOnBehalfOf } from "../msal/nodeFlows/msalOnBehalfOf";
import { credentialLogger } from "../util/logging";
import { trace } from "../util/tracing";
import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";

const logger = credentialLogger("OnBehalfOfCredential");

export interface OnBehalfOfCredentialOptions
  extends TokenCredentialOptions,
    CredentialPersistenceOptions {
  userAssertion?: string;
}

/**
 * Example usage:
 *
 * ```ts
 * const credential = new OnBehalfOfCredential();
 * const client = new SecretClient("https://key-vault-name.vault.azure.net", credential);
 *
 * // Must be called within a withContext(), so the following lines will fail:
 * // await credential.getToken() will fail.
 * // await client.getSecret("secret-name"); will fail.
 *
 * // This will work:
 * cont result = await credential.withContext("user-assertion", async () => {
 *   for await (const page of client.listPropertiesOfSecrets().byPage({ maxPageSize: 2 })) {
 *     for (const secretProperties of page) {
 *       if (secretProperties.enabled) {
 *         const secret = await client.getSecret(secretProperties.name);
 *         console.log("secret: ", secret);
 *       }
 *     }
 *   }
 *   return client.getSecret("secret-name");
 * });
 *
 * // Any calls outside of `withContext` will fail.
 * // Attempts to set multiple parallel withContexts will fail.
 * ```
 */
export class OnBehalfOfCredential implements TokenCredential {
  private options: OnBehalfOfCredentialOptions;
  private msalFlow?: MsalFlow;

  /**
   * Creates an instance of the OnBehalfOfCredential.
   *
   * @param tenantId - The Azure Active Directory tenant (directory) ID.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param clientSecret - A client secret that was generated for the App Registration.
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(
    private tenantId: string,
    private clientId: string,
    private clientSecret: string,
    options: OnBehalfOfCredentialOptions = {}
  ) {
    this.options = options;
  }

  async withContext<Callback extends () => ReturnType<Callback>>(
    userAssertion: string,
    callback: Callback
  ): Promise<ReturnType<Callback>> {
    if (this.msalFlow) {
      throw new Error("The withContext of this OnBehalfOfCredential is already in use.");
    }
    this.msalFlow = new MsalOnBehalfOf({
      ...this.options,
      logger,
      clientId: this.clientId,
      tenantId: this.tenantId,
      clientSecret: this.clientSecret,
      userAssertion,
      tokenCredentialOptions: this.options
    });
    try {
      return await callback();
    } finally {
      this.msalFlow = undefined;
    }
  }

  async getToken(scopes: string | string[], options: GetTokenOptions = {}): Promise<AccessToken> {
    return trace("OnBehalfOfCredential.getToken", options, async (newOptions) => {
      if (!this.msalFlow) {
        throw new Error("OnBehalfOfCredential calls must be executed inside of a withContext call");
      } else {
        const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
        return this.msalFlow.getToken(arrayScopes, newOptions);
      }
    });
  }
}
