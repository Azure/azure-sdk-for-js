// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { SessionManagerOptions, MessageSession, SessionCallee } from "./messageSession";
import { OnError, OnMessage } from "../core/messageReceiver";
import { ClientEntityContext } from "../clientEntityContext";
import { getProcessorCount } from "../util/utils";
import * as log from "../log";
import { Semaphore } from "../util/semaphore";
import { delay, ConditionErrorNameMapper, Constants } from "@azure/amqp-common";

/**
 * @internal
 * Enum to denote the entity type calling the session manager
 */
export enum SessionEntityType {
  queue = "Queue",
  subscription = "Subscription"
}

/**
 * @internal
 */
export class SessionManager {
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
    this.maxConcurrentAcceptSessionRequests = value;
  }
  get maxConcurrenSessions(): number {
    return this._maxConcurrentSessions;
  }
  /**
   * @property {number} _maxConcurrentAcceptSessionRequests The maximum number of acceptSession
   * requests that can be made concurrently at any given time.
   */
  set maxConcurrentAcceptSessionRequests(value: number) {
    this._maxConcurrentAcceptSessionRequests = Math.min(value, getProcessorCount());
  }
  get maxConcurrentAcceptSessionRequests(): number {
    return this._maxConcurrentAcceptSessionRequests;
  }

  private _isManagingSessions: boolean = false;
  private _maxConcurrentSessions!: number;
  private _maxConcurrentAcceptSessionRequests!: number;
  private _isCancelRequested: boolean = false;
  private _maxConcurrentSessionsSemaphore!: Semaphore;
  private _maxPendingAcceptSessionsSemaphore!: Semaphore;

  /**
   * @property {ClientEntityContext} _context The client entity context.
   * @readonly
   */
  private readonly _context: ClientEntityContext;

  constructor(context: ClientEntityContext) {
    this._context = context;
    this.maxConcurrentSessions = 2000;
  }

  /**
   * Accept a new session and start receiving messages.
   * @param onMessage Handler for receiving messages from a session enabled entity.
   * @param onError Handler for receiving errors.
   * @param options Optional parameters for handling sessions.
   */
  private async _acceptSessionAndReceiveMessages(
    onMessage: OnMessage,
    onError: OnError,
    options?: SessionManagerOptions
  ): Promise<void> {
    if (!options) {
      options = {};
    }
    const connectionId = this._context.namespace.connectionId;
    const noActiveSessionBackOffInSeconds = 10;
    while (!this._isCancelRequested) {
      try {
        await this._maxConcurrentSessionsSemaphore.acquire();
        log.sessionManager(
          "[%s] Acquired the semaphore for max concurrent sessions: %d, %d.",
          connectionId,
          this._maxConcurrentSessionsSemaphore.currentLockCount(),
          this._maxConcurrentSessionsSemaphore.awaitedTaskCount()
        );

        await this._maxPendingAcceptSessionsSemaphore.acquire();
        log.sessionManager(
          "[%s] Acquired the semaphore for max pending accept sessions: %d, %d.",
          connectionId,
          this._maxPendingAcceptSessionsSemaphore.currentLockCount(),
          this._maxPendingAcceptSessionsSemaphore.awaitedTaskCount()
        );

        const closeMessageSession = async (messageSession: MessageSession): Promise<void> => {
          try {
            await this._maxConcurrentSessionsSemaphore.release();
            log.sessionManager(
              "[%s] Releasing the semaphore for max concurrent sessions: %d, %d.",
              connectionId,
              this._maxConcurrentSessionsSemaphore.currentLockCount(),
              this._maxConcurrentSessionsSemaphore.awaitedTaskCount()
            );
            if (messageSession.isOpen()) {
              await messageSession.close();
            }
          } catch (err) {
            log.error(
              "[%s] An error occurred while releasing the max concurrent session semaphore " +
                "or while closing MessageSession with id '%s': %O.",
              connectionId,
              messageSession.sessionId,
              err
            );
          }
        };
        // Create the MessageSession.
        const messageSession = await MessageSession.create(this._context, {
          sessionId: undefined,
          callee: SessionCallee.sessionManager,
          ...options
        });

        messageSession.newMessageWaitTimeoutInSeconds = options.newMessageWaitTimeoutInSeconds;

        if (this._isCancelRequested) {
          log.sessionManager(
            "[%s] Since cancellation was requested, we will close the messageSession with id '%s'.",
            connectionId,
            messageSession.sessionId
          );
          await closeMessageSession(messageSession);
        }
        const sessionId = messageSession.sessionId;
        this._context.messageSessions[sessionId as string] = messageSession;

        log.sessionManager("[%s] Created MessageSession with id '%s'.", connectionId, sessionId);
        const onSessionError: OnError = async (error) => {
          log.sessionManager(
            "An error ocurred in MessageSession with id '%s': %O. Hence closing it.",
            connectionId,
            sessionId,
            error
          );
          await closeMessageSession(messageSession);
          if (error.name !== ConditionErrorNameMapper["com.microsoft:message-wait-timeout"]) {
            // notify the user about the error.
            onError(error);
          }
        };
        messageSession.receive(onMessage, onSessionError, options);
      } catch (err) {
        log.error("[%s] An error occurred while accepting a MessageSession: %O", connectionId, err);
        this._maxConcurrentSessionsSemaphore.release();
        log.sessionManager(
          "[%s] Releasing the semaphore for max concurrent sessions " +
            "because an error ocurred: %d, %d.",
          connectionId,
          this._maxConcurrentSessionsSemaphore.currentLockCount(),
          this._maxConcurrentSessionsSemaphore.awaitedTaskCount()
        );
        // When we ask servicebus to give us a random session and if there are no active sessions,
        // ServiceBus initially sends the attach frame which causes rhea to emit "receiver_open"
        // event and thus rhea-promise resolves the promise. Moments later ServiceBus sends a
        // detach frame with an error that the link creation timed out. Therefore inside
        // MessageSession._init() after the promise to create a session enabled receiver link
        // resolves we check for sessionId. If it is undefined then we reject the Promise with an
        // error "session-cannot-be-locked". The "operation-timeout" error happens when
        // rhea-promise does not receive a response from ServiceBus in a predefined time frame and
        // the Promise is rejected. The "microsoft.timeout" error occurs when timeout happens on
        // the server side and ServiceBus sends a detach frame due to which the Promise is rejected.
        if (
          err.name === ConditionErrorNameMapper["amqp:operation-timeout"] ||
          err.name === ConditionErrorNameMapper["com.microsoft:timeout"] ||
          err.name === ConditionErrorNameMapper["com.microsoft:session-cannot-be-locked"]
        ) {
          // No point in delaying if cancel has been requested.
          if (!this._isCancelRequested) {
            log.sessionManager(
              "[%s] Sleeping for %d seconds, since there are no more active MessageSessions on " +
                "the ServiceBus entity.",
              connectionId,
              noActiveSessionBackOffInSeconds
            );
            await delay(noActiveSessionBackOffInSeconds * 1000);
          }
        } else {
          // notify the user about the error only when it is not one of the above mentioned errors.
          onError(err);
        }
      } finally {
        this._maxPendingAcceptSessionsSemaphore.release();
        log.sessionManager(
          "[%s] Releasing the semaphore for max pending accept sessions from " +
            "the finally block: %d, %d.",
          connectionId,
          this._maxPendingAcceptSessionsSemaphore.currentLockCount(),
          this._maxPendingAcceptSessionsSemaphore.awaitedTaskCount()
        );
      }
    }
  }

  /**
   * Manages MessageSessions based on the provided parameters.
   * @param onMessage The message handler to receive service bus messages from a session
   * enabled entity.
   * @param onError The error handler to receive an error that occurs while receiving messages
   * from a session enabled entity.
   * @throws Error if the underlying connection is closed.
   * @throws Error if the session enabled client is already receiving messages.
   * @throws MessagingError if any error occurs while receiving messages from the service.
   */
  async manageMessageSessions(
    entityType: SessionEntityType,
    onMessage: OnMessage,
    onError: OnError,
    options?: SessionManagerOptions
  ): Promise<void> {
    if (this._isManagingSessions) {
      throw new Error(
        `${entityType}Client for "${this._context.namespace.config.entityPath}" ` +
          `is already receiving messages from sessions. Please close this ${entityType}Client or ` +
          `create a new one and receiveMessages from Sessions.`
      );
    }
    this._isManagingSessions = true;
    this._isCancelRequested = false;
    if (!options) options = {};
    if (options.maxConcurrentSessions) this.maxConcurrentSessions = options.maxConcurrentSessions;
    // We are explicitly configuring the messageSession to timeout in 60 seconds (if not provided
    // by the user) when no new messages are received.
    if (!options.newMessageWaitTimeoutInSeconds) {
      options.newMessageWaitTimeoutInSeconds = Constants.defaultOperationTimeoutInSeconds;
    }
    this._maxConcurrentSessionsSemaphore = new Semaphore(this.maxConcurrenSessions);
    this._maxPendingAcceptSessionsSemaphore = new Semaphore(
      this.maxConcurrentAcceptSessionRequests
    );

    for (let i = 0; i < this._maxConcurrentAcceptSessionRequests; i++) {
      this._acceptSessionAndReceiveMessages(onMessage, onError, options).catch((err) => {
        log.error(err);
      });
    }
  }

  /**
   * Close the session manager.
   */
  close(): void {
    log.sessionManager(
      "[%s] Closing the SessionMaanger for entity '%s'.",
      this._context.namespace.connectionId,
      this._context.entityPath
    );
    this._isCancelRequested = true;
    this._isManagingSessions = false;
  }
}
