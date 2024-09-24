// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RegistrationDescription, RegistrationChannel } from "../models/registration.js";
import { listRegistrationPagingPage, listRegistrationsAll } from "./internal/_listRegistrations.js";
import { NotificationHubsClientContext } from "./index.js";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RegistrationQueryLimitOptions } from "../models/options.js";
import { getFilterByChannel } from "../utils/registrationUtils.js";
import { tracingClient } from "../utils/tracing.js";

/**
 * Gets all registrations for the notification hub with the given device information and options.
 * @param context - The Notification Hubs client.
 * @param channel - The Registration channel information to query per PNS type.
 * @param options - The options for querying the registrations such as $top.
 * @returns A paged async iterable containing all of the registrations for the notification hub.
 */
export function listRegistrationsByChannel(
  context: NotificationHubsClientContext,
  channel: RegistrationChannel,
  options: RegistrationQueryLimitOptions = {},
): PagedAsyncIterableIterator<RegistrationDescription> {
  const newOptions = {
    ...options,
    filter: getFilterByChannel(channel),
  };
  const { span, updatedOptions } = tracingClient.startSpan(
    "NotificationHubsClientContext.listRegistrationsByDevice",
    newOptions,
  );
  try {
    const iter = listRegistrationsAll(context, updatedOptions);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return listRegistrationPagingPage(context, updatedOptions);
      },
    };
  } catch (e: any) {
    span.setStatus({ status: "error", error: e });
    throw e;
  } finally {
    span.end();
  }
}
