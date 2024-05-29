// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  isUnexpected,
  EventGridContext as Client,
  PublishCloudEvent200Response,
  PublishCloudEventDefaultResponse,
} from "./cadl-generated/rest/index";
import { StreamableMethod, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import { PublishCloudEventOptions } from "./cadl-generated/models/options";
import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { Buffer } from "buffer";
import { CloudEvent } from "./cadl-generated";

export async function publishCloudEventInBinaryMode(
  context: Client,
  topicName: string,
  event: CloudEvent,
  options: PublishCloudEventOptions = { requestOptions: {} },
): Promise<Record<string, any>> {
  const result = await _publishCloudEventSendBinaryMode(context, topicName, event, options);
  return _publishCloudEventDeserialize(result);
}

export async function _publishCloudEventDeserialize(
  result: PublishCloudEvent200Response | PublishCloudEventDefaultResponse,
): Promise<Record<string, any>> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return result.body;
}

export function _publishCloudEventSendBinaryMode(
  context: Client,
  topicName: string,
  event: CloudEvent,
  options: PublishCloudEventOptions = { requestOptions: {} },
): StreamableMethod<PublishCloudEvent200Response | PublishCloudEventDefaultResponse> {
  const headers: RawHttpHeadersInput = {
    "ce-id": event.id,
    "ce-source": event.source,
    "ce-type": event.type,
    "ce-specversion": event.specversion,
  };

  if (event.time) {
    headers["ce-time"] = event.time.toISOString();
  }

  if (event.dataschema) {
    headers["ce-dataschema"] = event.dataschema;
  }

  if (event.datacontenttype) {
    headers["ce-datacontenttype"] = event.datacontenttype;
  }

  if (event.subject) {
    headers["ce-subject"] = event.subject;
  }

  let data: any;
  if (event.data) {
    // If data is already encoded
    if (Buffer.isBuffer(event.data)) {
      data = event.data;
    } else {
      throw new Error(`CloudEvent data must be binary when in binary mode.`);
    }
  } else {
    if (event.dataBase64) {
      data = event.dataBase64;
    }
  }

  return context.path("/topics/{topicName}:publish", topicName).post({
    ...operationOptionsToRequestParameters(options),
    contentType: (options.contentType as any) ?? "application/cloudevents+json; charset=utf-8",
    headers,
    body: {
      id: event.id,
      source: event.source,
      data,
      type: event.type,
      time: event.time?.toISOString(),
      specversion: event.specversion,
      dataschema: event.dataschema,
      datacontenttype: event.datacontenttype,
      subject: event.subject,
    },
  });
}
