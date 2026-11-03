// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Type alias for Node.js ReadableStream.
 * On Node targets this resolves to the actual NodeJS.ReadableStream type.
 * On browser/react-native targets the platform variant resolves to `never`,
 * which drops out of union types naturally.
 */
export type NodeReadableStream = NodeJS.ReadableStream;
