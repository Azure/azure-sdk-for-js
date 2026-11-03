// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext } from "../../api/microsoftResourceHealthContext.js";
import {
  fetchDetailsByTenantIdAndTrackingId,
  getByTenantIdAndTrackingId,
  fetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingId,
  fetchDetailsBySubscriptionIdAndTrackingId,
  getBySubscriptionIdAndTrackingId,
} from "../../api/event/operations.js";
import {
  EventFetchDetailsByTenantIdAndTrackingIdOptionalParams,
  EventGetByTenantIdAndTrackingIdOptionalParams,
  EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdOptionalParams,
  EventFetchDetailsBySubscriptionIdAndTrackingIdOptionalParams,
  EventGetBySubscriptionIdAndTrackingIdOptionalParams,
} from "../../api/event/options.js";
import { Event } from "../../models/models.js";

/** Interface representing a Event operations. */
export interface EventOperations {
  /** Service health event details in the tenant by event tracking id. This can be used to fetch sensitive properties for Security Advisory events. Please see https://learn.microsoft.com/en-us/azure/service-health/security-advisories-elevated-access */
  fetchDetailsByTenantIdAndTrackingId: (
    eventTrackingId: string,
    options?: EventFetchDetailsByTenantIdAndTrackingIdOptionalParams,
  ) => Promise<Event>;
  /** Service health event in the tenant by event tracking id */
  getByTenantIdAndTrackingId: (
    eventTrackingId: string,
    options?: EventGetByTenantIdAndTrackingIdOptionalParams,
  ) => Promise<Event>;
  /** Service health event details specific in the subscription by event tracking id. This can be used to fetch sensitive properties for Billing event type. */
  fetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingId: (
    eventTrackingId: string,
    options?: EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdOptionalParams,
  ) => Promise<Event>;
  /** Service health event details in the subscription by event tracking id. This can be used to fetch sensitive properties for Security Advisory events. Please see https://learn.microsoft.com/en-us/azure/service-health/security-advisories-elevated-access */
  fetchDetailsBySubscriptionIdAndTrackingId: (
    eventTrackingId: string,
    options?: EventFetchDetailsBySubscriptionIdAndTrackingIdOptionalParams,
  ) => Promise<Event>;
  /** Service health event in the subscription by event tracking id */
  getBySubscriptionIdAndTrackingId: (
    eventTrackingId: string,
    options?: EventGetBySubscriptionIdAndTrackingIdOptionalParams,
  ) => Promise<Event>;
}

function _getEvent(context: MicrosoftResourceHealthContext) {
  return {
    fetchDetailsByTenantIdAndTrackingId: (
      eventTrackingId: string,
      options?: EventFetchDetailsByTenantIdAndTrackingIdOptionalParams,
    ) => fetchDetailsByTenantIdAndTrackingId(context, eventTrackingId, options),
    getByTenantIdAndTrackingId: (
      eventTrackingId: string,
      options?: EventGetByTenantIdAndTrackingIdOptionalParams,
    ) => getByTenantIdAndTrackingId(context, eventTrackingId, options),
    fetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingId: (
      eventTrackingId: string,
      options?: EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdOptionalParams,
    ) =>
      fetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingId(
        context,
        eventTrackingId,
        options,
      ),
    fetchDetailsBySubscriptionIdAndTrackingId: (
      eventTrackingId: string,
      options?: EventFetchDetailsBySubscriptionIdAndTrackingIdOptionalParams,
    ) => fetchDetailsBySubscriptionIdAndTrackingId(context, eventTrackingId, options),
    getBySubscriptionIdAndTrackingId: (
      eventTrackingId: string,
      options?: EventGetBySubscriptionIdAndTrackingIdOptionalParams,
    ) => getBySubscriptionIdAndTrackingId(context, eventTrackingId, options),
  };
}

export function _getEventOperations(context: MicrosoftResourceHealthContext): EventOperations {
  return {
    ..._getEvent(context),
  };
}
