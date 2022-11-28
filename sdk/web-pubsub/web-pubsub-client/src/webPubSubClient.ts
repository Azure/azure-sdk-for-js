// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  WebPubSubResult,
  JoinGroupOptions,
  LeaveGroupOptions,
  OnConnectedArgs,
  OnDisconnectedArgs,
  OnGroupDataMessageArgs,
  OnServerDataMessageArgs,
  OnStoppedArgs,
  SendEventOptions,
  SendToGroupOptions,
  WebPubSubClientOptions,
  OnRestoreGroupFailedArgs as OnRejoinGroupFailedArgs,
  StartOptions,
} from "./models";
import {
  WebPubSubDataType,
} from "./models/messages";
import {
  WebPubSubClientCredential,
} from "./webPubSubClientCredential";

/**
 * Types which can be serialized and sent as JSON.
 */
export type JSONTypes = string | number | boolean | object;

/**
 * The WebPubSub client
 */
export class WebPubSubClient {
  /**
   * Create an instance of WebPubSubClient
   * @param clientAccessUri - The uri to connect
   * @param options - The client options
   */
  constructor(clientAccessUri: string, options?: WebPubSubClientOptions);
  /**
   * Create an instance of WebPubSubClient
   * @param credential - The credential to use when connecting
   * @param options - The client options
   */
  constructor(credential: WebPubSubClientCredential, options?: WebPubSubClientOptions);
  constructor(credential: string | WebPubSubClientCredential, options?: WebPubSubClientOptions) {
    throw new Error();
  }

  /**
   * Start to start to the service.
   * @param abortSignal - The abort signal
   */
  public async start(options?: StartOptions): Promise<void> {
    throw new Error();
  }

  /**
   * Stop the client.
   */
  public stop(): void {
    throw new Error();
  }

  /**
   * Add handler for connected event
   * @param event - The event name
   * @param listener - The handler
   */
  public on(event: "connected", listener: (e: OnConnectedArgs) => void): void;
  /**
   * Add handler for disconnected event
   * @param event - The event name
   * @param listener - The handler
   */
  public on(event: "disconnected", listener: (e: OnDisconnectedArgs) => void): void;
  /**
   * Add handler for stopped event
   * @param event - The event name
   * @param listener - The handler
   */
  public on(event: "stopped", listener: (e: OnStoppedArgs) => void): void;
  /**
   * Add handler for server messages
   * @param event - The event name
   * @param listener - The handler
   */
  public on(event: "server-message", listener: (e: OnServerDataMessageArgs) => void): void;
  /**
   * Add handler for group messags
   * @param event - The event name
   * @param listener - The handler
   */
  public on(event: "group-message", listener: (e: OnGroupDataMessageArgs) => void): void;
  /**
   * Add handler for rejoining group failed
   * @param event - The event name
   * @param listener - The handler
   */
  public on(event: "rejoin-group-failed", listener: (e: OnRejoinGroupFailedArgs) => void): void;
  public on(
    event:
      | "connected"
      | "disconnected"
      | "stopped"
      | "server-message"
      | "group-message"
      | "rejoin-group-failed",
    listener: (e: any) => void
  ): void {
    throw new Error();
  }

  /**
   * Remove handler for connected event
   * @param event - The event name
   * @param listener - The handler
   */
  public off(event: "connected", listener: (e: OnConnectedArgs) => void): void;
  /**
   * Remove handler for disconnected event
   * @param event - The event name
   * @param listener - The handler
   */
  public off(event: "disconnected", listener: (e: OnDisconnectedArgs) => void): void;
  /**
   * Remove handler for stopped event
   * @param event - The event name
   * @param listener - The handler
   */
  public off(event: "stopped", listener: (e: OnStoppedArgs) => void): void;
  /**
   * Remove handler for server message
   * @param event - The event name
   * @param listener - The handler
   */
  public off(event: "server-message", listener: (e: OnServerDataMessageArgs) => void): void;
  /**
   * Remove handler for group message
   * @param event - The event name
   * @param listener - The handler
   */
  public off(event: "group-message", listener: (e: OnGroupDataMessageArgs) => void): void;
  /**
   * Remove handler for rejoining group failed
   * @param event - The event name
   * @param listener - The handler
   */
  public off(event: "rejoin-group-failed", listener: (e: OnRejoinGroupFailedArgs) => void): void;
  public off(
    event:
      | "connected"
      | "disconnected"
      | "stopped"
      | "server-message"
      | "group-message"
      | "rejoin-group-failed",
    listener: (e: any) => void
  ): void {
    throw new Error();
  }

  /**
   * Send custom event to server
   * @param eventName - The event name
   * @param content - The data content
   * @param dataType - The data type
   * @param ackId - The optional ackId. If not specified, client will generate one.
   * @param options - The options
   * @param abortSignal - The abort signal
   */
  public async sendEvent(
    eventName: string,
    content: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType,
    options?: SendEventOptions
  ): Promise<WebPubSubResult> {
    throw new Error();
  }

  /**
   * Join the client to group
   * @param groupName - The group name
   * @param options - The join group options
   */
  public async joinGroup(groupName: string, options?: JoinGroupOptions): Promise<WebPubSubResult> {
    throw new Error();
  }

  /**
   * Leave the client from group
   * @param groupName - The group name
   * @param ackId - The optional ackId. If not specified, client will generate one.
   * @param abortSignal - The abort signal
   */
  public async leaveGroup(
    groupName: string,
    options?: LeaveGroupOptions
  ): Promise<WebPubSubResult> {
    throw new Error();
  }

  /**
   * Send message to group.
   * @param groupName - The group name
   * @param content - The data content
   * @param dataType - The data type
   * @param ackId - The optional ackId. If not specified, client will generate one.
   * @param options - The options
   * @param abortSignal - The abort signal
   */
  public async sendToGroup(
    groupName: string,
    content: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType,
    options?: SendToGroupOptions
  ): Promise<void | WebPubSubResult> {
    throw new Error();
  }
}
