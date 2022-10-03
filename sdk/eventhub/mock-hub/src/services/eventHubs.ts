// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Connection,
  ConnectionEvents,
  EventContext,
  Message,
  ReceiverEvents,
  Sender,
  SenderEvents,
} from "rhea";
import {
  ConnectionCloseEvent,
  MockServer,
  MockServerOptions,
  OnMessagesEvent,
  ReceiverOpenEvent,
  SenderCloseEvent,
  SenderOpenEvent,
} from "../server/mockServer";
import {
  generateBadPartitionInfoResponse,
  generatePartitionInfoResponse,
  isPartitionInfo,
} from "../messages/event-hubs/partitionInfo";
import {
  generateHubRuntimeInfoResponse,
  isHubRuntimeInfo,
} from "../messages/event-hubs/runtimeInfo";
import { MessageStore } from "../storage/messageStore";
import { StreamingPartitionSender } from "../sender/streamingPartitionSender";
import { URL } from "url";
import { createCbsAccepted } from "../messages/cbs/cbsAccepted";
import { getEventPosition } from "../utils/eventPosition";

export interface IMockEventHub {
  readonly partitionIds: string[];
  readonly consumerGroups: Set<string>;
  readonly port: number;

  start: () => Promise<void>;
  stop: () => Promise<void>;
}

export interface MockEventHubOptions extends MockServerOptions {
  /**
   * The number of partitions for the Event Hub.
   * Defaults to 2.
   */
  partitionCount?: number;
  /**
   * The name of the Event Hub.
   */
  name: string;
  /**
   * The consumer groups available for receiving.
   * `$default` is always available.
   */
  consumerGroups?: string[];

  /**
   * The amount of time in ms to wait while the connection is
   * inactive before force closing the connection.
   */
  connectionInactivityTimeoutInMs?: number;
}

interface PartionSenderEntityComponents {
  eventHubName: string;
  consumerGroup: string;
  partitionId: string;
}

interface PartionReceiverEntityComponents {
  eventHubName: string;
  partitionId: string;
}

/**
 * `MockEventHub` represents a mock EventHubs service.
 *
 * It stores events in memory and does not perform any auth verification.
 */
export class MockEventHub implements IMockEventHub {
  /**
   * When the EventHub was 'created'.
   */
  private _createdOn = new Date();
  /**
   * The name of the Event Hub.
   */
  private _name: string;
  /**
   * The number of partitions the Event Hub supports.
   */
  private _partitionCount: number;
  /**
   * Any additional consumer groups (beyond `$default`) the Event Hub supports.
   */
  private _consumerGroups: string[] = [];
  /**
   * The underlying AMQP server used to communicate to clients.
   */
  private _mockServer: MockServer;
  /**
   * The `MessageStore` that stores messages sent by clients to the Event Hub.
   */
  private _messageStore = new MessageStore();
  /**
   * This provides convenient access to a `Sender`'s `StreamingPartitionSender`
   * so that we can stop it when a `Sender` is closed.
   */
  private _streamingPartitionSenderMap = new Map<Sender, StreamingPartitionSender>();

  private _connectionInactivityTimeoutInMs: number;

  private _connections: Set<Connection> = new Set();

  private _clearableTimeouts = new Set<ReturnType<typeof setTimeout>>();
  /**
   * This provides a way to find all the partition senders for a combination
   * of `consumerGroup` and `partitionId`.
   *
   * This is needed to support `ownerLevel` (epoch).
   */
  private _consumerGroupPartitionSenderMap = new Map<string, Map<string, Set<Sender>>>();

  /**
   * The Event Hub's partition ids.
   */
  public get partitionIds(): string[] {
    const partitionIds: string[] = [];
    for (let i = 0; i < this._partitionCount; i++) {
      partitionIds.push(`${i}`);
    }
    return partitionIds;
  }

  /**
   * The full Set of consumer groups the Event Hub supports.
   */
  public get consumerGroups(): Set<string> {
    return new Set(["$default", ...this._consumerGroups]);
  }

  /**
   * The port number the service is listening on.
   * Returns `-1` if the service is not currently listening.
   */
  public get port(): number {
    return this._mockServer.port;
  }

  /**
   * Instantiates a `MockEventHub` using the provided options.
   * @param options - The options to instantiate the MockEventHub with.
   */
  constructor(options: MockEventHubOptions) {
    this._partitionCount = options.partitionCount ?? 2;
    this._name = options.name;
    this._consumerGroups = options.consumerGroups ?? [];
    this._connectionInactivityTimeoutInMs = options.connectionInactivityTimeoutInMs ?? 0;

    this._mockServer = new MockServer(options);
    this._mockServer.on("receiverOpen", this._handleReceiverOpen);
    this._mockServer.on("senderOpen", this._handleSenderOpen);
    this._mockServer.on("senderClose", this._handleSenderClose);
    this._mockServer.on("connectionClose", this._handleConnectionClose);
    this._mockServer.on("onMessages", this._handleOnMessages);
    this._mockServer.on("connectionOpen", (event) => {
      this._connections.add(event.context.connection);
      this._handleConnectionInactivity(event.context.connection);
    });
    this._mockServer.on("connectionClose", (event) => {
      this._connections.delete(event.context.connection);
    });
  }

  private _handleConnectionInactivity = (connection: Connection): void => {
    if (!this._connectionInactivityTimeoutInMs) {
      return;
    }

    const forceCloseConnection = (): void => {
      connection.close({
        condition: "amqp:connection:forced",
        description: `The connection was inactive for more than the allowed ${this._connectionInactivityTimeoutInMs} milliseconds and is closed by the service.`,
      });
    };

    let tid = setTimeout(forceCloseConnection, this._connectionInactivityTimeoutInMs);
    this._clearableTimeouts.add(tid);

    const bounceTimeout = (): void => {
      clearTimeout(tid);
      this._clearableTimeouts.delete(tid);
      tid = setTimeout(forceCloseConnection, this._connectionInactivityTimeoutInMs);
      this._clearableTimeouts.add(tid);
    };

    connection.addListener(ConnectionEvents.settled, bounceTimeout);
    connection.addListener(SenderEvents.senderFlow, bounceTimeout);
    connection.addListener(SenderEvents.settled, bounceTimeout);
    connection.addListener(ReceiverEvents.receiverFlow, bounceTimeout);
    connection.addListener(ReceiverEvents.settled, bounceTimeout);
  };

  /**
   * The event handler for when the service creates a `Receiver` link.
   *
   * This is done in response to the client opening a `Sender` link.
   * @param event -
   */
  private _handleReceiverOpen = (event: ReceiverOpenEvent): void => {
    event.receiver.set_source(event.receiver.source);
    event.receiver.set_target(event.receiver.target);
    if (this._isReceiverPartitionEntityPath(event.entityPath)) {
      // Handle the case where the client is creating a partition-specific sender.
      const entityComponents = this._parseReceiverPartitionEntityPath(event.entityPath);
      if (!entityComponents) {
        return;
      }
      const partitionId = entityComponents.partitionId;

      // Validate that the partition the client's sender is targetting exists.
      if (!this.partitionIds.includes(partitionId)) {
        return event.receiver.close({
          condition: "com.microsoft:argument-out-of-range",
          description:
            "The specified partition is invalid for an EventHub partition sender or receiver.",
        });
      }
    }
  };

  /**
   * The event handler for when the service creates a `Sender` link.
   *
   * This is done in response to the client opening a `Receiver` link.
   * @param event -
   */
  private _handleSenderOpen = (event: SenderOpenEvent): void => {
    event.sender.set_source(event.sender.source);
    event.sender.set_target(event.sender.target);
    if (event.entityPath === "$cbs") {
      // We don't need to do anything special when opening a $cbs sender.
    } else if (event.entityPath === "$management") {
      // We don't need to do anything special when opening a $management sender.
    } else if (this._isSenderPartitionEntityPath(event.entityPath)) {
      // Handle partition-specific senders (e.g. /eventHubName/ConsumerGroups/$default/Partitions/0)
      const entityComponents = this._parseSenderPartitionEntityPath(event.entityPath);
      if (!entityComponents) {
        return;
      }

      // Ensure the resource the sender is sourced from exists.
      if (
        !this._handlePartitionSenderOpenValidation(entityComponents, event.sender, event.context)
      ) {
        return;
      }

      // Ensure the sender is allowed to exist based on the ownerLevel of existing senders.
      if (
        !this._handleSenderOwnerLevel(
          entityComponents.consumerGroup,
          entityComponents.partitionId,
          event.sender
        )
      ) {
        return;
      }

      const desiredCapabilities = Array.isArray(event.sender.desired_capabilities)
        ? event.sender.desired_capabilities
        : [event.sender.desired_capabilities];

      // Check if we need to include runtime metrics on events we send to the client.
      const enableRuntimeMetric = desiredCapabilities.includes(
        "com.microsoft:enable-receiver-runtime-metric"
      );

      // Get the starting position from which to start reading events.
      const sourceFilter: string =
        event.sender.source.filter?.["apache.org:selector-filter:string"]?.value ?? "";

      try {
        const startPosition = getEventPosition(sourceFilter);

        const streamingPartitionSender = new StreamingPartitionSender(
          this._messageStore,
          event.sender,
          entityComponents.partitionId,
          startPosition,
          enableRuntimeMetric
        );
        this._streamingPartitionSenderMap.set(event.sender, streamingPartitionSender);
        streamingPartitionSender.start();
        this._storePartitionSender(
          entityComponents.consumerGroup,
          entityComponents.partitionId,
          event.sender
        );
      } catch (err: any) {
        // Probably should close the sender at this point.
        event.sender.close({
          condition: "amqp:internal-error",
          description: err?.message ?? "",
        });
      }
    }
  };

  /**
   * The event handler for when the service closes a `Sender` link.
   *
   * This is done in response to the client closing a `Receiver` link,
   * or the service closing the `Sender` link.
   * @param event -
   */
  private _handleSenderClose = (event: SenderCloseEvent): void => {
    if (this._isSenderPartitionEntityPath(event.entityPath)) {
      // Handles partition-specific senders.
      const entityComponents = this._parseSenderPartitionEntityPath(event.entityPath);
      const streamingPartitionSender = this._streamingPartitionSenderMap.get(event.sender);
      this._streamingPartitionSenderMap.delete(event.sender);
      if (streamingPartitionSender) {
        streamingPartitionSender.stop();
      }
      if (entityComponents) {
        this._deletePartitionSender(
          entityComponents.consumerGroup,
          entityComponents.partitionId,
          event.sender
        );
      }
    }
  };

  /**
   * The event handler for when the service closes a connection.
   *
   * This is done when a client explicitly closes or is disconnected.
   * @param event -
   */
  private _handleConnectionClose = (event: ConnectionCloseEvent): void => {
    // Cleanup the partition senders we might have for this connection.
    // We'll just do brute force for now and optimize later.
    for (const [, partitionMap] of this._consumerGroupPartitionSenderMap) {
      for (const [, senders] of partitionMap) {
        for (const sender of senders) {
          if (sender.connection === event.context.connection) {
            senders.delete(sender);
          }
        }
      }
    }

    // Ensure any `StreamingPartitionSender`s associated with the connection are stopped.
    for (const [sender, streamingSender] of this._streamingPartitionSenderMap) {
      if (sender.connection === event.context.connection) {
        this._streamingPartitionSenderMap.delete(sender);
        if (streamingSender) {
          streamingSender.stop();
        }
      }
    }
  };

  /**
   * The event handler for when the service receives a message.
   *
   * Messages are not automatically accepted/rejected.
   * @param event -
   */
  private _handleOnMessages = (event: OnMessagesEvent): void => {
    // Handle batched messages first.
    if (event.entityPath === this._name) {
      // received a message without a partition id
      return this._handleReceivedMessage(event);
    } else if (this._isReceiverPartitionEntityPath(event.entityPath)) {
      // received a message targetted at a partition id
      const entityComponents = this._parseReceiverPartitionEntityPath(event.entityPath);
      if (!entityComponents) {
        return;
      }

      return this._handleReceivedMessage(event, entityComponents.partitionId);
    }

    // Handle individual messages.
    for (const message of event.messages) {
      if (event.entityPath === "$cbs") {
        return this._handleCbsMessage(event, message);
      } else if (isHubRuntimeInfo(event.entityPath, message)) {
        return this._handleHubRuntimeInfoMessage(event, message);
      } else if (isPartitionInfo(event.entityPath, message)) {
        return this._handlePartitionInfoMessage(event, message);
      } else if (this._isSenderPartitionEntityPath(event.entityPath)) {
        const entityComponents = this._parseSenderPartitionEntityPath(event.entityPath);
        // Handle links to partitions
        if (!entityComponents) {
          return;
        }
        event.context.delivery?.accept();
        return;
      } else {
        // Accept other messages my default.
        event.context.delivery?.accept();
      }
    }
  };

  /**
   * Handles responding to CBS messages.
   * @param event -
   */
  private _handleCbsMessage(event: OnMessagesEvent, message: Message): void {
    let outgoingMessage: Message;
    if (!this.isValidCbsAuth(message)) {
      outgoingMessage = {
        correlation_id: message.message_id?.toString(),
        to: message.reply_to,
        application_properties: {
          "status-code": 404,
          "status-description": `The messaging entity '${message.application_properties?.name}' could not be found.`,
          "error-condition": "amqp:not-found",
        },
        body: undefined,
      };
    } else {
      outgoingMessage = createCbsAccepted({
        correlationId: message.message_id as string,
        toLinkName: message.reply_to,
      });
    }
    event.context.delivery?.accept();
    event.sendMessage(outgoingMessage);
  }

  /**
   * Handles responding to Management READ EventHubs messages.
   * @param event -
   */
  private _handleHubRuntimeInfoMessage(event: OnMessagesEvent, message: Message): void {
    const outgoingMessage = generateHubRuntimeInfoResponse({
      correlationId: message.message_id?.toString(),
      partitions: this.partitionIds,
      targetLinkName: message.reply_to,
      createdOn: this._createdOn,
      eventHubName: this._name,
    });
    event.context.delivery?.accept();
    event.sendMessage(outgoingMessage);
  }

  /**
   * Handles responding to Management READ Partition messages.
   * @param event -
   */
  private _handlePartitionInfoMessage(event: OnMessagesEvent, message: Message): void {
    const partitionId = message.application_properties?.partition;
    let outgoingMessage: Message;
    if (!this.partitionIds.includes(partitionId)) {
      outgoingMessage = generateBadPartitionInfoResponse({
        correlationId: message.message_id?.toString(),
        targetLinkName: message.reply_to,
      });
    } else {
      const partitionInfo = this._messageStore.getPartitionInfo(partitionId);
      outgoingMessage = generatePartitionInfoResponse({
        ...partitionInfo,
        correlationId: message.message_id?.toString(),
        targetLinkName: message.reply_to,
        eventHubName: this._name,
      });
    }
    event.context.delivery?.accept();
    event.sendMessage(outgoingMessage);
  }

  /**
   * Handles storing and accepting/rejecting messages sent from a client to a partition.
   * @param event -
   * @param partitionId -
   */
  private _handleReceivedMessage(event: OnMessagesEvent, partitionId?: string): void {
    const delivery = event.context.delivery;

    if (!delivery) {
      throw new Error("event.context.delivery must be defined");
    }

    const deliverySize = (delivery as { data?: unknown[] })["data"]?.length ?? 0;
    const maxMessageSize =
      event.context.receiver?.get_option("max_message_size", 1024 * 1024) ?? 1024 * 1024;
    if (deliverySize >= maxMessageSize) {
      delivery.reject({
        condition: "amqp:link:message-size-exceeded",
        description: `The received message (delivery-id:${
          delivery.id
        }, size:${deliverySize} bytes) exceeds the limit (${
          maxMessageSize ?? 1024 * 1024
        } bytes) currently allowed on the link.`,
      });
      return;
    }
    delivery.accept();
    this._storeMessage(event.messages, partitionId);
  }

  /**
   * Gets the Sender's `ownerLevel`, if it has one.
   * @param sender -
   */
  private _getSenderOwnerLevel(sender: Sender): number | undefined {
    const ownerLevel: number | undefined = sender.properties?.["com.microsoft:epoch"];
    return ownerLevel;
  }

  /**
   * Stores the partition sender based on its consumerGroup and partitionId.
   *
   * Note: Partition senders are used to send messages to a client receiver that
   * is listening on a consumerGroup/partitionId combination.
   * @param consumerGroup -
   * @param partitionId -
   * @param sender -
   */
  private _storePartitionSender(consumerGroup: string, partitionId: string, sender: Sender): void {
    // Ensure we have an entry for the consumer group.
    const consumerGroupPartitionMap =
      this._consumerGroupPartitionSenderMap.get(consumerGroup) ?? new Map<string, Set<Sender>>();
    this._consumerGroupPartitionSenderMap.set(consumerGroup, consumerGroupPartitionMap);

    // Ensure we have an entry for the partition id.
    const partitionSenderSet = consumerGroupPartitionMap.get(partitionId) ?? new Set<Sender>();
    consumerGroupPartitionMap.set(partitionId, partitionSenderSet);

    partitionSenderSet.add(sender);
  }

  /**
   * Removes the partition sender based on its consumerGroup and partitionId.
   *
   * @param consumerGroup -
   * @param partitionId -
   * @param sender -
   */
  private _deletePartitionSender(consumerGroup: string, partitionId: string, sender: Sender): void {
    const partitionSenders = this._consumerGroupPartitionSenderMap
      .get(consumerGroup)
      ?.get(partitionId);
    if (partitionSenders) {
      partitionSenders.delete(sender);
    }
  }

  /**
   * Checks if the `Sender` is allowed to be created based on its `ownerLevel`
   * compared to other `Sender`s that exist on the same consumerGroup/partitionId.
   *
   * Returns `true` is the sender is allowed to be created, `false` otherwise.
   *
   * If the `Sender` is allowed to be created and does have an `ownerLevel`,
   * any existing `Sender`s with the same consumerGroup/partitionId will be closed.
   * @param consumerGroup -
   * @param partitionId -
   * @param sender -
   */
  private _handleSenderOwnerLevel(
    consumerGroup: string,
    partitionId: string,
    sender: Sender
  ): boolean {
    const ownerLevel = this._getSenderOwnerLevel(sender);

    const partitionSenders = this._consumerGroupPartitionSenderMap
      .get(consumerGroup)
      ?.get(partitionId);
    // If there aren't any other senders for this consumerGroup/partition, then just go ahead, it's fine.
    if (!partitionSenders) {
      return true;
    }

    let maxOwnerLevel = -1;
    for (const partitionSender of partitionSenders) {
      const senderOwnerLevel = this._getSenderOwnerLevel(partitionSender);
      if (typeof senderOwnerLevel === "number" && senderOwnerLevel > maxOwnerLevel) {
        maxOwnerLevel = senderOwnerLevel;
      }
    }

    if (typeof ownerLevel === "undefined") {
      if (maxOwnerLevel === -1) {
        // No sender has an ownerLevel, so safe to continue.
        return true;
      } else {
        // There's a sender with a higher ownerLevel, not safe to continue.
        sender.close({
          condition: "amqp:link:stolen",
          description:
            `At least one receiver for the endpoint is created with epoch of '${maxOwnerLevel}', and so non-epoch receiver is not allowed. ` +
            `Either reconnect with a higher epoch, or make sure all epoch receivers are closed or disconnected.`,
        });
        return false;
      }
    }

    if (ownerLevel >= maxOwnerLevel) {
      // This ownerLevel is higher than the existing ownerLevels, so take precedence!
      // Close existing senders!
      for (const partitionSender of partitionSenders) {
        const senderOwnerLevel = this._getSenderOwnerLevel(partitionSender);
        partitionSender.close({
          condition: "amqp:link:stolen",
          description:
            `New receiver 'nil' with higher epoch of '${ownerLevel}' is created hence current receiver 'nil' with epoch '${
              senderOwnerLevel ?? ""
            }' is getting disconnected. ` +
            `If you are recreating the receiver, make sure a higher epoch is used.`,
        });
      }
      return true;
    }

    // This ownerLevel is lower than the existing ownerLevels, so not safe to continue.
    sender.close({
      condition: "amqp:link:stolen",
      description:
        `Receiver 'nil' with a higher epoch '${maxOwnerLevel}' already exists. ` +
        `Receiver 'nil' with epoch ${ownerLevel} cannot be created. ` +
        `Make sure you are creating receiver with increasing epoch value to ensure connectivity, or ensure all old epoch receivers are closed or disconnected.`,
    });
    return false;
  }

  /**
   * Stores a message in the `MessageStore`.
   *
   * If a `partitionId` is not provided, a partition will be assigned
   * either based on the `partitionKey` if it is available, or at random.
   * @param message -
   * @param partitionId -
   */
  private _storeMessage(messages: Message[], partitionId?: string): void {
    if (!messages.length) {
      return;
    }

    let partitionKey: string | undefined;
    // determine partition id
    if (!partitionId) {
      // handle partition key
      partitionKey = messages[0].message_annotations?.["x-opt-partition-key"] as string;
      if (partitionKey) {
        partitionId = this._partitionIdFromKey(partitionKey);
      } else {
        // random assignment
        partitionId = `${Math.floor(Math.random() * this.partitionIds.length)}`;
      }
    }

    for (const message of messages) {
      this._messageStore.storeMessage(partitionId, message, partitionKey);
    }
  }

  /**
   * A very hacky 'hash' function to calculate a `partitionId` from a `partitionKey`.
   * @param partitionKey -
   */
  private _partitionIdFromKey(partitionKey: string): string {
    let hash = 0;
    for (let i = 0; i < partitionKey.length; i++) {
      hash += partitionKey.charCodeAt(i);
    }
    return `${hash % this.partitionIds.length}`;
  }

  /**
   * Validates whether the partition sender can be created.
   *
   * @param entityComponents -
   * @param sender -
   * @param context -
   */
  private _handlePartitionSenderOpenValidation(
    entityComponents: PartionSenderEntityComponents,
    sender: Sender,
    context: EventContext
  ): boolean {
    const { eventHubName, consumerGroup, partitionId } = entityComponents;
    if (!this.partitionIds.includes(partitionId)) {
      sender.close({
        condition: "com.microsoft:argument-out-of-range",
        description:
          "The specified partition is invalid for an EventHub partition sender or receiver.",
      });
      return false;
    }
    if (!this.consumerGroups.has(consumerGroup.toLowerCase())) {
      const host = (context.connection.hostname ?? "").split(".")[0];
      sender.close({
        condition: "amqp-not-found",
        description: `The messaging entity '${host}:eventhub:${eventHubName}~0|${consumerGroup}' could not be found.`,
      });
      return false;
    }
    return true;
  }

  /**
   * Starts the service.
   */
  start(): Promise<void> {
    return this._mockServer.start();
  }

  /**
   * Stops the service.
   */
  stop(): Promise<void> {
    for (const tid of this._clearableTimeouts.values()) {
      clearTimeout(tid);
    }
    this._clearableTimeouts.clear();
    return this._mockServer.stop();
  }

  private _parseReceiverPartitionEntityPath(
    entityPath: string
  ): PartionReceiverEntityComponents | undefined {
    const parts = entityPath.split("/");
    if (parts.length !== 3) {
      return;
    }

    const [eventHubName, , partitionId] = parts;
    return {
      eventHubName,
      partitionId,
    };
  }

  private _parseSenderPartitionEntityPath(
    entityPath: string
  ): PartionSenderEntityComponents | undefined {
    const parts = entityPath.split("/");
    if (parts.length !== 5) {
      return;
    }

    const [eventHubName, , consumerGroup, , partitionId] = parts;
    return {
      eventHubName,
      consumerGroup,
      partitionId,
    };
  }

  private isValidCbsAuth(message: Message): boolean | undefined {
    const name = message.application_properties?.name as string | undefined;
    if (!name) {
      return;
    }

    const url = new URL(name);

    const searchPath = url.pathname.startsWith("/") ? url.pathname.substring(1) : url.pathname;

    if ([`${this._name}/$management`, this._name].includes(searchPath)) {
      return true;
    }

    const receiverRegex = new RegExp(
      `^${this._name}\\/ConsumerGroups\\/[\\w\\d\\$\\-\\_]+\\/Partitions\\/[\\w\\d\\$\\-\\_]+`
    );
    if (receiverRegex.test(searchPath)) {
      return true;
    }

    const senderRegex = new RegExp(`^${this._name}\\/Partitions\\/[\\w\\d\\$\\-\\_]+`);
    if (senderRegex.test(searchPath)) {
      return true;
    }

    return false;
  }

  private _isReceiverPartitionEntityPath(entityPath?: string): boolean {
    return entityPath?.split("/").length === 3;
  }

  private _isSenderPartitionEntityPath(entityPath?: string): boolean {
    return entityPath?.split("/").length === 5;
  }
}
