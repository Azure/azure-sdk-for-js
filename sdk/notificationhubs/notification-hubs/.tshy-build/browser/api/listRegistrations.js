// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { tracingClient } from "../utils/tracing.js";
import { listRegistrationPagingPage, listRegistrationsAll } from "./internal/_listRegistrations.js";
/**
 * Gets all registrations for the notification hub with the given query options.
 * @param context - The Notification Hubs client.
 * @param options - The options for querying the registrations such as $top.
 * @returns A paged async iterable containing all of the registrations for the notification hub.
 */
export function listRegistrations(context, options = {}) {
    const { span, updatedOptions } = tracingClient.startSpan("NotificationHubsClientContext.listRegistrations", options);
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
//# sourceMappingURL=listRegistrations.js.map