import type { RegistrationDescription, RegistrationChannel } from "../models/registration.js";
import type { NotificationHubsClientContext } from "./index.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { RegistrationQueryLimitOptions } from "../models/options.js";
/**
 * Gets all registrations for the notification hub with the given device information and options.
 * @param context - The Notification Hubs client.
 * @param channel - The Registration channel information to query per PNS type.
 * @param options - The options for querying the registrations such as $top.
 * @returns A paged async iterable containing all of the registrations for the notification hub.
 */
export declare function listRegistrationsByChannel(context: NotificationHubsClientContext, channel: RegistrationChannel, options?: RegistrationQueryLimitOptions): PagedAsyncIterableIterator<RegistrationDescription>;
//# sourceMappingURL=listRegistrationsByChannel.d.ts.map