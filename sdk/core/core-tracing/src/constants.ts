// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** @internal */
export const TRACING_CONTEXT_SPAN_KEY = Symbol.for("@azure/core-tracing span");

/**
 * The key for the az.namespace entry in a {@link TracingContext}
 */
export const TRACING_CONTEXT_NAMESPACE_KEY = Symbol.for("@azure/core-tracing namespace");

/** @internal */
export const TRACING_CONTEXT_CLIENT_KEY = Symbol.for("@azure/core-tracing client");
