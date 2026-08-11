// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext } from "../../api/microsoftResourceHealthContext.js";
import {
  listBySingleResource,
  listByTenantId,
  listBySubscriptionId,
} from "../../api/events/operations.js";
import {
  EventsListBySingleResourceOptionalParams,
  EventsListByTenantIdOptionalParams,
  EventsListBySubscriptionIdOptionalParams,
} from "../../api/events/options.js";
import { Event } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Events operations. */
export interface EventsOperations {
  /** Lists current service health events for given resource. */
  listBySingleResource: (
    resourceUri: string,
    options?: EventsListBySingleResourceOptionalParams,
  ) => PagedAsyncIterableIterator<Event>;
  /** Lists current service health events in the tenant. */
  listByTenantId: (
    options?: EventsListByTenantIdOptionalParams,
  ) => PagedAsyncIterableIterator<Event>;
  /** Lists service health events in the subscription. */
  listBySubscriptionId: (
    options?: EventsListBySubscriptionIdOptionalParams,
  ) => PagedAsyncIterableIterator<Event>;
}

function _getEvents(context: MicrosoftResourceHealthContext) {
  return {
    listBySingleResource: (
      resourceUri: string,
      options?: EventsListBySingleResourceOptionalParams,
    ) => listBySingleResource(context, resourceUri, options),
    listByTenantId: (options?: EventsListByTenantIdOptionalParams) =>
      listByTenantId(context, options),
    listBySubscriptionId: (options?: EventsListBySubscriptionIdOptionalParams) =>
      listBySubscriptionId(context, options),
  };
}

export function _getEventsOperations(context: MicrosoftResourceHealthContext): EventsOperations {
  return {
    ..._getEvents(context),
  };
}
