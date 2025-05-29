// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { listRegistrationPagingPage, listRegistrationsAll } from "./internal/_listRegistrations.js";
import { getFilterByChannel } from "../utils/registrationUtils.js";
import { tracingClient } from "../utils/tracing.js";
/**
 * Gets all registrations for the notification hub with the given device information and options.
 * @param context - The Notification Hubs client.
 * @param channel - The Registration channel information to query per PNS type.
 * @param options - The options for querying the registrations such as $top.
 * @returns A paged async iterable containing all of the registrations for the notification hub.
 */
export function listRegistrationsByChannel(context, channel, options = {}) {
    const newOptions = Object.assign(Object.assign({}, options), { filter: getFilterByChannel(channel) });
    const { span, updatedOptions } = tracingClient.startSpan("NotificationHubsClientContext.listRegistrationsByDevice", newOptions);
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
    }
    catch (e) {
        span.setStatus({ status: "error", error: e });
        throw e;
    }
    finally {
        span.end();
    }
}
//# sourceMappingURL=listRegistrationsByChannel.js.map