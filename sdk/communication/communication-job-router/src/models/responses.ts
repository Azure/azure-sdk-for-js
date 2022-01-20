// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  JobRouterCreateClassificationPolicyV2Response,
  JobRouterPatchClassificationPolicyV2Response,
  JobRouterCreateExceptionPolicyV2Response,
  JobRouterPatchExceptionPolicyV2Response
} from "../generated/src";

/**
 * Options to create a classification policy.
 */
export interface CreateClassificationPolicyResponse
  extends JobRouterCreateClassificationPolicyV2Response {}

/**
 * Options to update a classification policy.
 */
export interface PatchClassificationPolicyResponse
  extends JobRouterPatchClassificationPolicyV2Response {}

/**
 * Options to create a exception policy.
 */
export interface CreateExceptionPolicyResponse extends JobRouterCreateExceptionPolicyV2Response {}

/**
 * Options to update a exception policy.
 */
export interface PatchExceptionPolicyResponse extends JobRouterPatchExceptionPolicyV2Response {}


