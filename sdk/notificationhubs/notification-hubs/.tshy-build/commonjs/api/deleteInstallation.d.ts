import type { NotificationHubsClientContext } from "./index.js";
import type { NotificationHubsResponse } from "../models/notificationDetails.js";
import type { OperationOptions } from "@azure-rest/core-client";
/**
 * Deletes an installation from a Notification Hub.
 * @param context - The Notification Hubs client.
 * @param installationId - The installation ID of the installation to delete.
 * @param options - Configuration options for the installation delete operation.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export declare function deleteInstallation(context: NotificationHubsClientContext, installationId: string, options?: OperationOptions): Promise<NotificationHubsResponse>;
//# sourceMappingURL=deleteInstallation.d.ts.map