"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdateRegistration = createOrUpdateRegistration;
const _createOrUpdateRegistrationDescription_js_1 = require("./internal/_createOrUpdateRegistrationDescription.js");
const tracing_js_1 = require("../utils/tracing.js");
const OPERATION_NAME = "createOrUpdateRegistration";
/**
 * Creates or updates a registration.
 * @param context - The Notification Hubs client.
 * @param registration - The registration to create or update.
 * @param options - The operation options.
 * @returns The created or updated registration description.
 */
function createOrUpdateRegistration(context, registration, options = {}) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options, async (updatedOptions) => {
        return (0, _createOrUpdateRegistrationDescription_js_1.createOrUpdateRegistrationDescription)(context, registration, "createOrUpdate", updatedOptions);
    });
}
//# sourceMappingURL=createOrUpdateRegistration.js.map