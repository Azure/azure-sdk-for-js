import type { NotificationHubsClientContext } from "./index.js";
import type { OperationOptions } from "@azure-rest/core-client";
/**
 * Creates a new registration ID.
 * @param context - The Notification Hubs client.
 * @param options - The options for creating a new registration ID.
 * @returns The newly created registration ID.
 */
export declare function createRegistrationId(context: NotificationHubsClientContext, options?: OperationOptions): Promise<string>;
//# sourceMappingURL=createRegistrationId.d.ts.map