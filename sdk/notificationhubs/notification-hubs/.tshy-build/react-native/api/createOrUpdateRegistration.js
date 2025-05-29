// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createOrUpdateRegistrationDescription } from "./internal/_createOrUpdateRegistrationDescription.js";
import { tracingClient } from "../utils/tracing.js";
const OPERATION_NAME = "createOrUpdateRegistration";
/**
 * Creates or updates a registration.
 * @param context - The Notification Hubs client.
 * @param registration - The registration to create or update.
 * @param options - The operation options.
 * @returns The created or updated registration description.
 */
export function createOrUpdateRegistration(context, registration, options = {}) {
    return tracingClient.withSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options, async (updatedOptions) => {
        return createOrUpdateRegistrationDescription(context, registration, "createOrUpdate", updatedOptions);
    });
}
//# sourceMappingURL=createOrUpdateRegistration.js.map