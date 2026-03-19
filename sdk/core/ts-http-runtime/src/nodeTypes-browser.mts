// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Browser stub: node-specific types resolve to `never` so that
// cross-platform union types are self-contained without @types/node.

/** Resolves to `never` in browser builds. */
export type NodeBuffer = never;

/** Resolves to `never` in browser builds. */
export type NodeReadableStream = never;
