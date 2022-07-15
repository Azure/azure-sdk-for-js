// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export function getBinarySize(stringArray: string) {
    return new Blob([stringArray]).size
}
