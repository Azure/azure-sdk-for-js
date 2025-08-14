// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DefaultAzureCredentialClientIdOptions,
  DefaultAzureCredentialOptions,
  DefaultAzureCredentialResourceIdOptions,
} from "./defaultAzureCredentialOptions.js";

import { ManagedIdentityCredential } from "./managedIdentityCredential/index.js";
import { VisualStudioCodeCredential } from "./visualStudioCodeCredential.js";
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
  createDefaultBrokerCredential,
  createDefaultManagedIdentityCredential,
  createDefaultVisualStudioCodeCredential,
  createDefaultWorkloadIdentityCredential,
  createDefaultEnvironmentCredential,
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
      `Skipping ${this.credentialName}, reason: ${this.credentialUnavailableErrorMessage}`,
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
 * - {@link VisualStudioCodeCredential}
 * - {@link AzureCliCredential}
 * - {@link AzurePowerShellCredential}
 * - {@link AzureDeveloperCliCredential}
 * - {@link BrokerCredential}
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
      createDefaultVisualStudioCodeCredential,
      createDefaultAzureCliCredential,
      createDefaultAzurePowershellCredential,
      createDefaultAzureDeveloperCliCredential,
      createDefaultBrokerCredential,
    ];
    const prodCredentialFunctions = [
      createDefaultEnvironmentCredential,
      createDefaultWorkloadIdentityCredential,
      createDefaultManagedIdentityCredential,
    ];
    let credentialFunctions = [];
    const validCredentialNames =
      "EnvironmentCredential, WorkloadIdentityCredential, ManagedIdentityCredential, VisualStudioCodeCredential, AzureCliCredential, AzurePowerShellCredential, AzureDeveloperCliCredential";
    // If AZURE_TOKEN_CREDENTIALS is set, use it to determine which credentials to use.
    // The value of AZURE_TOKEN_CREDENTIALS should be either "dev" or "prod" or any one of these credentials - {validCredentialNames}.
    if (azureTokenCredentials) {
      switch (azureTokenCredentials) {
        case "dev":
          credentialFunctions = devCredentialFunctions;
          break;
        case "prod":
          credentialFunctions = prodCredentialFunctions;
          break;
        case "environmentcredential":
          credentialFunctions = [createDefaultEnvironmentCredential];
          break;
        case "workloadidentitycredential":
          credentialFunctions = [createDefaultWorkloadIdentityCredential];
          break;
        case "managedidentitycredential":
          credentialFunctions = [createDefaultManagedIdentityCredential];
          break;
        case "visualstudiocodecredential":
          credentialFunctions = [createDefaultVisualStudioCodeCredential];
          break;
        case "azureclicredential":
          credentialFunctions = [createDefaultAzureCliCredential];
          break;
        case "azurepowershellcredential":
          credentialFunctions = [createDefaultAzurePowershellCredential];
          break;
        case "azuredeveloperclicredential":
          credentialFunctions = [createDefaultAzureDeveloperCliCredential];
          break;
        default: {
          // If AZURE_TOKEN_CREDENTIALS is set to an unsupported value, throw an error.
          // This will prevent the creation of the DefaultAzureCredential.
          const errorMessage = `Invalid value for AZURE_TOKEN_CREDENTIALS = ${process.env.AZURE_TOKEN_CREDENTIALS}. Valid values are 'prod' or 'dev' or any of these credentials - ${validCredentialNames}.`;
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
          `Skipped ${createCredentialFn.name} because of an error creating the credential: ${err}`,
        );
        return new UnavailableDefaultCredential(createCredentialFn.name, err.message);
      }
    });

    super(...credentials);
  }
}
