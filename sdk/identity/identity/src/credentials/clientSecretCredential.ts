// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { MsalClient } from "../msal/nodeFlows/msalClient";
import { createMsalClient } from "../msal/nodeFlows/msalClient";
import {
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
} from "../util/tenantIdUtils";

import type { ClientSecretCredentialOptions } from "./clientSecretCredentialOptions";
import { CredentialUnavailableError } from "../errors";
import { credentialLogger } from "../util/logging";
import { ensureScopes } from "../util/scopeUtils";
import { tracingClient } from "../util/tracing";

const logger = credentialLogger("ClientSecretCredential");

/**
 * Enables authentication to Microsoft Entra ID using a client secret
 * that was generated for an App Registration. More information on how
 * to configure a client secret can be found here:
 *
 * https://learn.microsoft.com/entra/identity-platform/quickstart-configure-app-access-web-apis#add-credentials-to-your-web-application
 *
 */
export class ClientSecretCredential implements TokenCredential {
  private tenantId: string;
  private additionallyAllowedTenantIds: string[];
  private msalClient: MsalClient;
  private clientSecret: string;

  /**
   * Creates an instance of the ClientSecretCredential with the details
   * needed to authenticate against Microsoft Entra ID with a client
   * secret.
   *
   * @param tenantId - The Microsoft Entra tenant (directory) ID.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param clientSecret - A client secret that was generated for the App Registration.
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string,
    clientId: string,
    clientSecret: string,
    options: ClientSecretCredentialOptions = {},
  ) {
    if (!tenantId) {
      throw new CredentialUnavailableError(
        "ClientSecretCredential: tenantId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.",
      );
    }

    if (!clientId) {
      throw new CredentialUnavailableError(
        "ClientSecretCredential: clientId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.",
      );
    }

    if (!clientSecret) {
      throw new CredentialUnavailableError(
        "ClientSecretCredential: clientSecret is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.",
      );
    }

    this.clientSecret = clientSecret;
    this.tenantId = tenantId;
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(
      options?.additionallyAllowedTenants,
    );

    this.msalClient = createMsalClient(clientId, tenantId, {
      ...options,
      logger,
      tokenCredentialOptions: options,
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
          logger,
        );

        const arrayScopes = ensureScopes(scopes);
        return this.msalClient.getTokenByClientSecret(arrayScopes, this.clientSecret, newOptions);
      },
    );
  }
}
