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

export async function publishCloudEventBinaryMode(
  context: Client,
  id: string,
  source: string,
  type: string,
  specversion: string,
  topicName: string,
  options: PublishCloudEventOptions = { requestOptions: {} }
): Promise<Record<string, any>> {
  const result = await _publishCloudEventSendBinaryMode(
    context,
    id,
    source,
    type,
    specversion,
    topicName,
    options
  );
  return _publishCloudEventDeserialize(result);
}

export async function _publishCloudEventDeserialize(
  result: PublishCloudEvent200Response | PublishCloudEventDefaultResponse
): Promise<Record<string, any>> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return result.body;
}

export function _publishCloudEventSendBinaryMode(
  context: Client,
  id: string,
  source: string,
  type: string,
  specversion: string,
  topicName: string,
  options: PublishCloudEventOptions = { requestOptions: {} }
): StreamableMethod<PublishCloudEvent200Response | PublishCloudEventDefaultResponse> {
  const headers: RawHttpHeadersInput = {
    "ce-id": id,
    "ce-source": source,
    "ce-type": type,
    "ce-specversion": specversion,
  };

  if (options?.time) {
    headers["ce-time"] = options.time.toISOString();
  }

  if (options?.dataschema) {
    headers["ce-dataschema"] = options.dataschema;
  }

  if (options?.datacontenttype) {
    headers["ce-datacontenttype"] = options.datacontenttype;
  }

  if (options?.subject) {
    headers["ce-subject"] = options.subject;
  }

  let data: any;
  if (options?.data) {
    // If data is already encoded
    if (Buffer.isBuffer(options.data)) {
      data = options.data;
    } else {
      throw new Error(`CloudEvent data must be binary when in binary mode.`);
    }
  } else {
    if (options?.dataBase64) {
      data = options.dataBase64;
    }
  }

  return context.path("/topics/{topicName}:publish", topicName).post({
    ...operationOptionsToRequestParameters(options),
    contentType: (options.contentType as any) ?? "application/cloudevents+json; charset=utf-8",
    headers,
    body: {
      id: id,
      source: source,
      data,
      type: type,
      time: options?.time?.toISOString(),
      specversion: specversion,
      dataschema: options?.dataschema,
      datacontenttype: options?.datacontenttype,
      subject: options?.subject,
    },
  });
}
