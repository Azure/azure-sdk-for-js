// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext } from "../../api/microsoftResourceHealthContext.js";
import {
  listBySubscriptionIdAndEventId,
  get,
  listByTenantIdAndEventId,
  getByTenantId,
} from "../../api/impactedResources/operations.js";
import {
  ImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams,
  ImpactedResourcesGetOptionalParams,
  ImpactedResourcesListByTenantIdAndEventIdOptionalParams,
  ImpactedResourcesGetByTenantIdOptionalParams,
} from "../../api/impactedResources/options.js";
import { EventImpactedResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ImpactedResources operations. */
export interface ImpactedResourcesOperations {
  /** Lists impacted resources in the subscription by an event. */
  listBySubscriptionIdAndEventId: (
    eventTrackingId: string,
    options?: ImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams,
  ) => PagedAsyncIterableIterator<EventImpactedResource>;
  /** Gets the specific impacted resource in the subscription by an event. */
  get: (
    eventTrackingId: string,
    impactedResourceName: string,
    options?: ImpactedResourcesGetOptionalParams,
  ) => Promise<EventImpactedResource>;
  /** Lists impacted resources in the tenant by an event. */
  listByTenantIdAndEventId: (
    eventTrackingId: string,
    options?: ImpactedResourcesListByTenantIdAndEventIdOptionalParams,
  ) => PagedAsyncIterableIterator<EventImpactedResource>;
  /** Gets the specific impacted resource in the tenant by an event. */
  getByTenantId: (
    eventTrackingId: string,
    impactedResourceName: string,
    options?: ImpactedResourcesGetByTenantIdOptionalParams,
  ) => Promise<EventImpactedResource>;
}

function _getImpactedResources(context: MicrosoftResourceHealthContext) {
  return {
    listBySubscriptionIdAndEventId: (
      eventTrackingId: string,
      options?: ImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams,
    ) => listBySubscriptionIdAndEventId(context, eventTrackingId, options),
    get: (
      eventTrackingId: string,
      impactedResourceName: string,
      options?: ImpactedResourcesGetOptionalParams,
    ) => get(context, eventTrackingId, impactedResourceName, options),
    listByTenantIdAndEventId: (
      eventTrackingId: string,
      options?: ImpactedResourcesListByTenantIdAndEventIdOptionalParams,
    ) => listByTenantIdAndEventId(context, eventTrackingId, options),
    getByTenantId: (
      eventTrackingId: string,
      impactedResourceName: string,
      options?: ImpactedResourcesGetByTenantIdOptionalParams,
    ) => getByTenantId(context, eventTrackingId, impactedResourceName, options),
  };
}

export function _getImpactedResourcesOperations(
  context: MicrosoftResourceHealthContext,
): ImpactedResourcesOperations {
  return {
    ..._getImpactedResources(context),
  };
}
