import type { NotificationHubsClientContext } from "../index.js";
import type { OperationOptions } from "@azure-rest/core-client";
import type { RegistrationDescription } from "../../models/registration.js";
/**
 * @internal
 */
export declare function createOrUpdateRegistrationDescription(context: NotificationHubsClientContext, registration: RegistrationDescription, operationName: "create" | "createOrUpdate" | "update", options: OperationOptions): Promise<RegistrationDescription>;
//# sourceMappingURL=_createOrUpdateRegistrationDescription.d.ts.map