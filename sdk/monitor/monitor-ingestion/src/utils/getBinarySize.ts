// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function getBinarySize(string: string | NodeJS.ArrayBufferView | ArrayBuffer | SharedArrayBuffer) {
    return Buffer.byteLength(string, 'utf8');
}