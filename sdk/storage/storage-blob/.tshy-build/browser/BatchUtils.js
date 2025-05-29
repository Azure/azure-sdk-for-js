// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export async function getBodyAsText(batchResponse) {
    const blobBodyResponse = await batchResponse.blobBody;
    if (!blobBodyResponse) {
        return "";
    }
    const blobString = await blobBodyResponse.text();
    return blobString;
}
export function utf8ByteLength(str) {
    return new Blob([str]).size;
}
//# sourceMappingURL=BatchUtils-browser.mjs.map