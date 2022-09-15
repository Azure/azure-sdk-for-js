// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient, TracingSpanOptions, TracingSpanKind } from "@azure/core-tracing";
import { ConnectionConfig } from "@azure/core-amqp";
import { packageJsonInfo } from "../util/constants";

/**
 * The {@link TracingClient} that is used to add tracing spans.
 */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.ServiceBus",
  packageName: packageJsonInfo.name,
  packageVersion: packageJsonInfo.version,
});

/**
 * Creates {@link TracingSpanOptions} from the provided data.
 * @param serviceBusConfig - The configuration object containing initial attributes to set on the span.
 * @param spanKind - The {@link TracingSpanKind} for the newly created span.
 * @returns a {@link TracingSpanOptions} that can be passed to a {@link TracingClient}
 */
export function toSpanOptions(
  serviceBusConfig: Pick<ConnectionConfig, "host"> & { entityPath: string },
  spanKind?: TracingSpanKind
): TracingSpanOptions {
  const spanOptions: TracingSpanOptions = {
    spanAttributes: {
      "message_bus.destination": serviceBusConfig.entityPath,
      "peer.address": serviceBusConfig.host,
    },
  };
  if (spanKind) {
    spanOptions.spanKind = spanKind;
  }
  return spanOptions;
}
