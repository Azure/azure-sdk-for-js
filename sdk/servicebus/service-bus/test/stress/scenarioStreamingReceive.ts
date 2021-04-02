import {
  ReceiveMode,
  ServiceBusClient,
  ServiceBusReceivedMessage,
  ServiceBusReceiver
} from "@azure/service-bus";
import { SBStressTestsBase } from "./stressTestsBase";
import { delay } from "rhea-promise";
import parsedArgs from "minimist";

// Load the .env file if it exists
import * as dotenv from "dotenv";
import { iptablesDrop, iptablesReset } from "./utils/iptables";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";

interface ScenarioStreamingReceiveOptions {
  testDurationInMs?: number;
  receiveMode?: ReceiveMode;
  autoComplete?: boolean;
  maxConcurrentCalls?: number;
  maxAutoRenewLockDurationInMs?: number;
  manualLockRenewal: boolean;
  numberOfMessagesPerSend?: number;
  delayBetweenSendsInMs?: number;
  totalNumberOfMessagesToSend?: number;
  completeMessageAfterDuration?: boolean;
  settleMessageOnReceive?: boolean;
  numberOfDisconnects?: number;
  /**
   * This requires
   * `settleMessageOnReceive` to be true,
   * `autoComplete` to be false,
   * `receiveMode` to be "peekLock",
   * and
   * `manualLockRenewal` is ignored
   *
   *
   * @type {number}
   * @memberof ScenarioStreamingReceiveOptions
   */
  delayBeforeCompletingMessageInMs?: number;
}

function sanitizeOptions(args: string[]): Required<ScenarioStreamingReceiveOptions> {
  const options = parsedArgs<ScenarioStreamingReceiveOptions>(args, {
    boolean: [
      "autoComplete",
      "manualLockRenewal",
      "completeMessageAfterDuration",
      "settleMessageOnReceive"
    ],
    default: {
      autoComplete: true,
      manualLockRenewal: true,
      completeMessageAfterDuration: true,
      settleMessageOnReceive: false
    }
  });
  return {
    testDurationInMs: options.testDurationInMs || 60 * 60 * 1000, // Default = 60 minutes
    receiveMode: (options.receiveMode as ReceiveMode) || "peekLock",
    autoComplete: options.autoComplete,
    maxConcurrentCalls: options.maxConcurrentCalls || 100,
    maxAutoRenewLockDurationInMs: options.maxAutoRenewLockDurationInMs || 0,
    manualLockRenewal: options.manualLockRenewal,
    numberOfMessagesPerSend: options.numberOfMessagesPerSend || 1,
    delayBetweenSendsInMs: options.delayBetweenSendsInMs || 0,
    totalNumberOfMessagesToSend: options.totalNumberOfMessagesToSend || Infinity,
    completeMessageAfterDuration: options.completeMessageAfterDuration,
    settleMessageOnReceive: options.settleMessageOnReceive,
    numberOfDisconnects: options.numberOfDisconnects || 1,
    delayBeforeCompletingMessageInMs: options.delayBeforeCompletingMessageInMs || 0
  };
}

export async function scenarioStreamingReceive() {
  const testOptions = sanitizeOptions(process.argv);
  const {
    testDurationInMs,
    receiveMode,
    autoComplete,
    maxConcurrentCalls,
    manualLockRenewal,
    maxAutoRenewLockDurationInMs,
    numberOfMessagesPerSend,
    delayBetweenSendsInMs,
    totalNumberOfMessagesToSend,
    completeMessageAfterDuration,
    settleMessageOnReceive,
    numberOfDisconnects,
    delayBeforeCompletingMessageInMs
  } = testOptions;

  const testDurationForSendInMs = testDurationInMs * 0.7;
  const startedAt = new Date();

  const stressBase = new SBStressTestsBase({
    snapshotFocus: ["send-info", "receive-info", "message-lock-renewal-info"]
  });
  const sbClient = new ServiceBusClient(connectionString);

  await stressBase.init(undefined, undefined, testOptions);
  const sender = sbClient.createSender(stressBase.queueName);
  let receiver: ServiceBusReceiver;

  if (receiveMode === "receiveAndDelete") {
    receiver = sbClient.createReceiver(stressBase.queueName, {
      receiveMode: "receiveAndDelete",
      maxAutoLockRenewalDurationInMs: maxAutoRenewLockDurationInMs
    });
  } else {
    receiver = sbClient.createReceiver(stressBase.queueName, {
      maxAutoLockRenewalDurationInMs: maxAutoRenewLockDurationInMs
    });
  }

  // Sending
  async function sendMessages() {
    let elapsedTime = new Date().valueOf() - startedAt.valueOf();
    while (
      elapsedTime < testDurationForSendInMs &&
      stressBase.messagesSent.length < totalNumberOfMessagesToSend
    ) {
      await stressBase.sendMessages([sender], numberOfMessagesPerSend);
      elapsedTime = new Date().valueOf() - startedAt.valueOf();
      await delay(delayBetweenSendsInMs);
    }
  }

  const processMessageCallback = async (message: ServiceBusReceivedMessage) => {
    // TODO: message to keep renewing locks - pass args
    // TODO: message to complete after certain number of renewals
    if (receiver.receiveMode === "peekLock") {
      if (settleMessageOnReceive) {
        await delay(delayBeforeCompletingMessageInMs);
        await stressBase.completeMessage(message, receiver);
      } else if (!autoComplete && maxAutoRenewLockDurationInMs === 0 && manualLockRenewal) {
        const elapsedTime = new Date().valueOf() - startedAt.valueOf();
        stressBase.renewMessageLockUntil(
          message,
          receiver,
          testDurationInMs - elapsedTime,
          completeMessageAfterDuration
        );
      }
    }
  };

  triggerDisconnects(numberOfDisconnects, testDurationInMs);

  // Resolve
  await Promise.all([
    sendMessages(),
    stressBase.receiveStreaming(receiver, testDurationInMs, processMessageCallback, {
      autoComplete,
      maxConcurrentCalls
    })
  ]);
  await sbClient.close();

  await stressBase.end();
}

scenarioStreamingReceive().catch((err) => {
  console.log("Error occurred: ", err);
});

function triggerDisconnects(numberOfDisconnects: number, testDurationInMs: number) {
  const badNetworkDurationInMs = 120000; // For 120 seconds

  for (let index = 0; index < numberOfDisconnects; index++) {
    const intervalToTrigger = Math.floor(
      Math.random() * (testDurationInMs / (1.5 * badNetworkDurationInMs))
    );
    // Simulate a temporary bad network state.
    setTimeout(() => {
      iptablesDrop();
      setTimeout(() => {
        iptablesReset();
      }, badNetworkDurationInMs);
    }, intervalToTrigger * badNetworkDurationInMs);
  }
}
