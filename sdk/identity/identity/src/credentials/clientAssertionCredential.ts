// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import {
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
} from "../util/tenantIdUtils";
import { ClientAssertionCredentialOptions } from "./clientAssertionCredentialOptions";
import { MsalClientAssertion } from "../msal/nodeFlows/msalClientAssertion";
import { MsalFlow } from "../msal/flows";
import { credentialLogger } from "../util/logging";
import { tracingClient } from "../util/tracing";

const logger = credentialLogger("ClientAssertionCredential");

/**
 * Authenticates a service principal with a JWT assertion.
 */
export class ClientAssertionCredential implements TokenCredential {
  private msalFlow: MsalFlow;
  private tenantId: string;
  private additionallyAllowedTenantIds: string[];
  private clientId: string;
  private options: ClientAssertionCredentialOptions;

  /**
   * Creates an instance of the ClientAssertionCredential with the details
   * needed to authenticate against Microsoft Entra ID with a client
   * assertion provided by the developer through the `getAssertion` function parameter.
   *
   * @param tenantId - The Microsoft Entra tenant (directory) ID.
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
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(
      options?.additionallyAllowedTenants
    );
    this.clientId = clientId;
    this.options = options;
    this.msalFlow = new MsalClientAssertion({
      ...options,
      logger,
      clientId: this.clientId,
      tenantId: this.tenantId,
      tokenCredentialOptions: this.options,
      getAssertion,
    });
  }

  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes: string | string[], options: GetTokenOptions = {}): Promise<AccessToken> {
    return tracingClient.withSpan(
      `${this.constructor.name}.getToken`,
      options,
      async (newOptions) => {
        newOptions.tenantId = processMultiTenantRequest(
          this.tenantId,
          newOptions,
          this.additionallyAllowedTenantIds,
          logger
        );

        const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
        return this.msalFlow.getToken(arrayScopes, newOptions);
      }
    );
  }
}
