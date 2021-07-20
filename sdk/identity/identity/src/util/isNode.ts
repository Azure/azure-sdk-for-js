// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A constant that indicates whether the environment is node.js or browser based.
 */
export const isNode = !!process?.version && !!process?.versions?.node;
