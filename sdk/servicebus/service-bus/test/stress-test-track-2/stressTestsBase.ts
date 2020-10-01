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
            sessionId: useSessions ? `session-${Math.ceil(Math.random() * 10000)}` : undefined
          });
        }
        if (useScheduleApi) {
          const scheduleTime = new Date();
          scheduleTime.setMinutes(scheduleTime.getMinutes() + 1); // 1 minute from now
          await sender.scheduleMessages(scheduleTime, messages);
        } else {
          await sender.sendMessages(messages);
        }
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
          }
        } catch (error) {
          this.messageLockRenewalInfo.numberOfFailures++;
          this.messageLockRenewalInfo.errors.push(error);
          console.error("Error in message lock renewal: ", error);
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

  public snapshot(): void {
    // TODO: Save to a file as a table
    // TODO: Log all the output to a file too
    console.log("Queue name: ", this.queueName);
    console.log("Time : ", new Date());
    const elapsedTimeInSeconds = (new Date().valueOf() - this.startedAt.valueOf()) / 1000;
    console.log("Elapsed time in seconds: ", elapsedTimeInSeconds);
    console.log("Number of messages sent so far : ", this.messagesSent.length);
    console.log("Number of messages received so far : ", this.messagesReceived.length);

    if (this.snapshotOptions.snapshotFocus.includes("send-info")) {
      console.log("Number of successful sends so far : ", this.sendInfo.numberOfSuccesses);
      console.log("Number of failed sends so far : ", this.sendInfo.numberOfFailures);
      console.log(
        "(Avg)Number of sends per sec: ",
        this.sendInfo.numberOfSuccesses / elapsedTimeInSeconds
      );
    }
    if (this.snapshotOptions.snapshotFocus.includes("receive-info")) {
      console.log("Number of successful receives so far : ", this.receiveInfo.numberOfSuccesses);
      console.log("Number of failed receives so far : ", this.receiveInfo.numberOfFailures);
      console.log(
        "(Avg)Number of receives per sec: ",
        this.receiveInfo.numberOfSuccesses / elapsedTimeInSeconds
      );
    }
    if (this.snapshotOptions.snapshotFocus.includes("message-lock-renewal-info")) {
      console.log(
        "Number of successful message lock renewals so far : ",
        this.messageLockRenewalInfo.numberOfSuccesses
      );
      console.log(
        "Number of failed message lock renewals so far : ",
        this.messageLockRenewalInfo.numberOfFailures
      );
      console.log(
        "(Avg)Number of message lock renewals per sec: ",
        this.messageLockRenewalInfo.numberOfSuccesses / elapsedTimeInSeconds
      );
    }
    if (this.snapshotOptions.snapshotFocus.includes("session-lock-renewal-info")) {
      console.log(
        "Number of successful session lock renewals so far : ",
        this.sessionLockRenewalInfo.numberOfSuccesses
      );
      console.log(
        "Number of failed session lock renewals so far : ",
        this.sessionLockRenewalInfo.numberOfFailures
      );
      console.log(
        "(Avg)Number of session lock renewals per sec: ",
        this.sessionLockRenewalInfo.numberOfSuccesses / elapsedTimeInSeconds
      );
    }
    console.log("\n");
  }

  public async end() {
    // TODO: Log errors in a file
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
