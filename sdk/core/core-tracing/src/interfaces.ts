// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { SpanOptions } from "@opentelemetry/types";

/**
 * Tracing options to set on an operation.
 */
export interface OperationTracingOptions {
    /**
     * OpenTelemetry SpanOptions used to create a span when tracing is enabled.
     */
    spanOptions?: SpanOptions
}