import type { NotificationHubsClientContext } from "./index.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { RegistrationDescription } from "../models/registration.js";
import type { RegistrationQueryLimitOptions } from "../models/options.js";
/**
 * Lists all registrations with the matching tag.
 * @param context - The Notification Hubs client.
 * @param tag - The tag to query for matching registrations.
 * @param options - The query options such as $top.
 * @returns A paged async iterable containing the matching registrations for the notification hub.
 */
export declare function listRegistrationsByTag(context: NotificationHubsClientContext, tag: string, options?: RegistrationQueryLimitOptions): PagedAsyncIterableIterator<RegistrationDescription>;
//# sourceMappingURL=listRegistrationsByTag.d.ts.map