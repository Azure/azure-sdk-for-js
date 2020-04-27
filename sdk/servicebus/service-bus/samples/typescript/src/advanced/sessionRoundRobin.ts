/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how you can continually read through all the available
  sessions in a Service Bus queue or subscription.

  Run the sendMessages sample with some session ids before running this sample.
*/

import {
  ServiceBusClient,
  delay,
  ReceivedMessageWithLock,
  SessionReceiver,
  MessagingError
} from "@azure/service-bus";
import * as dotenv from "dotenv";
import { env } from "process";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";

dotenv.config();

const serviceBusConnectionString =
  env["SERVICEBUS_CONNECTION_STRING"] || "<service bus connection string not in environment>";

// NOTE: this sample uses a queue but would also work a session enabled subscription.
const queueName = env["QUEUE_NAME_WITH_SESSIONS"] || "<queue name not in environment>";

const maxSessionsToProcessSimultaneously = 8;
const sessionIdleTimeoutMs = 3 * 1000;
const delayWhenNoSessionsAvailableMs = 5 * 1000;

// this can be used control when the round-robin processing will terminate.
const abortController = new AbortController();

// called just before we start processing the first message of a session
function processInitialize(sessionId: string) {
  console.log(`[${sessionId}] will start processing...`);
}

// called when we get a message for a session
function processMessage(msg: ReceivedMessageWithLock) {
  console.log(`[${msg.sessionId}] received message with body ${msg.body}`);
}

// called if we get an error
function processError(err: Error, sessionId?: string) {
  console.log(`[${sessionId}] had error ${err.message}`);
}

// Called if we are closing a session
// `reason` will be:
// * 'error' if we are closing because of an error(the error will be delivered
//   to `processError` above)
// * 'idle_timeout' if we `sessionIdleTimeoutMs` milliseconds pass without
//   any messages being received (ie, session can be considered empty).
//
function processClose(reason: "error" | "idle_timeout", sessionId: string) {
  if (reason === "error") {
    console.log(`[${sessionId}] was closed because of error`);
  } else if (reason === "idle_timeout") {
    console.log(`[${sessionId}] was closed - no more messages within idle timeout`);
  }
}

// utility function to create a timer that can be refreshed
function createIdleTimer(timeoutMs: number): { refresh(): void; expirationPromise: Promise<void> } {
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

// Queries Service Bus for the next available session and processes it.
async function receiveFromNextSession(serviceBusClient: ServiceBusClient): Promise<void> {
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

    await processError(err, undefined);
    return;
  }

  await processInitialize(sessionReceiver.sessionId);

  const idleTimer = createIdleTimer(sessionIdleTimeoutMs);
  let didHaveError = false;

  sessionReceiver.subscribe(
    {
      async processMessage(msg) {
        idleTimer.refresh();
        await processMessage(msg);
      },
      async processError(err) {
        didHaveError = true;
        await processError(err, sessionReceiver.sessionId);
      }
    },
    {
      abortSignal: abortController.signal
    }
  );

  await idleTimer.expirationPromise;
  await sessionReceiver.close();
  await processClose(didHaveError ? "error" : "idle_timeout", sessionReceiver.sessionId);
}

async function roundRobinThroughAvailableSessions(abortSignal: AbortSignalLike): Promise<void> {
  const serviceBusClient = new ServiceBusClient(serviceBusConnectionString);

  for (let i = 0; i < maxSessionsToProcessSimultaneously; ++i) {
    (async () => {
      while (!abortSignal.aborted) {
        await receiveFromNextSession(serviceBusClient);
      }
    })();
  }

  console.log(`Listening for available sessions...`);
}

// To stop the round-robin processing you can just call abortController.abort()
roundRobinThroughAvailableSessions(abortController.signal).catch((err) =>
  console.log(`Fatal error: ${err}`)
);
