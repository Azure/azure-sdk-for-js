// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Re-export of `NodeJS.ReadableStream` for use in platform-neutral code.
 * Browser and React Native builds alias this to `never`.
 */
export type NodeReadableStream = NodeJS.ReadableStream;
