"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRegistrations = listRegistrations;
const tracing_js_1 = require("../utils/tracing.js");
const _listRegistrations_js_1 = require("./internal/_listRegistrations.js");
/**
 * Gets all registrations for the notification hub with the given query options.
 * @param context - The Notification Hubs client.
 * @param options - The options for querying the registrations such as $top.
 * @returns A paged async iterable containing all of the registrations for the notification hub.
 */
function listRegistrations(context, options = {}) {
    const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("NotificationHubsClientContext.listRegistrations", options);
    try {
        const iter = (0, _listRegistrations_js_1.listRegistrationsAll)(context, updatedOptions);
        return {
            next() {
                return iter.next();
            },
            [Symbol.asyncIterator]() {
                return this;
            },
            byPage: () => {
                return (0, _listRegistrations_js_1.listRegistrationPagingPage)(context, updatedOptions);
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