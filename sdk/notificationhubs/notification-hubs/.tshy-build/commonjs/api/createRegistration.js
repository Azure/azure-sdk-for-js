"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegistration = createRegistration;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const _createOrUpdateRegistrationDescription_js_1 = require("./internal/_createOrUpdateRegistrationDescription.js");
const tracing_js_1 = require("../utils/tracing.js");
const OPERATION_NAME = "createRegistration";
/**
 * Creates a new registration. This method generates a registration ID,
 * which you can subsequently use to retrieve, update, and delete this registration.
 * @param context - The Notification Hubs client.
 * @param registration - The registration to create.
 * @param options - Options for creating a new registration.
 * @returns The newly created registration description.
 */
function createRegistration(context, registration, options = {}) {
    return tracing_js_1.tracingClient.withSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options, async (updatedOptions) => {
        if (registration.registrationId) {
            throw new core_rest_pipeline_1.RestError("registrationId must not be set during a create operation", {
                statusCode: 400,
            });
        }
        return (0, _createOrUpdateRegistrationDescription_js_1.createOrUpdateRegistrationDescription)(context, registration, "create", updatedOptions);
    });
}
//# sourceMappingURL=createRegistration.js.map