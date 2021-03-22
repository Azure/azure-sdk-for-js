// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO:
// Either drop Node 8 or re-enable it.
// Also TODO, re-enable Node 15 asap.

export const isNode8 = process.versions.node[0] === "8";
export const Node8NotSupportedError = new Error("Node 8 does not support persistence caching.");

export const isNode15 = process.versions.node.slice(0, 2) === "15";
export const Node15NotSupportedError = new Error("Node 15 does not support persistence caching.");
