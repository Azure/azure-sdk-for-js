// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export function getBinarySize(string: string | ArrayBuffer | NodeJS.ArrayBufferView | SharedArrayBuffer) {
    return Buffer.byteLength(string, 'utf8');
}