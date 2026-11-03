// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AdvisorManagementContext } from "../../api/advisorManagementContext.js";
import { list, $delete, create, get } from "../../api/suppressions/operations.js";
import type {
  SuppressionsListOptionalParams,
  SuppressionsDeleteOptionalParams,
  SuppressionsCreateOptionalParams,
  SuppressionsGetOptionalParams,
} from "../../api/suppressions/options.js";
import type { SuppressionContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Suppressions operations. */
export interface SuppressionsOperations {
  /** Retrieves the list of snoozed or dismissed suppressions for a subscription. The snoozed or dismissed attribute of a recommendation is referred to as a suppression. */
  list: (
    options?: SuppressionsListOptionalParams,
  ) => PagedAsyncIterableIterator<SuppressionContract>;
  /** Enables the activation of a snoozed or dismissed recommendation. The snoozed or dismissed attribute of a recommendation is referred to as a suppression. */
  delete: (
    resourceUri: string,
    recommendationId: string,
    name: string,
    options?: SuppressionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Enables the snoozed or dismissed attribute of a recommendation. The snoozed or dismissed attribute is referred to as a suppression. Use this API to create or update the snoozed or dismissed status of a recommendation. */
  create: (
    resourceUri: string,
    recommendationId: string,
    name: string,
    suppressionContract: SuppressionContract,
    options?: SuppressionsCreateOptionalParams,
  ) => Promise<SuppressionContract>;
  /** Obtains the details of a suppression. */
  get: (
    resourceUri: string,
    recommendationId: string,
    name: string,
    options?: SuppressionsGetOptionalParams,
  ) => Promise<SuppressionContract>;
}

function _getSuppressions(context: AdvisorManagementContext) {
  return {
    list: (options?: SuppressionsListOptionalParams) => list(context, options),
    delete: (
      resourceUri: string,
      recommendationId: string,
      name: string,
      options?: SuppressionsDeleteOptionalParams,
    ) => $delete(context, resourceUri, recommendationId, name, options),
    create: (
      resourceUri: string,
      recommendationId: string,
      name: string,
      suppressionContract: SuppressionContract,
      options?: SuppressionsCreateOptionalParams,
    ) => create(context, resourceUri, recommendationId, name, suppressionContract, options),
    get: (
      resourceUri: string,
      recommendationId: string,
      name: string,
      options?: SuppressionsGetOptionalParams,
    ) => get(context, resourceUri, recommendationId, name, options),
  };
}

export function _getSuppressionsOperations(
  context: AdvisorManagementContext,
): SuppressionsOperations {
  return {
    ..._getSuppressions(context),
  };
}
