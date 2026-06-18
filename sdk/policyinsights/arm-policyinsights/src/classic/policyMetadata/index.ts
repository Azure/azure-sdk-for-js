// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext } from "../../api/policyInsightsContext.js";
import { list, getResource } from "../../api/policyMetadata/operations.js";
import type {
  PolicyMetadataListOptionalParams,
  PolicyMetadataGetResourceOptionalParams,
} from "../../api/policyMetadata/options.js";
import type { PolicyMetadata, SlimPolicyMetadata } from "../../models/policyInsightsApi/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PolicyMetadata operations. */
export interface PolicyMetadataOperations {
  /** Get a list of the policy metadata resources. */
  list: (
    options?: PolicyMetadataListOptionalParams,
  ) => PagedAsyncIterableIterator<SlimPolicyMetadata>;
  /** Get policy metadata resource. */
  getResource: (
    resourceName: string,
    options?: PolicyMetadataGetResourceOptionalParams,
  ) => Promise<PolicyMetadata>;
}

function _getPolicyMetadata(context: PolicyInsightsContext) {
  return {
    list: (options?: PolicyMetadataListOptionalParams) => list(context, options),
    getResource: (resourceName: string, options?: PolicyMetadataGetResourceOptionalParams) =>
      getResource(context, resourceName, options),
  };
}

export function _getPolicyMetadataOperations(
  context: PolicyInsightsContext,
): PolicyMetadataOperations {
  return {
    ..._getPolicyMetadata(context),
  };
}
