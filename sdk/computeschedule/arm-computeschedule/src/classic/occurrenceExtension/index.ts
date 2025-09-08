// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleContext } from "../../api/computeScheduleContext.js";
import { listOccurrenceByVms } from "../../api/occurrenceExtension/operations.js";
import { OccurrenceExtensionListOccurrenceByVmsOptionalParams } from "../../api/occurrenceExtension/options.js";
import { OccurrenceExtensionResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a OccurrenceExtension operations. */
export interface OccurrenceExtensionOperations {
  /** List OccurrenceExtensionResource resources by parent */
  listOccurrenceByVms: (
    resourceUri: string,
    options?: OccurrenceExtensionListOccurrenceByVmsOptionalParams,
  ) => PagedAsyncIterableIterator<OccurrenceExtensionResource>;
}

function _getOccurrenceExtension(context: ComputeScheduleContext) {
  return {
    listOccurrenceByVms: (
      resourceUri: string,
      options?: OccurrenceExtensionListOccurrenceByVmsOptionalParams,
    ) => listOccurrenceByVms(context, resourceUri, options),
  };
}

export function _getOccurrenceExtensionOperations(
  context: ComputeScheduleContext,
): OccurrenceExtensionOperations {
  return {
    ..._getOccurrenceExtension(context),
  };
}
