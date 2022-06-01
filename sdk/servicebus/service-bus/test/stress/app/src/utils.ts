import { v4 as uuidv4 } from "uuid";

export interface OperationInfo {
  numberOfSuccesses: number;
  numberOfFailures: number;
}

export interface LockRenewalOperationInfo extends OperationInfo {
  /**
   * key - id, value - next renewal timer meant for the message/session-receiver
   */
  lockRenewalTimers: { [key: string]: NodeJS.Timer };
  /**
   * key - id, value - number of renewals
   */
  renewalCount: { [key: string]: number };
}

export interface SnapshotOptions {
  /**
   * The name of this test. Used when reporting telemetry in customDimensions['testName'].
   */
  testName: string;
  snapshotFocus?: (
    | "send-info"
    | "receive-info"
    | "message-lock-renewal-info"
    | "session-lock-renewal-info"
    | "close-info"
  )[];
  snapshotIntervalInMs?: number;
  /**
   * Snapshot information is automatically sent to Azure Monitor.
   * This allows you also print the same information to the console.
   *
   * Disabled by default.
   */
  writeSnapshotInfoToConsole?: boolean;
}

export interface TrackedMessageIdsInfo {
  [key: string]: {
    sentCount: number;
    receivedCount: number;
    settledCount: number;
  };
}

export function initializeOperationInfo(): OperationInfo {
  return {
    numberOfSuccesses: 0,
    numberOfFailures: 0,
  };
}

export function initializeLockRenewalOperationInfo(): LockRenewalOperationInfo {
  return { ...initializeOperationInfo(), lockRenewalTimers: {}, renewalCount: {} };
}

export function generateMessage(useSessions: boolean, numberOfSessions: number) {
  return {
    body: `message ${Math.random()}`,
    sessionId: useSessions ? `session-${Math.ceil(Math.random() * numberOfSessions)}` : undefined,
    messageId: uuidv4(),
  };
}

export async function saveDiscrepanciesFromTrackedMessages(
  trackedMessageIds: TrackedMessageIdsInfo
) {
  const output = {
    messages_sent_but_never_received: [] as string[],
    messages_not_sent_but_received: [] as string[],
    messages_sent_multiple_times: [] as string[],
    messages_sent_once_but_received_multiple_times: [] as string[],
    messages_sent_once_and_received_once: [] as string[],
  };

  for (const id in trackedMessageIds) {
    if (trackedMessageIds[id].sentCount <= 0) {
      // Message was not sent but received
      output.messages_not_sent_but_received.push(id);
    }
    if (trackedMessageIds[id].receivedCount === 0) {
      // Message was sent but not received - message loss
      output.messages_sent_but_never_received.push(id);
    }
    if (trackedMessageIds[id].sentCount > 1) {
      // Message was sent multiple times
      output.messages_sent_multiple_times.push(id);
    }
    if (trackedMessageIds[id].sentCount === 1 && trackedMessageIds[id].receivedCount > 1) {
      // Message was sent once but received multiple times
      output.messages_sent_once_but_received_multiple_times.push(id);
    }
    if (trackedMessageIds[id].sentCount === 1 && trackedMessageIds[id].receivedCount === 1) {
      // Message was sent once and received once
      output.messages_sent_once_and_received_once.push(id);
    }
  }
  return output;
}
