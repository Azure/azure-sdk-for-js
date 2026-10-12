// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UnifiedModerateOptionalParams extends OperationOptions {
  /** Full Azure resource ID of the governed Foundry project used for binding resolution. This selects the mandatory project policy for the Foundry-project profile. It is not the policy or binding resource ID. The target must be under the authenticated serving account and requires a verified producer. Required when policyId is absent and forbidden when policyId is present. */
  targetResourceId?: string;
  /** Authorized named policy selector for the named-policy gateway profile. It may be a supported policy name or full policy resource ID according to the serving account's existing selector grammar. Required when targetResourceId is absent and forbidden when targetResourceId or developerPolicyId is present. */
  policyId?: string;
  /** Optional full developer policy resource ID evaluated as a separate stricter layer in the Foundry-project profile. When present, developerPolicyRevision and developerPolicySemanticDigest are required. The exact tuple must match the policy admitted for the agent operation; missing, stale, mismatched or deleted revisions fail closed and never follow mutable policy content. */
  developerPolicyId?: string;
  /** Opaque exact developer policy revision admitted for the operation. Current RP/PMS resources use the RP-assigned ETag preserved verbatim. Required exactly when developerPolicyId is present. */
  developerPolicyRevision?: string;
  /** SHA-256 digest of the admitted developer policy semantic closure. Required exactly when developerPolicyId is present and verified with developerPolicyRevision before evaluation. */
  developerPolicySemanticDigest?: string;
}

/** Optional parameters. */
export interface ShieldPromptOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DetectTextProtectedMaterialOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AnalyzeTextOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AnalyzeImageOptionalParams extends OperationOptions {}
