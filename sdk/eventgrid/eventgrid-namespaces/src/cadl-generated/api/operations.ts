// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CloudEvent,
  PublishResult,
  ReceiveResult,
  AcknowledgeResult,
  ReleaseResult,
  RejectResult,
  RenewLocksResult,
} from "../models/models";
import {
  isUnexpected,
  EventGridContext as Client,
  AcknowledgeCloudEvents200Response,
  AcknowledgeCloudEventsDefaultResponse,
  PublishCloudEvent200Response,
  PublishCloudEventDefaultResponse,
  PublishCloudEvents200Response,
  PublishCloudEventsDefaultResponse,
  ReceiveCloudEvents200Response,
  ReceiveCloudEventsDefaultResponse,
  RejectCloudEvents200Response,
  RejectCloudEventsDefaultResponse,
  ReleaseCloudEvents200Response,
  ReleaseCloudEventsDefaultResponse,
  RenewCloudEventLocks200Response,
  RenewCloudEventLocksDefaultResponse,
} from "../rest/index";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";
import {
  PublishCloudEventOptionalParams,
  PublishCloudEventsOptionalParams,
  ReceiveCloudEventsOptionalParams,
  AcknowledgeCloudEventsOptionalParams,
  ReleaseCloudEventsOptionalParams,
  RejectCloudEventsOptionalParams,
  RenewCloudEventLocksOptionalParams,
} from "../models/options";

export function _publishCloudEventSend(
  context: Client,
  topicName: string,
  event: CloudEvent,
  options: PublishCloudEventOptionalParams = { requestOptions: {} },
): StreamableMethod<PublishCloudEvent200Response | PublishCloudEventDefaultResponse> {
  return context.path("/topics/{topicName}:publish", topicName).post({
    ...operationOptionsToRequestParameters(options),
    contentType: (options.contentType as any) ?? "application/cloudevents+json; charset=utf-8",
    body: {
      id: event["id"],
      source: event["source"],
      data: event["data"],
      data_base64:
        event["dataBase64"] !== undefined
          ? uint8ArrayToString(event["dataBase64"], "base64")
          : undefined,
      type: event["type"],
      time: event["time"]?.toISOString(),
      specversion: event["specversion"],
      dataschema: event["dataschema"],
      datacontenttype: event["datacontenttype"],
      subject: event["subject"],
    },
  }) as StreamableMethod<PublishCloudEvent200Response | PublishCloudEventDefaultResponse>;
}

export async function _publishCloudEventDeserialize(
  result: PublishCloudEvent200Response | PublishCloudEventDefaultResponse,
): Promise<PublishResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Publish a single Cloud Event to a namespace topic. */
export async function publishCloudEvent(
  context: Client,
  topicName: string,
  event: CloudEvent,
  options: PublishCloudEventOptionalParams = { requestOptions: {} },
): Promise<PublishResult> {
  const result = await _publishCloudEventSend(context, topicName, event, options);
  return _publishCloudEventDeserialize(result);
}

export function _publishCloudEventsSend(
  context: Client,
  topicName: string,
  events: CloudEvent[],
  options: PublishCloudEventsOptionalParams = { requestOptions: {} },
): StreamableMethod<PublishCloudEvents200Response | PublishCloudEventsDefaultResponse> {
  return context.path("/topics/{topicName}:publish", topicName).post({
    ...operationOptionsToRequestParameters(options),
    contentType:
      (options.contentType as any) ?? "application/cloudevents-batch+json; charset=utf-8",
    body: (events ?? []).map((p) => {
      return {
        id: p["id"],
        source: p["source"],
        data: p["data"],
        data_base64:
          p["dataBase64"] !== undefined ? uint8ArrayToString(p["dataBase64"], "base64") : undefined,
        type: p["type"],
        time: p["time"]?.toISOString(),
        specversion: p["specversion"],
        dataschema: p["dataschema"],
        datacontenttype: p["datacontenttype"],
        subject: p["subject"],
      };
    }),
  }) as StreamableMethod<PublishCloudEvents200Response | PublishCloudEventsDefaultResponse>;
}

export async function _publishCloudEventsDeserialize(
  result: PublishCloudEvents200Response | PublishCloudEventsDefaultResponse,
): Promise<PublishResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Publish a batch of Cloud Events to a namespace topic. */
export async function publishCloudEvents(
  context: Client,
  topicName: string,
  events: CloudEvent[],
  options: PublishCloudEventsOptionalParams = { requestOptions: {} },
): Promise<PublishResult> {
  const result = await _publishCloudEventsSend(context, topicName, events, options);
  return _publishCloudEventsDeserialize(result);
}

export function _receiveCloudEventsSend(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  options: ReceiveCloudEventsOptionalParams = { requestOptions: {} },
): StreamableMethod<ReceiveCloudEvents200Response | ReceiveCloudEventsDefaultResponse> {
  return context
    .path(
      "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:receive",
      topicName,
      eventSubscriptionName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        maxEvents: options?.maxEvents,
        maxWaitTime: options?.maxWaitTime,
      },
    });
}

export async function _receiveCloudEventsDeserialize(
  result: ReceiveCloudEvents200Response | ReceiveCloudEventsDefaultResponse,
): Promise<ReceiveResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    details: result.body["value"].map((p) => ({
      brokerProperties: {
        lockToken: p.brokerProperties["lockToken"],
        deliveryCount: p.brokerProperties["deliveryCount"],
      },
      event: {
        id: p.event["id"],
        source: p.event["source"],
        data: p.event["data"],
        dataBase64:
          typeof p.event["data_base64"] === "string"
            ? stringToUint8Array(p.event["data_base64"], "base64")
            : p.event["data_base64"],
        type: p.event["type"],
        time: p.event["time"] !== undefined ? new Date(p.event["time"]) : undefined,
        specversion: p.event["specversion"],
        dataschema: p.event["dataschema"],
        datacontenttype: p.event["datacontenttype"],
        subject: p.event["subject"],
      },
    })),
  };
}

/** Receive a batch of Cloud Events from a subscription. */
export async function receiveCloudEvents(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  options: ReceiveCloudEventsOptionalParams = { requestOptions: {} },
): Promise<ReceiveResult> {
  const result = await _receiveCloudEventsSend(context, topicName, eventSubscriptionName, options);
  return _receiveCloudEventsDeserialize(result);
}

export function _acknowledgeCloudEventsSend(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  lockTokens: string[],
  options: AcknowledgeCloudEventsOptionalParams = { requestOptions: {} },
): StreamableMethod<AcknowledgeCloudEvents200Response | AcknowledgeCloudEventsDefaultResponse> {
  return context
    .path(
      "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:acknowledge",
      topicName,
      eventSubscriptionName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { lockTokens: lockTokens },
    });
}

export async function _acknowledgeCloudEventsDeserialize(
  result: AcknowledgeCloudEvents200Response | AcknowledgeCloudEventsDefaultResponse,
): Promise<AcknowledgeResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    failedLockTokens: result.body["failedLockTokens"].map((p) => ({
      lockToken: p["lockToken"],
      error: p.error,
    })),
    succeededLockTokens: result.body["succeededLockTokens"],
  };
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

export function _releaseCloudEventsSend(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  lockTokens: string[],
  options: ReleaseCloudEventsOptionalParams = { requestOptions: {} },
): StreamableMethod<ReleaseCloudEvents200Response | ReleaseCloudEventsDefaultResponse> {
  return context
    .path(
      "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:release",
      topicName,
      eventSubscriptionName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        releaseDelayInSeconds: options?.releaseDelayInSeconds,
      },
      body: { lockTokens: lockTokens },
    });
}

export async function _releaseCloudEventsDeserialize(
  result: ReleaseCloudEvents200Response | ReleaseCloudEventsDefaultResponse,
): Promise<ReleaseResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    failedLockTokens: result.body["failedLockTokens"].map((p) => ({
      lockToken: p["lockToken"],
      error: p.error,
    })),
    succeededLockTokens: result.body["succeededLockTokens"],
  };
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

export function _rejectCloudEventsSend(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  lockTokens: string[],
  options: RejectCloudEventsOptionalParams = { requestOptions: {} },
): StreamableMethod<RejectCloudEvents200Response | RejectCloudEventsDefaultResponse> {
  return context
    .path(
      "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:reject",
      topicName,
      eventSubscriptionName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { lockTokens: lockTokens },
    });
}

export async function _rejectCloudEventsDeserialize(
  result: RejectCloudEvents200Response | RejectCloudEventsDefaultResponse,
): Promise<RejectResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    failedLockTokens: result.body["failedLockTokens"].map((p) => ({
      lockToken: p["lockToken"],
      error: p.error,
    })),
    succeededLockTokens: result.body["succeededLockTokens"],
  };
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

export function _renewCloudEventLocksSend(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  lockTokens: string[],
  options: RenewCloudEventLocksOptionalParams = { requestOptions: {} },
): StreamableMethod<RenewCloudEventLocks200Response | RenewCloudEventLocksDefaultResponse> {
  return context
    .path(
      "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:renewLock",
      topicName,
      eventSubscriptionName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { lockTokens: lockTokens },
    });
}

export async function _renewCloudEventLocksDeserialize(
  result: RenewCloudEventLocks200Response | RenewCloudEventLocksDefaultResponse,
): Promise<RenewLocksResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    failedLockTokens: result.body["failedLockTokens"].map((p) => ({
      lockToken: p["lockToken"],
      error: p.error,
    })),
    succeededLockTokens: result.body["succeededLockTokens"],
  };
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
