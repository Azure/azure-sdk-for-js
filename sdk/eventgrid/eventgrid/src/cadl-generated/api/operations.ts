// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestOptions } from "../common/interfaces";
import { CloudEvent, EventGridContext as Client, isUnexpected } from "../rest/index";
import { ReceiveResult, AcknowledgeResult, ReleaseResult, RejectResult } from "./models";

export interface PublishCloudEventOptions extends RequestOptions {
  /** content type */
  contentType?: string;
}

/** Publish Single Cloud Event to namespace topic. In case of success, the server responds with an HTTP 200 status code with an empty JSON object in response. Otherwise, the server can return various error codes. For example, 401: which indicates authorization failure, 403: which indicates quota exceeded or message is too large, 410: which indicates that specific topic is not found, 400: for bad request, and 500: for internal server error. */
export async function publishCloudEvent(
  context: Client,
  event: CloudEvent,
  topicName: string,
  options: PublishCloudEventOptions = { requestOptions: {} }
): Promise<Record<string, any>> {
  const result = await context.path("/topics/{topicName}:publish", topicName).post({
    allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
    skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
    contentType: (options.contentType as any) ?? "application/cloudevents+json; charset=utf-8",
    headers: { ...options.requestOptions?.headers },
    body: { ...event },
  });

  if (typeof options.requestOptions?.onResponse === "function") {
    options.requestOptions.onResponse(result);
  }

  if (isUnexpected(result)) {
    throw result.body;
  }

  return result.body;
}

export interface PublishCloudEventsOptions extends RequestOptions {
  /** content type */
  contentType?: string;
}

/** Publish Batch Cloud Event to namespace topic. In case of success, the server responds with an HTTP 200 status code with an empty JSON object in response. Otherwise, the server can return various error codes. For example, 401: which indicates authorization failure, 403: which indicates quota exceeded or message is too large, 410: which indicates that specific topic is not found, 400: for bad request, and 500: for internal server error. */
export async function publishCloudEvents(
  context: Client,
  events: CloudEvent[],
  topicName: string,
  options: PublishCloudEventsOptions = { requestOptions: {} }
): Promise<Record<string, any>> {
  const result = await context.path("/topics/{topicName}:publish", topicName).post({
    allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
    skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
    contentType:
      (options.contentType as any) ?? "application/cloudevents-batch+json; charset=utf-8",
    headers: { ...options.requestOptions?.headers },
    body: events,
  });

  if (typeof options.requestOptions?.onResponse === "function") {
    options.requestOptions.onResponse(result);
  }

  if (isUnexpected(result)) {
    throw result.body;
  }

  return result.body;
}

export interface ReceiveCloudEventsOptions extends RequestOptions {
  /** Max Events count to be received. Minimum value is 1, while maximum value is 100 events. If not specified, the default value is 1. */
  maxEvents?: number;
  /** Max wait time value for receive operation in Seconds. It is the time in seconds that the server approximately waits for the availability of an event and responds to the request. If an event is available, the broker responds immediately to the client. Minimum value is 10 seconds, while maximum value is 120 seconds. If not specified, the default value is 60 seconds. */
  maxWaitTime?: number;
}

/** Receive Batch of Cloud Events from the Event Subscription. */
export async function receiveCloudEvents<T>(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  options: ReceiveCloudEventsOptions = { requestOptions: {} }
): Promise<ReceiveResult<T>> {
  const result = await context
    .path(
      "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:receive",
      topicName,
      eventSubscriptionName
    )
    .post({
      allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
      skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
      headers: { ...options.requestOptions?.headers },
      queryParameters: {
        ...(options.maxEvents && { maxEvents: options.maxEvents }),
        ...(options.maxWaitTime && { maxWaitTime: options.maxWaitTime }),
      },
    });

  if (typeof options.requestOptions?.onResponse === "function") {
    options.requestOptions.onResponse(result);
  }

  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body["value"] ?? []).map((p) => ({
      brokerProperties: {
        lockToken: p.brokerProperties["lockToken"],
        deliveryCount: p.brokerProperties["deliveryCount"],
      },
      event: {
        id: p.event["id"],
        source: p.event["source"],
        data: p.event["data"],
        dataBase64: p.event["data_base64"],
        type: p.event["type"],
        time: new Date(p.event["time"] ?? ""),
        specversion: p.event["specversion"],
        dataschema: p.event["dataschema"],
        datacontenttype: p.event["datacontenttype"],
        subject: p.event["subject"],
      },
    })),
  };
}

export interface AcknowledgeCloudEventsOptions extends RequestOptions {
  /** content type */
  contentType?: string;
}

/** Acknowledge batch of Cloud Events. The server responds with an HTTP 200 status code if at least one event is successfully acknowledged. The response body will include the set of successfully acknowledged lockTokens, along with other failed lockTokens with their corresponding error information. Successfully acknowledged events will no longer be available to any consumer. */
export async function acknowledgeCloudEvents(
  context: Client,
  lockTokens: string[],
  topicName: string,
  eventSubscriptionName: string,
  options: AcknowledgeCloudEventsOptions = { requestOptions: {} }
): Promise<AcknowledgeResult> {
  const result = await context
    .path(
      "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:acknowledge",
      topicName,
      eventSubscriptionName
    )
    .post({
      allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
      skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
      contentType: (options.contentType as any) ?? "application/json; charset=utf-8",
      headers: { ...options.requestOptions?.headers },
      body: { lockTokens: lockTokens },
    });

  if (typeof options.requestOptions?.onResponse === "function") {
    options.requestOptions.onResponse(result);
  }

  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    failedLockTokens: (result.body["failedLockTokens"] ?? []).map((p) => ({
      lockToken: p["lockToken"],
      errorCode: p["errorCode"],
      errorDescription: p["errorDescription"],
    })),
    succeededLockTokens: result.body["succeededLockTokens"],
  };
}

export interface ReleaseCloudEventsOptions extends RequestOptions {
  /** content type */
  contentType?: string;
}

/** Release batch of Cloud Events. The server responds with an HTTP 200 status code if at least one event is successfully released. The response body will include the set of successfully released lockTokens, along with other failed lockTokens with their corresponding error information. */
export async function releaseCloudEvents(
  context: Client,
  lockTokens: string[],
  topicName: string,
  eventSubscriptionName: string,
  options: ReleaseCloudEventsOptions = { requestOptions: {} }
): Promise<ReleaseResult> {
  const result = await context
    .path(
      "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:release",
      topicName,
      eventSubscriptionName
    )
    .post({
      allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
      skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
      contentType: (options.contentType as any) ?? "application/json; charset=utf-8",
      headers: { ...options.requestOptions?.headers },
      body: { lockTokens: lockTokens },
    });

  if (typeof options.requestOptions?.onResponse === "function") {
    options.requestOptions.onResponse(result);
  }

  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    failedLockTokens: (result.body["failedLockTokens"] ?? []).map((p) => ({
      lockToken: p["lockToken"],
      errorCode: p["errorCode"],
      errorDescription: p["errorDescription"],
    })),
    succeededLockTokens: result.body["succeededLockTokens"],
  };
}

export interface RejectCloudEventsOptions extends RequestOptions {
  /** content type */
  contentType?: string;
}

/** Reject batch of Cloud Events. */
export async function rejectCloudEvents(
  context: Client,
  lockTokens: string[],
  topicName: string,
  eventSubscriptionName: string,
  options: RejectCloudEventsOptions = { requestOptions: {} }
): Promise<RejectResult> {
  const result = await context
    .path(
      "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:reject",
      topicName,
      eventSubscriptionName
    )
    .post({
      allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
      skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
      contentType: (options.contentType as any) ?? "application/json; charset=utf-8",
      headers: { ...options.requestOptions?.headers },
      body: { lockTokens: lockTokens },
    });

  if (typeof options.requestOptions?.onResponse === "function") {
    options.requestOptions.onResponse(result);
  }

  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    failedLockTokens: (result.body["failedLockTokens"] ?? []).map((p) => ({
      lockToken: p["lockToken"],
      errorCode: p["errorCode"],
      errorDescription: p["errorDescription"],
    })),
    succeededLockTokens: result.body["succeededLockTokens"],
  };
}
