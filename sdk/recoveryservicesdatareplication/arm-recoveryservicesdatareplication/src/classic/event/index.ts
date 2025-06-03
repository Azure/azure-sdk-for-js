// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext } from "../../api/azureSiteRecoveryManagementServiceAPIContext.js";
import { EventModel } from "../../models/models.js";
import { EventListOptionalParams, EventGetOptionalParams } from "../../api/event/options.js";
import { list, get } from "../../api/event/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Event operations. */
export interface EventOperations {
  /** Gets the list of events in the given vault. */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: EventListOptionalParams,
  ) => PagedAsyncIterableIterator<EventModel>;
  /** Gets the details of the event. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    eventName: string,
    options?: EventGetOptionalParams,
  ) => Promise<EventModel>;
}

function _getEvent(context: AzureSiteRecoveryManagementServiceAPIContext) {
  return {
    list: (resourceGroupName: string, vaultName: string, options?: EventListOptionalParams) =>
      list(context, resourceGroupName, vaultName, options),
    get: (
      resourceGroupName: string,
      vaultName: string,
      eventName: string,
      options?: EventGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, eventName, options),
  };
}

export function _getEventOperations(
  context: AzureSiteRecoveryManagementServiceAPIContext,
): EventOperations {
  return {
    ..._getEvent(context),
  };
}
