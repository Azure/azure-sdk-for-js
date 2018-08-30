// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as rhea from "rhea";
import * as log from "./log";
import { Session } from "./session";
import { Connection } from "./connection";
import { Func, ReceiverEvents } from ".";
import { defaultOperationTimeoutInSeconds } from "./util/constants";

export interface ReceiverOptions extends rhea.ReceiverOptions {
  onMessage?: rhea.OnAmqpEvent;
  onError?: rhea.OnAmqpEvent;
  onClose?: rhea.OnAmqpEvent;
  onSessionError?: rhea.OnAmqpEvent;
  onSessionClose?: rhea.OnAmqpEvent;
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
   * Determines whether the receiver link is open.
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
   * Determines whether both local and remote endpoint for link or it's underlying session
   * or it's underlying connection are closed.
   * Within the "receiver_close", "session_close" event handler, if this
   * method returns `false` it means that the local end is still open. It can be useful to
   * determine whether the close was initiated locally under such circumstances.
   *
   * @returns {boolean} `true` if closed, `false` otherwise.
   */
  isClosed(): boolean {
    return this._receiver.is_closed();
  }

  /**
   * Determines whether both local and remote endpoint for just the link itself are closed.
   * Within the "receiver_close" event handler, if this method returns `false` it
   * means that the local end is still open. It can be useful to determine whether the close
   * was initiated locally under such circumstances.
   *
   * @returns {boolean} `true` - closed, `false` otherwise.
   */
  isItselfClosed(): boolean {
    return this._receiver.is_itself_closed();
  }

  /**
   * Determines whether both local and remote endpoint for session or it's underlying
   * connection are closed.
   *
   * Within the "session_close" event handler, if this method returns `false` it means that
   * the local end is still open. It can be useful to determine whether the close
   * was initiated locally under such circumstances.
   *
   * @returns {boolean} `true` - closed, `false` otherwise.
   */
  isSessionClosed(): boolean {
    return this._session.isClosed();
  }

  /**
   * Determines whether both local and remote endpoint for just the session itself are closed.
   * Within the "session_close" event handler, if this method returns `false` it means that
   * the local end is still open. It can be useful to determine whether the close
   * was initiated locally under such circumstances.
   *
   * @returns {boolean} `true` - closed, `false` otherwise.
   */
  isSessionItselfClosed(): boolean {
    return this._session.isItselfClosed();
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
      log.error("[%s] The receiver is open ? -> %s", this.connection.id, this.isOpen());
      if (this.isOpen()) {
        let onError: Func<rhea.EventContext, void>;
        let onClose: Func<rhea.EventContext, void>;
        let waitTimer: any;

        const removeListeners = () => {
          clearTimeout(waitTimer);
          this._receiver.removeListener(ReceiverEvents.receiverError, onError);
          this._receiver.removeListener(ReceiverEvents.receiverClose, onClose);
        };

        onClose = (context: rhea.EventContext) => {
          removeListeners();
          process.nextTick(() => {
            log.receiver("[%s] Resolving the promise as the amqp receiver has been closed.",
              this.connection.id);
            resolve();
          });
        };

        onError = (context: rhea.EventContext) => {
          removeListeners();
          log.error("[%s] Error occurred while closing amqp receiver. %O",
            this.connection.id, context.session!.error);
          reject(context.session!.error);
        };

        const actionAfterTimeout = () => {
          removeListeners();
          const msg: string = `Unable to close the amqp receiver ${this.name} due to operation timeout.`;
          log.error("[%s] %s", this.connection.id, msg);
          reject(new Error(msg));
        };

        this._receiver.once(ReceiverEvents.receiverClose, onClose);
        this._receiver.once(ReceiverEvents.receiverError, onError);
        waitTimer = setTimeout(actionAfterTimeout, defaultOperationTimeoutInSeconds * 1000);
        this._receiver.close();
      } else {
        resolve();
      }
    });

    return receiverClose.then(() => {
      log.receiver("[%s] receiver has been closed, now closing it's session.", this.connection.id);
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
