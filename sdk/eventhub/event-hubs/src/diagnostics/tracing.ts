// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient, TracingSpanOptions, TracingSpanKind } from "@azure/core-tracing";
import { EventHubConnectionConfig } from "../eventhubConnectionConfig";
import { packageJsonInfo } from "../util/constants";

/**
 * The {@link TracingClient} that is used to add tracing spans.
 */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.EventHub",
  packageName: packageJsonInfo.name,
  packageVersion: packageJsonInfo.version,
});

/**
 * Creates {@link TracingSpanOptions} from the provided data.
 * @param eventHubConfig - The configuration object containing initial attributes to set on the span.
 * @param spanKind - The {@link TracingSpanKind} for the newly created span.
 * @returns a {@link TracingSpanOptions} that can be passed to a {@link TracingClient}
 */
export function toSpanOptions(
  eventHubConfig: Pick<EventHubConnectionConfig, "entityPath" | "host">,
  spanKind?: TracingSpanKind
): TracingSpanOptions {
  const spanOptions: TracingSpanOptions = {
    spanAttributes: {
      "message_bus.destination": eventHubConfig.entityPath,
      "peer.address": eventHubConfig.host,
    },
  };
  if (spanKind) {
    spanOptions.spanKind = spanKind;
  }
  return spanOptions;
}
