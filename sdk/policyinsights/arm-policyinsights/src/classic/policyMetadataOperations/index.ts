// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext } from "../../api/policyInsightsContext.js";
import { list, getResource } from "../../api/policyMetadataOperations/operations.js";
import type {
  PolicyMetadataOperationsListOptionalParams,
  PolicyMetadataOperationsGetResourceOptionalParams,
} from "../../api/policyMetadataOperations/options.js";
import type { PolicyMetadata, SlimPolicyMetadata } from "../../models/policyInsightsApi/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PolicyMetadataOperations operations. */
export interface PolicyMetadataOperationsOperations {
  /** Get a list of the policy metadata resources. */
  list: (
    options?: PolicyMetadataOperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<SlimPolicyMetadata>;
  /** Get policy metadata resource. */
  getResource: (
    resourceName: string,
    options?: PolicyMetadataOperationsGetResourceOptionalParams,
  ) => Promise<PolicyMetadata>;
}

function _getPolicyMetadataOperations(context: PolicyInsightsContext) {
  return {
    list: (options?: PolicyMetadataOperationsListOptionalParams) => list(context, options),
    getResource: (
      resourceName: string,
      options?: PolicyMetadataOperationsGetResourceOptionalParams,
    ) => getResource(context, resourceName, options),
  };
}

export function _getPolicyMetadataOperationsOperations(
  context: PolicyInsightsContext,
): PolicyMetadataOperationsOperations {
  return {
    ..._getPolicyMetadataOperations(context),
  };
}
