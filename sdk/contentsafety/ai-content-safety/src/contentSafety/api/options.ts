// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UnifiedModerateOptionalParams extends OperationOptions {
  /** Identifier of the protected resource used for binding resolution, not the policy or binding object identifier. For an Azure resource, provide its full Azure Resource Manager resource ID. Project targets must be under the authenticated account and require a verified producer. Required when policyId is absent. When both selectors are provided, the selected policy is evaluated alongside the bound policy. This selector cannot replace authorization or bypass mandatory policy. */
  targetResourceId?: string;
  /** Authorized policy selector, such as a policy name or full policy resource ID. Hierarchy-enabled scopes require a policy name. Required when targetResourceId is absent. A policy-only request retains authenticated account scope. When both selectors are provided, the selected policy is evaluated alongside the bound policy. Policy selection does not bypass applicable mandatory policies. */
  policyId?: string;
}

/** Optional parameters. */
export interface ShieldPromptOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DetectTextProtectedMaterialOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AnalyzeTextOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AnalyzeImageOptionalParams extends OperationOptions {}
