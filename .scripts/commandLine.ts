/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as minimist from "minimist";
import { arrayContains } from "./common";

export interface CommandLineOptions extends minimist.ParsedArgs {
    b: boolean,
    debugger: boolean,
    package: string,
    type: string,
    use: boolean,
    verbose: boolean,
    whatif: boolean,
    getSdkType(): SdkType;
}

export const commandLineConfiguration = {
    string: ["package", "type"],
    boolean: ["debugger", "use", "verbose", "whatif"],
    alias: {
        package: "packageName",
        u: "use",
        v: "version",
    },
    default: {
        type: "arm"
    }
}

export enum SdkType {
    ResourceManager,
    DataPlane
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