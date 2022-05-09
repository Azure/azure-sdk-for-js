// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  JobRouterCreateClassificationPolicyResponse,
  JobRouterUpdateClassificationPolicyResponse,
  JobRouterCreateExceptionPolicyResponse,
  JobRouterUpdateExceptionPolicyResponse
} from "../generated/src";

/**
 * Options to create a classification policy.
 */
export interface CreateClassificationPolicyResponse
  extends JobRouterCreateClassificationPolicyResponse {}

/**
 * Options to update a classification policy.
 */
export interface UpdateClassificationPolicyResponse
  extends JobRouterUpdateClassificationPolicyResponse {}

/**
 * Options to create a exception policy.
 */
export interface CreateExceptionPolicyResponse extends JobRouterCreateExceptionPolicyResponse {}

/**
 * Options to update a exception policy.
 */
export interface UpdateExceptionPolicyResponse extends JobRouterUpdateExceptionPolicyResponse {}
