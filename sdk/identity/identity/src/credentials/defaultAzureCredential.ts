// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DefaultAzureCredentialClientIdOptions,
  DefaultAzureCredentialOptions,
  DefaultAzureCredentialResourceIdOptions,
} from "./defaultAzureCredentialOptions.js";

import { ManagedIdentityCredential } from "./managedIdentityCredential/index.js";

import { AzureCliCredential } from "./azureCliCredential.js";
import { AzureDeveloperCliCredential } from "./azureDeveloperCliCredential.js";
import { AzurePowerShellCredential } from "./azurePowerShellCredential.js";
import { ChainedTokenCredential } from "./chainedTokenCredential.js";
import { EnvironmentCredential } from "./environmentCredential.js";
import type { TokenCredential } from "@azure/core-auth";
import { WorkloadIdentityCredential } from "./workloadIdentityCredential.js";
import { credentialLogger } from "../util/logging.js";
import {
  createDefaultAzureCliCredential,
  createDefaultAzureDeveloperCliCredential,
  createDefaultAzurePowershellCredential,
  createDefaultManagedIdentityCredential,
  createDefaultWorkloadIdentityCredential,
  createEnvironmentCredential,
} from "./defaultAzureCredentialFunctions.js";

const logger = credentialLogger("DefaultAzureCredential");

/**
 * A no-op credential that logs the reason it was skipped if getToken is called.
 * @internal
 */
export class UnavailableDefaultCredential implements TokenCredential {
  credentialUnavailableErrorMessage: string;
  credentialName: string;

  constructor(credentialName: string, message: string) {
    this.credentialName = credentialName;
    this.credentialUnavailableErrorMessage = message;
  }

  getToken(): Promise<null> {
    logger.getToken.info(
      `Skipping ${this.credentialName}, reason: ${this.credentialUnavailableErrorMessage}`
    );
    return Promise.resolve(null);
  }
}

/**
 * Provides a default {@link ChainedTokenCredential} configuration that works for most
 * applications that use Azure SDK client libraries. For more information, see
 * [DefaultAzureCredential overview](https://aka.ms/azsdk/js/identity/credential-chains#use-defaultazurecredential-for-flexibility).
 *
 * The following credential types will be tried, in order:
 *
 * - {@link EnvironmentCredential}
 * - {@link WorkloadIdentityCredential}
 * - {@link ManagedIdentityCredential}
 * - {@link AzureCliCredential}
 * - {@link AzurePowerShellCredential}
 * - {@link AzureDeveloperCliCredential}
 *
 * Consult the documentation of these credential types for more information
 * on how they attempt authentication.
 */
export class DefaultAzureCredential extends ChainedTokenCredential {
  /**
   * Creates an instance of the DefaultAzureCredential class with {@link DefaultAzureCredentialClientIdOptions}.
   *
   * @param options - Optional parameters. See {@link DefaultAzureCredentialClientIdOptions}.
   */
  constructor(options?: DefaultAzureCredentialClientIdOptions);

  /**
   * Creates an instance of the DefaultAzureCredential class with {@link DefaultAzureCredentialResourceIdOptions}.
   *
   * @param options - Optional parameters. See {@link DefaultAzureCredentialResourceIdOptions}.
   */
  constructor(options?: DefaultAzureCredentialResourceIdOptions);

  /**
   * Creates an instance of the DefaultAzureCredential class with {@link DefaultAzureCredentialOptions}.
   *
   * @param options - Optional parameters. See {@link DefaultAzureCredentialOptions}.
   */
  constructor(options?: DefaultAzureCredentialOptions);

  constructor(options?: DefaultAzureCredentialOptions) {
    // If AZURE_TOKEN_CREDENTIALS is not set, use the default credential chain.
    const azureTokenCredentials = process.env.AZURE_TOKEN_CREDENTIALS
      ? process.env.AZURE_TOKEN_CREDENTIALS.trim().toLowerCase()
      : undefined;
    const devCredentialFunctions = [
      createDefaultAzureCliCredential,
      createDefaultAzurePowershellCredential,
      createDefaultAzureDeveloperCliCredential,
    ];
    const prodCredentialFunctions = [
      createEnvironmentCredential,
      createDefaultWorkloadIdentityCredential,
      createDefaultManagedIdentityCredential,
    ];
    let credentialFunctions = [];
    // If AZURE_TOKEN_CREDENTIALS is set, use it to determine which credentials to use.
    // The value of AZURE_TOKEN_CREDENTIALS should be either "dev" or "prod" or any one of these credentials -"EnvironmentCredential" or "ManagedIdentityCredential or "WorkloadIdentityCredential" or "AzureCliCredential" or "AzureDeveloperCliCredential" or "AzurePowershellCredential".
    if (azureTokenCredentials) {
      switch (azureTokenCredentials) {
        case "dev":
          // If AZURE_TOKEN_CREDENTIALS is set to "dev", use the developer tool-based credential chain.
          credentialFunctions = devCredentialFunctions;
          break;
        case "prod":
          // If AZURE_TOKEN_CREDENTIALS is set to "prod", use the production credential chain.
          credentialFunctions = prodCredentialFunctions;
          break;
        case "environmentcredential":
          // If AZURE_TOKEN_CREDENTIALS is set to "environmentcredential", use the EnvironmentCredential.
          credentialFunctions = [createEnvironmentCredential];
          break;
        case "workloadidentitycredential":
          // If AZURE_TOKEN_CREDENTIALS is set to "workloadidentitycredential", use the WorkloadIdentityCredential.
          credentialFunctions = [createDefaultWorkloadIdentityCredential];
          break;
        case "managedidentitycredential":
          // If AZURE_TOKEN_CREDENTIALS is set to "managedidentitycredential", use the ManagedIdentityCredential.
          credentialFunctions = [createDefaultManagedIdentityCredential];
          break;
        case "azureclicredential":
          // If AZURE_TOKEN_CREDENTIALS is set to "azureclicredential", use the AzureCliCredential.
          credentialFunctions = [createDefaultAzureCliCredential];
          break;
        case "azurepowershellcredential":
          // If AZURE_TOKEN_CREDENTIALS is set to "azurepowershellcredential", use the AzurePowerShellCredential.
          credentialFunctions = [createDefaultAzurePowershellCredential];
          break;
        case "azuredeveloperclicredential":
          // If AZURE_TOKEN_CREDENTIALS is set to "azuredeveloperclicredential", use the AzureDeveloperCliCredential.
          credentialFunctions = [createDefaultAzureDeveloperCliCredential];
          break;
        default: {
          // If AZURE_TOKEN_CREDENTIALS is set to an unsupported value, throw an error.
          // We will throw an error here to prevent the creation of the DefaultAzureCredential.
          const errorMessage = `Invalid value for AZURE_TOKEN_CREDENTIALS = ${process.env.AZURE_TOKEN_CREDENTIALS}. Valid values are 'prod' or 'dev' or any of these credentials - "EnvironmentCredential" or "ManagedIdentityCredential or "WorkloadIdentityCredential" or "AzureCliCredential" or "AzureDeveloperCliCredential" or "AzurePowershellCredential".`;
          logger.warning(errorMessage);
          throw new Error(errorMessage);
        }
      }
    } else {
      // If AZURE_TOKEN_CREDENTIALS is not set, use the default credential chain.
      credentialFunctions = [...prodCredentialFunctions, ...devCredentialFunctions];
    }

    // Errors from individual credentials should not be thrown in the DefaultAzureCredential constructor, instead throwing on getToken() which is handled by ChainedTokenCredential.
    // When adding new credentials to the default chain, consider:
    // 1. Making the constructor parameters required and explicit
    // 2. Validating any required parameters in the factory function
    // 3. Returning a UnavailableDefaultCredential from the factory function if a credential is unavailable for any reason
    const credentials: TokenCredential[] = credentialFunctions.map((createCredentialFn) => {
      try {
        return createCredentialFn(options);
      } catch (err: any) {
        logger.warning(
          `Skipped ${createCredentialFn.name} because of an error creating the credential: ${err}`
        );
        return new UnavailableDefaultCredential(createCredentialFn.name, err.message);
      }
    });

    super(...credentials);
  }
}
