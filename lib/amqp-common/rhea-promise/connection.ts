// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as rhea from "rhea";
import * as debugModule from "debug";
import { Session } from "./session";
import { Sender, SenderOptions } from "./sender";
import { Receiver, ReceiverOptions } from "./receiver";
import { Func } from "../util/utils";

const debug = debugModule("rhea-promise");

export interface ReqResLink {
  sender: Sender;
  receiver: Receiver;
  session: Session;
}

export class Connection {
  options?: rhea.ConnectionOptions;
  private _connection: rhea.Connection;

  constructor(options?: rhea.ConnectionOptions) {
    this.options = options;
    this._connection = rhea.connect(options);
  }

  get id(): string {
    return this._connection.options.id!;
  }

  /**
   * Creates a new amqp connection.
   * @param {ConnectionOptions} [options] Options to be provided for establishing an amqp connection.
   * @return {Promise<Connection>} Promise<Connection>
   * - **Resolves** the promise with the Connection object when rhea emits the "connection_open" event.
   * - **Rejects** the promise with an AmqpError when rhea emits the "connection_close" event while trying
   * to establish an amqp connection.
   */
  open(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      if (!this.isOpen()) {

        let onOpen: Func<rhea.EventContext, void>;
        let onClose: Func<rhea.EventContext, void>;
        let onTransportClose: Func<rhea.EventContext, void>;

        const removeListeners: Function = () => {
          this._connection!.removeListener("connection_open", onOpen);
          this._connection!.removeListener("connection_close", onClose);
          this._connection!.removeListener("disconnected", onClose);
          this._connection!.removeListener("disconnected", onTransportClose);
        };

        onOpen = (context: rhea.EventContext) => {
          removeListeners();
          this._connection!.once("disconnected", onTransportClose);
          process.nextTick(() => {
            debug("Resolving the promise with amqp connection.");
            resolve(this);
          });
        };

        onClose = (context: rhea.EventContext) => {
          removeListeners();
          debug(`Error occurred while establishing amqp connection.`, context.connection.error);
          reject(context.connection.error);
        };

        onTransportClose = (context: rhea.EventContext) => {
          debug(`Error occurred on the amqp connection.`, context.connection.error);
          this.close().then(() => {
            context.connection = undefined as any;
          }).catch((err: Error) => {
            debug(`Error occurred while closing amqp connection.`, err);
          });
        };

        this._connection!.once("connection_open", onOpen);
        this._connection!.once("connection_close", onClose);
        this._connection!.once("disconnected", onClose);
      } else {
        resolve(this);
      }
    });
  }


  /**
   * Closes the amqp connection.
   * @return {Promise<void>} Promise<void>
   * - **Resolves** the promise when rhea emits the "connection_close" event.
   * - **Rejects** the promise with an AmqpError when rhea emits the "connection_error" event while trying
   * to close an amqp connection.
   */
  close(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this._connection && this._connection.is_open()) {
        let onClose: Func<rhea.EventContext, void>;
        let onError: Func<rhea.EventContext, void>;

        onClose = (context: rhea.EventContext) => {
          this._connection!.removeListener("connection_close", onClose);
          process.nextTick(() => {
            debug("Resolving the promise as the connection has been successfully closed.");
            resolve();
          });
        };

        onError = (context: rhea.EventContext) => {
          this._connection!.removeListener("connection_error", onError);
          debug(`Error occurred while closing amqp connection.`, context.connection.error);
          reject(context.connection.error);
        };

        this._connection.once("connection_close", onClose);
        this._connection.once("connection_error", onError);
        this._connection.close();
      } else {
        resolve();
      }
    });
  }

  /**
   * Determines whether the connection is open.
   * @return {boolean} true if open false otherwise.
   */
  isOpen(): boolean {
    let result: boolean = false;
    if (this._connection && this._connection.is_open && this._connection.is_open()) {
      result = true;
    }
    return result;
  }

  /**
   * Creates an amqp session on the provided amqp connection.
   * @return {Promise<Session>} Promise<Session>
   * - **Resolves** the promise with the Session object when rhea emits the "session_open" event.
   * - **Rejects** the promise with an AmqpError when rhea emits the "session_close" event while trying
   * to create an amqp session.
   */
  createSession(): Promise<Session> {
    return new Promise((resolve, reject) => {
      const rheaSession = this._connection.create_session();
      const session = new Session(this, rheaSession);
      let onOpen: Func<rhea.EventContext, void>;
      let onClose: Func<rhea.EventContext, void>;

      const removeListeners = () => {
        rheaSession.removeListener("session_open", onOpen);
        rheaSession.removeListener("session_close", onClose);
      };

      onOpen = (context: rhea.EventContext) => {
        removeListeners();
        process.nextTick(() => {
          debug("Resolving the promise with amqp session.");
          resolve(session);
        });
      };

      onClose = (context: rhea.EventContext) => {
        removeListeners();
        debug(`Error occurred while establishing a session over amqp connection.`, context.session.error);
        reject(context.session.error);
      };

      rheaSession.once("session_open", onOpen);
      rheaSession.once("session_close", onClose);
      debug("Calling amqp session.begin().");
      rheaSession.begin();
    });
  }

  async createRequestResponseLink(senderOptions: SenderOptions, receiverOptions: ReceiverOptions): Promise<ReqResLink> {
    if (!senderOptions) {
      throw new Error(`Please provide sender options.`);
    }
    if (!receiverOptions) {
      throw new Error(`Please provide receiver options.`);
    }
    const session = await this.createSession();
    const sender = await session.createSender(senderOptions);
    const receiver = await session.createReceiver(receiverOptions);
    debug("[%s] Successfully created the sender and receiver links on the same session.", this.id);
    return {
      session: session,
      sender: sender,
      receiver: receiver
    };
  }

  registerHandler(event: rhea.ConnectionEvents, handler: rhea.OnAmqpEvent): void {
    this._connection.on(event, handler);
  }

  removeHandler(event: rhea.ConnectionEvents, handler: rhea.OnAmqpEvent): void {
    this._connection.removeListener(event, handler);
  }
}
