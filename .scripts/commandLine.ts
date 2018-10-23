/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as minimist from "minimist";
import { arrayContains } from "./common";

export interface CommandLineOptions extends minimist.ParsedArgs {
    "azure-sdk-for-js-repo-root": string;
    "azure-rest-api-specs-root": string;
    debugger: boolean;
    "logging-level": string;
    package: string;
    "skip-sdk": boolean;
    "skip-spec": boolean;
    type: string;
    use: boolean;
    verbose: boolean;
    whatif: boolean;
    getSdkType(): SdkType;
}

export const commandLineConfiguration = {
    string: ["azure-sdk-for-js-repo-root", "azure-rest-api-specs-root", "logging-level", "package", "type"],
    boolean: ["debugger", "use", "skip-sdk", "skip-spec", "verbose", "whatif"],
    alias: {
        l: "logging-level",
        log: "logging-level",
        package: "packageName",
        u: "use",
        v: "version",
    },
    default: {
        "logging-level": "info",
        type: "arm"
    }
};

export enum SdkType {
    ResourceManager = "resource-manager",
    DataPlane = "data-plane",
    ControlPlane = "control-plane"
}

let _options: CommandLineOptions;
export function getCommandLineOptions() {
    if (!_options) {
        _options = createCommandLineParameters();
    }

    return _options;
}

function createCommandLineParameters() {
    const args = minimist(process.argv.slice(2), commandLineConfiguration) as CommandLineOptions;
    args.getSdkType = getSdkType;
    return args;
}

export function getSdkType() {
    const resourceManagerStrings = ["arm", "rm", "resourcemanager"]
    const dataPlaneStrings = ["dp", "data", "dataplane"]

    const type = this.type.toLowerCase().replace("-", "");
    if (arrayContains(resourceManagerStrings, type)) {
        return SdkType.ResourceManager;
    } else if (arrayContains(dataPlaneStrings, type)) {
        return SdkType.DataPlane;
    } else {
        throw new Error("Unknown SDK type");
    }
}
