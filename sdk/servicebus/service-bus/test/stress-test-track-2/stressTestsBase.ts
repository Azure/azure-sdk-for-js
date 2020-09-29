import {
  ServiceBusAdministrationClient,
  ServiceBusMessage,
  ServiceBusReceivedMessage,
  ServiceBusReceivedMessageWithLock,
  ServiceBusReceiver,
  ServiceBusSender
} from "@azure/service-bus";

// TODO: Add readme describing the scenarios and the commands to run the specific scenario
// (along with the args to pass in for the sample/program)
export class SBStressTestsBase {
  messagesSent: ServiceBusMessage[] = [];
  messagesReceived: ServiceBusMessage[] = [];
  snapshotTimer: NodeJS.Timer;
  startedAt: Date | undefined;
  // TODO: Group the metrics and take snapshot options from the sample to customize logging
  // Send metrics
  numberOfSuccessfulSends = 0;
  numberOfFailedSends = 0;
  errorsInSending: any[] = [];
  // Receive metrics
  numberOfSuccessfulReceives = 0;
  numberOfFailedReceives = 0;
  errorsInReceiving: any[] = [];
  // Message Lock Renewal
  numberOfSuccessfulMessageLockRenewals = 0;
  numberOfFailedMessageLockRenewals = 0;
  errorsInMessageLockRenewal: any[] = [];
  messageLockRenewalTimers: NodeJS.Timer[] = [];
  renewalCount: { [key: string]: number } = {}; // key - messageId, value - number of renewals

  // Queue Management
  serviceBusAdministrationClient = new ServiceBusAdministrationClient(
    process.env.SERVICEBUS_CONNECTION_STRING
  );
  queueName: string;

  constructor(
    snapshotIntervalInMs = 5000 //Snapshots are taken every 5s
  ) {
    this.messagesSent = [];
    this.snapshotTimer = setInterval(this.snapshot.bind(this), snapshotIntervalInMs);
  }

  public async init() {
    this.queueName = `unpartitioned-queue-${Math.ceil(Math.random() * 100000)}`;
    await this.serviceBusAdministrationClient.createQueue(this.queueName);
  }

  public async sendMessages(senders: ServiceBusSender[], numberOfMessages = 10) {
    for (const sender of senders) {
      try {
        const messages: ServiceBusMessage[] = [];
        for (let i = 0; i < numberOfMessages; i++) {
          messages.push({ body: `message ${i} ${Math.random()}` });
        }
        await sender.sendMessages(messages);
        this.numberOfSuccessfulSends++;
      } catch (error) {
        this.numberOfFailedSends++;
        this.errorsInSending.push(error);
        console.error("Error in sending: ", error);
      }
    }
  }

  public async receiveMessages<ReceivedMessageT extends ServiceBusReceivedMessage>(
    receiver: ServiceBusReceiver<ReceivedMessageT>,
    maxMsgCount = 10
  ): Promise<ReceivedMessageT[]> {
    try {
      // Make maxWaitTime an argument
      const messages = await receiver.receiveMessages(maxMsgCount, {
        maxWaitTimeInMs: 10000
      });
      this.messagesReceived = this.messagesReceived.concat(messages as ServiceBusReceivedMessage[]);
      this.numberOfSuccessfulReceives++;
      return messages;
    } catch (error) {
      this.numberOfFailedReceives++;
      this.errorsInReceiving.push(error);
      console.error("Error in receiving: ", error);
    }
  }

  public async renewMessageLock(message: ServiceBusReceivedMessageWithLock) {
    // TODO: pass in max number of lock renewals? and add settlement at the end of max??
    this.messageLockRenewalTimers.push(
      setTimeout(async () => {
        try {
          await message.renewLock();
          this.numberOfSuccessfulMessageLockRenewals++;
          const currentRenewalCount = this.renewalCount[message.messageId as string];
          this.renewalCount[message.messageId as string] =
            currentRenewalCount === undefined ? 1 : currentRenewalCount + 1;
          this.renewMessageLock(message);
        } catch (error) {
          this.numberOfFailedMessageLockRenewals++;
          this.errorsInMessageLockRenewal.push(error);
          console.error("Error in message lock renewal: ", error);
        }
      }, message.lockedUntilUtc.valueOf() - new Date().valueOf() - 10000)
    );
  }

  public snapshot(): void {
    // TODO: Save to a file as a table
    // TODO: Log all the output to a file too
    if (!this.startedAt) this.startedAt = new Date();
    console.log("Time : ", new Date());
    const elapsedTimeInSeconds = (new Date().valueOf() - this.startedAt.valueOf()) / 1000;
    console.log("Elapsed time in seconds: ", elapsedTimeInSeconds);
    console.log("Number of messages sent so far : ", this.messagesSent.length);
    console.log("Number of successful sends so far : ", this.numberOfSuccessfulSends);
    console.log("Number of failed sends so far : ", this.numberOfFailedSends);
    console.log(
      "(Avg)Number of sends per sec: ",
      this.numberOfSuccessfulSends / elapsedTimeInSeconds
    );
    console.log("Number of messages received so far : ", this.messagesReceived.length);
    console.log("Number of successful receives so far : ", this.numberOfSuccessfulReceives);
    console.log("Number of failed receives so far : ", this.numberOfFailedReceives);
    console.log(
      "(Avg)Number of receives per sec: ",
      this.numberOfSuccessfulReceives / elapsedTimeInSeconds
    );
    console.log(
      "Number of successful lock renewals so far : ",
      this.numberOfSuccessfulMessageLockRenewals
    );
    console.log("Number of failed lock renewals so far : ", this.numberOfFailedMessageLockRenewals);
    console.log(
      "(Avg)Number of lock renewals per sec: ",
      this.numberOfSuccessfulMessageLockRenewals / elapsedTimeInSeconds
    );
    console.log("\n");
  }

  public async end() {
    // TODO: Log errors in a file
    // TODO: Delete the queue at the end
    clearInterval(this.snapshotTimer);
    this.messageLockRenewalTimers.map((timer) => clearTimeout(timer));
    await this.serviceBusAdministrationClient.deleteQueue(this.queueName);
  }
}
