// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QueuesContext as Client } from "../index.js";
import {
  errorXmlDeserializer,
  SignedIdentifiers,
  signedIdentifiersXmlSerializer,
  signedIdentifiersXmlDeserializer,
  ReceivedMessages,
  receivedMessagesXmlDeserializer,
  QueueMessage,
  queueMessageXmlSerializer,
  ListOfSentMessage,
  listOfSentMessageXmlDeserializer,
  PeekedMessages,
  peekedMessagesXmlDeserializer,
} from "../../models/azure/storage/queues/models.js";
import {
  StorageCompatResponseInfo,
  createStorageCompatOnResponse,
  addStorageCompatResponse,
} from "../../static-helpers/storageCompatResponse.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  QueueDeleteMessageOptionalParams,
  QueueUpdateMessageOptionalParams,
  QueuePeekMessagesOptionalParams,
  QueueSendMessageOptionalParams,
  QueueClearOptionalParams,
  QueueReceiveMessagesOptionalParams,
  QueueSetAccessPolicyOptionalParams,
  QueueGetAccessPolicyOptionalParams,
  QueueSetMetadataOptionalParams,
  QueueDeleteOptionalParams,
  QueueGetPropertiesOptionalParams,
  QueueCreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _deleteMessageSend(
  context: Client,
  messageId: string,
  popReceipt: string,
  options: QueueDeleteMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "messages/{messageId}{?popreceipt,timeout}",
    {
      messageId: messageId,
      popreceipt: popReceipt,
      timeout: options?.timeoutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteMessageDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._deleteMessageDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _deleteMessageDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _deleteMessageDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** The Delete operation deletes the specified message. */
export async function deleteMessage(
  context: Client,
  messageId: string,
  popReceipt: string,
  options: QueueDeleteMessageOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId?: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    { version: string; requestId?: string; clientRequestId?: string; date: Date }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _deleteMessageSend(context, messageId, popReceipt, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _deleteMessageDeserialize(result);
  const parsedHeaders = _deleteMessageDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _updateMessageSend(
  context: Client,
  messageId: string,
  popReceipt: string,
  visibilityTimeout: number,
  options: QueueUpdateMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "messages/{messageId}{?popreceipt,visibilitytimeout,timeout}",
    {
      messageId: messageId,
      popreceipt: popReceipt,
      visibilitytimeout: visibilityTimeout,
      timeout: options?.timeoutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: !options["queueMessage"]
        ? options["queueMessage"]
        : queueMessageXmlSerializer(options["queueMessage"]),
    });
}

export async function _updateMessageDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._updateMessageDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _updateMessageDeserializeHeaders(result: PathUncheckedResponse): {
  popReceipt: string;
  nextVisibleOn: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    popReceipt: result.headers["x-ms-popreceipt"],
    nextVisibleOn: new Date(result.headers["x-ms-time-next-visible"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _updateMessageDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/**
 * The Update operation was introduced with version 2011-08-18 of the Queue
 * service API. The Update Message operation updates the visibility timeout of a
 * message. You can also use this operation to update the contents of a message. A
 * message must be in a format that can be included in an XML request with UTF-8
 * encoding, and the encoded message can be up to 64KB in size.
 */
export async function updateMessage(
  context: Client,
  messageId: string,
  popReceipt: string,
  visibilityTimeout: number,
  options: QueueUpdateMessageOptionalParams = { requestOptions: {} },
): Promise<
  {
    popReceipt: string;
    nextVisibleOn: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      popReceipt: string;
      nextVisibleOn: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _updateMessageSend(context, messageId, popReceipt, visibilityTimeout, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _updateMessageDeserialize(result);
  const parsedHeaders = _updateMessageDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _peekMessagesSend(
  context: Client,
  options: QueuePeekMessagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "messages?peekonly=true{?numofmessages,timeout}",
    {
      numofmessages: options?.numberOfMessages,
      timeout: options?.timeoutInSeconds,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _peekMessagesDeserialize(
  result: PathUncheckedResponse,
): Promise<PeekedMessages> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._peekMessagesDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return peekedMessagesXmlDeserializer(result.body);
}

export function _peekMessagesDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/xml";
} {
  return {
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
    contentType: result.headers["content-type"] as any,
  };
}

export function _peekMessagesDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/**
 * The Peek operation retrieves one or more messages from the front of the queue,
 * but does not alter the visibility of the message.
 */
export async function peekMessages(
  context: Client,
  options: QueuePeekMessagesOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId?: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/xml";
  } & PeekedMessages &
    StorageCompatResponseInfo<
      PeekedMessages,
      {
        version: string;
        requestId?: string;
        clientRequestId?: string;
        date: Date;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _peekMessagesSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _peekMessagesDeserialize(result);
  const parsedHeaders = _peekMessagesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _sendMessageSend(
  context: Client,
  queueMessage: QueueMessage,
  options: QueueSendMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "messages{?visibilitytimeout,messagettl,timeout}",
    {
      visibilitytimeout: options?.visibilityTimeout,
      messagettl: options?.messageTimeToLive,
      timeout: options?.timeoutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
      body: queueMessageXmlSerializer(queueMessage),
    });
}

export async function _sendMessageDeserialize(
  result: PathUncheckedResponse,
): Promise<ListOfSentMessage> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._sendMessageDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return listOfSentMessageXmlDeserializer(result.body);
}

export function _sendMessageDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/xml";
} {
  return {
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
    contentType: result.headers["content-type"] as any,
  };
}

export function _sendMessageDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/**
 * The Enqueue operation adds a new message to the back of the message queue. A
 * visibility timeout can also be specified to make the message invisible until
 * the visibility timeout expires. A message must be in a format that can be
 * included in an XML request with UTF-8 encoding. The encoded message can be up
 * to 64 KB in size for versions 2011-08-18 and newer, or 8 KB in size for
 * previous versions.
 */
export async function sendMessage(
  context: Client,
  queueMessage: QueueMessage,
  options: QueueSendMessageOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId?: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/xml";
  } & ListOfSentMessage &
    StorageCompatResponseInfo<
      ListOfSentMessage,
      {
        version: string;
        requestId?: string;
        clientRequestId?: string;
        date: Date;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _sendMessageSend(context, queueMessage, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _sendMessageDeserialize(result);
  const parsedHeaders = _sendMessageDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _clearSend(
  context: Client,
  options: QueueClearOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "messages{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _clearDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), ..._clearDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _clearDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _clearDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** The Clear operation deletes all messages from the specified queue. */
export async function clear(
  context: Client,
  options: QueueClearOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId?: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    { version: string; requestId?: string; clientRequestId?: string; date: Date }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _clearSend(context, { ...options, onResponse: _storageCompat.onResponse });
  await _clearDeserialize(result);
  const parsedHeaders = _clearDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _receiveMessagesSend(
  context: Client,
  options: QueueReceiveMessagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "messages{?numofmessages,visibilitytimeout,timeout}",
    {
      numofmessages: options?.numberOfMessages,
      visibilitytimeout: options?.visibilityTimeout,
      timeout: options?.timeoutInSeconds,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _receiveMessagesDeserialize(
  result: PathUncheckedResponse,
): Promise<ReceivedMessages> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._receiveMessagesDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return receivedMessagesXmlDeserializer(result.body);
}

export function _receiveMessagesDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/xml";
} {
  return {
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
    contentType: result.headers["content-type"] as any,
  };
}

export function _receiveMessagesDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/**
 * The Dequeue operation retrieves one or more messages from the front of the
 * queue.
 */
export async function receiveMessages(
  context: Client,
  options: QueueReceiveMessagesOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId?: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/xml";
  } & ReceivedMessages &
    StorageCompatResponseInfo<
      ReceivedMessages,
      {
        version: string;
        requestId?: string;
        clientRequestId?: string;
        date: Date;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _receiveMessagesSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _receiveMessagesDeserialize(result);
  const parsedHeaders = _receiveMessagesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _setAccessPolicySend(
  context: Client,
  queueAcl: SignedIdentifiers,
  options: QueueSetAccessPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=acl{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: signedIdentifiersXmlSerializer(queueAcl),
    });
}

export async function _setAccessPolicyDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._setAccessPolicyDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _setAccessPolicyDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _setAccessPolicyDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** sets the permissions for the specified queue. */
export async function setAccessPolicy(
  context: Client,
  queueAcl: SignedIdentifiers,
  options: QueueSetAccessPolicyOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId?: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    { version: string; requestId?: string; clientRequestId?: string; date: Date }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _setAccessPolicySend(context, queueAcl, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _setAccessPolicyDeserialize(result);
  const parsedHeaders = _setAccessPolicyDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _getAccessPolicySend(
  context: Client,
  options: QueueGetAccessPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=acl{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getAccessPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<SignedIdentifiers> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._getAccessPolicyDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return signedIdentifiersXmlDeserializer(result.body);
}

export function _getAccessPolicyDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/xml";
} {
  return {
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
    contentType: result.headers["content-type"] as any,
  };
}

export function _getAccessPolicyDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** gets the permissions for the specified queue. The permissions indicate whether queue data may be accessed publicly. */
export async function getAccessPolicy(
  context: Client,
  options: QueueGetAccessPolicyOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId?: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/xml";
  } & SignedIdentifiers &
    StorageCompatResponseInfo<
      SignedIdentifiers,
      {
        version: string;
        requestId?: string;
        clientRequestId?: string;
        date: Date;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _getAccessPolicySend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _getAccessPolicyDeserialize(result);
  const parsedHeaders = _getAccessPolicyDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _setMetadataSend(
  context: Client,
  options: QueueSetMetadataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=metadata{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setMetadataDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._setMetadataDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _setMetadataDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _setMetadataDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** operation sets one or more user-defined name-value pairs for the specified queue. */
export async function setMetadata(
  context: Client,
  options: QueueSetMetadataOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId?: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    { version: string; requestId?: string; clientRequestId?: string; date: Date }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _setMetadataSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _setMetadataDeserialize(result);
  const parsedHeaders = _setMetadataDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _$deleteSend(
  context: Client,
  options: QueueDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), ..._$deleteDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _$deleteDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _$deleteDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** operation permanently deletes the specified queue */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  options: QueueDeleteOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId?: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    { version: string; requestId?: string; clientRequestId?: string; date: Date }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _$deleteSend(context, { ...options, onResponse: _storageCompat.onResponse });
  await _$deleteDeserialize(result);
  const parsedHeaders = _$deleteDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _getPropertiesSend(
  context: Client,
  options: QueueGetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=metadata{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPropertiesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._getPropertiesDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _getPropertiesDeserializeHeaders(result: PathUncheckedResponse): {
  approximateMessagesCount?: number;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    approximateMessagesCount:
      result.headers["x-ms-approximate-messages-count"] === undefined ||
      result.headers["x-ms-approximate-messages-count"] === null
        ? result.headers["x-ms-approximate-messages-count"]
        : Number(result.headers["x-ms-approximate-messages-count"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _getPropertiesDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** returns all user-defined metadata and system properties for the specified queue. */
export async function getProperties(
  context: Client,
  options: QueueGetPropertiesOptionalParams = { requestOptions: {} },
): Promise<
  {
    approximateMessagesCount?: number;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      approximateMessagesCount?: number;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _getPropertiesSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _getPropertiesDeserialize(result);
  const parsedHeaders = _getPropertiesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _createSend(
  context: Client,
  options: QueueCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), ..._createDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _createDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _createDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** Creates a new queue under the specified account. If a queue with the same name already exists, the operation succeeds when the metadata is identical and returns 204; if the metadata differs, the operation returns 409. */
export async function create(
  context: Client,
  options: QueueCreateOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId?: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    { version: string; requestId?: string; clientRequestId?: string; date: Date }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _createSend(context, { ...options, onResponse: _storageCompat.onResponse });
  await _createDeserialize(result);
  const parsedHeaders = _createDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}
