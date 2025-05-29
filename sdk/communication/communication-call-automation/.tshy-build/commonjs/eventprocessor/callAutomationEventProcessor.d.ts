import type { CallAutomationEvent } from "../models/events.js";
import type { AbortSignalLike } from "@azure/abort-controller";
/**
 * Call Automation's EventProcessor for incoming events for ease of use.
 */
export declare class CallAutomationEventProcessor {
    private readonly defaultTimeout;
    private readonly defaultEventBacklogTimeout;
    private readonly emitter;
    private readonly eventsBacklog;
    private readonly ongoingEvents;
    /**
     * Process incoming events. Pass incoming events to get it processed to have other method like WaitForEventProcessor to function.
     * @param event - Incoming CloudEvent object.
     */
    processEvents(event: string | Record<string, unknown> | CallAutomationEvent): void;
    /**
     * Wait for matching incoming event. This is blocking Call. Returns the CallAutomationEvent once it arrives in ProcessEvent method.
     * @param predicate - Conditional Predicate for waiting on event.
     * @param abortSignal - Abort signal to abort the operation.
     * @param timeoutInMs - maximum timeout in milliseconds for the operation.
     */
    waitForEventProcessor(predicate: (event: CallAutomationEvent) => boolean, abortSignal?: AbortSignalLike, timeoutInMs?: number): Promise<CallAutomationEvent>;
    /**
     * Attach Ongoing EventProcessor for specific event for a call.
     * @param eventTypeKind - Matching event.
     * @param callConnectionId - CallConnectionId of the call.
     * @param eventProcessor - Method that will execute once the matching event arrives.
     */
    attachOngoingEventProcessor(callConnectionId: string, eventTypeKind: CallAutomationEvent["kind"], eventProcessor: (event: CallAutomationEvent) => Promise<void>): Promise<void>;
    /**
     * Detach Ongoing EventProcessor for specific event.
     * @param eventTypeKind - Matching event.
     * @param callConnectionId - CallConnectionId of the call.
     */
    detachOngoingEventProcessor(callConnectionId: string, eventTypeKind: CallAutomationEvent["kind"]): Promise<void>;
    private generateIdTypeKey;
}
//# sourceMappingURL=callAutomationEventProcessor.d.ts.map