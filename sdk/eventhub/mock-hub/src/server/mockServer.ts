// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ListenOptions } from "net";
import { EventEmitter } from "events";
import {
  ConnectionOptions,
  Container,
  EventContext,
  Message,
  ReceiverEvents,
  Sender,
  create_container,
  SenderEvents,
  Receiver,
  ConnectionEvents,
  ConnectionError
} from "rhea";
import { convertBufferToMessages } from "../utils/convertBufferToMessage";

export interface MockServerOptions {
  /**
   * The port number the server should listen on.
   * If not specified, an open port will be chosen at random.
   */
  port?: number;
  /**
   * The maximum message size to allow on `Sender` and `Receiver` links.
   * Defaults to 1 MB.
   */
  maxMessageSize?: number;
  /**
   * Specifies the idle timeout in milliseconds.
   * Defaults to 240000.
   */
  idleTimeOut?: number;

  tlsOptions?: {
    /**
     * Optionally override the trusted CA certificates.
     * Default is to trust the well-known CAs curated by Mozilla.
     * Mozilla's CAs are completely replaced when CAs are explicitly specified using this option.
     */
    ca?: string | string[] | Buffer | Buffer[];

    /**
     * Cert chains in PEM format.
     * One cert chain should be provided per private key.
     *  Each cert chain should consist of the PEM formatted certificate for a provided private key,
     *  followed by the PEM formatted intermediate certificates (if any), in order,
     *  and not including the root CA (the root CA must be pre-known to the peer, see ca).
     */
    cert?: string | string[] | Buffer | Buffer[];

    /**
     * Private keys in PEM format.
     * PEM allows the option of private keys being encrypted.
     * Encrypted keys will be decrypted with options.passphrase.
     */
    key?: string | string[] | Buffer | Buffer[];

    /**
     * PFX or PKCS12 encoded private key and certificate chain.
     * pfx is an alternative to providing key and cert individually.
     */
    pfx?: string | string[] | Buffer | Buffer[];

    /**
     * Shared passphrase used for a single private key and/or a PFX.
     */
    passphrase?: string;
  };
}

export interface ReceiverOpenEvent {
  entityPath: string;
  receiver: Receiver;
  context: EventContext;
}

export interface ReceiverCloseEvent {
  entityPath: string;
  receiver: Receiver;
  context: EventContext;
}

export interface SenderOpenEvent {
  entityPath: string;
  sender: Sender;
  context: EventContext;
}

export interface SenderCloseEvent {
  entityPath: string;
  sender: Sender;
  context: EventContext;
}

export interface ConnectionOpenEvent {
  context: EventContext;
}

export interface ConnectionCloseEvent {
  error?: Error | ConnectionError;
  context: EventContext;
}

export interface OnMessagesEvent {
  messages: Array<Message & { body?: Buffer }>;
  entityPath: string;
  sendMessage: (message: Message) => void;
  context: EventContext;
}

/**
 * A Mock AMQP server.
 *
 * This class is meant to make it easier for a mock service
 * to interact with incoming messages and link notifications.
 */
export class MockServer extends EventEmitter {
  private _container: Container;
  private _listener?: ReturnType<Container["listen"]>;
  private _options: MockServerOptions;

  constructor(options: MockServerOptions = {}) {
    super();
    this._options = options;
    this._container = create_container();
  }

  /**
   * The port number the server is listening on.
   * Returns `-1` if the server is not currently listening.
   */
  public get port(): number {
    const address = this._listener?.address();
    if (!address || typeof address === "string") {
      return -1;
    }
    return address.port;
  }

  /**
   * Starts the server.
   */
  public start(): Promise<void> {
    return new Promise((resolve, reject) => {
      const options = this._options;
      const ONE_MB = 1024 * 1024;
      const listenOptions: ListenOptions & ConnectionOptions & any = {
        port: options.port ?? 0,
        max_frame_size: 65536,
        channel_max: 4999,
        idle_time_out: options.idleTimeOut ?? 240000,
        receiver_options: {
          max_message_size: options.maxMessageSize ?? ONE_MB,
          autosettle: true,
          autoaccept: false
        },
        sender_options: {
          max_message_size: options.maxMessageSize ?? ONE_MB,
          autosettle: true
        },
        transport: "tls",
        rejectUnauthorized: true,
        ...options.tlsOptions
      };

      this._setupDefaultListeners();
      this._listener = this._container.listen(listenOptions);
      this._listener.once("error", reject);
      this._listener.on("listening", () => {
        resolve();
      });
    });
  }

  emit(type: "receiverOpen", event: ReceiverOpenEvent): boolean;
  emit(type: "senderOpen", event: SenderOpenEvent): boolean;
  emit(type: "connectionOpen", event: ConnectionOpenEvent): boolean;
  emit(type: "onMessages", event: OnMessagesEvent): boolean;
  emit(type: "receiverClose", event: ReceiverCloseEvent): boolean;
  emit(type: "senderClose", event: SenderCloseEvent): boolean;
  emit(type: "connectionClose", event: ConnectionCloseEvent): boolean;
  emit(type: string, event: any): boolean {
    return super.emit(type, event);
  }

  /**
   * Add new "receiverOpen" event listener.
   * This event indicates when the remote peer has created a `Sender`
   * and the server creates a `Receiver` link in response.
   * @param type "receiverOpen"
   * @param listener
   */
  public on(type: "receiverOpen", listener: (event: ReceiverOpenEvent) => void): this;
  /**
   * Add new "receiverClose" event listener.
   * This event indicates when the remote peer has closed a `Sender`
   * and the server closes a `Receiver` link in response.
   * @param type "receiverClose"
   * @param listener
   */
  public on(type: "receiverClose", listener: (event: ReceiverCloseEvent) => void): this;
  /**
   * Add new "connectionOpen" event listener.
   * This event indicates when the remote peer has created a connection to the server.
   * @param type "connectionOpen"
   * @param listener
   */
  public on(type: "connectionOpen", listener: (event: ConnectionOpenEvent) => void): this;
  /**
   * Add new "senderOpen" event listener.
   * This event indicates when the remote peer has created a `Receiver`
   * and the server creates a `Sender` link in response.
   * @param type "senderOpen"
   * @param listener
   */
  public on(type: "senderOpen", listener: (event: SenderOpenEvent) => void): this;
  /**
   * Add new "senderClose" event listener.
   * This event indicates when the remote peer has closed a `Receiver`
   * and the server closes a `Sender` link in response.
   * @param type "senderClose"
   * @param listener
   */
  public on(type: "senderClose", listener: (event: SenderCloseEvent) => void): this;
  /**
   * Add new "connectionClose" event listener.
   * This event indicates when the remote peer has closed a connection to the server.
   * @param type "connectionClose"
   * @param listener
   */
  public on(type: "connectionClose", listener: (event: ConnectionCloseEvent) => void): this;
  /**
   * Add new "onMessage" event listener.
   * This event indicates when the server has received a message from a remote peer.
   * Messages are received over a `Receiver` link.
   * @param type "connectionClose"
   * @param listener
   */
  public on(type: "onMessages", listener: (event: OnMessagesEvent) => void): this;
  public on(type: string, listener: (event: any) => void): this {
    return super.on(type, listener);
  }

  /**
   * Closes the server.
   */
  public stop(): Promise<void> {
    const listener = this._listener;
    this._listener = undefined;
    if (!listener) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      listener.close((err) => {
        setTimeout(() => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }, 0);
      });
    });
  }

  private _setupDefaultListeners() {
    this._container.sasl_server_mechanisms.enable_anonymous();
    this._container.sasl.server_add_external(this._container.sasl_server_mechanisms);
    this._container.sasl_server_mechanisms["MSSBCBS"] = this._container.sasl_server_mechanisms[
      "EXTERNAL"
    ];
    this._container.on(ConnectionEvents.connectionError, () => {});
    this._container.on(ConnectionEvents.protocolError, () => {});
    this._container.on(ConnectionEvents.connectionOpen, (context: EventContext) => {
      context.connection.on("error", function(this: typeof context.connection, err: Error) {
        console.log(`Error occurred on connection:`, err?.message);
      });
      this.emit("connectionOpen", {
        context
      });
    });
    this._container.on(ConnectionEvents.connectionClose, (context: EventContext) => {
      this.emit("connectionClose", {
        context,
        error: context.error as ConnectionError
      });
    });
    this._container.on(ConnectionEvents.disconnected, (context: EventContext) => {
      this.emit("connectionClose", {
        context,
        error: context.error as Error
      });
    });
    this._container.on(SenderEvents.senderOpen, (context: EventContext) => {
      if (context.sender) {
        const entityPath = context.sender.source.address;
        this.emit("senderOpen", {
          context,
          entityPath,
          sender: context.sender
        });
      }
    });
    this._container.on(ReceiverEvents.receiverOpen, (context: EventContext) => {
      if (context.receiver) {
        const entityPath = context.receiver.target.address;
        this.emit("receiverOpen", {
          context,
          entityPath,
          receiver: context.receiver
        });
      }
    });
    this._container.on(ReceiverEvents.message, this._handleMessage);
    this._container.on(SenderEvents.senderClose, (context: EventContext) => {
      if (context.sender) {
        const entityPath = context.sender.source.address;
        this.emit("senderClose", {
          context,
          entityPath,
          sender: context.sender
        });
      }
    });
    this._container.on(ReceiverEvents.receiverClose, (context: EventContext) => {
      if (context.receiver) {
        const entityPath = context.receiver.target.address;
        this.emit("receiverClose", {
          context,
          entityPath,
          receiver: context.receiver
        });
      }
    });
    this._container.on("error", function(err) {
      console.log("Unexpected error encountered:", err);
    });
  }

  private _normalizeIncomingMessage(message: Message | Buffer): Array<Message & { body?: Buffer }> {
    const incomingMessages = Buffer.isBuffer(message)
      ? convertBufferToMessages(message)
      : [message];

    for (const m of incomingMessages) {
      // The multiple check detects if an AMQP message is actually a batch of messages.
      // If it is, then content is an array of individual AMQP messages.
      // Otherwise, it's the content of a single AMQP message (e.g. sequence body type).
      if (m.body.multiple && m.body?.content) {
        m.body = m.body.content;
      }
    }

    return incomingMessages;
  }

  private _handleMessage = (context: EventContext) => {
    if (!context.message || !context.receiver) {
      return;
    }

    const incomingMessages = this._normalizeIncomingMessage(context.message);
    const entityPath = context.receiver.target.address ?? "";
    this.emit("onMessages", {
      messages: incomingMessages,
      entityPath,
      sendMessage: (message: Message) => {
        this._sendMessage(context, message, message.to);
      },
      context
    });
  };

  private _sendMessage = (context: EventContext, outgoingMessage: Message, toLinkName?: string) => {
    const sender = context.connection.find_sender(
      (s: Sender) => s.name === toLinkName || s.target.address === toLinkName
    );
    if (sender) {
      sender.send(outgoingMessage);
    } else {
      context.connection.send(outgoingMessage);
    }
  };
}
