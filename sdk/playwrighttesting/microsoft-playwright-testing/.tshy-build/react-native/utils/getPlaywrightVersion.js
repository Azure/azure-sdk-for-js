// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getPackageManager } from "./packageManager.js";
import { InternalEnvironmentVariables } from "../common/constants.js";
import { execSync } from "node:child_process";
import { coreLogger } from "../common/logger.js";
export const getPlaywrightVersion = () => {
    if (process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION]) {
        return process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION];
    }
    const packageManager = getPackageManager();
    const command = packageManager.runCommand("playwright", "--version");
    const stdout = execSync(command).toString().trim();
    const version = packageManager.getVersionFromStdout(stdout);
    process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = version;
    coreLogger.info(`Playwright version being used - ${process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION]}`);
    return process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION];
};
//# sourceMappingURL=getPlaywrightVersion.js.map