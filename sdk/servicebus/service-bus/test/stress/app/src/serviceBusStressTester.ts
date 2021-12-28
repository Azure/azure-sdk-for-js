import {
  CreateQueueOptions,
  delay,
  ProcessErrorArgs,
  ServiceBusAdministrationClient,
  ServiceBusClient,
  ServiceBusClientOptions,
  ServiceBusMessage,
  ServiceBusReceivedMessage,
  ServiceBusReceiver,
  ServiceBusSender,
  ServiceBusSessionReceiver,
  SubscribeOptions
} from "@azure/service-bus";
import util from "util";
import {
  generateMessage,
  initializeLockRenewalOperationInfo,
  initializeOperationInfo,
  OperationInfo,
  saveDiscrepanciesFromTrackedMessages,
  SnapshotOptions,
  TrackedMessageIdsInfo
} from "./utils";

import * as appInsights from "applicationinsights";
import * as dotenv from "dotenv";
import { AbortSignalLike } from "@azure/abort-controller";

dotenv.config({ path: process.env.ENV_FILE || ".env" });

appInsights
  .setup()
  .setAutoCollectConsole(true)
  .setUseDiskRetryCaching(true)
  .start();

const defaultClient = appInsights.defaultClient;

export interface StressTestInitOptions {
  /**
   * Options used when creating the queue using the ServiceBusAdministrationClient.
   */
  createQueueOptions?: CreateQueueOptions;
  /**
   * Additional custom properties to add to the 'start' event reported to Monitor.
   */
  additionalEventProperties?: Record<string, string | number | boolean>;
}

export function captureConsoleOutputToAppInsights() {
  const debug = require("debug");

  debug.log = (...args: any[]) => {
    // for some reason the appinsights console.log hook doesn't seem to be firing for me (or at least
    // it's inconsistent). For now I'll just add a hook in here and send the events myself.
    defaultClient.trackTrace({
      message: util.format(...args)
    });
  };
}

export class ServiceBusStressTester {
  private messagesSent: ServiceBusMessage[] = [];
  private messagesReceived: ServiceBusMessage[] = [];
  private trackedMessageIds: TrackedMessageIdsInfo = {};
  private snapshotTimer: NodeJS.Timer;
  private startedAt!: Date;
  private _numErrors = 0;

  public numMessagesSent(): number {
    return this.messagesSent.length;
  }

  // Send metrics
  sendInfo: OperationInfo = initializeOperationInfo();
  // Receive metrics
  receiveInfo: OperationInfo = initializeOperationInfo();
  // Close
  closeInfo: Record<"sender" | "receiver" | "session" | "client", OperationInfo> = {
    sender: initializeOperationInfo(),
    receiver: initializeOperationInfo(),
    session: initializeOperationInfo(),
    client: initializeOperationInfo()
  };
  // Message Lock Renewal
  messageLockRenewalInfo = initializeLockRenewalOperationInfo();
  // Session Lock Renewal
  sessionLockRenewalInfo = initializeLockRenewalOperationInfo();
  // Queue Management
  serviceBusAdministrationClient = new ServiceBusAdministrationClient(
    process.env.SERVICEBUS_CONNECTION_STRING!
  );
  queueName!: string;

  constructor(private snapshotOptions: SnapshotOptions) {
    if (!this.snapshotOptions.snapshotFocus) {
      this.snapshotOptions.snapshotFocus = [
        "send-info",
        "receive-info",
        "message-lock-renewal-info",
        "session-lock-renewal-info",
        "close-info"
      ];
    }

    const snapshotIntervalMs = !this.snapshotOptions.snapshotIntervalInMs
      ? 5000
      : this.snapshotOptions.snapshotIntervalInMs;

    this.startedAt = new Date();
    this.messagesSent = [];
    this.snapshotTimer = setInterval(this.snapshot.bind(this), snapshotIntervalMs);
  }

  private async _init(options?: StressTestInitOptions) {
    console.log(`[BEGIN]: Initializing...`);
    this.queueName = `queue` + `-${Math.ceil(Math.random() * 100000)}`;

    defaultClient.commonProperties = {
      // these will be reported with each event
      testName: this.snapshotOptions.testName
    };

    defaultClient.trackEvent({
      name: "start",
      properties: {
        ...options?.additionalEventProperties,
        ...options?.createQueueOptions,
        queueName: this.queueName
      }
    });

    await createRandomQueue(this.queueName, options?.createQueueOptions);
    console.log(`[END]: Initializing...`);
  }

  public async sendMessages(
    senders: ServiceBusSender[],
    numberOfMessages = 1,
    useSessions = false,
    useScheduleApi = false,
    numberOfSessions = 0 // Will be used only if useSessions is true
  ) {
    for (const sender of senders) {
      try {
        const messages: ServiceBusMessage[] = [];
        for (let i = 0; i < numberOfMessages; i++) {
          messages.push(generateMessage(useSessions, numberOfSessions));
        }

        this.trackSentMessages(messages);

        if (useScheduleApi) {
          const scheduleTime = new Date();
          scheduleTime.setMinutes(scheduleTime.getMinutes() + 1); // 1 minute from now
          await sender.scheduleMessages(messages, scheduleTime);
        } else {
          await sender.sendMessages(messages);
        }
      } catch (error) {
        this.sendInfo.numberOfFailures++;
        this.trackError("send", error);
        console.error("Error in sending: ", error);
      }
    }
  }

  /**
   * Tracks a sent message for reporting.
   */
  public trackSentMessages(messages: ServiceBusMessage[]) {
    this.trackMessageIds(messages, "sent");
    this.sendInfo.numberOfSuccesses++;
    this.messagesSent = this.messagesSent.concat(messages);
  }

  public async receiveMessages(
    receiver: ServiceBusReceiver,
    maxMsgCount = 10,
    maxWaitTimeInMs = 10000,
    settleMessageOnReceive = false
  ): Promise<ServiceBusReceivedMessage[]> {
    try {
      const messages = await receiver.receiveMessages(maxMsgCount, {
        maxWaitTimeInMs
      });
      this.addReceivedMessage(messages);
      if (settleMessageOnReceive && receiver.receiveMode === "peekLock") {
        await Promise.all(
          messages.map((msg: ServiceBusReceivedMessage) => this.completeMessage(receiver, msg))
        );
      }
      return messages;
    } catch (error) {
      this.receiveInfo.numberOfFailures++;
      this.trackError("receive", error);
      console.error("Error in receiving: ", error);
    }
    return [];
  }

  /**
   * Adds a received message to our list of messages, incrementing relevant counters.
   *
   * @param messages
   */
  public addReceivedMessage(messages: ServiceBusReceivedMessage[]) {
    this.trackMessageIds(messages, "received");
    this.messagesReceived = this.messagesReceived.concat(messages as ServiceBusReceivedMessage[]);
    this.receiveInfo.numberOfSuccesses++;
  }

  public async peekMessages(
    receiver: ServiceBusReceiver,
    maxMsgCount = 10,
    fromSequenceNumber?: Long.Long
  ): Promise<ServiceBusReceivedMessage[]> {
    try {
      const messages = await receiver.peekMessages(maxMsgCount, {
        fromSequenceNumber
      });
      this.trackMessageIds(messages, "received");
      this.messagesReceived = this.messagesReceived.concat(messages as ServiceBusReceivedMessage[]);
      this.receiveInfo.numberOfSuccesses++;
      return messages;
    } catch (error) {
      this.receiveInfo.numberOfFailures++;
      this.trackError("receive", error);
      console.error("Error in peeking: ", error);
    }
    return [];
  }

  public async receiveStreaming(
    receiver: ServiceBusReceiver,
    duration: number,
    options: Pick<SubscribeOptions, "autoCompleteMessages" | "maxConcurrentCalls"> & {
      manualLockRenewal: boolean;
      completeMessageAfterDuration: boolean;
      maxAutoRenewLockDurationInMs: number;
      settleMessageOnReceive: boolean;
    }
  ) {
    const startTime = new Date();
    const processMessage = async (message: ServiceBusReceivedMessage) => {
      // TODO: message to keep renewing locks - pass args
      // TODO: message to complete after certain number of renewals
      if (receiver.receiveMode === "peekLock") {
        if (options.settleMessageOnReceive) {
          await this.completeMessage(receiver, message);
        } else if (
          !options.autoCompleteMessages &&
          options.maxAutoRenewLockDurationInMs === 0 &&
          options.manualLockRenewal
        ) {
          const elapsedTime = new Date().valueOf() - startTime.valueOf();
          this.renewMessageLockUntil(
            message,
            receiver,
            duration - elapsedTime,
            options.completeMessageAfterDuration
          );
        }
      }
      this.trackMessageIds([message], "received");
      this.messagesReceived = this.messagesReceived.concat(message as ServiceBusReceivedMessage);
      this.receiveInfo.numberOfSuccesses++;
    };
    const processError = async (processErrorArgs: ProcessErrorArgs) => {
      this.trackError("receive", processErrorArgs.error);
      console.error("Error in receiving: ", processErrorArgs.error);
    };
    const subscriber = receiver.subscribe(
      {
        processMessage,
        processError
      },
      options
    );
    await delay(duration);
    await subscriber.close();
  }

  /**
   * Reports an error that occurs in processing.
   * @param from
   * @param exception
   */
  public trackError(
    from:
      | "init"
      | "test"
      | "receive"
      | "complete"
      | "send"
      | "lockrenewal"
      | "sessionlockrenewal"
      | "close",
    exception: Error | unknown,
    extraProperties?: Record<string, string>
  ) {
    ++this._numErrors;
    defaultClient.trackException({
      exception: exception instanceof Error ? exception : new Error(`Unknown error\n ${exception}`),
      properties: {
        from,
        ...extraProperties
      }
    });
  }

  private trackMessageIds(messages: ServiceBusMessage[], path: "sent" | "received") {
    messages.forEach((msg) => {
      if (!msg.messageId) {
        console.error("No message ID for sent message");
        throw new Error(
          "No message ID for tracked message. Make sure you initialize .messageId before sending messages."
        );
      }

      if (path === "sent") {
        if (this.trackedMessageIds[msg.messageId as string]) {
          throw new Error(`${msg.messageId} has already been tracked as sent!`);
        }

        const destination = (this.trackedMessageIds[msg.messageId as string] = {
          sentCount: 0,
          receivedCount: 0,
          settledCount: 0
        });

        destination.sentCount = destination.sentCount + 1;
      } else if (path === "received") {
        if (!this.trackedMessageIds[msg.messageId as string]) {
          throw new Error(
            `${msg.messageId} was not tracked as sent, can't increment receive count`
          );
        }

        this.trackedMessageIds[msg.messageId as string].receivedCount++;
      }
    });
  }

  /**
   */
  public renewMessageLockUntil(
    message: ServiceBusReceivedMessage,
    receiver: ServiceBusReceiver,
    duration: number,
    completeMessageAfterDuration: boolean
  ) {
    // TODO: pass in max number of lock renewals?
    const startTime = new Date();
    this.messageLockRenewalInfo.lockRenewalTimers[message.messageId as string] = setTimeout(
      async () => {
        try {
          await receiver.renewMessageLock(message);
          this.messageLockRenewalInfo.numberOfSuccesses++;
          const currentRenewalCount = this.messageLockRenewalInfo.renewalCount[
            message.messageId as string
          ];
          this.messageLockRenewalInfo.renewalCount[message.messageId as string] =
            currentRenewalCount === undefined ? 1 : currentRenewalCount + 1;
        } catch (error) {
          this.messageLockRenewalInfo.numberOfFailures++;
          this.trackError("lockrenewal", error);
          console.error("Error in message lock renewal: ", error);
          clearTimeout(this.messageLockRenewalInfo.lockRenewalTimers[message.messageId as string]);
        }
        const elapsedTime = new Date().valueOf() - startTime.valueOf();
        if (duration - elapsedTime > 0) {
          this.renewMessageLockUntil(
            message,
            receiver,
            duration - elapsedTime,
            completeMessageAfterDuration
          );
        } else {
          await this.completeMessage(receiver, message);
          clearTimeout(this.messageLockRenewalInfo.lockRenewalTimers[message.messageId as string]);
        }
      },
      message.lockedUntilUtc!.valueOf() - startTime.valueOf() - 10000
    );
  }

  /**
   * Complete a message and increment any relevant counters.
   */
  public async completeMessage(receiver: ServiceBusReceiver, message: ServiceBusReceivedMessage) {
    try {
      await receiver.completeMessage(message);
      this.trackedMessageIds[message.messageId! as string].settledCount++;
    } catch (error) {
      console.error(`Error in message completion with id: ${message.messageId} `, error);
      this.trackError("complete", error);
    }
  }

  /**
   * @param duration Duration until which the lock is renewed
   */
  public renewSessionLockUntil(receiver: ServiceBusSessionReceiver, duration: number) {
    // TODO: pass in max number of lock renewals? and close the receiver at the end of max??
    const startTime = new Date();
    this.sessionLockRenewalInfo.lockRenewalTimers[receiver.sessionId] = setTimeout(async () => {
      try {
        await receiver.renewSessionLock();
        this.sessionLockRenewalInfo.numberOfSuccesses++;
        const currentRenewalCount = this.sessionLockRenewalInfo.renewalCount[receiver.sessionId];
        this.sessionLockRenewalInfo.renewalCount[receiver.sessionId] =
          currentRenewalCount === undefined ? 1 : currentRenewalCount + 1;
        const elapsedTime = new Date().valueOf() - startTime.valueOf();
        if (duration - elapsedTime > 0) {
          this.renewSessionLockUntil(receiver, duration - elapsedTime);
        } else {
          // Code reaches here only after the duration given has passed by
          // TODO: Close the receiver maybe?
        }
      } catch (error) {
        this.sessionLockRenewalInfo.numberOfFailures++;
        this.trackError("sessionlockrenewal", error);
        console.error("Error in session lock renewal: ", error);
      }
    }, receiver.sessionLockedUntilUtc!.valueOf() - startTime.valueOf() - 10000);
  }

  public async callClose(
    object: ServiceBusSender | ServiceBusReceiver | ServiceBusSessionReceiver | ServiceBusClient,
    type: "sender" | "receiver" | "client"
  ) {
    try {
      await object.close();
      this.closeInfo[type].numberOfSuccesses++;
    } catch (error) {
      const logError = `Error occurred on closing ${type}: ${error}`;
      console.error(logError);
      this.closeInfo[type].numberOfFailures++;

      this.trackError("close", error, {
        type
      });
    }
  }

  public async snapshot(): Promise<void> {
    const eventProperties: Record<string, string | number> = {};
    const elapsedTimeInSeconds = (new Date().valueOf() - this.startedAt.valueOf()) / 1000;

    eventProperties["elapsedTimeInSeconds"] = elapsedTimeInSeconds;
    eventProperties["messsages.sent"] = this.messagesSent.length;
    eventProperties["messages.received"] = this.messagesReceived.length;

    if (this.snapshotOptions.snapshotFocus?.includes("send-info")) {
      eventProperties["send.pass"] = this.sendInfo.numberOfSuccesses;
      eventProperties["send.fail"] = this.sendInfo.numberOfFailures;
    }

    if (this.snapshotOptions.snapshotFocus?.includes("receive-info")) {
      eventProperties["receive.pass"] = this.receiveInfo.numberOfSuccesses;
      eventProperties["receive.fail"] = this.receiveInfo.numberOfFailures;
    }

    if (this.snapshotOptions.snapshotFocus?.includes("message-lock-renewal-info")) {
      eventProperties["lockRenewal.pass"] = this.messageLockRenewalInfo.numberOfSuccesses;
      eventProperties["lockRenewal.fail"] = this.messageLockRenewalInfo.numberOfFailures;
    }

    if (this.snapshotOptions.snapshotFocus?.includes("session-lock-renewal-info")) {
      eventProperties["sessionLockRenewal.pass"] = this.sessionLockRenewalInfo.numberOfSuccesses;
      eventProperties["sessionLockRenewal.fail"] = this.sessionLockRenewalInfo.numberOfFailures;
    }

    if (this.snapshotOptions.snapshotFocus?.includes("close-info")) {
      eventProperties["close.sender.pass"] = -this.closeInfo.sender.numberOfSuccesses;
      eventProperties["close.sender.fail"] = this.closeInfo.sender.numberOfFailures;
      eventProperties["close.receiver.pass"] = this.closeInfo.receiver.numberOfSuccesses;
      eventProperties["close.receiver.fail"] = this.closeInfo.receiver.numberOfFailures;
    }

    eventProperties["errorCount"] = this._numErrors;
    this._numErrors = 0;

    defaultClient.trackEvent({
      name: "summary",
      properties: eventProperties
    });

    defaultClient.flush();

    if (this.snapshotOptions.writeSnapshotInfoToConsole) {
      console.log(JSON.stringify(eventProperties, undefined, 2));
    }
  }

  private async _endTest() {
    console.log(`[BEGIN]: ending test...`);

    await this.snapshot();

    if (this.snapshotOptions.snapshotFocus?.includes("receive-info")) {
      const output = await saveDiscrepanciesFromTrackedMessages(this.trackedMessageIds);

      defaultClient.trackEvent({
        name: "discrepencies",
        properties: {
          messages_sent_but_never_received: output.messages_sent_but_never_received.join(","),
          messages_not_sent_but_received: output.messages_not_sent_but_received.join(","),
          messages_sent_multiple_times: output.messages_sent_multiple_times.join(","),
          messages_sent_once_but_received_multiple_times: output.messages_sent_once_but_received_multiple_times.join(
            ","
          ),
          messages_sent_once_and_received_once: output.messages_sent_once_and_received_once.join(
            ","
          )
        }
      });
    }

    // TODO: Log tracked messages in JSON
    // TODO: Have a copy of sentMessages and match them with receivedMessages, have the leftover 'message-id's in the logged file maybe
    // TODO: Add an argument to "end()" to not delete the resource
    clearInterval(this.snapshotTimer);
    for (const id in this.messageLockRenewalInfo.lockRenewalTimers) {
      clearTimeout(this.messageLockRenewalInfo.lockRenewalTimers[id]);
    }
    for (const id in this.sessionLockRenewalInfo.lockRenewalTimers) {
      clearTimeout(this.sessionLockRenewalInfo.lockRenewalTimers[id]);
    }
    await this.serviceBusAdministrationClient.deleteQueue(this.queueName);

    console.log(`[END]: ending test...`);
  }

  /**
   * Initializes the stress test object, runs the `stressTest` function and then ends the stress test.
   *
   * @param stressTest The stress test itself. The test will be passed a ServiceBusClient and is not responsible for closing it.
   * @param initOptions Options for initializing, including control of the created queue or additional customProperties for reporting.
   */
  public async runStressTest(
    stressTest: (serviceBusClient: ServiceBusClient) => Promise<void>,
    initOptions?: StressTestInitOptions
  ): Promise<void> {
    let serviceBusClient: ServiceBusClient | undefined;

    try {
      try {
        // Define connection string and related Service Bus entity names here
        serviceBusClient = createServiceBusClient();
        await this._init(initOptions);
      } catch (err) {
        console.log(`ERROR: error thrown by init`, err);

        this.trackError("init", err);
        defaultClient.flush();
        throw err;
      }

      try {
        console.log(`[BEGIN]: stressTest function...`);
        await stressTest(serviceBusClient);
      } catch (err) {
        console.log(`ERROR: error thrown by test`, err);

        this.trackError("test", err);
        defaultClient.flush();
      }
    } finally {
      console.log(`[END]: stressTest function...`);
      try {
        await this._endTest();
        await serviceBusClient?.close();
      } catch (err) {
        defaultClient.trackException({
          exception: err instanceof Error ? err : new Error(`Unknown error\n ${err}`),
          properties: {
            from: "end"
          }
        });
        console.log(`FATAL ERROR: threw error trying to report final monitoring data.`, err);
      }

      defaultClient.flush();
    }
  }
}

export function getUniqueQueueName(): string {
  return `queue` + `-${Math.ceil(Math.random() * 100000)}`;
}

export async function createRandomQueue(
  queueName: string,
  queueOptions?: CreateQueueOptions
): Promise<void> {
  const serviceBusAdministrationClient = createAdminClient();
  await serviceBusAdministrationClient.createQueue(queueName, queueOptions);
}

export function createAdminClient() {
  const connectionString = process.env.SERVICEBUS_CONNECTION_STRING;

  if (!connectionString) {
    throw new Error("SERVICEBUS_CONNECTION_STRING not defined in the environment!");
  }

  const serviceBusAdministrationClient = new ServiceBusAdministrationClient(connectionString);
  return serviceBusAdministrationClient;
}

export function createServiceBusClient(options?: ServiceBusClientOptions): ServiceBusClient {
  const connectionString = process.env.SERVICEBUS_CONNECTION_STRING;

  if (!connectionString) {
    throw new Error("SERVICEBUS_CONNECTION_STRING not defined in the environment!");
  }

  return new ServiceBusClient(connectionString, options);
}

/**
 * Loops infinitely with a delay between invocations.
 */
export async function loopForever(
  fn: () => Promise<void>,
  delay: number,
  abortSignal?: AbortSignalLike
) {
  const timeout = () => new Promise((resolve) => setTimeout(() => resolve(true), delay));

  while (abortSignal?.aborted === false && (await timeout())) {
    await fn();
  }
}

export function isReceiveMode(receiveMode: string): receiveMode is "peekLock" | "receiveAndDelete" {
  return receiveMode === "peekLock" || receiveMode === "receiveAndDelete";
}
