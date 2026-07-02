// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { list } from "../../api/eventCategories/operations.js";
import type { EventCategoriesListOptionalParams } from "../../api/eventCategories/options.js";
import type { LocalizableString } from "../../models/microsoft/common/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EventCategories operations. */
export interface EventCategoriesOperations {
  /** Get the list of available event categories supported in the Activity Logs Service.<br>The current list includes the following: Administrative, Security, ServiceHealth, Alert, Recommendation, Policy. */
  list: (
    options?: EventCategoriesListOptionalParams,
  ) => PagedAsyncIterableIterator<LocalizableString>;
}

function _getEventCategories(context: MonitorContext) {
  return {
    list: (options?: EventCategoriesListOptionalParams) => list(context, options),
  };
}

export function _getEventCategoriesOperations(context: MonitorContext): EventCategoriesOperations {
  return {
    ..._getEventCategories(context),
  };
}
