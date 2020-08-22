/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how you can continually read through all the available
  sessions in a Service Bus queue or subscription.

  Run the sendMessages sample with different session ids before running this sample.
*/

const {
    ServiceBusClient,
    delay,
    ReceiveMode,
  } = require("@azure/service-bus");
  const dotenv = require("dotenv");
  const { AbortController } = require("@azure/abort-controller");
  
  dotenv.config();
  
  const serviceBusConnectionString =
  process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
  
  // NOTE: this sample uses a queue but would also work a session enabled subscription.
  const queueName = process.env.QUEUE_NAME || "<queue name>";
  
  const maxSessionsToProcessSimultaneously = 8;
  const sessionIdleTimeoutSeconds = 3;
  const delayOnErrorMs = 5 * 1000;
  
  // This can be used control when the round-robin processing will terminate
  // by calling abortController.abort().
  const abortController = new AbortController();
  
  // Called just before we start processing the first message of a session.
  // NOTE: This function is used only in the sample and is not part of the Service Bus library.
  async function sessionAccepted(sessionId) {
    console.log(`[${sessionId}] will start processing...`);
  }
  
  // Called by the SessionReceiver when a message is received.
  // This is passed as part of the handlers when calling `SessionReceiver.subscribe()`.
  async function processMessage(msg) {
    console.log(`[${msg.sessionId}] received message with body ${msg.body}`);
  }
  
  // Called by the SessionReceiver when an error occurs.
  // This will be called in the handlers we pass in `SessionReceiver.subscribe()`
  // and by the sample when we encounter an error opening a session.
  function processError(err, sessionId) {
    if (sessionId) {
      console.log(`Error when receiving messages from the session ${sessionId}: `, err);
    } else {
      console.log(`Error when creating the receiver for next available session`, err);
    }
  }
  
  // Called if we are closing a session.
  // `reason` will be:
  // * 'error' if we are closing because of an error(the error will be delivered
  //   to `processError` above)
  // * 'idle_timeout' if `sessionIdleTimeoutMs` milliseconds pass without
  //   any messages being received (ie, session can be considered empty).
  // NOTE: This function is used only in the sample and is not part of the Service Bus library.
  async function sessionClosed(reason, sessionId) {
    console.log(`[${sessionId}] was closed because of ${reason}`);
  }
  
  // utility function to create a timer that can be refreshed
  function createRefreshableTimer(timeoutMs, resolve) {
    let timer;
  
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => resolve(), timeoutMs);
    };
  }
  
  // Queries Service Bus for the next available session and processes it.
  async function receiveFromNextSession(queueClient) {
    let sessionReceiver = queueClient.createReceiver(ReceiveMode.peekLock, {
      sessionId: undefined
    });
  
    try {
     // Use `getState()`, but ignore its result to force open the underlying receiver link
      await sessionReceiver.getState();
    } catch (err) {
      if (
        err.name === "SessionCannotBeLockedError" ||
        err.name === "OperationTimeoutError"
      ) {
        console.log(`INFO: no available sessions, sleeping for ${delayOnErrorMs}`);
      } else {
        processError(err, undefined);
      }
  
      await delay(delayOnErrorMs);
      return;
    }
  
    await sessionAccepted(sessionReceiver.sessionId);
  
    let onAbort;
  
    const sessionFullyRead = new Promise((resolveSessionAsFullyRead, rejectSessionWithError) => {
      onAbort = () => {
        abortController.signal.removeEventListener("abort", onAbort);
        rejectSessionWithError(new Error("Process terminated by user."));
      };
  
      const refreshTimer = createRefreshableTimer(
        sessionIdleTimeoutSeconds * 1000,
        resolveSessionAsFullyRead
      );
  
      refreshTimer();
  
      abortController.signal.addEventListener("abort", onAbort);
  
      sessionReceiver.registerMessageHandler(
        async (msg) => {
          refreshTimer();
          await processMessage(msg);
        },
        (err) => {
          rejectSessionWithError(err);
        }
      );
    });
  
    try {
      await sessionFullyRead;
      await sessionClosed("idle_timeout", sessionReceiver.sessionId);
    } catch (err) {
      processError(err, sessionReceiver.sessionId);
      await sessionClosed("error", sessionReceiver.sessionId);
    } finally {
      abortController.signal.removeEventListener("abort", onAbort);
      await sessionReceiver.close();
    }
  }
  
  async function roundRobinThroughAvailableSessions() {
    const serviceBusClient = ServiceBusClient.createFromConnectionString(serviceBusConnectionString);
    const queueClient = serviceBusClient.createQueueClient(queueName);
  
    const receiverPromises = [];
  
    for (let i = 0; i < maxSessionsToProcessSimultaneously; ++i) {
      receiverPromises.push(
        (async () => {
          while (!abortController.signal.aborted) {
            await receiveFromNextSession(queueClient);
          }
        })()
      );
    }
  
    console.log(`Listening for available sessions...`);
    await Promise.all(receiverPromises);
  
    await queueClient.close();
    await serviceBusClient.close();
    console.log(`Exiting...`);
  }
  
  // To stop the round-robin processing you can just call abortController.abort()
  roundRobinThroughAvailableSessions().catch((err) => console.log(`Fatal error: ${err}`));