// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { randomUUID } from "node:crypto";
import { InternalEnvironmentVariables } from "./constants.js";
export class EnvironmentVariables {
    get accessToken() {
        return process.env["PLAYWRIGHT_SERVICE_ACCESS_TOKEN"];
    }
    constructor() {
        this.runName = process.env["_MPT_SERVICE_RUN_NAME"];
        this.runId = process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
        this.correlationId = randomUUID();
    }
}
//# sourceMappingURL=environmentVariables.js.map