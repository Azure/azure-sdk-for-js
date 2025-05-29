import type { NotificationHubsClientContext } from "./index.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { RegistrationDescription } from "../models/registration.js";
import type { RegistrationQueryLimitOptions } from "../models/options.js";
/**
 * Gets all registrations for the notification hub with the given query options.
 * @param context - The Notification Hubs client.
 * @param options - The options for querying the registrations such as $top.
 * @returns A paged async iterable containing all of the registrations for the notification hub.
 */
export declare function listRegistrations(context: NotificationHubsClientContext, options?: RegistrationQueryLimitOptions): PagedAsyncIterableIterator<RegistrationDescription>;
//# sourceMappingURL=listRegistrations.d.ts.map