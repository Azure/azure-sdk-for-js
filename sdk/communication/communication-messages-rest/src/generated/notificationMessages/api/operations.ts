// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationMessagesContext as Client } from "./index.js";
import { getBinaryStreamResponse } from "#platform/generated/static-helpers/serialization/get-binary-stream-response";
import {
  notificationContentUnionSerializer,
  NotificationContentUnion,
  SendMessageResult,
  sendMessageResultDeserializer,
  ReadReceiptContent,
  readReceiptContentSerializer,
  DownloadMediaResponse,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SendReadReceiptOptionalParams,
  DownloadMediaOptionalParams,
  SendOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _sendReadReceiptSend(
  context: Client,
  readReceiptContent: ReadReceiptContent,
  options: SendReadReceiptOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/messages/readreceipts:send{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        ...(options?.repeatabilityRequestId !== undefined
          ? { "repeatability-request-id": options?.repeatabilityRequestId }
          : {}),
        ...(options?.repeatabilityFirstSent !== undefined
          ? {
              "repeatability-first-sent": !options?.repeatabilityFirstSent
                ? options?.repeatabilityFirstSent
                : options?.repeatabilityFirstSent.toUTCString(),
            }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: readReceiptContentSerializer(readReceiptContent),
    });
}

export async function _sendReadReceiptDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Sends a read receipt update from Business to User. */
export async function sendReadReceipt(
  context: Client,
  readReceiptContent: ReadReceiptContent,
  options: SendReadReceiptOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _sendReadReceiptSend(context, readReceiptContent, options);
  return _sendReadReceiptDeserialize(result);
}

export function _downloadMediaSend(
  context: Client,
  id: string,
  options: DownloadMediaOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/messages/streams/{id}{?api%2Dversion}",
    {
      id: id,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/octet-stream",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _downloadMediaDeserialize(
  result: PathUncheckedResponse & DownloadMediaResponse,
): Promise<DownloadMediaResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Download the Media payload from a User to Business message. */
export async function downloadMedia(
  context: Client,
  id: string,
  options: DownloadMediaOptionalParams = { requestOptions: {} },
): Promise<DownloadMediaResponse> {
  const streamableMethod = _downloadMediaSend(context, id, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _downloadMediaDeserialize(result);
}

export function _sendSend(
  context: Client,
  body: NotificationContentUnion,
  options: SendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/messages/notifications:send{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        ...(options?.repeatabilityRequestId !== undefined
          ? { "repeatability-request-id": options?.repeatabilityRequestId }
          : {}),
        ...(options?.repeatabilityFirstSent !== undefined
          ? {
              "repeatability-first-sent": !options?.repeatabilityFirstSent
                ? options?.repeatabilityFirstSent
                : options?.repeatabilityFirstSent.toUTCString(),
            }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: notificationContentUnionSerializer(body),
    });
}

export async function _sendDeserialize(result: PathUncheckedResponse): Promise<SendMessageResult> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return sendMessageResultDeserializer(result.body);
}

/** Sends a notification message from Business to User. */
export async function send(
  context: Client,
  body: NotificationContentUnion,
  options: SendOptionalParams = { requestOptions: {} },
): Promise<SendMessageResult> {
  const result = await _sendSend(context, body, options);
  return _sendDeserialize(result);
}
