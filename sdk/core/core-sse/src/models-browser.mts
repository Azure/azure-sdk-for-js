// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventMessage } from "./modelsCommon.js";

export * from "./modelsCommon.js";

/**
 * A stream of event messages
 */
export type EventMessageStream = ReadableStream<EventMessage> & AsyncIterable<EventMessage>;

export type NodeJSReadableStream = never;
