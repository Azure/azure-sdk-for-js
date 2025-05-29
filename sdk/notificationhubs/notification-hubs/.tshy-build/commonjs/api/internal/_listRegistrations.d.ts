import type { NotificationHubsClientContext } from "../index.js";
import type { RegistrationDescription } from "../../models/registration.js";
import type { RegistrationQueryOptions } from "../../models/options.js";
export declare function listRegistrationsAll(context: NotificationHubsClientContext, options: RegistrationQueryOptions): AsyncIterableIterator<RegistrationDescription>;
export declare function listRegistrationPagingPage(context: NotificationHubsClientContext, options: RegistrationQueryOptions): AsyncIterableIterator<RegistrationDescription[]>;
//# sourceMappingURL=_listRegistrations.d.ts.map