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
  snapshotIntervalInMs?: number;
  /**
   * Snapshot information is automatically sent to Azure Monitor.
   * This allows you also print the same information to the console.
   *
   * Disabled by default.
   */
  writeSnapshotInfoToConsole?: boolean;
}
