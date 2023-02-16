// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { MSI, MSIConfiguration } from "./models";
import { WorkloadIdentityCredential } from "../workloadIdentityCredential";
import { credentialLogger } from "../../util/logging";

const msiName = "ManagedIdentityCredential - Token Exchange";
const logger = credentialLogger(msiName);

/**
 * Defines how to determine whether the token exchange MSI is available, and also how to retrieve a token from the token exchange MSI.
 */
export function tokenExchangeMsi(): MSI {
  return {
    async isAvailable({ clientId }): Promise<boolean> {
      const env = process.env;
      const result = Boolean(
        (clientId || env.AZURE_CLIENT_ID) &&
          env.AZURE_TENANT_ID &&
          process.env.AZURE_FEDERATED_TOKEN_FILE
      );
      if (!result) {
        logger.info(
          `${msiName}: Unavailable. The environment variables needed are: AZURE_CLIENT_ID (or the client ID sent through the parameters), AZURE_TENANT_ID and AZURE_FEDERATED_TOKEN_FILE`
        );
      }
      return result;
    },
    async getToken(
      configuration: MSIConfiguration,
      getTokenOptions: GetTokenOptions = {}
    ): Promise<AccessToken | null> {
      const { scopes, clientId } = configuration;

      const workloadIdentityCredential = new WorkloadIdentityCredential({
        clientId,
        tenantId: process.env.AZURE_TENANT_ID,
        federatedTokenFilePath: process.env.AZURE_FEDERATED_TOKEN_FILE,
      });

      return workloadIdentityCredential.getToken(scopes, getTokenOptions);
    },
  };
}
