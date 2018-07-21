// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as rhea from "rhea";
import * as debugModule from "debug";
import { Session } from "./session";
import { Connection } from "./connection";
import { Func, SenderEvents } from ".";
const debug = debugModule("rhea-promise:sender");

export interface SenderOptions extends rhea.SenderOptions {
  onAccepted?: rhea.OnAmqpEvent;
  onRejected?: rhea.OnAmqpEvent;
  onReleased?: rhea.OnAmqpEvent;
  onModified?: rhea.OnAmqpEvent;
  onError?: rhea.OnAmqpEvent;
  onClose?: rhea.OnAmqpEvent;
}

export class Sender {
  senderOptions?: SenderOptions;
  private _session: Session;
  private _sender: rhea.Sender;

  constructor(session: Session, sender: rhea.Sender, options?: SenderOptions) {
    this._session = session;
    this._sender = sender;
    this.senderOptions = options;
  }

  get name(): string {
    return this._sender.name;
  }

  get error(): rhea.AmqpError | Error | undefined {
    return this._sender.error;
  }

  get properties(): rhea.Dictionary<any> {
    return this._sender.properties;
  }

  get source(): rhea.Source {
    return this._sender.source;
  }

  get target(): rhea.TerminusOptions {
    return this._sender.target;
  }

  get address(): string {
    return this.source.address;
  }
  get credit(): number {
    return (this._sender as any).credit;
  }

  get session(): Session {
    return this._session;
  }

  get connection(): Connection {
    return this._session.connection;
  }

  /**
   * Determines whether the message is sendable.
   * @returns {boolean} `true` Sendable. `false` Not Sendable.
   */
  sendable(): boolean {
    return this._sender.sendable();
  }

  send(msg: rhea.Message | Buffer, tag?: Buffer | string, format?: number): rhea.Delivery {
    return this._sender.send(msg, tag, format);
  }

  /**
   * Determines whether the sender link is open.
   * @returns {boolean} `true` open. `false` closed.
   */
  isOpen(): boolean {
    let result = false;
    if (this._session.isOpen() && this._sender.is_open()) {
      result = true;
    }
    return result;
  }

  /**
   * Removes the sender and it's underlying session from the internal map.
   * @returns {void} void
   */
  remove(): void {
    if (this._sender) {
      this._sender.remove();
    }
    if (this._session) {
      this._session.remove();
    }
  }

  /**
   * Closes the amqp sender.
   * @return {Promise<void>} Promise<void>
   * - **Resolves** the promise when rhea emits the "sender_close" event.
   * - **Rejects** the promise with an AmqpError when rhea emits the
   * "sender_error" event while trying to close an amqp sender.
   */
  close(): Promise<void> {
    const senderClose = new Promise<void>((resolve, reject) => {
      if (this.isOpen()) {
        let onError: Func<rhea.EventContext, void>;
        let onClose: Func<rhea.EventContext, void>;

        onClose = (context: rhea.EventContext) => {
          this._sender.removeListener(SenderEvents.senderClose, onClose);
          process.nextTick(() => {
            debug("[%s] Resolving the promise as the amqp sender has been closed.",
              this.connection.id);
            resolve();
          });
        };

        onError = (context: rhea.EventContext) => {
          this._sender.removeListener(SenderEvents.senderError, onError);
          debug("[%s] Error occurred while closing amqp sender: %O.",
            this.connection.id, context.session!.error);
          reject(context.session!.error);
        };

        this._sender.once(SenderEvents.senderClose, onClose);
        this._sender.once(SenderEvents.senderError, onError);
        this._sender.close();
      } else {
        resolve();
      }
    });

    return senderClose.then(() => { return this._session.close(); });
  }

  setMaxListeners(count: number): void {
    this._sender.setMaxListeners(count);
  }

  getMaxListeners(): number {
    return this._sender.getMaxListeners();
  }

  registerHandler(event: SenderEvents, handler: rhea.OnAmqpEvent): void {
    this._sender.on(event, handler);
  }

  removeHandler(event: SenderEvents, handler: rhea.OnAmqpEvent): void {
    this._sender.removeListener(event, handler);
  }

  registerSessionHandler(event: rhea.SessionEvents, handler: rhea.OnAmqpEvent): void {
    this._session.registerHandler(event, handler);
  }

  removeSessionHandler(event: rhea.SessionEvents, handler: rhea.OnAmqpEvent): void {
    this._session.removeHandler(event, handler);
  }
}
