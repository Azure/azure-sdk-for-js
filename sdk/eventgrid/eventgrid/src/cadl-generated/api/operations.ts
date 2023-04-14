// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestOptions } from "../common/interfaces.js";
import { isUnexpected } from "../rest/index.js";
import { CloudEventEvent, ReceiveResponse, LockToken, LockTokensResponse } from "./models.js";
import { Client } from "@azure-rest/core-client";

export interface PublishCloudEventOptions extends RequestOptions {
  /** Event data specific to the event type. */
  data?: object;
  /** Event data specific to the event type, encoded as a base64 string. */
  dataBase64?: string;
  /** The time (in UTC) the event was generated, in RFC3339 format. */
  time?: Date;
  /** Identifies the schema that data adheres to. */
  dataschema?: string;
  /** Content type of data value. */
  datacontenttype?: string;
  /** This describes the subject of the event in the context of the event producer (identified by source). */
  subject?: string;
  /** content type */
  contentType?: string;
}

/** Publish Single Cloud Event to namespace topic. */
export async function publishCloudEvent(
  context: Client,
  id: string,
  source: string,
  type: string,
  specversion: string,
  topicName: string,
  options: PublishCloudEventOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/topics/{topicName}:publish", topicName).post({
    contentType: (options.contentType as any) ?? "application/cloudevents+json; charset=utf-8",
    body: {
      id: id,
      source: source,
      ...(options.data && { data: options.data }),
      ...(options.dataBase64 && { data_base64: options.dataBase64 }),
      type: type,
      ...(options.time && { time: options.time }),
      specversion: specversion,
      ...(options.dataschema && { dataschema: options.dataschema }),
      ...(options.datacontenttype && {
        datacontenttype: options.datacontenttype,
      }),
      ...(options.subject && { subject: options.subject }),
    },
  });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

export interface publishCloudEventsOptions extends RequestOptions {
  /** content type */
  contentType?: string;
}

/** Publish Batch of Cloud Events to namespace topic. */
export async function publishCloudEvents(
  context: Client,
  events: CloudEventEvent[],
  topicName: string,
  options: publishCloudEventsOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/topics/{topicName}:publish", topicName).post({
    contentType:
      (options.contentType as any) ?? "application/cloudevents-batch+json; charset=utf-8",
    body: events,
  });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

export interface receiveCloudEventsOptions extends RequestOptions {
  /** Max Events count to be received. */
  maxEvents?: number;
  /** Timeout value for receive operation in Seconds. Default is 60 seconds. */
  timeout?: number;
  /** Accept header. */
  accept?: "application/json";
}

/** Receive Batch of Cloud Events from the Event Subscription. */
export async function receiveCloudEvents(
  context: Client,
  topicName: string,
  eventSubscriptionName: string,
  options: receiveCloudEventsOptions = { requestOptions: {} }
): Promise<ReceiveResponse> {
  const result = await context
    .path(
      "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:receive",
      topicName,
      eventSubscriptionName
    )
    .post({
      headers: {
        Accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: {
        ...(options.maxEvents && { maxEvents: options.maxEvents }),
        ...(options.timeout && { timeout: options.timeout }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body["value"] ?? []).map((p: any) => ({
      brokerProperties: {
        lockToken: { lockToken: p.brokerProperties.lockToken["lockToken"] },
      },
      event: {
        id: p.event["id"],
        source: p.event["source"],
        data: !p.event.data ? undefined : {},
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

export interface acknowledgeCloudEventsOptions extends RequestOptions {
  /** content type */
  contentType?: string;
  /** Accept header. */
  accept?: "application/json";
}

/** Acknowledge Cloud Events. */
export async function acknowledgeCloudEvents(
  context: Client,
  lockTokens: string[],
  topicName: string,
  eventSubscriptionName: string,
  options: acknowledgeCloudEventsOptions = { requestOptions: {} }
): Promise<LockTokensResponse> {
  const result = await context
    .path(
      "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:acknowledge",
      topicName,
      eventSubscriptionName
    )
    .post({
      contentType: (options.contentType as any) ?? "application/json; charset=utf-8",
      headers: {
        Accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: { lockTokens: lockTokens },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    failedLockTokens: (result.body["failedLockTokens"] ?? []).map((p: any) => ({
      lockToken: { lockToken: p.lockToken["lockToken"] },
      errorCode: p["errorCode"],
      errorDescription: p["errorDescription"],
    })),
    succeededLockTokens: result.body["succeededLockTokens"],
  };
}

export interface releaseCloudEventsOptions extends RequestOptions {
  /** content type */
  contentType?: string;
  /** Accept header. */
  accept?: "application/json";
}

/** Release Cloud Events. */
export async function releaseCloudEvents(
  context: Client,
  tokens: LockToken[],
  topicName: string,
  eventSubscriptionName: string,
  options: releaseCloudEventsOptions = { requestOptions: {} }
): Promise<LockTokensResponse> {
  const result = await context
    .path(
      "/topics/{topicName}/eventsubscriptions/{eventSubscriptionName}:release",
      topicName,
      eventSubscriptionName
    )
    .post({
      contentType: (options.contentType as any) ?? "application/json; charset=utf-8",
      headers: {
        Accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: tokens,
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    failedLockTokens: (result.body["failedLockTokens"] ?? []).map((p: any) => ({
      lockToken: { lockToken: p.lockToken["lockToken"] },
      errorCode: p["errorCode"],
      errorDescription: p["errorDescription"],
    })),
    succeededLockTokens: result.body["succeededLockTokens"],
  };
}
