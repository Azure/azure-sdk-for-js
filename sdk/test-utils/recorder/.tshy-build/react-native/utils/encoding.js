// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export const encodeBase64 = (data) => Buffer.from(data).toString("base64");
export const decodeBase64 = (data) => Buffer.from(data, "base64").toString("ascii");
//# sourceMappingURL=encoding.js.map