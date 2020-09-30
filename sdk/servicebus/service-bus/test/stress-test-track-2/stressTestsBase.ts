import {
  CreateQueueOptions,
  ServiceBusAdministrationClient,
  ServiceBusMessage,
  ServiceBusReceivedMessage,
  ServiceBusReceivedMessageWithLock,
  ServiceBusReceiver,
  ServiceBusSender
} from "@azure/service-bus";
import { ServiceBusSessionReceiver } from "../../src";

interface ReceiveInfo {
  numberOfSuccessfulReceives: number;
  numberOfFailedReceives: number;
  errorsInReceiving: any[];
}
interface SendInfo {
  numberOfSuccessfulSends: number;
  numberOfFailedSends: number;
  errorsInSending: any[];
}
interface LockRenewalInfo {
  numberOfSuccessfulLockRenewals: number;
  numberOfFailedLockRenewals: number;
  errorsInLockRenewal: any[];
  /**
   * key - id, value - next renewal timer meant for the message/session-receiver
   */
  lockRenewalTimers: { [key: string]: NodeJS.Timer };
  /**
   * key - id, value - number of renewals
   */
  renewalCount: { [key: string]: number };
}

// TODO: Add readme describing the scenarios and the commands to run the specific scenario
// (along with the args to pass in for the sample/program)
export class SBStressTestsBase {
  messagesSent: ServiceBusMessage[] = [];
  messagesReceived: ServiceBusMessage[] = [];
  snapshotTimer: NodeJS.Timer;
  startedAt!: Date;
  // TODO: Take snapshot options from the sample to customize logging
  // Send metrics
  sendInfo: SendInfo = {
    numberOfSuccessfulSends: 0,
    numberOfFailedSends: 0,
    errorsInSending: []
  };
  // Receive metrics
  receiveInfo: ReceiveInfo = {
    numberOfSuccessfulReceives: 0,
    numberOfFailedReceives: 0,
    errorsInReceiving: []
  };
  // Message Lock Renewal
  messageLockRenewalInfo: LockRenewalInfo = {
    numberOfSuccessfulLockRenewals: 0,
    numberOfFailedLockRenewals: 0,
    errorsInLockRenewal: [],
    lockRenewalTimers: {},
    renewalCount: {}
  };
  // Session Lock Renewal
  sessionLockRenewalInfo: LockRenewalInfo = {
    numberOfSuccessfulLockRenewals: 0,
    numberOfFailedLockRenewals: 0,
    errorsInLockRenewal: [],
    lockRenewalTimers: {},
    renewalCount: {}
  };
  // Queue Management
  serviceBusAdministrationClient = new ServiceBusAdministrationClient(
    process.env.SERVICEBUS_CONNECTION_STRING!
  );
  queueName!: string;

  constructor(
    snapshotIntervalInMs = 5000 //Snapshots are taken every 5s
  ) {
    // TODO: Add snapshot logging options - opt-in for only the info that you're looking for-
    //       "send-info", "receive-info", "message-lock-info", etc
    // TODO: snapshot options - grouping
    this.startedAt = new Date();
    this.messagesSent = [];
    this.snapshotTimer = setInterval(this.snapshot.bind(this), snapshotIntervalInMs);
  }

  public async init(queueNamePrefix?: string, options?: CreateQueueOptions | undefined) {
    this.queueName =
      (!queueNamePrefix ? `queue` : queueNamePrefix) + `-${Math.ceil(Math.random() * 100000)}`;
    await this.serviceBusAdministrationClient.createQueue(this.queueName, options);
  }

  public async sendMessages(
    senders: ServiceBusSender[],
    numberOfMessages = 1,
    useSessions = false
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
        await sender.sendMessages(messages);
        this.sendInfo.numberOfSuccessfulSends++;
        this.messagesSent = this.messagesSent.concat(messages);
      } catch (error) {
        this.sendInfo.numberOfFailedSends++;
        this.sendInfo.errorsInSending.push(error);
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
      this.receiveInfo.numberOfSuccessfulReceives++;
      return messages;
    } catch (error) {
      this.receiveInfo.numberOfFailedReceives++;
      this.receiveInfo.errorsInReceiving.push(error);
      console.error("Error in receiving: ", error);
    }
    return [];
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
          this.messageLockRenewalInfo.numberOfSuccessfulLockRenewals++;
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
          this.messageLockRenewalInfo.numberOfFailedLockRenewals++;
          this.messageLockRenewalInfo.errorsInLockRenewal.push(error);
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
        this.sessionLockRenewalInfo.numberOfSuccessfulLockRenewals++;
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
        this.sessionLockRenewalInfo.numberOfFailedLockRenewals++;
        this.sessionLockRenewalInfo.errorsInLockRenewal.push(error);
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
    console.log("Number of successful sends so far : ", this.sendInfo.numberOfSuccessfulSends);
    console.log("Number of failed sends so far : ", this.sendInfo.numberOfFailedSends);
    console.log(
      "(Avg)Number of sends per sec: ",
      this.sendInfo.numberOfSuccessfulSends / elapsedTimeInSeconds
    );
    console.log("Number of messages received so far : ", this.messagesReceived.length);
    console.log(
      "Number of successful receives so far : ",
      this.receiveInfo.numberOfSuccessfulReceives
    );
    console.log("Number of failed receives so far : ", this.receiveInfo.numberOfFailedReceives);
    console.log(
      "(Avg)Number of receives per sec: ",
      this.receiveInfo.numberOfSuccessfulReceives / elapsedTimeInSeconds
    );
    console.log(
      "Number of successful message lock renewals so far : ",
      this.messageLockRenewalInfo.numberOfSuccessfulLockRenewals
    );
    console.log(
      "Number of failed message lock renewals so far : ",
      this.messageLockRenewalInfo.numberOfFailedLockRenewals
    );
    console.log(
      "(Avg)Number of message lock renewals per sec: ",
      this.messageLockRenewalInfo.numberOfSuccessfulLockRenewals / elapsedTimeInSeconds
    );
    console.log(
      "Number of successful session lock renewals so far : ",
      this.sessionLockRenewalInfo.numberOfSuccessfulLockRenewals
    );
    console.log(
      "Number of failed session lock renewals so far : ",
      this.sessionLockRenewalInfo.numberOfFailedLockRenewals
    );
    console.log(
      "(Avg)Number of session lock renewals per sec: ",
      this.sessionLockRenewalInfo.numberOfSuccessfulLockRenewals / elapsedTimeInSeconds
    );
    console.log("\n");
  }

  public async end() {
    // TODO: Log errors in a file
    // TODO: Delete the queue at the end
    // TODO: Have a copy of sentMessages and match them with receivedMessages, have the message-id's in the logged file maybe
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
