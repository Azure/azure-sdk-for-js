// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";

import type { LegacyMsiProvider } from "./legacyMsiProvider";
import type { TokenCredentialOptions } from "../../tokenCredentialOptions";
import { MsalMsiProvider } from "./msalMsiProvider";

/**
 * Options to send on the {@link ManagedIdentityCredential} constructor.
 * This variation supports `clientId` and not `resourceId`, since only one of both is supported.
 */
export interface ManagedIdentityCredentialClientIdOptions extends TokenCredentialOptions {
  /**
   * The client ID of the user - assigned identity, or app registration(when working with AKS pod - identity).
   */
  clientId?: string;
}

/**
 * Options to send on the {@link ManagedIdentityCredential} constructor.
 * This variation supports `resourceId` and not `clientId`, since only one of both is supported.
 */
export interface ManagedIdentityCredentialResourceIdOptions extends TokenCredentialOptions {
  /**
   * Allows specifying a custom resource Id.
   * In scenarios such as when user assigned identities are created using an ARM template,
   * where the resource Id of the identity is known but the client Id can't be known ahead of time,
   * this parameter allows programs to use these user assigned identities
   * without having to first determine the client Id of the created identity.
   */
  resourceId: string;
}

/**
 * Options to send on the {@link ManagedIdentityCredential} constructor.
 * This variation supports `objectId` as a constructor argument.
 */
export interface ManagedIdentityCredentialObjectIdOptions extends TokenCredentialOptions {
  /**
   * Allows specifying the object ID of the underlying service principal used to authenticate a user-assigned managed identity.
   * This is an alternative to providing a client ID or resource ID and is not required for system-assigned managed identities.
   */
  objectId: string;
}

/**
 * Attempts authentication using a managed identity available at the deployment environment.
 * This authentication type works in Azure VMs, App Service instances, Azure Functions applications,
 * Azure Kubernetes Services, Azure Service Fabric instances and inside of the Azure Cloud Shell.
 *
 * More information about configuring managed identities can be found here:
 * https://learn.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview
 */
export class ManagedIdentityCredential implements TokenCredential {
  private implProvider: LegacyMsiProvider | MsalMsiProvider;

  /**
   * Creates an instance of ManagedIdentityCredential with the client ID of a
   * user-assigned identity, or app registration (when working with AKS pod-identity).
   *
   * @param clientId - The client ID of the user-assigned identity, or app registration (when working with AKS pod-identity).
   * @param options - Options for configuring the client which makes the access token request.
   */
  constructor(clientId: string, options?: TokenCredentialOptions);
  /**
   * Creates an instance of ManagedIdentityCredential with a client ID
   *
   * @param options - Options for configuring the client which makes the access token request.
   */
  constructor(options?: ManagedIdentityCredentialClientIdOptions);
  /**
   * Creates an instance of ManagedIdentityCredential with a resource ID
   *
   * @param options - Options for configuring the resource which makes the access token request.
   */
  constructor(options?: ManagedIdentityCredentialResourceIdOptions);
  /**
   * Creates an instance of ManagedIdentityCredential with an object ID
   *
   * @param options - Options for configuring the resource which makes the access token request.
   */
  constructor(options?: ManagedIdentityCredentialObjectIdOptions);
  /**
   * @internal
   * @hidden
   */
  constructor(
    clientIdOrOptions?:
      | string
      | ManagedIdentityCredentialClientIdOptions
      | ManagedIdentityCredentialResourceIdOptions
      | ManagedIdentityCredentialObjectIdOptions,
    options?: TokenCredentialOptions,
  ) {
    // https://github.com/Azure/azure-sdk-for-js/issues/30189
    // If needed, you may release a hotfix to quickly rollback to the legacy implementation by changing the following line to:
    // this.implProvider = new LegacyMsiProvider(clientIdOrOptions, options);
    // Once stabilized, you can remove the legacy implementation and inline the msalMsiProvider code here as a drop-in replacement.
    this.implProvider = new MsalMsiProvider(clientIdOrOptions, options);
  }

  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   * If an unexpected error occurs, an {@link AuthenticationError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions,
  ): Promise<AccessToken> {
    return this.implProvider.getToken(scopes, options);
  }
}
