// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const isNode8 = process.versions.node[0] === "8";
export const Node8NotSupportedError = new Error("Node 8 does not support persistence caching.");
