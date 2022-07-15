// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {Blob} from "../shims"

export function getBinarySize(stringArray: any) {
    return new Blob([stringArray]).size
}