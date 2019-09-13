export type LongRunningOperationStates =
  | "InProgress"
  | "Succeeded"
  | "Failed"
  | "Canceled"
  | "Cancelled";

export const terminalStates: LongRunningOperationStates[] = [
  "Succeeded",
  "Failed",
  "Canceled",
  "Cancelled"
];
