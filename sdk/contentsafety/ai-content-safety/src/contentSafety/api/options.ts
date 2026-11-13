// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UnifiedModerateOptionalParams extends OperationOptions {
  /** Full Azure resource ID of the governed Foundry project used to resolve explicit administrator hierarchy bindings. It is not the selected Guardrail or binding resource ID. The target must be under the authenticated serving account and requires a verified producer. Required with the selectedPolicyId/revision/digest tuple for the Foundry-project profile and forbidden when policyId is present. */
  targetResourceId?: string;
  /** Authorized named policy selector for the named-policy gateway profile. It may be a supported policy name or full policy resource ID according to the serving account's existing selector grammar. Required when targetResourceId is absent and forbidden when targetResourceId or selectedPolicyId is present. */
  policyId?: string;
  /** Full resource ID of the Guardrail selected by the Foundry agent version. Required with targetResourceId for the Foundry-project profile. selectedPolicyRevision and selectedPolicySemanticDigest are required. The exact tuple must match the policy admitted for the agent operation; missing, stale, mismatched or deleted revisions fail closed and never follow mutable policy content. */
  selectedPolicyId?: string;
  /** Opaque exact selected Guardrail revision admitted for the operation. Current RP/PMS resources use the RP-assigned ETag preserved verbatim. Required exactly when selectedPolicyId is present. */
  selectedPolicyRevision?: string;
  /** SHA-256 digest of the admitted selected Guardrail semantic closure. Required exactly when selectedPolicyId is present and verified with selectedPolicyRevision before evaluation. */
  selectedPolicySemanticDigest?: string;
}

/** Optional parameters. */
export interface ShieldPromptOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DetectTextProtectedMaterialOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AnalyzeTextOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AnalyzeImageOptionalParams extends OperationOptions {}
