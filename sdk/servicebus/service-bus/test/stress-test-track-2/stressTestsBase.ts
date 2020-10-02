import {
  CreateQueueOptions,
  delay,
  ServiceBusAdministrationClient,
  ServiceBusMessage,
  ServiceBusReceivedMessage,
  ServiceBusReceivedMessageWithLock,
  ServiceBusReceiver,
  ServiceBusSender,
  ServiceBusSessionReceiver,
  SubscribeOptions
} from "@azure/service-bus";
import fs from "fs";
import { message } from "rhea-promise";
import util from "util";
import { v4 as uuidv4 } from "uuid";
const writeFile = util.promisify(fs.writeFile);
const appendFile = util.promisify(fs.appendFile);

interface OperationInfo {
  numberOfSuccesses: number;
  numberOfFailures: number;
  errors: any[];
}
interface LockRenewalOperationInfo extends OperationInfo {
  /**
   * key - id, value - next renewal timer meant for the message/session-receiver
   */
  lockRenewalTimers: { [key: string]: NodeJS.Timer };
  /**
   * key - id, value - number of renewals
   */
  renewalCount: { [key: string]: number };
}
interface SnapshotOptions {
  snapshotFocus?: (
    | "send-info"
    | "receive-info"
    | "message-lock-renewal-info"
    | "session-lock-renewal-info"
  )[];
  snapshotIntervalInMs?: number;
}
export class SBStressTestsBase {
  messagesSent: ServiceBusMessage[] = [];
  messagesReceived: ServiceBusMessage[] = [];
  trackedMessageIds: { [key: string]: { sent: number; received: number } } = {};
  snapshotTimer: NodeJS.Timer;
  startedAt!: Date;

  // Send metrics
  sendInfo: OperationInfo = {
    numberOfSuccesses: 0,
    numberOfFailures: 0,
    errors: []
  };
  // Receive metrics
  receiveInfo: OperationInfo = {
    numberOfSuccesses: 0,
    numberOfFailures: 0,
    errors: []
  };
  // Message Lock Renewal
  messageLockRenewalInfo: LockRenewalOperationInfo = {
    numberOfSuccesses: 0,
    numberOfFailures: 0,
    errors: [],
    lockRenewalTimers: {},
    renewalCount: {}
  };
  // Session Lock Renewal
  sessionLockRenewalInfo: LockRenewalOperationInfo = {
    numberOfSuccesses: 0,
    numberOfFailures: 0,
    errors: [],
    lockRenewalTimers: {},
    renewalCount: {}
  };
  // Queue Management
  serviceBusAdministrationClient = new ServiceBusAdministrationClient(
    process.env.SERVICEBUS_CONNECTION_STRING!
  );
  queueName!: string;
  reportFileName: string;
  errorsFileName: string;

  constructor(private snapshotOptions: SnapshotOptions) {
    if (!this.snapshotOptions.snapshotFocus) {
      this.snapshotOptions.snapshotFocus = [
        "send-info",
        "receive-info",
        "message-lock-renewal-info",
        "session-lock-renewal-info"
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

  public async init(queueNamePrefix?: string, options?: CreateQueueOptions | undefined) {
    this.queueName =
      (!queueNamePrefix ? `queue` : queueNamePrefix) + `-${Math.ceil(Math.random() * 100000)}`;
    await this.serviceBusAdministrationClient.createQueue(this.queueName, options);
    this.reportFileName = `temp/report-${this.queueName}.txt`;
    this.errorsFileName = `temp/errors-${this.queueName}.txt`;
  }

  public async sendMessages(
    senders: ServiceBusSender[],
    numberOfMessages = 1,
    useSessions = false,
    useScheduleApi = false
  ) {
    for (const sender of senders) {
      try {
        const messages: ServiceBusMessage[] = [];
        for (let i = 0; i < numberOfMessages; i++) {
          messages.push({
            body: `message ${i} ${Math.random()}`,
            sessionId: useSessions ? `session-${Math.ceil(Math.random() * 10000)}` : undefined,
            messageId: uuidv4()
          });
        }
        if (useScheduleApi) {
          const scheduleTime = new Date();
          scheduleTime.setMinutes(scheduleTime.getMinutes() + 1); // 1 minute from now
          await sender.scheduleMessages(scheduleTime, messages);
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

  public async receiveMessages<ReceivedMessageT extends ServiceBusReceivedMessage>(
    receiver: ServiceBusReceiver<ReceivedMessageT>,
    maxMsgCount = 10,
    maxWaitTimeInMs = 10000
  ): Promise<ReceivedMessageT[]> {
    try {
      const messages = await receiver.receiveMessages(maxMsgCount, {
        maxWaitTimeInMs
      });
      this.trackMessageIds(messages, "received");
      this.messagesReceived = this.messagesReceived.concat(messages as ServiceBusReceivedMessage[]);
      this.receiveInfo.numberOfSuccesses++;
      return messages;
    } catch (error) {
      this.receiveInfo.numberOfFailures++;
      this.receiveInfo.errors.push(error);
      console.error("Error in receiving: ", error);
    }
    return [];
  }

  public async receiveStreaming<ReceivedMessageT extends ServiceBusReceivedMessage>(
    receiver: ServiceBusReceiver<ReceivedMessageT>,
    duration: number,
    options: Pick<
      SubscribeOptions,
      "autoComplete" | "maxConcurrentCalls" | "maxAutoRenewLockDurationInMs"
    > & { manualLockRenewal: boolean }
  ) {
    const startTime = new Date();
    const processMessage = async (
      message: ServiceBusReceivedMessage | ServiceBusReceivedMessageWithLock
    ) => {
      // TODO: message to keep renewing locks - pass args
      // TODO: message to complete after certain number of renewals
      if (receiver.receiveMode === "peekLock") {
        const elapsedTime = new Date().valueOf() - startTime.valueOf();
        // TODO: complete the message too
        if (
          !options.autoComplete &&
          options.maxAutoRenewLockDurationInMs === 0 &&
          options.manualLockRenewal
        ) {
          this.renewMessageLockUntil(
            message as ServiceBusReceivedMessageWithLock,
            duration - elapsedTime
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
          sent: 0,
          received: 0
        };
      if (path === "sent") {
        destination.sent = destination.sent + 1;
        destination.received = 0;
      } else {
        destination.received = destination.received + 1;
        destination.sent = 0;
      }
    });
  }

  /**
   * @param {ServiceBusReceivedMessageWithLock} message
   * @param {number} duration Duration until which the lock is renewed
   */
  public renewMessageLockUntil(message: ServiceBusReceivedMessageWithLock, duration: number) {
    // TODO: pass in max number of lock renewals? and add settlement at the end of max??
    const startTime = new Date();
    this.messageLockRenewalInfo.lockRenewalTimers[message.messageId as string] = setTimeout(
      async () => {
        try {
          await message.renewLock();
          this.messageLockRenewalInfo.numberOfSuccesses++;
          const currentRenewalCount = this.messageLockRenewalInfo.renewalCount[
            message.messageId as string
          ];
          this.messageLockRenewalInfo.renewalCount[message.messageId as string] =
            currentRenewalCount === undefined ? 1 : currentRenewalCount + 1;
          const elapsedTime = new Date().valueOf() - startTime.valueOf();
          if (duration - elapsedTime > 0) {
            this.renewMessageLockUntil(message, duration - elapsedTime);
          } else {
            // Code reaches here only after the duration given has passed by
            // TODO: Settle the message maybe?
            clearTimeout(
              this.messageLockRenewalInfo.lockRenewalTimers[message.messageId as string]
            );
          }
        } catch (error) {
          this.messageLockRenewalInfo.numberOfFailures++;
          this.messageLockRenewalInfo.errors.push(error);
          console.error("Error in message lock renewal: ", error);
          clearTimeout(this.messageLockRenewalInfo.lockRenewalTimers[message.messageId as string]);
        }
      },
      message.lockedUntilUtc!.valueOf() - startTime.valueOf() - 10000
    );
  }

  /**
   * @param {ServiceBusSessionReceiver<ServiceBusReceivedMessage>} receiver
   * @param {number} duration Duration until which the lock is renewed
   */
  public renewSessionLockUntil(
    receiver: ServiceBusSessionReceiver<ServiceBusReceivedMessage>,
    duration: number
  ) {
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

  public async snapshot(): Promise<void> {
    // TODO: get the options being set in the logs
    // TODO: Get a title passed from the scenario file
    const elapsedTimeInSeconds = (new Date().valueOf() - this.startedAt.valueOf()) / 1000;
    const memoryUsage = process.memoryUsage();
    const currentSnapshot = [
      `Time: ${new Date().toJSON()}`,
      `Elapsed time in seconds: ${elapsedTimeInSeconds}`,
      `Queue name: ${this.queueName}`,
      `Space occupied for the process(rss): ${memoryUsage.rss}`,
      `Memory Consumed(heapUsed): ${memoryUsage.heapUsed}`,
      `Number of messages sent so far: ${this.messagesSent.length}`,
      `Number of messages received so far: ${this.messagesReceived.length}`
    ]
      .concat(
        this.snapshotOptions.snapshotFocus.includes("send-info")
          ? [
              `Number of successful sends so far: ${this.sendInfo.numberOfSuccesses}`,
              `Number of failed sends so far: ${this.sendInfo.numberOfFailures}`,
              `(Avg)Number of sends per sec: ${this.sendInfo.numberOfSuccesses /
                elapsedTimeInSeconds}`
            ]
          : []
      )
      .concat(
        this.snapshotOptions.snapshotFocus.includes("receive-info")
          ? [
              `Number of successful receives so far: ${this.receiveInfo.numberOfSuccesses}`,
              `Number of failed receives so far: ${this.receiveInfo.numberOfFailures}`,
              `(Avg)Number of receives per sec: ${this.receiveInfo.numberOfSuccesses /
                elapsedTimeInSeconds}`
            ]
          : []
      )
      .concat(
        this.snapshotOptions.snapshotFocus.includes("message-lock-renewal-info")
          ? [
              `Number of successful message lock renewals so far: ${this.messageLockRenewalInfo.numberOfSuccesses}`,
              `Number of failed message lock renewals so far: ${this.messageLockRenewalInfo.numberOfFailures}`,
              `(Avg)Number of message lock renewals per sec: ${this.messageLockRenewalInfo
                .numberOfSuccesses / elapsedTimeInSeconds}`
            ]
          : []
      )
      .concat(
        this.snapshotOptions.snapshotFocus.includes("session-lock-renewal-info")
          ? [
              `Number of successful session lock renewals so far: ${this.sessionLockRenewalInfo.numberOfSuccesses}`,
              `Number of failed session lock renewals so far: ${this.sessionLockRenewalInfo.numberOfFailures}`,
              `(Avg)Number of session lock renewals per sec: ${this.sessionLockRenewalInfo
                .numberOfSuccesses / elapsedTimeInSeconds}`
            ]
          : []
      )
      .reduce((output, entry) => output + "\n" + entry)
      .concat("\n\n");
    await appendFile(this.reportFileName, currentSnapshot);
    console.log(currentSnapshot);
  }

  public async end() {
    // Logging all the errors to a file
    const errors = [].concat(
      this.sendInfo.errors,
      this.receiveInfo.errors,
      this.messageLockRenewalInfo.errors,
      this.sessionLockRenewalInfo.errors
    );
    if (errors.length) {
      await writeFile(
        `errors-logged-${this.queueName}.txt`,
        errors.reduce((output, entry) => output + "\n" + entry)
      );
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
