import {
  CreateQueueOptions,
  delay,
  ServiceBusAdministrationClient,
  ServiceBusClient,
  ServiceBusMessage,
  ServiceBusReceivedMessage,
  ServiceBusReceiver,
  ServiceBusSender,
  ServiceBusSessionReceiver,
  SubscribeOptions
} from "@azure/service-bus";
import fs from "fs";
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
const writeFile = util.promisify(fs.writeFile);

import * as dotenv from "dotenv";
dotenv.config();

appInsights
  .setup()
  .setUseDiskRetryCaching(true)
  .start();

export const defaultClient = appInsights.defaultClient;

export class SBStressTestsBase {
  messagesSent: ServiceBusMessage[] = [];
  messagesReceived: ServiceBusMessage[] = [];
  trackedMessageIds: TrackedMessageIdsInfo = {};
  snapshotTimer: NodeJS.Timer;
  startedAt!: Date;

  // Send metrics
  sendInfo: OperationInfo = initializeOperationInfo();
  // Receive metrics
  receiveInfo: OperationInfo = initializeOperationInfo();
  // Close
  closeInfo: Record<"sender" | "receiver" | "client", OperationInfo> = {
    sender: initializeOperationInfo(),
    receiver: initializeOperationInfo(),
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
  reportFileName: string;
  errorsFileName: string;
  messagesReportFileName: string;

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
    if (!this.snapshotOptions.snapshotIntervalInMs) {
      this.snapshotOptions.snapshotIntervalInMs = 5000;
    }
    this.startedAt = new Date();
    this.messagesSent = [];
    this.snapshotTimer = setInterval(
      this.snapshot.bind(this),
      snapshotOptions.snapshotIntervalInMs
    );
  }

  public async init(
    queueNamePrefix?: string,
    options?: CreateQueueOptions | undefined,
    testOptions?: Record<string, string | number | boolean>
  ) {
    this.queueName =
      (!queueNamePrefix ? `queue` : queueNamePrefix) + `-${Math.ceil(Math.random() * 100000)}`;
    this.messagesReportFileName = `temp/messages-${this.queueName}.json`;
    if (testOptions) console.log(testOptions);

    defaultClient.commonProperties = {
      // these will be reported with each event
      testName: this.snapshotOptions.testName
    };

    defaultClient.trackEvent({
      name: "start",
      properties: {
        ...testOptions,
        ...options,
        queueName: this.queueName
      }
    });

    await this.serviceBusAdministrationClient.createQueue(this.queueName, options);
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
        if (useScheduleApi) {
          const scheduleTime = new Date();
          scheduleTime.setMinutes(scheduleTime.getMinutes() + 1); // 1 minute from now
          await sender.scheduleMessages(messages, scheduleTime);
        } else {
          await sender.sendMessages(messages);
        }
        this.trackMessageIds(messages, "sent");
        this.sendInfo.numberOfSuccesses++;
        this.messagesSent = this.messagesSent.concat(messages);
      } catch (error) {
        this.sendInfo.numberOfFailures++;
        this.sendInfo.errors.push(error);
        console.error("Error in sending: ", error);
      }
    }
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
      this.trackMessageIds(messages, "received");
      this.messagesReceived = this.messagesReceived.concat(messages as ServiceBusReceivedMessage[]);
      this.receiveInfo.numberOfSuccesses++;
      if (settleMessageOnReceive && receiver.receiveMode === "peekLock") {
        await Promise.all(messages.map((msg) => this.completeMessage(msg, receiver)));
      }
      return messages;
    } catch (error) {
      this.receiveInfo.numberOfFailures++;
      this.receiveInfo.errors.push(error);
      console.error("Error in receiving: ", error);
    }
    return [];
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
      this.receiveInfo.errors.push(error);
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
          await this.completeMessage(message, receiver);
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
    const processError = async (error) => {
      this.receiveInfo.errors.push(error);
      console.error("Error in receiving: ", error);
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

  trackMessageIds(messages: ServiceBusMessage[], path: "sent" | "received") {
    messages.forEach((msg) => {
      let destination = this.trackedMessageIds[msg.messageId as string];
      if (!destination)
        destination = this.trackedMessageIds[msg.messageId as string] = {
          sentCount: 0,
          receivedCount: 0,
          settledCount: 0,
          errors: []
        };
      if (path === "sent") {
        destination.sentCount = destination.sentCount + 1;
      } else {
        destination.receivedCount = destination.receivedCount + 1;
      }
    });
  }

  /**
   * @param {ServiceBusReceivedMessageWithLock} message
   * @param {number} duration
   * @param {boolean} completeMessageAfterDuration
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
          this.messageLockRenewalInfo.errors.push(error);
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
          await this.completeMessage(message, receiver);
          clearTimeout(this.messageLockRenewalInfo.lockRenewalTimers[message.messageId as string]);
        }
      },
      message.lockedUntilUtc!.valueOf() - startTime.valueOf() - 10000
    );
  }

  /**
   * completeMessage
   */
  public async completeMessage(message: ServiceBusReceivedMessage, receiver: ServiceBusReceiver) {
    try {
      await receiver.completeMessage(message);
      this.trackedMessageIds[message.messageId! as string].settledCount++;
    } catch (error) {
      console.error("Error in message completion: ", error);
      this.trackedMessageIds[message.messageId! as string].errors.push(
        "Error in message completion: ",
        error
      );
    }
  }

  /**
   * @param {ServiceBusSessionReceiver<ServiceBusReceivedMessage>} receiver
   * @param {number} duration Duration until which the lock is renewed
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
        this.sessionLockRenewalInfo.errors.push(error);
        console.error("Error in session lock renewal: ", error);
      }
    }, receiver.sessionLockedUntilUtc!.valueOf() - startTime.valueOf() - 10000);
  }

  public async callClose(
    object: ServiceBusSender | ServiceBusReceiver | ServiceBusSessionReceiver | ServiceBusClient,
    type: "sender" | "receiver" | "session" | "client"
  ) {
    try {
      await object.close();
      this.closeInfo[type].numberOfSuccesses++;
    } catch (error) {
      const logError = `Error occurred on closing ${type}: ${error}`;
      console.error(logError);
      this.closeInfo[type].numberOfFailures++;
      this.closeInfo[type].errors.push(logError);
    }
  }

  public async snapshot(): Promise<void> {
    // TODO: get the options being set in the logs
    // TODO: Get a title passed from the scenario file
    const eventProperties: Record<string, string | number> = {};
    const elapsedTimeInSeconds = (new Date().valueOf() - this.startedAt.valueOf()) / 1000;

    eventProperties["elapsedTimeInSeconds"] = elapsedTimeInSeconds;
    eventProperties["messsages.sent"] = this.messagesSent.length;
    eventProperties["messages.received"] = this.messagesReceived.length;

    if (this.snapshotOptions.snapshotFocus.includes("send-info")) {
      eventProperties["send.pass"] = this.sendInfo.numberOfSuccesses;
      eventProperties["send.fail"] = this.sendInfo.numberOfFailures;
    }

    if (this.snapshotOptions.snapshotFocus.includes("receive-info")) {
      eventProperties["receive.pass"] = this.receiveInfo.numberOfSuccesses;
      eventProperties["receive.fail"] = this.receiveInfo.numberOfFailures;
    }

    if (this.snapshotOptions.snapshotFocus.includes("message-lock-renewal-info")) {
      eventProperties["lockRenewal.pass"] = this.messageLockRenewalInfo.numberOfSuccesses;
      eventProperties["lockRenewal.fail"] = this.messageLockRenewalInfo.numberOfFailures;
    }

    if (this.snapshotOptions.snapshotFocus.includes("session-lock-renewal-info")) {
      eventProperties["sessionLockRenewal.pass"] = this.sessionLockRenewalInfo.numberOfSuccesses;
      eventProperties["sessionLockRenewal.fail"] = this.sessionLockRenewalInfo.numberOfFailures;
    }

    if (this.snapshotOptions.snapshotFocus.includes("close-info")) {
      eventProperties["close.sender.pass"] = -this.closeInfo.sender.numberOfSuccesses;
      eventProperties["close.sender.fail"] = this.closeInfo.sender.numberOfFailures;
      eventProperties["close.receiver.pass"] = this.closeInfo.receiver.numberOfSuccesses;
      eventProperties["close.receiver.fail"] = this.closeInfo.receiver.numberOfFailures;
    }

    const errors = [].concat(
      this.sendInfo.errors,
      this.receiveInfo.errors,
      this.messageLockRenewalInfo.errors,
      this.sessionLockRenewalInfo.errors
    );

    // TODO: it would be nicer to report the errors as they occur rather than
    // doing this big dump of errors at the end.
    for (const err of errors) {
      defaultClient.trackException({
        exception: err
      });
    }

    this.sendInfo.errors = [];
    this.receiveInfo.errors = [];
    this.messageLockRenewalInfo.errors = [];
    this.sessionLockRenewalInfo.errors = [];

    defaultClient.trackEvent({
      name: "summary",
      properties: eventProperties
    });

    defaultClient.flush();

    console.log(JSON.stringify(eventProperties, undefined, 2));
  }

  public async end() {
    await this.snapshot();

    if (this.snapshotOptions.snapshotFocus.includes("receive-info")) {
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
  }
}
