import { ChildProcess, fork } from "child_process";
import workerThreads from "worker_threads";
import {
  ManagerToWorkerMessage,
  WorkerToManagerMessage,
  WorkerToManagerMessageWithId,
} from "./messages";
import { DefaultPerfOptions, PerfOptionDictionary } from "./options";

// debug, delete
const inspect =
  <T extends unknown[], U>(fn: (...x: T) => U, name: string, filterArgs?: number[]) =>
  (...args: T): U => {
    console.log(
      `${name}:`,
      args.filter((_, i) => !filterArgs || filterArgs.includes(i))
    );
    return fn(...args);
  };

export type WorkerLike = workerThreads.Worker | ChildProcess;

export interface WorkerData {
  testClassName: string;
  assignedParallels: number;
  options: PerfOptionDictionary<DefaultPerfOptions>;
}

type MessageFilter<T> = (message: T) => boolean;

export interface WorkerMulticoreUtils {
  isManager: false;
  workerData: WorkerData;
  sendMessage(message: WorkerToManagerMessage): void;
  onMessage(callback: (message: ManagerToWorkerMessage) => void): void;
  offMessage(callback: (message: ManagerToWorkerMessage) => void): void;
  getMessage(filter?: MessageFilter<ManagerToWorkerMessage>): Promise<ManagerToWorkerMessage>;
}

export interface ManagerMulticoreUtils {
  isManager: true;
  workers: readonly WorkerLike[];
  createWorker(data: WorkerData): WorkerLike;
  broadcastMessage(message: ManagerToWorkerMessage): void;
  sendMessage(worker: WorkerLike, message: ManagerToWorkerMessage): void;
  onMessage(callback: (message: WorkerToManagerMessageWithId) => void): void;
  offMessage(callback: (message: WorkerToManagerMessageWithId) => void): void;
  getMessage(
    filter: MessageFilter<WorkerToManagerMessageWithId>
  ): Promise<WorkerToManagerMessageWithId>;
  getMessageFromAll(
    filter: MessageFilter<WorkerToManagerMessage>
  ): Promise<WorkerToManagerMessageWithId[]>;
}

export type MulticoreUtils = WorkerMulticoreUtils | ManagerMulticoreUtils;

const makeGetMessage =
  <T>(
    onMessage: (callback: (message: T) => void) => void,
    offMessage: (callback: (message: T) => void) => void
  ) =>
  (filter?: MessageFilter<T>) =>
    new Promise<T>((resolve) => {
      const callback = (message: T) => {
        if (!filter || filter(message)) {
          offMessage(callback);
          resolve(message);
        }
      };

      onMessage(callback);
    });

const createWorkerUtils = (
  sendMessage: (message: any) => void,
  onMessage: (callback: (message: any) => void) => void,
  offMessage: (callback: (message: any) => void) => void,
  workerData: WorkerData
): WorkerMulticoreUtils => ({
  isManager: false,
  sendMessage: inspect(sendMessage, "sendMessage (worker -> manager)"),
  onMessage,
  offMessage,
  getMessage: makeGetMessage<ManagerToWorkerMessage>(onMessage, offMessage),
  workerData,
});

const createChildProcess = (data: WorkerData): WorkerLike =>
  fork(process.argv[1], [JSON.stringify(data)], { stdio: [0, 0, "ipc"] });
const createWorkerThread = (data: WorkerData): WorkerLike =>
  new workerThreads.Worker(process.argv[1], { workerData: data });

const createManagerUtils = (mode: "worker_threads" | "child_processes"): ManagerMulticoreUtils => {
  const workers: WorkerLike[] = [];
  const workerMessageHandlers = new Set<(message: WorkerToManagerMessageWithId) => void>();

  const distributeMessage = (message: WorkerToManagerMessageWithId) => {
    for (const handler of workerMessageHandlers) {
      handler(message);
    }
  };

  const onMessage = (callback: (message: WorkerToManagerMessageWithId) => void) =>
    workerMessageHandlers.add(callback);
  const offMessage = (callback: (message: WorkerToManagerMessageWithId) => void) =>
    workerMessageHandlers.delete(callback);

  const sendMessage = inspect(
    (handle: WorkerLike, message: ManagerToWorkerMessage) => {
      if (isWorker(handle)) {
        handle.postMessage(message);
      } else {
        handle.send(message);
      }
    },
    "sendMessage (manager -> worker)",
    [1]
  );

  const getMessage = makeGetMessage<WorkerToManagerMessageWithId>(onMessage, offMessage);

  const getMessageFromAll = (filter: MessageFilter<WorkerToManagerMessage>) =>
    Promise.all(
      workers.map((_, i) => getMessage(({ workerId, ...msg }) => filter(msg) && workerId === i))
    );

  return {
    isManager: true,
    workers,
    createWorker(data: WorkerData) {
      const worker = (mode === "worker_threads" ? createWorkerThread : createChildProcess)(data);
      const workerId = workers.length;
      workers.push(worker);
      worker.on("message", (msg) => distributeMessage({ ...msg, workerId }));
      return worker;
    },
    onMessage,
    offMessage,
    getMessage,
    getMessageFromAll,
    sendMessage: sendMessage,
    broadcastMessage: (message: ManagerToWorkerMessage) => {
      for (const worker of workers) {
        sendMessage(worker, message);
      }
    },
  };
};

export const multicoreUtils: MulticoreUtils = (() => {
  if (process.send) {
    // we are a child process
    return createWorkerUtils(
      process.send,
      (cb) => process.on("message", cb),
      (cb) => process.off("message", cb),
      JSON.parse(process.argv[2]) as WorkerData
    );
  } else if (workerThreads.parentPort) {
    // we are a worker thread
    return createWorkerUtils(
      (msg) => workerThreads.parentPort?.postMessage(msg),
      (cb) => workerThreads.parentPort?.on("message", cb),
      (cb) => workerThreads.parentPort?.off("message", cb),
      workerThreads.workerData as WorkerData
    );
  } else {
    // we are a manager; TODO: parse the options and switch between workers here.
    return createManagerUtils("worker_threads");
  }
})();

const isWorker = (x: WorkerLike): x is workerThreads.Worker => {
  return typeof (x as unknown as any).postMessage === "function";
};
