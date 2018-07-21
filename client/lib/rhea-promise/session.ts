// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as rhea from "rhea";
import * as debugModule from "debug";
import { Connection } from "./connection";
import { Receiver, ReceiverOptions } from "./receiver";
import { Sender, SenderOptions } from "./sender";
import { Func, SenderEvents, ReceiverEvents } from ".";

const debug = debugModule("rhea-promise:session");

export class Session {
  private _session: rhea.Session;
  private _connection: Connection;

  constructor(connection: Connection, session: rhea.Session) {
    this._connection = connection;
    this._session = session;
  }

  get connection(): Connection {
    return this._connection;
  }

  get outgoing(): any {
    return (this._session as any).outgoing;
  }

  isOpen(): boolean {
    let result = false;
    if (this._connection.isOpen() && this._session.is_open()) {
      result = true;
    }
    return result;
  }

  remove(): void {
    if (this._session) {
      this._session.remove();
    }
  }

  begin(): void {
    if (this._session) {
      this._session.begin();
    }
  }

  /**
   * Closes the amqp session.
   * @return {Promise<void>} Promise<void>
   * - **Resolves** the promise when rhea emits the "session_close" event.
   * - **Rejects** the promise with an AmqpError when rhea emits the "session_error" event while trying
   * to close an amqp session.
   */
  close(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      debug("[%s] The session is open ? -> %s", this.connection.id, this.isOpen());
      if (this.isOpen()) {
        const onClose = (context: rhea.EventContext) => {
          this._session.removeListener("session_close", onClose);
          process.nextTick(() => {
            debug("[%s] Resolving the promise as the amqp session has been closed.",
              this.connection.id);
            resolve();
          });
        };

        const onError = (context: rhea.EventContext) => {
          this._session.removeListener("session_error", onError);
          debug("[%s] Error occurred while closing amqp session.",
            this.connection.id, context.session!.error);
          reject(context.session!.error);
        };

        this._session.once("session_close", onClose);
        this._session.once("session_error", onError);
        debug("[%s] Calling session.close()", this.connection.id);
        this._session.close();
      } else {
        resolve();
      }
    });
  }

  /**
   * Creates an amqp receiver on this session.
   * @param {Session} session The amqp session object on which the receiver link needs to be established.
   * @param {ReceiverOptions} [options] Options that can be provided while creating an amqp receiver.
   * @return {Promise<Receiver>} Promise<Receiver>
   * - **Resolves** the promise with the Receiver object when rhea emits the "receiver_open" event.
   * - **Rejects** the promise with an AmqpError when rhea emits the "receiver_close" event while trying
   * to create an amqp receiver.
   */
  createReceiver(options?: ReceiverOptions): Promise<Receiver> {
    if (options &&
      ((options.onMessage && !options.onError) || (options.onError && !options.onMessage))) {
      throw new Error("Both onMessage and onError handlers must be provided if one of " +
        "them is provided.");
    }

    const handlersProvided = options && options.onMessage ? true : false;

    return new Promise((resolve, reject) => {
      const rheaReceiver = this._session.attach_receiver(options);
      const receiver = new Receiver(this, rheaReceiver, options);
      let onOpen: Func<rhea.EventContext, void>;
      let onClose: Func<rhea.EventContext, void>;

      if (handlersProvided) {
        rheaReceiver.on(ReceiverEvents.message, options!.onMessage!);
        rheaReceiver.on(ReceiverEvents.receiverError, options!.onError!);
      }

      if (options && options.onClose) {
        rheaReceiver.on(ReceiverEvents.receiverClose, options.onClose);
      }

      const removeListeners = () => {
        rheaReceiver.removeListener("receiver_open", onOpen);
        rheaReceiver.removeListener("receiver_close", onClose);
      };

      onOpen = (context: rhea.EventContext) => {
        removeListeners();
        process.nextTick(() => {
          debug("[%s] Resolving the promise with amqp receiver '%s'.",
            this.connection.id, rheaReceiver.name);
          resolve(receiver);
        });
      };

      onClose = (context: rhea.EventContext) => {
        removeListeners();
        debug("[%s] Error occurred while creating a receiver over amqp connection: %O.",
          this.connection.id, context.receiver!.error);
        reject(context.receiver!.error);
      };

      rheaReceiver.once("receiver_open", onOpen);
      rheaReceiver.once("receiver_close", onClose);
    });
  }

  /**
   * Creates an amqp sender on this session.
   * @param {SenderOptions} [options] Options that can be provided while creating an amqp sender.
   * @return {Promise<Sender>} Promise<Sender>
   * - **Resolves** the promise with the Sender object when rhea emits the "sender_open" event.
   * - **Rejects** the promise with an AmqpError when rhea emits the "sender_close" event while trying
   * to create an amqp sender.
   */
  createSender(options?: SenderOptions): Promise<Sender> {
    return new Promise((resolve, reject) => {
      const rheaSender = this._session.attach_sender(options);
      const sender = new Sender(this, rheaSender, options);
      let onSendable: Func<rhea.EventContext, void>;
      let onClose: Func<rhea.EventContext, void>;

      if (options) {
        if (options.onError) {
          rheaSender.on(SenderEvents.senderError, options.onError);
        }
        if (options.onClose) {
          rheaSender.on(SenderEvents.senderClose, options.onClose);
        }
        if (options.onAccepted) {
          rheaSender.on(SenderEvents.accepted, options.onAccepted);
        }
        if (options.onRejected) {
          rheaSender.on(SenderEvents.rejected, options.onRejected);
        }
        if (options.onReleased) {
          rheaSender.on(SenderEvents.released, options.onReleased);
        }
        if (options.onModified) {
          rheaSender.on(SenderEvents.modified, options.onModified);
        }
      }

      const removeListeners = () => {
        rheaSender.removeListener(SenderEvents.senderOpen, onSendable);
        rheaSender.removeListener(SenderEvents.senderClose, onClose);
      };

      onSendable = (context: rhea.EventContext) => {
        removeListeners();
        process.nextTick(() => {
          debug("[%s] Resolving the promise with amqp sender '%s'.",
            this.connection.id, rheaSender.name);
          resolve(sender);
        });
      };

      onClose = (context: rhea.EventContext) => {
        removeListeners();
        debug("[%s] Error occurred while creating a sender over amqp connection: %O.",
          this.connection.id, context.sender!.error);
        reject(context.sender!.error);
      };

      rheaSender.once(SenderEvents.sendable, onSendable);
      rheaSender.once(SenderEvents.senderClose, onClose);
    });
  }

  registerHandler(event: rhea.SessionEvents, handler: rhea.OnAmqpEvent): void {
    this._session.on(event, handler);
  }

  removeHandler(event: rhea.SessionEvents, handler: rhea.OnAmqpEvent): void {
    this._session.removeListener(event, handler);
  }

  registerConnectionHandler(event: rhea.ConnectionEvents, handler: rhea.OnAmqpEvent): void {
    this._connection.registerHandler(event, handler);
  }

  removeConnectionHandler(event: rhea.ConnectionEvents, handler: rhea.OnAmqpEvent): void {
    this._connection.removeHandler(event, handler);
  }
}
