// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// The interfaces in this file should be kept in sync with those
// found in the `@azure/core-tracing` package.

/**
 * An interface structurally compatible with OpenTelemetry.
 */
export interface Context {
  /**
   * Get a value from the context.
   *
   * @param key - key which identifies a context value
   */
  getValue(key: symbol): unknown;
  /**
   * Create a new context which inherits from this context and has
   * the given key set to the given value.
   *
   * @param key - context key for which to set the value
   * @param value - value to set for the given key
   */
  setValue(key: symbol, value: unknown): Context;
  /**
   * Return a new context which inherits from this context but does
   * not contain a value for the given key.
   *
   * @param key - context key for which to clear a value
   */
  deleteValue(key: symbol): Context;
}
