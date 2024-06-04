// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { ClientAssertionCredential } from "./clientAssertionCredential";
import { AuthenticationError, CredentialUnavailableError } from "../errors";
import { credentialLogger } from "../util/logging";
import { checkTenantId } from "../util/tenantIdUtils";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { AzurePipelinesCredentialOptions } from "./azurePipelinesCredentialOptions";
import { IdentityClient } from "../client/identityClient";

const credentialName = "AzurePipelinesCredential";
const logger = credentialLogger(credentialName);
const OIDC_API_VERSION = "7.1";

/**
 * This credential is designed to be used in Azure Pipelines with service connections
 * as a setup for workload identity federation.
 */
export class AzurePipelinesCredential implements TokenCredential {
  private clientAssertionCredential: ClientAssertionCredential | undefined;
  private identityClient: IdentityClient;

  /**
   * AzurePipelinesCredential supports Federated Identity on Azure Pipelines through Service Connections.
   * @param tenantId - tenantId associated with the service connection
   * @param clientId - clientId associated with the service connection
   * @param serviceConnectionId - id for the service connection, as found in the querystring's resourceId key
   * @param systemAccessToken - The Azure pipeline's <see href="https://learn.microsoft.com/azure/devops/pipelines/build/variables?view=azure-devops%26tabs=yaml#systemaccesstoken">System.AccessToken</see> value.
   * @param options - The identity client options to use for authentication.
   */
  constructor(
    tenantId: string,
    clientId: string,
    serviceConnectionId: string,
    systemAccessToken: string,
    options?: AzurePipelinesCredentialOptions
  ) {
    if (!clientId || !tenantId || !serviceConnectionId || !systemAccessToken) {
      throw new CredentialUnavailableError(
        `${credentialName}: is unavailable. tenantId, clientId, serviceConnectionId and systemAccessToken are required parameters.`
      );
    }
    this.identityClient = new IdentityClient(options);
    checkTenantId(logger, tenantId);
    logger.info(
      `Invoking AzurePipelinesCredential with tenant ID: ${tenantId}, clientId: ${clientId} and service connection id: ${serviceConnectionId}`
    );
    if (!process.env.SYSTEM_OIDCREQUESTURI) {
      throw new CredentialUnavailableError(
        `${credentialName}: is unavailable. Ensure that you're running this task in an Azure Pipeline, so that following missing system variable(s) can be defined- "SYSTEM_OIDCREQUESTURI"`
      );
    }

    const oidcRequestUrl = `${process.env.SYSTEM_OIDCREQUESTURI}?api-version=${OIDC_API_VERSION}&serviceConnectionId=${serviceConnectionId}`;
    logger.info(
      `Invoking ClientAssertionCredential with tenant ID: ${tenantId}, clientId: ${clientId} and service connection id: ${serviceConnectionId}`
    );
    this.clientAssertionCredential = new ClientAssertionCredential(
      tenantId,
      clientId,
      this.requestOidcToken.bind(this, oidcRequestUrl, systemAccessToken),
      options
    );
  }

  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} or {@link AuthenticationError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken> {
    if (!this.clientAssertionCredential) {
      const errorMessage = `${credentialName}: is unavailable. To use Federation Identity in Azure Pipelines, the following parameters are required - 
      tenantId,
      clientId,
      serviceConnectionId,
      systemAccessToken,
      "SYSTEM_OIDCREQUESTURI".      
      See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/azurepipelinescredential/troubleshoot`;
      logger.error(errorMessage);
      throw new CredentialUnavailableError(errorMessage);
    }
    logger.info("Invoking getToken() of Client Assertion Credential");
    return this.clientAssertionCredential.getToken(scopes, options);
  }

  /**
   *
   * @param oidcRequestUrl - oidc request url
   * @param systemAccessToken - system access token
   * @returns OIDC token from Azure Pipelines
   */
  private async requestOidcToken(
    oidcRequestUrl: string,
    systemAccessToken: string
  ): Promise<string> {
    logger.info("Requesting OIDC token from Azure Pipelines...");
    logger.info(oidcRequestUrl);
    const request = createPipelineRequest({
      url: oidcRequestUrl,
      method: "POST",
      headers: createHttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${systemAccessToken}`,
      }),
    });
    const response = await this.identityClient.sendRequest(request);
    const text = response.bodyAsText;
    if (!text) {
      logger.error(
        `${credentialName}: Authenticated Failed. Received null token from OIDC request. Response status- ${
          response.status
        }. Complete response - ${JSON.stringify(response)}`
      );
      throw new AuthenticationError(
        response.status,
        `${credentialName}: Authenticated Failed. Received null token from OIDC request. Response status- ${
          response.status
        }. Complete response - ${JSON.stringify(response)}`
      );
    }
    try {
      const result = JSON.parse(text);
      if (result?.oidcToken) {
        return result.oidcToken;
      } else {
        let errorMessage = `${credentialName}: Authentication Failed. oidcToken field not detected in the response.`;
        if (response.status !== 200) {
          errorMessage += `Response = ${JSON.stringify(result)}`
        }
        logger.error(errorMessage)
        throw new AuthenticationError(response.status, errorMessage);       
        } 
    } catch (e) {
      logger.error((e as Error).message);
      logger.error( `${credentialName}: Authentication Failed. oidcToken field not detected in the response. Response = ${text}`)
      throw new AuthenticationError(
        response.status,
        `${credentialName}: Authentication Failed. oidcToken field not detected in the response. Response = ${text}`
      );
    }
  }
}
