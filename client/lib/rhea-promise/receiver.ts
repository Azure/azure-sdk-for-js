// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as rhea from "rhea";
import * as debugModule from "debug";
import { Session } from "./session";
import { Connection } from "./connection";
import { Func, ReceiverEvents } from ".";
const debug = debugModule("rhea-promise:receiver");

export interface ReceiverOptions extends rhea.ReceiverOptions {
  onMessage?: rhea.OnAmqpEvent;
  onError?: rhea.OnAmqpEvent;
  onClose?: rhea.OnAmqpEvent;
}

export class Receiver {
  receiverOptions?: ReceiverOptions;
  private _session: Session;
  private _receiver: rhea.Receiver;

  constructor(session: Session, receiver: rhea.Receiver, options?: ReceiverOptions) {
    this._session = session;
    this._receiver = receiver;
    this.receiverOptions = options;
  }

  get name(): string {
    return this._receiver.name;
  }

  get error(): rhea.AmqpError | Error | undefined {
    return this._receiver.error;
  }

  get properties(): rhea.Dictionary<any> {
    return this._receiver.properties;
  }

  get source(): rhea.Source {
    return this._receiver.source;
  }

  get target(): rhea.TerminusOptions {
    return this._receiver.target;
  }

  get address(): string {
    return this.source.address;
  }

  get session(): Session {
    return this._session;
  }

  get connection(): Connection {
    return this._session.connection;
  }

  get drain(): boolean {
    return this._receiver.drain;
  }

  addCredit(credit: number): void {
    this._receiver.add_credit(credit);
  }

  setCreditWindow(creditWindow: number): void {
    this._receiver.set_credit_window(creditWindow);
  }
  /**
   * Determines whether the sender link is open.
   * @returns {boolean} `true` open. `false` closed.
   */
  isOpen(): boolean {
    let result = false;
    if (this._session.isOpen() && this._receiver.is_open()) {
      result = true;
    }
    return result;
  }

  /**
   * Removes the receiver and it's underlying session from the internal map.
   * @returns {void} void
   */
  remove(): void {
    if (this._receiver) {
      this._receiver.remove();
    }
    if (this._session) {
      this._session.remove();
    }
  }

  /**
   * Closes the amqp receiver.
   * @return {Promise<void>} Promise<void>
   * - **Resolves** the promise when rhea emits the "receiver_close" event.
   * - **Rejects** the promise with an AmqpError when rhea emits the
   * "receiver_error" event while trying to close an amqp receiver.
   */
  close(): Promise<void> {
    const receiverClose = new Promise<void>((resolve, reject) => {
      debug("[%s] The receiver is open ? -> %s", this.connection.id, this.isOpen());
      if (this.isOpen()) {
        let onError: Func<rhea.EventContext, void>;
        let onClose: Func<rhea.EventContext, void>;

        onClose = (context: rhea.EventContext) => {
          this._receiver.removeListener(ReceiverEvents.receiverClose, onClose);
          process.nextTick(() => {
            debug("[%s] Resolving the promise as the amqp receiver has been closed.",
              this.connection.id);
            resolve();
          });
        };

        onError = (context: rhea.EventContext) => {
          this._receiver.removeListener(ReceiverEvents.receiverError, onError);
          debug("[%s] Error occurred while closing amqp receiver. %O",
            this.connection.id, context.session!.error);
          reject(context.session!.error);
        };

        this._receiver.once(ReceiverEvents.receiverClose, onClose);
        this._receiver.once(ReceiverEvents.receiverError, onError);
        this._receiver.close();
      } else {
        resolve();
      }
    });

    return receiverClose.then(() => {
      debug("[%s] receiver has been closed, now closing it's session.", this.connection.id);
      return this._session.close();
    });
  }

  registerHandler(event: ReceiverEvents, handler: rhea.OnAmqpEvent): void {
    this._receiver.on(event, handler);
  }

  removeHandler(event: ReceiverEvents, handler: rhea.OnAmqpEvent): void {
    this._receiver.removeListener(event, handler);
  }

  registerSessionHandler(event: rhea.SessionEvents, handler: rhea.OnAmqpEvent): void {
    this._session.registerHandler(event, handler);
  }

  removeSessionHandler(event: rhea.SessionEvents, handler: rhea.OnAmqpEvent): void {
    this._session.removeHandler(event, handler);
  }
}
