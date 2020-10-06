import { v4 as uuidv4 } from "uuid";
import util from "util";
import fs from "fs";
const writeFile = util.promisify(fs.writeFile);

export interface OperationInfo {
  numberOfSuccesses: number;
  numberOfFailures: number;
  errors: any[];
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
  snapshotFocus?: (
    | "send-info"
    | "receive-info"
    | "message-lock-renewal-info"
    | "session-lock-renewal-info"
    | "close-info"
  )[];
  snapshotIntervalInMs?: number;
}

export interface TrackedMessageIdsInfo {
  [key: string]: {
    sentCount: number;
    receivedCount: number;
    settledCount: number;
    errors: any[];
  };
}

export function initializeOperationInfo(): OperationInfo {
  return {
    numberOfSuccesses: 0,
    numberOfFailures: 0,
    errors: []
  };
}

export function initializeLockRenewalOperationInfo(): LockRenewalOperationInfo {
  return { ...initializeOperationInfo(), lockRenewalTimers: {}, renewalCount: {} };
}

export function generateMessage(useSessions: boolean) {
  return {
    body: `message ${Math.random()}`,
    sessionId: useSessions ? `session-${Math.ceil(Math.random() * 10000)}` : undefined,
    messageId: uuidv4()
  };
}

export async function saveDiscrepanciesFromTrackedMessages(
  trackedMessageIds: TrackedMessageIdsInfo,
  fileName: string
) {
  const output = {
    messages_sent_but_never_received: [],
    messages_not_sent_but_received: [],
    messages_sent_multiple_times: []
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
  }

  await writeFile(fileName, JSON.stringify(output));
}
