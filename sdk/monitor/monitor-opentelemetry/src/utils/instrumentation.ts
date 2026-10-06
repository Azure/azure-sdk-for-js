// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Instrumentation, InstrumentationConfig } from "@opentelemetry/instrumentation";

/**
 * Reuse module hooks across SDK lifetimes: new hooks cannot reliably patch
 * libraries that have already been loaded. NodeSDK supplies the new providers
 * before enabling the returned instrumentation.
 */
export function configureInstrumentation<T extends InstrumentationConfig>(
  cache: Map<string, Instrumentation> | undefined,
  name: string,
  config: T,
  create: (config: T) => Instrumentation,
): Instrumentation {
  if (!cache) {
    return create(config);
  }
  const deferredConfig = { ...config, enabled: false };
  let instrumentation = cache.get(name);
  if (instrumentation) {
    instrumentation.setConfig(deferredConfig);
  } else {
    instrumentation = create(deferredConfig);
    cache.set(name, instrumentation);
  }
  return instrumentation;
}
