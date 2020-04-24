import {
  ServiceBusClient,
  delay,
  ReceivedMessageWithLock,
  SessionReceiver,
  MessagingError
} from "./";
import * as dotenv from "dotenv";
import { env } from "process";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";

dotenv.config();

const serviceBusConnectionString =
  env["SERVICEBUS_CONNECTION_STRING"] || "<service bus connection string not in environment>";
const queueName = env["QUEUE_NAME_WITH_SESSIONS"] || "<queue name not in environment>";
const maxSessionsToProcessSimultaneously = 8;
const sessionIdleTimeoutMs = 3 * 1000;
const delayWhenNoSessionsAvailableMs = 5 * 1000;

function processInitialize(sessionId: string) {
  console.log(`[${sessionId}] will start processing...`);
}

function processMessage(msg: ReceivedMessageWithLock) {
  console.log(`[${msg.sessionId}] received message with body ${msg.body}`);
}

function processError(err: Error, sessionId: string) {
  console.log(`[${sessionId}] had error ${err.message}`);
}

function processClose(reason: "error" | "idle_timeout", sessionId: string) {
  if (reason === "error") {
    console.log(`[${sessionId}] was closed because of error`);
  } else if (reason === "idle_timeout") {
    console.log(`[${sessionId}] was closed - no more messages within idle timeout`);
  }
}

function _createIdleTimer(
  timeoutMs: number
): { refresh(): void; expirationPromise: Promise<void> } {
  let resolveExpirationPromise: () => void;

  const expirationPromise = new Promise<void>((res, _rej) => {
    resolveExpirationPromise = res;
  });

  let timer = setTimeout(() => resolveExpirationPromise(), timeoutMs);

  return {
    refresh() {
      clearTimeout(timer);
      timer = setTimeout(() => resolveExpirationPromise(), timeoutMs);
    },
    expirationPromise
  };
}

async function _processNextSession(
  serviceBusClient: ServiceBusClient,
  abortSignal: AbortSignalLike
): Promise<void> {
  let sessionReceiver: SessionReceiver<ReceivedMessageWithLock>;

  try {
    sessionReceiver = await serviceBusClient.createSessionReceiver(queueName, "peekLock", {
      autoRenewLockDurationInMs: sessionIdleTimeoutMs
    });
  } catch (err) {
    if ((err as MessagingError).code === "no-sessions-available") {
      console.log(`INFO: no available sessions, sleeping for ${delayWhenNoSessionsAvailableMs}`);
      await delay(delayWhenNoSessionsAvailableMs);
      return;
    }

    throw err;
  }

  await processInitialize(sessionReceiver.sessionId);

  const idleTimer = _createIdleTimer(sessionIdleTimeoutMs);
  let threwError = false;

  sessionReceiver.subscribe(
    {
      async processMessage(msg) {
        idleTimer.refresh();
        await processMessage(msg);
      },
      async processError(err) {
        threwError = true;
        await processError(err, sessionReceiver.sessionId);
      }
    },
    {
      abortSignal
    }
  );

  await idleTimer.expirationPromise;

  try {
    await sessionReceiver.close();
  } catch (err) {
    await processError(err, sessionReceiver.sessionId);
  }

  await processClose(threwError ? "error" : "idle_timeout", sessionReceiver.sessionId);
}

async function _roundRobinThroughAvailableSessions(abortSignal: AbortSignalLike): Promise<void> {
  const serviceBusClient = new ServiceBusClient(serviceBusConnectionString);
  const allPromises = [];

  for (let i = 0; i < maxSessionsToProcessSimultaneously; ++i) {
    allPromises.push(
      new Promise(async (_res, rej) => {
        try {
          while (!abortSignal.aborted) {
            await _processNextSession(serviceBusClient, abortSignal);
          }
        } catch (err) {
          rej(err);
        }
      })
    );
  }

  // if we get a fatal error in any of the promises we can just shut it all down
  console.log(`All session promises have been started`);
  await Promise.race(allPromises);
  console.log(`Exiting...`);
}

async function main() {
  const abortController = new AbortController();

  await _roundRobinThroughAvailableSessions(abortController.signal);
}

main().catch((err) => console.log(`Fatal error: ${err}`));
