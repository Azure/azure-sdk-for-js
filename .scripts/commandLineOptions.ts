/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as minimist from "minimist";

export interface CommandLineOptions extends minimist.ParsedArgs {
    package: string,
    type: string,
    debug: boolean,
    d: boolean,
    verbose: boolean,
    b: boolean,
    getSdkType(): SdkType;
}

export enum SdkType {
    ResourceManager,
    DataPlane
}