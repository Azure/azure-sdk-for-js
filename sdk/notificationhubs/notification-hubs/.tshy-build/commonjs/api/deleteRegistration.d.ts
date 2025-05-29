import type { EntityOperationOptions } from "../models/options.js";
import type { NotificationHubsClientContext } from "./index.js";
import type { NotificationHubsResponse } from "../models/notificationDetails.js";
/**
 * Deletes a registration with the given registration ID.
 * @param context - The Notification Hubs client.
 * @param registrationId - The registration ID of the registration to delete.
 * @param options - The options for delete operations including the ETag
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export declare function deleteRegistration(context: NotificationHubsClientContext, registrationId: string, options?: EntityOperationOptions): Promise<NotificationHubsResponse>;
//# sourceMappingURL=deleteRegistration.d.ts.map