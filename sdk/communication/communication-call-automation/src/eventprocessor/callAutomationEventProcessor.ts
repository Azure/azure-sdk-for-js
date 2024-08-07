// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventEmitter } from "events";
import { CallAutomationEvent } from "../models/events";
import { parseCallAutomationEvent } from "../callAutomationEventParser";
import { AbortSignalLike } from "@azure/abort-controller";

/**
 * Call Automation's EventProcessor for incoming events for ease of use.
 */
export class CallAutomationEventProcessor {
  private readonly defaultTimeout = 240000; // 240 seconds in milliseconds
  private readonly defaultEventBacklogTimeout = 5000; // 5 seconds in milliseconds
  private readonly emitter = new EventEmitter();
  private readonly eventsBacklog: Array<CallAutomationEvent> = [];
  private readonly ongoingEvents: Map<string, any> = new Map();

  /**
   * Process incoming events. Pass incoming events to get it processed to have other method like WaitForEventProcessor to function.
   * @param event - Incoming CloudEvent object.
   */
  public processEvents(event: string | Record<string, unknown> | CallAutomationEvent): void {
    if (event) {
      let callAutomationEvent: CallAutomationEvent;
      // parse the event if not parsed already
      if (typeof event === "string" || Array.isArray(event)) {
        callAutomationEvent = parseCallAutomationEvent(
          (event as string) || (event as Record<string, unknown>),
        );
      } else {
        callAutomationEvent = event as CallAutomationEvent;
      }

      // add to eventbacklog
      this.eventsBacklog.push(callAutomationEvent);
      setTimeout(() => {
        const index = this.eventsBacklog.indexOf(callAutomationEvent);
        if (index !== -1) {
          this.eventsBacklog.splice(index, 1);
        }
      }, this.defaultEventBacklogTimeout);

      // parse event if needed
      this.emitter.emit("event", callAutomationEvent);

      // check if event is disconnect, remove all related items in memory
      if (callAutomationEvent.kind === "CallDisconnected") {
        // remove from ongoingevent list
        for (const [key, evProcessor] of this.ongoingEvents.entries()) {
          if (key.includes(callAutomationEvent.callConnectionId)) {
            // Deregister the event listener
            this.ongoingEvents.delete(key);
            this.emitter.off("event", evProcessor);
          }
        }
      }
    }
  }

  /**
   * Wait for matching incoming event. This is blocking Call. Returns the CallAutomationEvent once it arrives in ProcessEvent method.
   * @param predicate - Conditional Predicate for waiting on event.
   * @param abortSignal - Abort signal to abort the operation.
   * @param timeoutInMs - maximum timeout in milliseconds for the operation.
   */
  public async waitForEventProcessor(
    predicate: (event: CallAutomationEvent) => boolean,
    abortSignal?: AbortSignalLike,
    timeoutInMs?: number,
  ): Promise<CallAutomationEvent> {
    const controller = new AbortController();
    if (!timeoutInMs) {
      timeoutInMs = this.defaultTimeout;
    }

    const filteredEvents = this.eventsBacklog.filter((event) => predicate(event));
    if (filteredEvents.length > 0) {
      // item found - delete from the list and return the event
      this.eventsBacklog.splice(0, this.eventsBacklog.length, ...filteredEvents);
      return filteredEvents[0];
    }

    // await for this event to comeback
    let eventAwaiter: (event: CallAutomationEvent) => void;

    const eventPromise = new Promise<CallAutomationEvent>((resolve, reject) => {
      // set abort signal
      if (abortSignal) {
        // If an external abortSignal is provided, link it with the controller.
        abortSignal.addEventListener("abort", () => {
          controller.abort();
          this.emitter.off("event", eventAwaiter);
          reject(new Error("Abort: Operation was aborted."));
        });
      }

      // set timeout for this event
      const timer = setTimeout(() => {
        this.emitter.off("event", eventAwaiter);
        reject(new Error("Timeout: Matching event did not arrive within timeout."));
      }, timeoutInMs);

      eventAwaiter = (event: CallAutomationEvent) => {
        if (predicate(event)) {
          // Deregister timer and the event listener
          clearTimeout(timer);
          this.emitter.off("event", eventAwaiter);

          // Resolve with the matching event
          resolve(event);
        }
      };

      // Register the event awaiter
      this.emitter.on("event", eventAwaiter);
    });

    return eventPromise;
  }

  /**
   * Attach Ongoing EventProcessor for specific event for a call.
   * @param eventTypeKind - Matching event.
   * @param callConnectionId - CallConnectionId of the call.
   * @param eventProcessor - Method that will execute once the matching event arrives.
   */
  public async attachOngoingEventProcessor(
    callConnectionId: string,
    eventTypeKind: CallAutomationEvent["kind"],
    eventProcessor: (event: CallAutomationEvent) => Promise<void>,
  ): Promise<void> {
    const eventAwaiter = (event: CallAutomationEvent) => {
      if (event.callConnectionId === callConnectionId && event.kind === eventTypeKind) {
        eventProcessor(event);
      }
    };
    // Register the event awaiter
    this.emitter.on("event", eventAwaiter);

    // attach the ongoing event processor to the map
    const uniqueId = this.generateIdTypeKey(callConnectionId, eventTypeKind);
    this.ongoingEvents.set(uniqueId, eventAwaiter);
  }

  /**
   * Detach Ongoing EventProcessor for specific event.
   * @param eventTypeKind - Matching event.
   * @param callConnectionId - CallConnectionId of the call.
   */
  public async detachOngoingEventProcessor(
    callConnectionId: string,
    eventTypeKind: CallAutomationEvent["kind"],
  ): Promise<void> {
    const uniqueId = this.generateIdTypeKey(callConnectionId, eventTypeKind);
    const value = this.ongoingEvents.get(uniqueId);

    if (value) {
      // Deregister the event listener
      this.ongoingEvents.delete(uniqueId);
      this.emitter.off("event", value);
    }
  }

  private generateIdTypeKey(callConnectionId: string, eventType: string): string {
    return `${callConnectionId}:${eventType}`;
  }
}
