"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRegistrationsByChannel = listRegistrationsByChannel;
const _listRegistrations_js_1 = require("./internal/_listRegistrations.js");
const registrationUtils_js_1 = require("../utils/registrationUtils.js");
const tracing_js_1 = require("../utils/tracing.js");
/**
 * Gets all registrations for the notification hub with the given device information and options.
 * @param context - The Notification Hubs client.
 * @param channel - The Registration channel information to query per PNS type.
 * @param options - The options for querying the registrations such as $top.
 * @returns A paged async iterable containing all of the registrations for the notification hub.
 */
function listRegistrationsByChannel(context, channel, options = {}) {
    const newOptions = Object.assign(Object.assign({}, options), { filter: (0, registrationUtils_js_1.getFilterByChannel)(channel) });
    const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("NotificationHubsClientContext.listRegistrationsByDevice", newOptions);
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
//# sourceMappingURL=listRegistrationsByChannel.js.map