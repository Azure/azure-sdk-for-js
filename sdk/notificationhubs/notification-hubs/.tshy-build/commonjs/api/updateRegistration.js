"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRegistration = updateRegistration;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const _createOrUpdateRegistrationDescription_js_1 = require("./internal/_createOrUpdateRegistrationDescription.js");
const tracing_js_1 = require("../utils/tracing.js");
const OPERATION_NAME = "updateRegistration";
/**
 * Updates an existing registration.
 * @param context - The Notification Hubs client.
 * @param registration - The registration to update.
 * @param options - The operation options.
 * @returns The updated registration description.
 */
function updateRegistration(context, registration, options = {}) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options, async (updatedOptions) => {
        if (!registration.etag) {
            throw new core_rest_pipeline_1.RestError("ETag is required for registration update", { statusCode: 400 });
        }
        return (0, _createOrUpdateRegistrationDescription_js_1.createOrUpdateRegistrationDescription)(context, registration, "update", updatedOptions);
    });
}
//# sourceMappingURL=updateRegistration.js.map