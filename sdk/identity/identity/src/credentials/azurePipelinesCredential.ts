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
  
   * @param systemAccessToken - system access token from the AzurePipelines
   * @param options - The identity client options to use for authentication.
   */
  constructor(systemAccessToken: string, options?: AzurePipelinesCredentialOptions) {
    const tenantId = options?.tenantId || process.env.AZURESUBSCRIPTION_TENANT_ID;
    const clientId = options?.clientId || process.env.AZURESUBSCRIPTION_CLIENT_ID;
    const serviceConnectionId =
      options?.serviceConnectionId || process.env.AZURESUBSCRIPTION_SERVICE_CONNECTION_ID;
    logger.info(`system access token = ${systemAccessToken}`);
    if (!clientId || !tenantId || !serviceConnectionId) {
      throw new CredentialUnavailableError(
        `${credentialName}: is unavailable. tenantId, clientId, and serviceConnectionId are required either as options parameters OR environment variables, namely - AZURESUBSCRIPTION_TENANT_ID, AZURESUBSCRIPTION_CLIENT_ID and AZURESUBSCRIPTION_SERVICE_CONNECTION_ID`
      );
    }
    this.identityClient = new IdentityClient(options);
    checkTenantId(logger, tenantId);
    logger.info(
      `Invoking AzurePipelinesCredential with tenant ID: ${tenantId}, clientId: ${clientId} and service connection id: ${serviceConnectionId}`
    );

    if (clientId && tenantId && serviceConnectionId) {
      this.ensurePipelinesSystemVars();
      const oidcRequestUrl2 = `${process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI}${process.env.SYSTEM_TEAMPROJECTID}/_apis/distributedtask/hubs/build/plans/${process.env.SYSTEM_PLANID}/jobs/${process.env.SYSTEM_JOBID}/oidctoken?api-version=${OIDC_API_VERSION}&serviceConnectionId=${serviceConnectionId}`;
      logger.info(`old oidc token url: ${oidcRequestUrl2}`);
      const oidcRequestUrl = `${process.env.SYSTEM_OIDCREQUESTURI}?api-version=${OIDC_API_VERSION}&serviceConnectionId=${serviceConnectionId}`;
      logger.info(`new oidc token url: ${oidcRequestUrl}`);
      logger.info(
        `Invoking ClientAssertionCredential with tenant ID: ${tenantId}, clientId: ${clientId} and service connection id: ${serviceConnectionId}`
      );
      this.clientAssertionCredential = new ClientAssertionCredential(
        tenantId,
        clientId,
        this.requestOidcToken.bind(this, oidcRequestUrl),
        options
      );
    }
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
      const errorMessage = `${credentialName}: is unavailable. To use Federation Identity in Azure Pipelines, the "systemAccessToken" is required as input parameter and should be set as part of the devops task as the environment variable.Additionally, following should be provided either as optional parameters OR env variables - 
      tenantId OR "AZURESUBSCRIPTION_TENANT_ID",
      clientId OR "AZURESUBSCRIPTION_CLIENT_ID",
      serviceConnectionId OR "AZURESUBSCRIPTION_SERVICE_CONNECTION_ID",
      "SYSTEM_OIDCREQUESTURI",
      "SYSTEM_ACCESSTOKEN"
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
  private async requestOidcToken(oidcRequestUrl: string): Promise<string> {
    logger.info("Requesting OIDC token from Azure Pipelines...");
    logger.info(oidcRequestUrl);
    const request = createPipelineRequest({
      url: oidcRequestUrl,
      method: "POST",
      headers: createHttpHeaders({
        "Content-Type": "application/json",
        "Content-Length": 0,
        Authorization: `Bearer ${process.env.SYSTEM_ACCESSTOKEN}`,
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
      if (response.status === 302) {
        const redirectUrl = response.headers.get("location");
        if (redirectUrl) {
          logger.info("Redirecting OIDC authentication to redirect uri .. ");
          logger.info(redirectUrl);
          return await this.requestOidcToken(redirectUrl);
        }
      }
      const result = JSON.parse(text);
      if (result?.oidcToken) {
        return result.oidcToken;
      } else {
        if (response.status !== 200) {
          logger.error(
            `${credentialName}: Authentication Failed. oidcToken field not detected in the response. Response = ${JSON.stringify(
              result
            )}`
          );
          throw new AuthenticationError(
            response.status,
            `${credentialName}: Authentication Failed. oidcToken field not detected in the response. Response = ${JSON.stringify(
              result
            )}`
          );
        } else {
          logger.error(
            `${credentialName}: Authentication Failed. oidcToken field not detected in the response but response status is 200.`
          );
          throw new AuthenticationError(
            response.status,
            `${credentialName}: Authentication Failed. oidcToken field not detected in the response but response status is 200.`
          );
        }
      }
    } catch (e) {
      if (response.status === 302) {
        const redirectUrl = response.headers.get("location");
        logger.info(`header -> ${redirectUrl}`);
        if (redirectUrl) {
          logger.info("Redirecting OIDC authentication to redirect uri .. ");
          logger.info(redirectUrl);
          const token = await this.requestOidcToken(redirectUrl);
          return token;
        }
      }
      throw new AuthenticationError(
        response.status,
        `${credentialName}: Authentication Failed. oidcToken field not detected in the response. Response = ${text}`
      );
    }
  }

  /**
   * Ensures all system env vars are there to form the request uri for OIDC token
   * @returns void
   * @throws CredentialUnavailableError
   */
  private ensurePipelinesSystemVars(): void {
    if (process.env.SYSTEM_OIDCREQUESTURI && process.env.SYSTEM_ACCESSTOKEN) {
      return;
    }
    const missingEnvVars = [];
    let errorMessage = "";
    if (!process.env.SYSTEM_OIDCREQUESTURI) {
      missingEnvVars.push("SYSTEM_OIDCREQUESTURI");
    }
    if (!process.env.SYSTEM_ACCESSTOKEN) {
      errorMessage +=
        "\nPlease ensure that the system access token is available in the SYSTEM_ACCESSTOKEN value; this is often most easily achieved by adding a block to the end of your pipeline yaml for the task with:\n env: \n- SYSTEM_ACCESSTOKEN: $(System.AccessToken)";
      missingEnvVars.push("SYSTEM_ACCESSTOKEN");
    }
    if (missingEnvVars.length > 0) {
      throw new CredentialUnavailableError(
        `${credentialName}: is unavailable. Ensure that you're running this task in an Azure Pipeline, so that following missing system variable(s) can be defined- ${missingEnvVars.join(
          ", "
        )}.${errorMessage}`
      );
    }
  }
}
