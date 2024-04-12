// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthorityValidationOptions } from "./authorityValidationOptions";
import { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";
import { WorkloadIdentityCredential } from "./workloadIdentityCredential";

/**
 * Options for the {@link WorkloadIdentityCredential}
 */
export type WorkloadIdentityCredentialOptions =
  | WorkloadIdentityCredentialKubernetesOptions
  | WorkloadIdentityCredentialServiceConnectionOptions;

/**
 * Options for the {@link WorkloadIdentityCredential} for Kubernetes environment
 */
export interface WorkloadIdentityCredentialKubernetesOptions
  extends MultiTenantTokenCredentialOptions,
    AuthorityValidationOptions {
  /**
   * ID of the application's Microsoft Entra tenant. Also called its directory ID.
   */
  tenantId?: string;
  /**
   * The client ID of a Microsoft Entra app registration.
   */
  clientId?: string;
  /**
   * The path to a file containing a Kubernetes service account token that authenticates the identity.
   */
  tokenFilePath?: string;
  /**
   * Mutually exclusive field.
   * The service connection id for Azure Devops WI.
   */
  serviceConnectionId?: never;
}

/**
 * Options for the {@link WorkloadIdentityCredential} for Service Connections in Azure Devops
 */
export interface WorkloadIdentityCredentialServiceConnectionOptions
  extends MultiTenantTokenCredentialOptions,
    AuthorityValidationOptions {
  /**
   * ID of the application's Microsoft Entra tenant. Also called its directory ID.
   */
  tenantId?: string;
  /**
   * The client ID of a Microsoft Entra app registration.
   */
  clientId?: string;

  /**
   * The service connection id for Azure Devops WI.
   */
  serviceConnectionId?: string;
  /** 
   * Mutually exclusive field
   * The path to a file containing a Kubernetes service account token that authenticates the identity.
   */
  tokenFilePath?: never;
}
