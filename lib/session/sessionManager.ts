// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { OnSessionMessage, SessionHandlerOptions, MessageSession } from "./messageSession";
import { OnError } from "../core/messageReceiver";
import { ClientEntityContext } from "../clientEntityContext";
import { getProcessorCount } from "../util/utils";
import * as log from "../log";

export class SessionManager {
  /**
   * @property {boolean} isManagingSessions Indicates whether the manage is currently managing
   * sessions.
   * - **Default**: `false`.
   */
  isManagingSessions: boolean = false;
  /**
   * @property {number} maxConcurrentSessions The maximum number of sessions that the user wants to
   * handle concurrently.
   * - **Default**: `2000`.
   */
  set maxConcurrentSessions(value: number) {
    if (value <= 0) {
      throw new Error("'maxConcurrentSessions must be greater than 0.");
    }
    this._maxConcurrentSessions = value;
    this._maxConcurrentAcceptSessionRequests = value;
  }
  get maxConcurrenSessions(): number {
    return this._maxConcurrentSessions;
  }
  private _maxConcurrentSessions: number;
  /**
   * @property {number} _maxConcurrentAcceptSessionRequests The maximum number of acceptSession
   * requests that can be made concurrently at any given time.
   */
  private set _maxConcurrentAcceptSessionRequests(value: number) {
    this._maxConcurrentAcceptSessionRequests = Math.min(value, getProcessorCount());
  }
  /**
   * @property {ClientEntityContext} _context The client entity context.
   * @readonly
   */
  private readonly _context: ClientEntityContext;

  constructor(context: ClientEntityContext) {
    this._context = context;
    this._maxConcurrentSessions = 2000;
  }
  /**
   * Manages MessageSessions based on the provided parameters.
   * @param onSessionMessage The message handler to receive service bus messages from a session
   * enabled entity.
   * @param onError The error handler to receive an error that occurs while receiving messages
   * from a session enabled entity.
   */
  async manageMessageSessions(
    onSessionMessage: OnSessionMessage,
    onError: OnError,
    options?: SessionHandlerOptions
  ): Promise<void> {
    this.isManagingSessions = true;
    if (!options) options = {};
    if (options.maxConcurrentSessions) this.maxConcurrentSessions = options.maxConcurrentSessions;

    for (let i = 0; i < this._maxConcurrentAcceptSessionRequests; i++) {
      try {
        const messageSession = await MessageSession.create(this._context, options);
        messageSession.receive(onSessionMessage, onError, options);
      } catch (err) {
        log.error(err);
      }
    }
  }
}
