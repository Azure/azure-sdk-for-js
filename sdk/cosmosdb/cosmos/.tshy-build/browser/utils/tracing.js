// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createTracingClient } from "@azure/core-tracing";
import { Constants } from "../common/constants.js";
/**
 * Global tracing client for this package.
 *
 * @internal
 */
export const tracingClient = createTracingClient({
    namespace: Constants.AzureNamespace,
    packageName: Constants.AzurePackageName,
    packageVersion: Constants.SDKVersion,
});
//# sourceMappingURL=tracing.js.map