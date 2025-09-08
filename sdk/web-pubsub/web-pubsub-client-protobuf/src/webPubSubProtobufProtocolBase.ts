// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AckMessage,
  AckMessageError,
  ConnectedMessage,
  DisconnectedMessage,
  GroupDataMessage,
  ServerDataMessage,
  WebPubSubDataType,
  WebPubSubMessage,
  JSONTypes,
} from "@azure/web-pubsub-client";
import type { IMessageData, IUpstreamMessage } from "./generated/clientProto.js";
import {
  DownstreamMessage,
  MessageData,
  UpstreamMessage,
  google,
} from "./generated/clientProto.js";
import type Long from "long";

/**
 * The "protobuf.reliable.webpubsub.azure.v1" protocol
 */
export class WebPubSubProtobufProtocolBase {
  /**
   * Creates WebPubSubMessage objects from the specified serialized representation.
   * @param input - The serialized representation
   */
  public static parseMessages(input: ArrayBuffer): WebPubSubMessage | null {
    const downstream = DownstreamMessage.decode(new Uint8Array(input));
    if (downstream.ackMessage) {
      const ack = {
        kind: "ack",
        ackId: this._getNumber(downstream.ackMessage.ackId),
        success: downstream.ackMessage.success,
      } as AckMessage;
      if (downstream.ackMessage.error) {
        ack.error = {
          name: downstream.ackMessage.error.name,
          message: downstream.ackMessage.error.message,
        } as AckMessageError;
      }
      return ack;
    } else if (downstream.systemMessage) {
      if (downstream.systemMessage.connectedMessage) {
        const msg = downstream.systemMessage.connectedMessage;
        return {
          kind: "connected",
          connectionId: msg.connectionId,
          userId: msg.userId,
          reconnectionToken: msg.reconnectionToken,
        } as ConnectedMessage;
      } else if (downstream.systemMessage.disconnectedMessage) {
        const msg = downstream.systemMessage.disconnectedMessage;
        return { kind: "disconnected", message: msg.reason } as DisconnectedMessage;
      } else {
        return null;
      }
    } else if (downstream.dataMessage) {
      const sequenceId = this._getNumber(downstream.dataMessage.sequenceId);
      const messageData = downstream.dataMessage.data!;
      let dataType: WebPubSubDataType;
      let data: string | ArrayBuffer | object;
      if (messageData.textData) {
        dataType = "text";
        data = messageData.textData;
      } else if (messageData.jsonData) {
        dataType = "json";
        data = JSON.parse(messageData.jsonData);
      } else if (messageData.binaryData) {
        dataType = "binary";
        data = messageData.binaryData.buffer.slice(
          messageData.binaryData.byteOffset,
          messageData.binaryData.byteLength + messageData.binaryData.byteOffset,
        );
      } else if (messageData.protobufData) {
        dataType = "protobuf";
        data = messageData.protobufData;
      } else {
        return null;
      }

      if (downstream.dataMessage.from === "group") {
        return {
          kind: "groupData",
          dataType: dataType,
          data: data,
          sequenceId: sequenceId,
          group: downstream.dataMessage.group,
        } as GroupDataMessage;
      } else if (downstream.dataMessage.from === "server") {
        return {
          kind: "serverData",
          dataType: dataType,
          data: data,
          sequenceId: sequenceId,
        } as ServerDataMessage;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  /**
   * Write WebPubSubMessage to string
   * @param message - The message to be written
   */
  public static writeMessage(message: WebPubSubMessage): ArrayBuffer {
    let upstream: UpstreamMessage;
    switch (message.kind) {
      case "joinGroup": {
        const joinGroup = UpstreamMessage.JoinGroupMessage.create({
          group: message.group,
          ackId: message.ackId,
        } as UpstreamMessage.IJoinGroupMessage);
        upstream = UpstreamMessage.create({ joinGroupMessage: joinGroup } as IUpstreamMessage);
        break;
      }
      case "leaveGroup": {
        const leaveGroup = UpstreamMessage.LeaveGroupMessage.create({
          group: message.group,
          ackId: message.ackId,
        } as UpstreamMessage.ILeaveGroupMessage);
        upstream = UpstreamMessage.create({ leaveGroupMessage: leaveGroup } as IUpstreamMessage);
        break;
      }
      case "sendToGroup": {
        const sendToGroup = UpstreamMessage.SendToGroupMessage.create({
          group: message.group,
          ackId: message.ackId,
          data: this._getIMessageData(message.data, message.dataType),
          noEcho: message.noEcho,
        } as UpstreamMessage.ISendToGroupMessage);
        upstream = UpstreamMessage.create({ sendToGroupMessage: sendToGroup } as IUpstreamMessage);
        break;
      }
      case "sendEvent": {
        const sendEvent = UpstreamMessage.EventMessage.create({
          event: message.event,
          ackId: message.ackId,
          data: this._getIMessageData(message.data, message.dataType),
        } as UpstreamMessage.IEventMessage);
        upstream = UpstreamMessage.create({ eventMessage: sendEvent } as IUpstreamMessage);
        break;
      }
      case "sequenceAck": {
        const sequenceAck = UpstreamMessage.SequenceAckMessage.create({
          sequenceId: message.sequenceId,
        } as UpstreamMessage.ISequenceAckMessage);
        upstream = UpstreamMessage.create({ sequenceAckMessage: sequenceAck } as IUpstreamMessage);
        break;
      }
      default:
        throw new TypeError(`kind is not supported: ${message.kind}`);
    }

    return UpstreamMessage.encode(upstream).finish() as any;
  }

  private static _getIMessageData(
    data: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType,
  ): IMessageData {
    switch (dataType) {
      case "binary":
        if (!(data instanceof ArrayBuffer)) {
          throw new TypeError("Message must be a ArrayBuffer.");
        }
        return MessageData.create({ binaryData: new Uint8Array(data) } as IMessageData);
      case "protobuf":
        if (WebPubSubProtobufProtocolBase._isIAny(data)) {
          return MessageData.create({
            protobufData: google.protobuf.Any.create({
              type_url: data.type_url!,
              value: new Uint8Array(data.value!),
            } as google.protobuf.IAny),
          } as IMessageData);
        }
        throw new TypeError("Message must be a google.protobuf.Any.");
      case "text":
        if (typeof data !== "string") {
          throw new TypeError("Message must be a string.");
        }
        return MessageData.create({ textData: data } as IMessageData);
      case "json":
        return MessageData.create({ jsonData: JSON.stringify(data) } as IMessageData);
      default:
        throw new TypeError(`dataType is not supported: ${dataType}`);
    }
  }

  private static _getNumber(value: number | Long | null | undefined): number | null | undefined {
    if (value === null || value === undefined || typeof value === "number") {
      return value;
    }
    return value.toNumber();
  }

  private static _isIAny(obj: any): obj is google.protobuf.IAny {
    return "type_url" in obj && "value" in obj;
  }
}
