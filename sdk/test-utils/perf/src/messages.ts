import type { BarrierMessage } from "./barrier";
import { PerfParallel } from "./parallel";

export interface StatusUpdateMessage {
  tag: "statusUpdate";
  parallels: PerfParallel[];
}

export interface ReportResultsMessage {
  tag: "reportResults";
  parallels: PerfParallel[];
}

export type WorkerToManagerMessage = BarrierMessage | StatusUpdateMessage | ReportResultsMessage;

export type WorkerToManagerMessageWithId = WorkerToManagerMessage & { workerId: number };

export type ManagerToWorkerMessage = BarrierMessage;

export type Message = WorkerToManagerMessage | ManagerToWorkerMessage;
