// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/// <reference path="./node-events.d.ts" />

/**
 * EventEmitter for browser builds.
 *
 * Browser users must configure their bundler to alias "node:events"
 * to a compatible EventEmitter polyfill (e.g., eventemitter3).
 *
 * @example Vite/Webpack configuration:
 * ```js
 * resolve: { alias: { "node:events": "eventemitter3" } }
 * ```
 */
export { EventEmitter } from "node:events";


