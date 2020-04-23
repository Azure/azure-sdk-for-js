import { ServiceBusClient, delay, ReceivedMessageWithLock } from "@azure/service-bus";
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

interface SessionMessageHandlers {
  processInitialize(sessionId: string);
  processMessage(msg: ReceivedMessageWithLock);
  processError(err: Error, sessionId: string);
  processClose(reason: "error" | "idle_timeout", sessionId: string);
}

function _createIdleTimer(
  timeoutMs: number
): { refresh(): void; expirationPromise: Promise<void> } {
  let resolveExpirationPromise;

  const expirationPromise = new Promise<void>((res, _rej) => {
    resolveExpirationPromise = res;
  });

  let timer = setTimeout(resolveExpirationPromise, timeoutMs);

  return {
    refresh() {
      clearTimeout(timer);
      timer = setTimeout(resolveExpirationPromise, timeoutMs);
    },
    expirationPromise
  };
}

async function _noSessionsAvailable(err: Error) {
  // TODO: this error should be progmatically identifable.
  return err.message.search(/Received an incorrect sessionId 'undefined'/) !== -1;
}

async function _processNextSession(
  serviceBusClient: ServiceBusClient,
  handlers: SessionMessageHandlers,
  abortSignal: AbortSignalLike
): Promise<void> {
  const sessionReceiver = serviceBusClient.createSessionReceiver(queueName, "peekLock", {
    autoRenewLockDurationInMs: sessionIdleTimeoutMs
  });

  try {
    // TODO: I just picked a call that didn't grab a message here, just to ensure a session could
    // actually be obtained. This goes away when we have `await createSessionReceiver()`.
    await sessionReceiver.getState();
  } catch (err) {
    // TODO: when this happens do I still need to close the session receiver? (again, temporary concern)
    if (_noSessionsAvailable(err)) {
      console.log(`INFO: no available sessions, sleeping for ${delayWhenNoSessionsAvailableMs}`);
      await delay(delayWhenNoSessionsAvailableMs);
      return;
    }

    throw err;
  }

  await handlers.processInitialize(sessionReceiver.sessionId);

  const idleTimer = _createIdleTimer(sessionIdleTimeoutMs);
  let threwError = false;

  sessionReceiver.subscribe(
    {
      async processMessage(msg) {
        idleTimer.refresh();
        await handlers.processMessage(msg);
      },
      async processError(err) {
        threwError = true;
        await handlers.processError(err, sessionReceiver.sessionId);
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
    await handlers.processError(err, sessionReceiver.sessionId);
  }

  await handlers.processClose(threwError ? "error" : "idle_timeout", sessionReceiver.sessionId);
}

async function _roundRobinThroughAvailableSessions(
  handlers: SessionMessageHandlers,
  abortSignal: AbortSignalLike
): Promise<void> {
  const serviceBusClient = new ServiceBusClient(serviceBusConnectionString);
  const allPromises = [];

  for (let i = 0; i < maxSessionsToProcessSimultaneously; ++i) {
    allPromises.push(
      new Promise(async (_res, rej) => {
        try {
          while (!abortSignal.aborted) {
            await _processNextSession(serviceBusClient, handlers, abortSignal);
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

  const handlers: SessionMessageHandlers = {
    async processInitialize(sessionId) {
      console.log(`[${sessionId}] will start processing...`);
    },
    async processMessage(msg) {
      console.log(`[${msg.sessionId}] received message with body ${msg.body}`);
    },
    async processError(err, sessionId) {
      console.log(`[${sessionId}] had error ${err.message}`);
    },
    async processClose(reason, sessionId) {
      if (reason === "error") {
        console.log(`[${sessionId}] was closed because of error`);
      } else if (reason === "idle_timeout") {
        console.log(`[${sessionId}] was closed - no more messages within idle timeout`);
      }
    }
  };

  await _roundRobinThroughAvailableSessions(handlers, abortController.signal);
}

main().catch((err) => console.log(`Fatal error: ${err}`));
