// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { ClientAssertionCredential } from "./clientAssertionCredential";
import { AuthenticationError, CredentialUnavailableError } from "../errors";
import { credentialLogger } from "../util/logging";
import { checkTenantId } from "../util/tenantIdUtils";
import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { AzurePipelinesServiceConnectionCredentialOptions } from "./azurePipelinesServiceConnectionCredentialOptions";

const credentialName = "AzurePipelinesServiceConnectionCredential";
const OIDC_API_VERSION = "7.1";
const logger = credentialLogger(credentialName);

/**
 * This credential is designed to be used in ADO Pipelines with service connections
 * as a setup for workload identity federation.
 */
export class AzurePipelinesServiceConnectionCredential implements TokenCredential {
  private clientAssertionCredential: ClientAssertionCredential | undefined;
  private serviceConnectionId: string | undefined;

  /**
   * AzurePipelinesServiceConnectionCredential supports Federated Identity on Azure Pipelines through Service Connections.
   * @param tenantId - tenantId associated with the service connection
   * @param clientId - clientId associated with the service connection
   * @param serviceConnectionId - id for the service connection
   * @param options - The identity client options to use for authentication.
   */
  constructor(
    tenantId: string,
    clientId: string,
    serviceConnectionId: string,
    options?: AzurePipelinesServiceConnectionCredentialOptions,
  ) {
    if (!clientId || !tenantId || !serviceConnectionId) {
      throw new CredentialUnavailableError(
        `${credentialName}: is unavailable. tenantId, clientId, and serviceConnectionId are required parameters.`,
      );
    }

    checkTenantId(logger, tenantId);
    logger.info(
      `Invoking AzurePipelinesServiceConnectionCredential with tenant ID: ${tenantId}, clientId: ${clientId} and service connection id: ${serviceConnectionId}`,
    );

    if (clientId && tenantId && serviceConnectionId) {
      this.ensurePipelinesSystemVars();
      const oidcRequestUrl = `${process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI}${process.env.SYSTEM_TEAMPROJECTID}/_apis/distributedtask/hubs/build/plans/${process.env.SYSTEM_PLANID}/jobs/${process.env.SYSTEM_JOBID}/oidctoken?api-version=${OIDC_API_VERSION}&serviceConnectionId=${this.serviceConnectionId}`;
      const systemAccessToken = `${process.env.SYSTEM_ACCESSTOKEN}`;
      logger.info(
        `Invoking ClientAssertionCredential with tenant ID: ${tenantId}, clientId: ${clientId} and service connection id: ${serviceConnectionId}`,
      );
      this.clientAssertionCredential = new ClientAssertionCredential(
        tenantId,
        clientId,
        this.requestOidcToken.bind(this, oidcRequestUrl, systemAccessToken),
        options,
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
    options?: GetTokenOptions,
  ): Promise<AccessToken> {
    if (!this.clientAssertionCredential) {
      const errorMessage = `${credentialName}: is unavailable. tenantId, clientId, and serviceConnectionId are required parameters. 
      To use Federation Identity in Azure Pipelines, these are required as inputs / env variables - 
      tenantId,
      clientId,
      serviceConnectionId,
      "SYSTEM_TEAMFOUNDATIONCOLLECTIONURI" &&
      "SYSTEM_TEAMPROJECTID" &&
      "SYSTEM_PLANID" &&
      "SYSTEM_JOBID" &&
      "SYSTEM_ACCESSTOKEN"
      See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/troubleshoot`;
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
    systemAccessToken: string,
  ): Promise<string> {
    logger.info("Requesting OIDC token from Azure Pipelines...");
    logger.info(oidcRequestUrl);

    const httpClient = createDefaultHttpClient();

    const request = createPipelineRequest({
      url: oidcRequestUrl,
      method: "POST",
      headers: createHttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${systemAccessToken}`,
      }),
    });

    const response = await httpClient.sendRequest(request);
    const text = response.bodyAsText;
    if (!text) {
      throw new AuthenticationError(
        response.status,
        `${credentialName}: Authenticated Failed. Received null token from OIDC request.`,
      );
    }
    const result = JSON.parse(text);
    if (result?.oidcToken) {
      return result.oidcToken;
    } else {
      throw new AuthenticationError(
        response.status,
        `${credentialName}: Authentication Failed. oidcToken field not detected in the response. Response = ${JSON.stringify(
          result,
        )}`,
      );
    }
  }

  /**
   * Ensures all system env vars are there to form the request uri for OIDC token
   * @returns void
   * @throws CredentialUnavailableError
   */
  private ensurePipelinesSystemVars(): void {
    if (
      process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI &&
      process.env.SYSTEM_TEAMPROJECTID &&
      process.env.SYSTEM_PLANID &&
      process.env.SYSTEM_JOBID &&
      process.env.SYSTEM_ACCESSTOKEN
    ) {
      return;
    }
    const missingEnvVars = [];
    let errorMessage = "";
    if (!process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI) {
      missingEnvVars.push("SYSTEM_TEAMFOUNDATIONCOLLECTIONURI");
    }
    if (!process.env.SYSTEM_TEAMPROJECTID) missingEnvVars.push("SYSTEM_TEAMPROJECTID");
    if (!process.env.SYSTEM_PLANID) missingEnvVars.push("SYSTEM_PLANID");
    if (!process.env.SYSTEM_JOBID) missingEnvVars.push("SYSTEM_JOBID");
    if (!process.env.SYSTEM_ACCESSTOKEN) {
      errorMessage +=
        "\nPlease ensure that the system access token is available in the SYSTEM_ACCESSTOKEN value; this is often most easily achieved by adding a block to the end of your pipeline yaml for the task with:\n env: \n- SYSTEM_ACCESSTOKEN: $(System.AccessToken)";
      missingEnvVars.push("SYSTEM_ACCESSTOKEN");
    }
    if (missingEnvVars.length > 0) {
      throw new CredentialUnavailableError(
        `${credentialName}: is unavailable. Ensure that you're running this task in an Azure Pipeline, so that following missing system variable(s) can be defined- ${missingEnvVars.join(
          ", ",
        )}.${errorMessage}`,
      );
    }
  }
}
