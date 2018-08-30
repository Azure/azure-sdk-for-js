// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as rhea from "rhea";
import * as log from "./log";
import { Connection } from "./connection";
import { Receiver, ReceiverOptions } from "./receiver";
import { Sender, SenderOptions } from "./sender";
import { Func, SenderEvents, ReceiverEvents, SessionEvents } from ".";
import { defaultOperationTimeoutInSeconds } from "./util/constants";

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

  /**
   * Determines whether the close from the peer is a response to a locally initiated close request.
   * @returns {boolean} `true` if close was locally initiated, `false` otherwise.
   */
  isClosed(): boolean {
    return this._session.is_closed();
  }

  /**
   * Determines whether both local and remote endpoint for just the session itself are closed.
   * Within the "session_close" event handler, if this method returns `false` it means that
   * the local end is still open. It can be useful to determine whether the close
   * was initiated locally under such circumstances.
   *
   * @returns {boolean} `true` - closed, `false` otherwise.
   */
  isItselfClosed(): boolean {
    return this._session.is_itself_closed();
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
      log.error("[%s] The session is open ? -> %s", this.connection.id, this.isOpen());
      if (this.isOpen()) {
        let onError: Func<rhea.EventContext, void>;
        let onClose: Func<rhea.EventContext, void>;
        let waitTimer: any;

        const removeListeners = () => {
          clearTimeout(waitTimer);
          this._session.removeListener(SessionEvents.sessionError, onError);
          this._session.removeListener(SessionEvents.sessionClose, onClose);
        };

        onClose = (context: rhea.EventContext) => {
          removeListeners();
          process.nextTick(() => {
            log.session("[%s] Resolving the promise as the amqp session has been closed.",
              this.connection.id);
            resolve();
          });
        };

        onError = (context: rhea.EventContext) => {
          removeListeners();
          log.error("[%s] Error occurred while closing amqp session.",
            this.connection.id, context.session!.error);
          reject(context.session!.error);
        };

        const actionAfterTimeout = () => {
          removeListeners();
          const msg: string = `Unable to close the amqp session due to operation timeout.`;
          log.error("[%s] %s", this.connection.id, msg);
          reject(new Error(msg));
        };

        this._session.once(SessionEvents.sessionClose, onClose);
        this._session.once(SessionEvents.sessionError, onError);
        log.session("[%s] Calling session.close()", this.connection.id);
        waitTimer = setTimeout(actionAfterTimeout, defaultOperationTimeoutInSeconds * 1000);
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

      // Register session handlers for session_error and session_close if provided.
      if (options && options.onSessionError) {
        this._session.on(SessionEvents.sessionError, options.onSessionError);
      }

      if (options && options.onSessionClose) {
        this._session.on(SessionEvents.sessionClose, options.onSessionClose);
      }
      const rheaReceiver = this._session.attach_receiver(options);
      const receiver = new Receiver(this, rheaReceiver, options);
      let onOpen: Func<rhea.EventContext, void>;
      let onClose: Func<rhea.EventContext, void>;
      let waitTimer: any;

      if (handlersProvided) {
        rheaReceiver.on(ReceiverEvents.message, options!.onMessage!);
        rheaReceiver.on(ReceiverEvents.receiverError, options!.onError!);
      }

      if (options && options.onClose) {
        rheaReceiver.on(ReceiverEvents.receiverClose, options.onClose);
      }

      const removeListeners = () => {
        clearTimeout(waitTimer);
        rheaReceiver.removeListener(ReceiverEvents.receiverOpen, onOpen);
        rheaReceiver.removeListener(ReceiverEvents.receiverClose, onClose);
      };

      onOpen = (context: rhea.EventContext) => {
        removeListeners();
        process.nextTick(() => {
          log.session("[%s] Resolving the promise with amqp receiver '%s'.",
            this.connection.id, rheaReceiver.name);
          resolve(receiver);
        });
      };

      onClose = (context: rhea.EventContext) => {
        removeListeners();
        log.error("[%s] Error occurred while creating a receiver over amqp connection: %O.",
          this.connection.id, context.receiver!.error);
        reject(context.receiver!.error);
      };

      const actionAfterTimeout = () => {
        removeListeners();
        const msg: string = `Unable to create the amqp receiver ${rheaReceiver.name} due to ` +
          `operation timeout.`;
        log.error("[%s] %s", this.connection.id, msg);
        reject(new Error(msg));
      };

      rheaReceiver.once(ReceiverEvents.receiverOpen, onOpen);
      rheaReceiver.once(ReceiverEvents.receiverClose, onClose);
      waitTimer = setTimeout(actionAfterTimeout, defaultOperationTimeoutInSeconds * 1000);
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
      // Register session handlers for session_error and session_close if provided.
      if (options && options.onSessionError) {
        this._session.on(SessionEvents.sessionError, options.onSessionError);
      }

      if (options && options.onSessionClose) {
        this._session.on(SessionEvents.sessionClose, options.onSessionClose);
      }

      const rheaSender = this._session.attach_sender(options);
      const sender = new Sender(this, rheaSender, options);
      let onSendable: Func<rhea.EventContext, void>;
      let onClose: Func<rhea.EventContext, void>;
      let waitTimer: any;

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
        clearTimeout(waitTimer);
        rheaSender.removeListener(SenderEvents.senderOpen, onSendable);
        rheaSender.removeListener(SenderEvents.senderClose, onClose);
      };

      onSendable = (context: rhea.EventContext) => {
        removeListeners();
        process.nextTick(() => {
          log.session("[%s] Resolving the promise with amqp sender '%s'.",
            this.connection.id, rheaSender.name);
          resolve(sender);
        });
      };

      onClose = (context: rhea.EventContext) => {
        removeListeners();
        log.error("[%s] Error occurred while creating a sender over amqp connection: %O.",
          this.connection.id, context.sender!.error);
        reject(context.sender!.error);
      };

      const actionAfterTimeout = () => {
        removeListeners();
        const msg: string = `Unable to create the amqp sender ${rheaSender.name} due to ` +
          `operation timeout.`;
        log.error("[%s] %s", this.connection.id, msg);
        reject(new Error(msg));
      };

      rheaSender.once(SenderEvents.sendable, onSendable);
      rheaSender.once(SenderEvents.senderClose, onClose);
      waitTimer = setTimeout(actionAfterTimeout, defaultOperationTimeoutInSeconds * 1000);
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
