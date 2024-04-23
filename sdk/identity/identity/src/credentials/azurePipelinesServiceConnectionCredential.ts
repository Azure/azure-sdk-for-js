// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { ClientAssertionCredential } from "./clientAssertionCredential";
import { CredentialUnavailableError } from "../errors";
import { credentialLogger } from "../util/logging";
import { checkTenantId } from "../util/tenantIdUtils";
import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { AzurePipelinesServiceConnectionCredentialOptions } from "./azurePipelinesServiceConnectionCredentialOptions";

const credentialName = "AzurePipelinesServiceConnectionCredential";

const logger = credentialLogger(credentialName);

export class AzurePipelinesServiceConnectionCredential implements TokenCredential {
  private client: ClientAssertionCredential | undefined;
  private serviceConnectionId: string | undefined;

  /**
   * AzurePipelinesServiceConnectionCredential supports Microsoft Entra Workload ID on Kubernetes.
   *
   * @param options - The identity client options to use for authentication.
   */
  constructor(
    clientId: string,
    tenantId: string,
    serviceConnectionId: string,
    options?: AzurePipelinesServiceConnectionCredentialOptions
  ) {
    checkTenantId(logger, tenantId);
    logger.info(
      `Invoking AzurePipelinesServiceConnectionCredential with tenant ID: ${tenantId}, clientId: ${clientId} and service connection id: ${serviceConnectionId}`
    );

    if (clientId && tenantId && serviceConnectionId) {
      //Ensure all system env vars are there to form the request uri for OIDC token
      this.ensurePipelinesSystemVars();
      const oidcRequestUrl = `${process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI}${process.env.SYSTEM_TEAMPROJECTID}/_apis/distributedtask/hubs/build/plans/${process.env.SYSTEM_PLANID}/jobs/${process.env.SYSTEM_JOBID}/oidctoken?api-version=7.1-preview.1&serviceConnectionId=${this.serviceConnectionId}`;
      const systemAccessToken = `${process.env.SYSTEM_ACCESSTOKEN}`;
      logger.info(
        `Invoking ClientAssertionCredential with tenant ID: ${tenantId}, clientId: ${clientId} and service connection id: ${serviceConnectionId}`
      );
      this.client = new ClientAssertionCredential(
        tenantId,
        clientId,
        this.requestOidcToken.bind(this, oidcRequestUrl, systemAccessToken),
        options
      );
    }
  }

  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    if (!this.client) {
      const errorMessage = `${credentialName}: is unavailable. tenantId, clientId, and either tokenFilePath or serviceConnectionId are required parameters. 
      To enable Workload Identity Federation please provide following environment variables based on the environment.
      For Azure Pipelines env, in WorkloadIdentityCredential, these are required as inputs / env variables - 
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
    return this.client.getToken(scopes, options);
  }

  private async requestOidcToken(
    oidcRequestUrl: string,
    systemAccessToken: string
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
      throw new CredentialUnavailableError(
        `${credentialName}: is unavailable. Received null token from OIDC request. Response status = ${response.status}`
      );
    }
    const result = JSON.parse(text);
    if (result?.oidcToken) {
      return result.oidcToken;
    } else {
      throw new CredentialUnavailableError(
        `${credentialName}: is unavailable. oidcToken field not detected in the response. Response = ${JSON.stringify(
          result
        )}`
      );
    }
  }

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
    if (!process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI)
      missingEnvVars.push("SYSTEM_TEAMFOUNDATIONCOLLECTIONURI");
    if (!process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI)
      missingEnvVars.push("SYSTEM_TEAMFOUNDATIONCOLLECTIONURI");
    if (!process.env.SYSTEM_TEAMPROJECTID) missingEnvVars.push("SYSTEM_TEAMPROJECTID");
    if (!process.env.SYSTEM_PLANID) missingEnvVars.push("SYSTEM_PLANID");
    if (!process.env.SYSTEM_JOBID) missingEnvVars.push("SYSTEM_JOBID");
    if (!process.env.SYSTEM_ACCESSTOKEN) missingEnvVars.push("SYSTEM_ACCESSTOKEN");
    if (missingEnvVars.length > 0)
      throw new CredentialUnavailableError(
        `${credentialName}: is unavailable. Missing system variable(s) - ${missingEnvVars.join(
          ", "
        )}`
      );
  }
}

// should we skip this check? https://microsoft.visualstudio.com/Edge/_git/edgeinternal.es?path=/UtilityLibraries/Microsoft.Edge.ES.Azure.Identity/AzureDevOpsFederatedTokenCredential.cs&version=GBmaster&line=124&lineEnd=125&lineStartColumn=1&lineEndColumn=1&lineStyle=plain&_a=contents
// to not to tightly couple to Devops implementation in case they make changes in host support

// check if system variables can be overridden
