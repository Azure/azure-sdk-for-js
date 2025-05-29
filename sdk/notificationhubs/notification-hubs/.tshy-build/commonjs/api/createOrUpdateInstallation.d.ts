import type { Installation } from "../models/installation.js";
import type { NotificationHubsClientContext } from "./index.js";
import type { NotificationHubsResponse } from "../models/notificationDetails.js";
import type { OperationOptions } from "@azure-rest/core-client";
/**
 * Creates or overwrites an installation to a Notification Hub.
 * @param context - The Notification Hubs client.
 * @param installation - The installation to create or overwrite.
 * @param options - Configuration options for the create or update installation operation.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export declare function createOrUpdateInstallation(context: NotificationHubsClientContext, installation: Installation, options?: OperationOptions): Promise<NotificationHubsResponse>;
//# sourceMappingURL=createOrUpdateInstallation.d.ts.map