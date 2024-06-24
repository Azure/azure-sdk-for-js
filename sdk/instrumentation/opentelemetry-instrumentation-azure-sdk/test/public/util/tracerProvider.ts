// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BasicTracerProvider, NodeTracerProvider } from "@opentelemetry/sdk-trace-node";

import { isNodeLike } from "@azure/core-util";

export const tracerProvider = isNodeLike ? new NodeTracerProvider() : new BasicTracerProvider();
