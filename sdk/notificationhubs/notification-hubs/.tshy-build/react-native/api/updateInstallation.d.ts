import type { JsonPatch } from "../models/installation.js";
import type { NotificationHubsClientContext } from "./index.js";
import type { NotificationHubsResponse } from "../models/notificationDetails.js";
import type { OperationOptions } from "@azure-rest/core-client";
/**
 * Updates an installation using the JSON-Patch standard in RFC6902.
 * @param context - The Notification Hubs client.
 * @param installationId - The ID of the installation to update.
 * @param installationPatches - An array of patches following the JSON-Patch standard.
 * @param options - Configuration options for the patch installation operation.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export declare function updateInstallation(context: NotificationHubsClientContext, installationId: string, installationPatches: JsonPatch[], options?: OperationOptions): Promise<NotificationHubsResponse>;
//# sourceMappingURL=updateInstallation.d.ts.map