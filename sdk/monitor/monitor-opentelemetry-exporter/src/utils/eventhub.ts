// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SpanKind } from "@opentelemetry/api";
import { hrTimeToMilliseconds } from "@opentelemetry/core";
import { SEMATTRS_NET_PEER_NAME } from "@opentelemetry/semantic-conventions";
import type { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import type { RemoteDependencyData, RequestData } from "../generated/index.js";
import { TIME_SINCE_ENQUEUED, ENQUEUED_TIME } from "./constants/applicationinsights.js";
import type { MicrosoftEventHub } from "./constants/span/azAttributes.js";
import { AzNamespace, MessageBusDestination } from "./constants/span/azAttributes.js";

/**
 * Average span.links[].attributes.enqueuedTime
 */
const getTimeSinceEnqueued = (span: ReadableSpan): number => {
  let countEnqueueDiffs = 0;
  let sumEnqueueDiffs = 0;
  const startTimeMs = hrTimeToMilliseconds(span.startTime);

  span.links.forEach(({ attributes }) => {
    const enqueuedTime = attributes?.[ENQUEUED_TIME] as string | number;
    if (enqueuedTime) {
      countEnqueueDiffs += 1;
      sumEnqueueDiffs += startTimeMs - (parseFloat(enqueuedTime.toString()) || 0);
    }
  });

  return Math.max(sumEnqueueDiffs / (countEnqueueDiffs || 1), 0);
};

/**
 * Implementation of Mapping to Azure Monitor
 *
 * https://gist.github.com/lmolkova/e4215c0f44a49ef824983382762e6b92#mapping-to-azure-monitor-application-insights-telemetry
 * @internal
 */
export const parseEventHubSpan = (
  span: ReadableSpan,
  baseData: RequestData | RemoteDependencyData,
): void => {
  const namespace = span.attributes[AzNamespace] as typeof MicrosoftEventHub;
  const peerAddress = (
    (span.attributes[SEMATTRS_NET_PEER_NAME] ||
      span.attributes["peer.address"] ||
      "unknown") as string
  ).replace(/\/$/g, ""); // remove trailing "/"
  const messageBusDestination = (span.attributes[MessageBusDestination] || "unknown") as string;

  const dependencyData = baseData as RemoteDependencyData;

  switch (span.kind) {
    case SpanKind.CLIENT:
      dependencyData.type = namespace;
      dependencyData.target = `${peerAddress}/${messageBusDestination}`;
      break;
    case SpanKind.PRODUCER:
      dependencyData.type = `Queue Message | ${namespace}`;
      dependencyData.target = `${peerAddress}/${messageBusDestination}`;
      break;
    case SpanKind.CONSUMER:
      dependencyData.type = `Queue Message | ${namespace}`;
      (dependencyData as any).source = `${peerAddress}/${messageBusDestination}`;
      dependencyData.measurements = {
        ...dependencyData.measurements,
        [TIME_SINCE_ENQUEUED]: getTimeSinceEnqueued(span),
      };
      break;
    default: // no op
  }
};
