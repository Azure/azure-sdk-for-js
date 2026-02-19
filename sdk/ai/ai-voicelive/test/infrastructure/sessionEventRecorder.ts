// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ServerEventUnion,
  VoiceLiveSession,
  VoiceLiveSubscription,
  StartSessionOptions,
} from "../../src/index.js";

/**
 * Options for waiting for events
 */
export interface EventWaitOptions {
  /** Start collecting/searching from this event type */
  from?: string;
  /** Timeout in milliseconds (default: 30000) */
  timeout?: number;
  /** Whether to throw on error events (default: true) */
  exitOnError?: boolean;
  /** Additional error event types to watch for */
  errorEventTypes?: string[];
}

/**
 * A utility class that records all events from a VoiceLive session and provides
 * methods to wait for specific events or collect event sequences.
 *
 * This class solves race conditions by attaching to the session before it starts
 * and recording all events in chronological order.
 */
export class SessionEventRecorder {
  // Default error event types that will cause early exit when exitOnError is true
  private static readonly DEFAULT_ERROR_EVENTS = [
    "error",
    "session.error",
    "connection.error",
    "response.error",
    "conversation.error",
    "input_audio_buffer.error",
  ];

  private eventStack: ServerEventUnion[] = [];
  private subscription: VoiceLiveSubscription;
  private pendingWaiters: Map<
    string,
    Array<{
      resolve: (result: ServerEventUnion | ServerEventUnion[]) => void;
      reject: (error: Error) => void;
      options: EventWaitOptions & { waitForSingle: boolean };
      id: symbol;
    }>
  > = new Map();

  /**
   * Creates a new SessionEventRecorder and immediately starts recording events.
   * This should be called BEFORE starting the session to avoid race conditions.
   *
   * @param session - The VoiceLiveSession to record events from
   */
  constructor(session: VoiceLiveSession | StartSessionOptions) {
    // Subscribe immediately to start recording all events
    if ("subscribe" in session) {
      this.subscription = session.subscribe({
        onServerEvent: async (event) => this.recordEvent(event),
      });
    } else {
      session.sessionHandlers = { onServerEvent: async (event) => this.recordEvent(event) };
      // No-op subscription since handlers are attached directly to the session
      this.subscription = {
        // Ensure cleanup() can safely call close() without throwing
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        close: () => {},
      } as VoiceLiveSubscription;
    }
  }

  /**
   * Wait for a specific event and return just that event.
   * Optionally start searching from a specific event type.
   * Removes all events up to and including the target event from the stack.
   *
   * @param eventType - The event type to wait for
   * @param options - Options for waiting behavior
   * @returns Promise that resolves with the target event
   */
  async waitForEvent(eventType: string, options: EventWaitOptions = {}): Promise<ServerEventUnion> {
    const result = await this.waitForEventInternal(eventType, {
      exitOnError: true, // Default to true
      ...options,
      waitForSingle: true,
    });
    return result as ServerEventUnion;
  }

  /**
   * Wait for a specific event and return all events from start (or 'from' event)
   * up to and including the target event.
   * Removes all returned events from the stack.
   *
   * @param eventType - The event type to wait for
   * @param options - Options for waiting behavior
   * @returns Promise that resolves with array of events from start to target (inclusive)
   */
  async waitForEvents(
    eventType: string,
    options: EventWaitOptions = {},
  ): Promise<ServerEventUnion[]> {
    const result = await this.waitForEventInternal(eventType, {
      exitOnError: true, // Default to true
      ...options,
      waitForSingle: false,
    });
    return result as ServerEventUnion[];
  }

  /**
   * Check if a specific event type exists in the current event stack
   *
   * @param eventType - The event type to check for
   * @param from - Optionally start searching from this event type
   * @returns true if the event exists in the stack
   */
  hasEvent(eventType: string, from?: string): boolean {
    let startIndex = 0;

    if (from) {
      const fromIndex = this.eventStack.findIndex((event) => event.type === from);
      if (fromIndex === -1) {
        return false; // 'from' event not found
      }
      startIndex = fromIndex;
    }

    return this.eventStack.some((event, index) => index >= startIndex && event.type === eventType);
  }

  /**
   * Get all events currently in the stack (returns a copy)
   *
   * @returns Copy of all recorded events
   */
  getAllEvents(): ServerEventUnion[] {
    return [...this.eventStack];
  }

  /**
   * Get the number of events currently in the stack
   *
   * @returns Number of events in the stack
   */
  getEventCount(): number {
    return this.eventStack.length;
  }

  /**
   * Clear all events from the stack
   */
  clear(): void {
    this.eventStack = [];
  }

  /**
   * Clean up the recorder - closes subscription and rejects all pending waiters
   */
  cleanup(): void {
    // Close the subscription to stop recording new events
    this.subscription?.close();

    // Reject all pending waiters
    this.pendingWaiters.forEach((waiters) => {
      waiters.forEach((waiter) => {
        waiter.reject(new Error("SessionEventRecorder cleanup - recording stopped"));
      });
    });

    this.pendingWaiters.clear();
    this.eventStack = [];
  }

  // Private implementation methods

  private async waitForEventInternal(
    eventType: string,
    options: EventWaitOptions & { waitForSingle: boolean },
  ): Promise<ServerEventUnion | ServerEventUnion[]> {
    const { from, timeout = 30000, waitForSingle, exitOnError = true, errorEventTypes } = options;

    // Check for existing error events first if exitOnError is enabled
    if (exitOnError) {
      const errorEvent = this.findErrorEvent(from, errorEventTypes);
      if (errorEvent) {
        throw new Error(
          `Session error occurred: ${errorEvent.type} - ${JSON.stringify(errorEvent)}`,
        );
      }
    }

    // Check existing events for the target
    const existingResult = this.searchExistingEvents(eventType, from, waitForSingle);
    if (existingResult) {
      return existingResult;
    }

    // Need to wait for future events
    return new Promise((resolve, reject) => {
      const waiterId = Symbol("waiter");
      const timeoutId = setTimeout(() => {
        this.removeWaiter(eventType, waiterId);
        reject(new Error(`Timeout waiting for event: ${eventType}`));
      }, timeout);

      const waiter = {
        resolve: (result: ServerEventUnion | ServerEventUnion[]) => {
          clearTimeout(timeoutId);
          this.removeWaiter(eventType, waiterId);
          resolve(result);
        },
        reject: (error: Error) => {
          clearTimeout(timeoutId);
          this.removeWaiter(eventType, waiterId);
          reject(error);
        },
        options,
        id: waiterId,
      };

      this.addWaiter(eventType, waiter);
    });
  }

  private searchExistingEvents(
    targetEventType: string,
    fromEventType?: string,
    waitForSingle: boolean = false,
  ): ServerEventUnion | ServerEventUnion[] | null {
    let startIndex = 0;

    // Find the 'from' event if specified
    if (fromEventType) {
      const fromIndex = this.eventStack.findIndex((event) => event.type === fromEventType);
      if (fromIndex === -1) {
        return null; // 'from' event not found yet
      }
      startIndex = fromIndex;
    }

    // Find the target event from the start index
    const targetIndex = this.eventStack.findIndex(
      (event, index) => index >= startIndex && event.type === targetEventType,
    );

    if (targetIndex === -1) {
      return null; // Target event not found yet
    }

    if (waitForSingle) {
      // Return just the target event, remove everything up to and including it
      const targetEvent = this.eventStack[targetIndex];
      this.eventStack.splice(0, targetIndex + 1);
      return targetEvent;
    } else {
      // Return all events from start to target (inclusive), remove them from stack
      const events = this.eventStack.slice(startIndex, targetIndex + 1);
      this.eventStack.splice(0, targetIndex + 1);
      return events;
    }
  }

  private findErrorEvent(
    fromEventType?: string,
    customErrorTypes?: string[],
  ): ServerEventUnion | null {
    let startIndex = 0;

    // Find the 'from' event if specified
    if (fromEventType) {
      const fromIndex = this.eventStack.findIndex((event) => event.type === fromEventType);
      if (fromIndex !== -1) {
        startIndex = fromIndex;
      }
    }

    const errorTypes = [...SessionEventRecorder.DEFAULT_ERROR_EVENTS, ...(customErrorTypes || [])];

    // Look for error events from the start index
    for (let i = startIndex; i < this.eventStack.length; i++) {
      const event = this.eventStack[i];

      // Check if it's a known error event type
      if (errorTypes.some((errorType) => event.type.includes(errorType))) {
        return event;
      }

      // Check if event has error property set to true
      if ((event as any).error === true) {
        return event;
      }

      // Check for session disconnection/failure events
      if (
        event.type.includes("disconnect") ||
        event.type.includes("failed") ||
        event.type.includes("close")
      ) {
        return event;
      }
    }

    return null;
  }

  private recordEvent(event: ServerEventUnion): void {
    this.eventStack.push(event);
    this.notifyWaiters(event);
  }

  private notifyWaiters(event: ServerEventUnion): void {
    // First, check if this is an error event that should fail waiters with exitOnError enabled
    const allWaiters = Array.from(this.pendingWaiters.values()).flat();
    const failedWaiters: symbol[] = [];

    allWaiters.forEach((waiter) => {
      const { exitOnError, errorEventTypes } = waiter.options;

      if (exitOnError) {
        // Check if this new event is an error event
        const errorTypes = [
          ...SessionEventRecorder.DEFAULT_ERROR_EVENTS,
          ...(errorEventTypes || []),
        ];

        const isErrorEvent =
          errorTypes.some((errorType) => event.type.includes(errorType)) ||
          (event as any).error === true ||
          event.type.includes("disconnect") ||
          event.type.includes("failed") ||
          event.type.includes("close");

        if (isErrorEvent) {
          waiter.reject(
            new Error(`Session error occurred: ${event.type} - ${JSON.stringify(event)}`),
          );
          failedWaiters.push(waiter.id);
          return;
        }
      }
    });

    // Remove failed waiters from all event types
    this.pendingWaiters.forEach((waiters, eventType) => {
      const filteredWaiters = waiters.filter((w) => !failedWaiters.includes(w.id));
      this.pendingWaiters.set(eventType, filteredWaiters);
    });

    // Now handle normal event processing for remaining waiters
    const waiters = this.pendingWaiters.get(event.type) || [];
    const completedWaiters: symbol[] = [];

    waiters.forEach((waiter) => {
      const { from, waitForSingle } = waiter.options;

      // Try to fulfill this waiter's request
      const result = this.searchExistingEvents(event.type, from, waitForSingle);
      if (result) {
        waiter.resolve(result);
        completedWaiters.push(waiter.id);
      }
    });

    // Remove completed waiters
    if (completedWaiters.length > 0) {
      const remainingWaiters = waiters.filter((w) => !completedWaiters.includes(w.id));
      this.pendingWaiters.set(event.type, remainingWaiters);
    }
  }

  private addWaiter(eventType: string, waiter: any): void {
    if (!this.pendingWaiters.has(eventType)) {
      this.pendingWaiters.set(eventType, []);
    }
    this.pendingWaiters.get(eventType)!.push(waiter);
  }

  private removeWaiter(eventType: string, waiterId: symbol): void {
    const waiters = this.pendingWaiters.get(eventType) || [];
    const filteredWaiters = waiters.filter((w) => w.id !== waiterId);
    this.pendingWaiters.set(eventType, filteredWaiters);
  }
}
