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
   * The service connection ID for Azure Pipelines Workload Identity.
   */
  workloadIdentityFn?: never; //workloadIdentityCallback
}

/**
 * Options for the {@link WorkloadIdentityCredential} for Service Connections in Azure Pipelines
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
   * The callback for the assertion for all Workload Identity scenarios.
   */
  workloadIdentityFn?: () => Promise<string>; //workloadIdentityCallback
  /**
   * Mutually exclusive field
   * The path to a file containing a Kubernetes service account token that authenticates the identity.
   */
  tokenFilePath?: never;
}
