// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Node-specific types re-exported for cross-platform use.
// Browser and react-native variants export `never` for these types,
// making cross-platform union types self-contained in each platform's .d.ts output.

/** The Node.js Buffer type. Resolves to `never` in browser/react-native builds. */
export type NodeBuffer = Buffer;

/** The Node.js ReadableStream type. Resolves to `never` in browser/react-native builds. */
export type NodeReadableStream = NodeJS.ReadableStream;
