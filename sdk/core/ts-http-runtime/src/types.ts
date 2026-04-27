// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Re-export of `NodeJS.ReadableStream` for use in platform-neutral code.
 *
 * @public
 */
export type NodeReadableStream = NodeJS.ReadableStream;

/**
 * Re-export of `Buffer` for use in platform-neutral code.
 *
 * @public
 */
export type NodeBuffer = Buffer;

/**
 * Re-export of the Web `ReadableStream` for use in platform-neutral code.
 *
 * @public
 */
export type WebReadableStream<R = any> = ReadableStream<R>;
