// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridContext as Client } from "./index.js";
import {
  CloudEvent,
  cloudEventSerializer,
  PublishResult,
  publishResultDeserializer,
  ReceiveResult,
  receiveResultDeserializer,
  AcknowledgeResult,
  acknowledgeResultDeserializer,
  ReleaseResult,
  releaseResultDeserializer,
  RejectResult,
  rejectResultDeserializer,
  RenewLocksResult,
  renewLocksResultDeserializer,
  cloudEventArraySerializer,
} from "../models/models.js";
import {
  RenewCloudEventLocksOptionalParams,
  RejectCloudEventsOptionalParams,
  ReleaseCloudEventsOptionalParams,
  AcknowledgeCloudEventsOptionalParams,
  ReceiveCloudEventsOptionalParams,
  PublishCloudEventsOptionalParams,
  PublishCloudEventOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _renewCloudEventLocksSend(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  lockTokens: string[],
  options: RenewCloudEventLocksOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:renewLock{?api%2Dversion}",
    {
      topicName: topicName,
      eventSubscriptionName: eventSubscriptionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: {
      lockTokens: lockTokens.map((p: any) => {
        return p;
      }),
    },
  });
}

export async function _renewCloudEventLocksDeserialize(
  result: PathUncheckedResponse,
): Promise<RenewLocksResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return renewLocksResultDeserializer(result.body);
}

/** Renew locks for a batch of Cloud Events. The response will include the set of successfully renewed lock tokens, along with other failed lock tokens with their corresponding error information. Successfully renewed locks will ensure that the associated event is only available to the consumer that holds the renewed lock. */
export async function renewCloudEventLocks(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  lockTokens: string[],
  options: RenewCloudEventLocksOptionalParams = { requestOptions: {} },
): Promise<RenewLocksResult> {
  const result = await _renewCloudEventLocksSend(
    context,
    topicName,
    eventSubscriptionName,
    lockTokens,
    options,
  );
  return _renewCloudEventLocksDeserialize(result);
}

export function _rejectCloudEventsSend(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  lockTokens: string[],
  options: RejectCloudEventsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:reject{?api%2Dversion}",
    {
      topicName: topicName,
      eventSubscriptionName: eventSubscriptionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: {
      lockTokens: lockTokens.map((p: any) => {
        return p;
      }),
    },
  });
}

export async function _rejectCloudEventsDeserialize(
  result: PathUncheckedResponse,
): Promise<RejectResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return rejectResultDeserializer(result.body);
}

/** Reject a batch of Cloud Events. The response will include the set of successfully rejected lock tokens, along with other failed lock tokens with their corresponding error information. Successfully rejected events will be dead-lettered and can no longer be received by a consumer. */
export async function rejectCloudEvents(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  lockTokens: string[],
  options: RejectCloudEventsOptionalParams = { requestOptions: {} },
): Promise<RejectResult> {
  const result = await _rejectCloudEventsSend(
    context,
    topicName,
    eventSubscriptionName,
    lockTokens,
    options,
  );
  return _rejectCloudEventsDeserialize(result);
}

export function _releaseCloudEventsSend(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  lockTokens: string[],
  options: ReleaseCloudEventsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:release{?api%2Dversion,releaseDelayInSeconds}",
    {
      topicName: topicName,
      eventSubscriptionName: eventSubscriptionName,
      "api%2Dversion": context.apiVersion,
      releaseDelayInSeconds: options?.releaseDelayInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: {
      lockTokens: lockTokens.map((p: any) => {
        return p;
      }),
    },
  });
}

export async function _releaseCloudEventsDeserialize(
  result: PathUncheckedResponse,
): Promise<ReleaseResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return releaseResultDeserializer(result.body);
}

/** Release a batch of Cloud Events. The response will include the set of successfully released lock tokens, along with other failed lock tokens with their corresponding error information. Successfully released events can be received by consumers. */
export async function releaseCloudEvents(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  lockTokens: string[],
  options: ReleaseCloudEventsOptionalParams = { requestOptions: {} },
): Promise<ReleaseResult> {
  const result = await _releaseCloudEventsSend(
    context,
    topicName,
    eventSubscriptionName,
    lockTokens,
    options,
  );
  return _releaseCloudEventsDeserialize(result);
}

export function _acknowledgeCloudEventsSend(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  lockTokens: string[],
  options: AcknowledgeCloudEventsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:acknowledge{?api%2Dversion}",
    {
      topicName: topicName,
      eventSubscriptionName: eventSubscriptionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: {
      lockTokens: lockTokens.map((p: any) => {
        return p;
      }),
    },
  });
}

export async function _acknowledgeCloudEventsDeserialize(
  result: PathUncheckedResponse,
): Promise<AcknowledgeResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return acknowledgeResultDeserializer(result.body);
}

/** Acknowledge a batch of Cloud Events. The response will include the set of successfully acknowledged lock tokens, along with other failed lock tokens with their corresponding error information. Successfully acknowledged events will no longer be available to be received by any consumer. */
export async function acknowledgeCloudEvents(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  lockTokens: string[],
  options: AcknowledgeCloudEventsOptionalParams = { requestOptions: {} },
): Promise<AcknowledgeResult> {
  const result = await _acknowledgeCloudEventsSend(
    context,
    topicName,
    eventSubscriptionName,
    lockTokens,
    options,
  );
  return _acknowledgeCloudEventsDeserialize(result);
}

export function _receiveCloudEventsSend(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  options: ReceiveCloudEventsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:receive{?api%2Dversion,maxEvents,maxWaitTime}",
    {
      topicName: topicName,
      eventSubscriptionName: eventSubscriptionName,
      "api%2Dversion": context.apiVersion,
      maxEvents: options?.maxEvents,
      maxWaitTime: options?.maxWaitTime,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _receiveCloudEventsDeserialize(
  result: PathUncheckedResponse,
): Promise<ReceiveResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return receiveResultDeserializer(result.body);
}

/** Receive a batch of Cloud Events from a subscription. */
export async function receiveCloudEvents(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  options: ReceiveCloudEventsOptionalParams = { requestOptions: {} },
): Promise<ReceiveResult> {
  const result = await _receiveCloudEventsSend(
    context,
    topicName,
    eventSubscriptionName,
    options,
  );
  return _receiveCloudEventsDeserialize(result);
}

export function _publishCloudEventsSend(
  context: Client,
  topicName: string,
  events: CloudEvent[],
  options: PublishCloudEventsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/topics/{topicName}:publish{?api%2Dversion}",
    {
      topicName: topicName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/cloudevents-batch+json; charset=utf-8",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: cloudEventArraySerializer(events),
    });
}

export async function _publishCloudEventsDeserialize(
  result: PathUncheckedResponse,
): Promise<PublishResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return publishResultDeserializer(result.body);
}

/** Publish a batch of Cloud Events to a namespace topic. */
export async function publishCloudEvents(
  context: Client,
  topicName: string,
  events: CloudEvent[],
  options: PublishCloudEventsOptionalParams = { requestOptions: {} },
): Promise<PublishResult> {
  const result = await _publishCloudEventsSend(
    context,
    topicName,
    events,
    options,
  );
  return _publishCloudEventsDeserialize(result);
}

export function _publishCloudEventSend(
  context: Client,
  topicName: string,
  event: CloudEvent,
  options: PublishCloudEventOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/topics/{topicName}:publish{?api%2Dversion}",
    {
      topicName: topicName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/cloudevents+json; charset=utf-8",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: cloudEventSerializer(event),
    });
}

export async function _publishCloudEventDeserialize(
  result: PathUncheckedResponse,
): Promise<PublishResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return publishResultDeserializer(result.body);
}

/** Publish a single Cloud Event to a namespace topic. */
export async function publishCloudEvent(
  context: Client,
  topicName: string,
  event: CloudEvent,
  options: PublishCloudEventOptionalParams = { requestOptions: {} },
): Promise<PublishResult> {
  const result = await _publishCloudEventSend(
    context,
    topicName,
    event,
    options,
  );
  return _publishCloudEventDeserialize(result);
}
