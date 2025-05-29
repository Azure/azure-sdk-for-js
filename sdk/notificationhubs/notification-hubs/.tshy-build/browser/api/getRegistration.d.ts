import type { NotificationHubsClientContext } from "./index.js";
import type { OperationOptions } from "@azure-rest/core-client";
import type { RegistrationDescription } from "../models/registration.js";
/**
 * Gets a registration by the given registration ID.
 * @param context - The Notification Hubs client.
 * @param registrationId - The ID of the registration to get.
 * @param options - The options for getting a registration by ID.
 * @returns A RegistrationDescription that has the given registration ID.
 */
export declare function getRegistration(context: NotificationHubsClientContext, registrationId: string, options?: OperationOptions): Promise<RegistrationDescription>;
//# sourceMappingURL=getRegistration.d.ts.map