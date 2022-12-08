// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AckMessage,
  ConnectedMessage,
  DisconnectedMessage,
  GroupDataMessage,
  ServerDataMessage,
  WebPubSubDataType,
  WebPubSubMessage,
} from "../models/messages";
import { JSONTypes } from "../webPubSubClient";
import { Buffer } from "buffer";

export function parseMessages(input: string): WebPubSubMessage | null {
  // The interface does allow "ArrayBuffer" to be passed in, but this implementation does not. So let's throw a useful error.
  if (typeof input !== "string") {
    throw new Error("Invalid input for JSON hub protocol. Expected a string.");
  }

  if (!input) {
    throw new Error("No input");
  }

  const parsedMessage = JSON.parse(input);
  const typedMessage = parsedMessage as { type: string; from: string; event: string };
  let returnMessage: WebPubSubMessage;

  if (typedMessage.type === "system") {
    if (typedMessage.event === "connected") {
      returnMessage = { ...parsedMessage, kind: "connected" } as ConnectedMessage;
    } else if (typedMessage.event === "disconnected") {
      returnMessage = { ...parsedMessage, kind: "disconnected" } as DisconnectedMessage;
    } else {
      // Forward compatible
      return null;
    }
  } else if (typedMessage.type === "message") {
    if (typedMessage.from === "group") {
      const data = parsePayload(parsedMessage.data, parsedMessage.dataType as WebPubSubDataType);
      if (data === null) {
        return null;
      }
      returnMessage = { ...parsedMessage, data: data, kind: "groupData" } as GroupDataMessage;
    } else if (typedMessage.from === "server") {
      const data = parsePayload(parsedMessage.data, parsedMessage.dataType as WebPubSubDataType);
      if (data === null) {
        return null;
      }
      returnMessage = {
        ...parsedMessage,
        data: data,
        kind: "serverData",
      } as ServerDataMessage;
    } else {
      // Forward compatible
      return null;
    }
  } else if (typedMessage.type === "ack") {
    returnMessage = { ...parsedMessage, kind: "ack" } as AckMessage;
  } else {
    // Forward compatible
    return null;
  }
  return returnMessage;
}

export function writeMessage(message: WebPubSubMessage): string {
  let data: any;
  switch (message.kind) {
    case "joinGroup": {
      data = { type: "joinGroup", group: message.group, ackId: message.ackId } as JoinGroupData;
      break;
    }
    case "leaveGroup": {
      data = { type: "leaveGroup", group: message.group, ackId: message.ackId } as LeaveGroupData;
      break;
    }
    case "sendEvent": {
      data = {
        type: "event",
        event: message.event,
        ackId: message.ackId,
        dataType: message.dataType,
        data: getPayload(message.data, message.dataType),
      } as SendEventData;
      break;
    }
    case "sendToGroup": {
      data = {
        type: "sendToGroup",
        group: message.group,
        ackId: message.ackId,
        dataType: message.dataType,
        data: getPayload(message.data, message.dataType),
        noEcho: message.noEcho,
      } as SendToGroupData;
      break;
    }
    case "sequenceAck": {
      data = { type: "sequenceAck", sequenceId: message.sequenceId } as SequenceAckData;
      break;
    }
    default: {
      throw new Error(`Unsupported type: ${message.kind}`);
    }
  }

  return JSON.stringify(data);
}

interface JoinGroupData {
  readonly type: "joinGroup";
  group: string;
  ackId?: number;
}

interface LeaveGroupData {
  readonly type: "leaveGroup";
  group: string;
  ackId?: number;
}

interface SendToGroupData {
  readonly type: "sendToGroup";
  group: string;
  ackId?: number;
  dataType: WebPubSubDataType;
  data: any;
  noEcho: boolean;
}

interface SendEventData {
  readonly type: "event";
  ackId?: number;
  dataType: WebPubSubDataType;
  data: any;
  event: string;
}

interface SequenceAckData {
  readonly type: "sequenceAck";
  sequenceId: number;
}

function getPayload(data: JSONTypes | ArrayBuffer, dataType: WebPubSubDataType): any {
  switch (dataType) {
    case "text": {
      if (typeof data !== "string") {
        throw new TypeError("Message must be a string.");
      }
      return data;
    }
    case "json": {
      return data;
    }
    case "binary":
    case "protobuf": {
      if (data instanceof ArrayBuffer) {
        return Buffer.from(data).toString("base64");
      }
      throw new TypeError("Message must be a ArrayBuffer");
    }
  }
}

function parsePayload(data: any, dataType: string): JSONTypes | ArrayBuffer | null {
  if (dataType === "text") {
    if (typeof data !== "string") {
      throw new TypeError("Message must be a string when dataType is text");
    }
    return data as string;
  } else if (dataType === "json") {
    return data as JSONTypes;
  } else if (dataType === "binary" || dataType === "protobuf") {
    const buf = Buffer.from(data as string, "base64");
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  } else {
    // Forward compatible
    return null;
  }
}
