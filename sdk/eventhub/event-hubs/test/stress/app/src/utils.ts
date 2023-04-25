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
