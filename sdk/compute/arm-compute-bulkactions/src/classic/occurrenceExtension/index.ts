// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import { listOccurrenceByVms } from "../../api/occurrenceExtension/operations.js";
import type { OccurrenceExtensionListOccurrenceByVmsOptionalParams } from "../../api/occurrenceExtension/options.js";
import type { OccurrenceExtensionResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a OccurrenceExtension operations. */
export interface OccurrenceExtensionOperations {
  /** List OccurrenceExtensionResource resources by parent */
  listOccurrenceByVms: (
    resourceUri: string,
    options?: OccurrenceExtensionListOccurrenceByVmsOptionalParams,
  ) => PagedAsyncIterableIterator<OccurrenceExtensionResource>;
}
function _getOccurrenceExtension(context: ComputeContext) {
  return {
    listOccurrenceByVms: (
      resourceUri: string,
      options?: OccurrenceExtensionListOccurrenceByVmsOptionalParams,
    ) => listOccurrenceByVms(context, resourceUri, options),
  };
}
export function _getOccurrenceExtensionOperations(
  context: ComputeContext,
): OccurrenceExtensionOperations {
  return {
    ..._getOccurrenceExtension(context),
  };
}
