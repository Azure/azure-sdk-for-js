import type { NotificationHubsClientContext } from "./index.js";
import type { OperationOptions } from "@azure-rest/core-client";
import type { RegistrationDescription } from "../models/registration.js";
/**
 * Updates an existing registration.
 * @param context - The Notification Hubs client.
 * @param registration - The registration to update.
 * @param options - The operation options.
 * @returns The updated registration description.
 */
export declare function updateRegistration(context: NotificationHubsClientContext, registration: RegistrationDescription, options?: OperationOptions): Promise<RegistrationDescription>;
//# sourceMappingURL=updateRegistration.d.ts.map