// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { listRegistrationPagingPage, listRegistrationsAll } from "./internal/_listRegistrations.js";
import { NotificationHubsClientContext } from "./index.js";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RestError } from "@azure/core-rest-pipeline";
import { RegistrationDescription } from "../models/registration.js";
import { RegistrationDevice } from "../models/device.js";
import { RegistrationQueryLimitOptions } from "../models/options.js";
import { tracingClient } from "../utils/tracing.js";

/**
 * Gets all registrations for the notification hub with the given device information and options.
 * @param context - The Notification Hubs client.
 * @param device - The device information to query per PNS type.
 * @param options - The options for querying the registrations such as $top.
 * @returns A paged async iterable containing all of the registrations for the notification hub.
 */
export function listRegistrationsByDevice(
  context: NotificationHubsClientContext,
  device: RegistrationDevice,
  options: RegistrationQueryLimitOptions = {}
): PagedAsyncIterableIterator<RegistrationDescription> {
  const newOptions = {
    ...options,
    filter: getFilterByDevice(device),
  };
  const { span, updatedOptions } = tracingClient.startSpan(
    "NotificationHubsClientContext.listRegistrationsByDevice",
    newOptions
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

function getFilterByDevice(device: RegistrationDevice): string {
  switch (device.kind) {
    case "adm":
      return `AdmRegistrationId eq '${device.admRegistrationId}'`;
    case "apple":
      return `DeviceToken eq '${device.deviceToken.toLocaleUpperCase()}'`;
    case "baidu":
      return `BaiduChannelId eq ${device.baiduChannelId}' and BaiduUserId eq '${device.baiduUserId}'`;
    case "browser":
      return `Endpoint eq '${encodeURIComponent(device.endpoint)}' and P256DH eq '${
        device.p256dh
      }' and Auth eq '${device.auth}'`;
    case "gcm":
      return `GcmRegistrationId eq '${device.gcmRegistrationId}'`;
    case "windows":
      return `ChannelUri eq '${encodeURIComponent(device.channelUri)}'`;
    default:
      throw new RestError(`Device type is unsupported`, {
        statusCode: 400,
      });
  }
}
