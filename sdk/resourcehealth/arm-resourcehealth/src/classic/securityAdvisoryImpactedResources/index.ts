// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext } from "../../api/microsoftResourceHealthContext.js";
import {
  listByTenantIdAndEventId,
  listBySubscriptionIdAndEventId,
} from "../../api/securityAdvisoryImpactedResources/operations.js";
import {
  SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdOptionalParams,
  SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams,
} from "../../api/securityAdvisoryImpactedResources/options.js";
import { EventImpactedResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SecurityAdvisoryImpactedResources operations. */
export interface SecurityAdvisoryImpactedResourcesOperations {
  /** Lists impacted resources in the tenant by an event (Security Advisory). */
  listByTenantIdAndEventId: (
    eventTrackingId: string,
    options?: SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdOptionalParams,
  ) => PagedAsyncIterableIterator<EventImpactedResource>;
  /** Lists impacted resources in the subscription by an event (Security Advisory). */
  listBySubscriptionIdAndEventId: (
    eventTrackingId: string,
    options?: SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams,
  ) => PagedAsyncIterableIterator<EventImpactedResource>;
}

function _getSecurityAdvisoryImpactedResources(context: MicrosoftResourceHealthContext) {
  return {
    listByTenantIdAndEventId: (
      eventTrackingId: string,
      options?: SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdOptionalParams,
    ) => listByTenantIdAndEventId(context, eventTrackingId, options),
    listBySubscriptionIdAndEventId: (
      eventTrackingId: string,
      options?: SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams,
    ) => listBySubscriptionIdAndEventId(context, eventTrackingId, options),
  };
}

export function _getSecurityAdvisoryImpactedResourcesOperations(
  context: MicrosoftResourceHealthContext,
): SecurityAdvisoryImpactedResourcesOperations {
  return {
    ..._getSecurityAdvisoryImpactedResources(context),
  };
}
