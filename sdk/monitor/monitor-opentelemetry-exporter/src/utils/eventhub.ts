// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SpanKind } from "@opentelemetry/api";
import { hrTimeToMilliseconds } from "@opentelemetry/core";
import { GeneralAttribute } from "@opentelemetry/semantic-conventions";
import { ReadableSpan } from "@opentelemetry/tracing";
import { Envelope } from "../Declarations/Contracts";
import { TIME_SINCE_ENQUEUED, ENQUEUED_TIME } from "./constants/applicationinsights";
import {
  AzNamespace,
  MessageBusDestination,
  MicrosoftEventHub
} from "./constants/span/azAttributes";

/**
 * Average span.links[].attributes.enqueuedTime
 */
const getTimeSinceEnqueued = (span: ReadableSpan) => {
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
 */
export const parseEventHubSpan = (span: ReadableSpan, envelope: Envelope): void => {
  if (!envelope.data?.baseData) return;

  const namespace = span.attributes[AzNamespace] as typeof MicrosoftEventHub;
  const peerAddress = ((span.attributes[GeneralAttribute.NET_PEER_ADDRESS] ||
    span.attributes["peer.address"] ||
    "unknown") as string).replace(/\/$/g, ""); // remove trailing "/"
  const messageBusDestination = (span.attributes[MessageBusDestination] || "unknown") as string;

  switch (span.kind) {
    case SpanKind.CLIENT:
      envelope.data.baseData.type = namespace;
      envelope.data.baseData.target = `${peerAddress}/${messageBusDestination}`;
      break;
    case SpanKind.PRODUCER:
      envelope.data.baseData.type = `Queue Message | ${namespace}`;
      envelope.data.baseData.target = `${peerAddress}/${messageBusDestination}`;
      break;
    case SpanKind.CONSUMER:
      envelope.data.baseData.type = `Queue Message | ${namespace}`;
      envelope.data.baseData.source = `${peerAddress}/${messageBusDestination}`;
      envelope.data.baseData.measurements = {
        ...envelope.data.baseData.measurements,
        [TIME_SINCE_ENQUEUED]: getTimeSinceEnqueued(span)
      };
      break;
    default: // no op
  }
};
