// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";

import { credentialLogger } from "../util/logging";
import { trace } from "../util/tracing";
import { MsalFlow } from "../msal/flows";
import { TokenCredentialOptions } from "../tokenCredentialOptions";
import { MsalClientAssertion } from "../msal/nodeFlows/msalClientAssertion";

const logger = credentialLogger("ClientAssertionCredential");

/**
 * Optional parameters for the {@link ClientAssertionCredential} class.
 */
export interface ClientAssertionCredentialOptions extends TokenCredentialOptions {}

/**
 * Authenticates a service principal with a JWT assertion.
 */
export class ClientAssertionCredential implements TokenCredential {
  private msalFlow?: MsalFlow;
  private tenantId: string;
  private clientId: string;
  private getAssertion: () => Promise<string>;
  private options: ClientAssertionCredentialOptions;

  /**
   * Creates an instance of the ClientAssertionCredential with the details
   * needed to authenticate against Azure Active Directory with a client
   * assertion provided by the developer through the `getAssertion` function parameter.
   *
   * @param tenantId - The Azure Active Directory tenant (directory) ID.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param getAssertion - A function that retrieves the assertion for the credential to use.
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string,
    clientId: string,
    getAssertion: () => Promise<string>,
    options: ClientAssertionCredentialOptions = {}
  ) {
    if (!tenantId || !clientId || !getAssertion) {
      throw new Error(
        "ClientAssertionCredential: tenantId, clientId, and clientAssertion are required parameters."
      );
    }
    this.tenantId = tenantId;
    this.clientId = clientId;
    this.getAssertion = getAssertion;
    this.options = options;
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes: string | string[], options: GetTokenOptions = {}): Promise<AccessToken> {
    this.msalFlow = new MsalClientAssertion({
      ...options,
      logger,
      clientId: this.clientId,
      tenantId: this.tenantId,
      clientAssertion: await this.getAssertion(),
      tokenCredentialOptions: this.options,
    });
    return trace(`${this.constructor.name}.getToken`, options, async (newOptions) => {
      const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
      return this.msalFlow!.getToken(arrayScopes, newOptions);
    });
  }
}
