import { ServiceBusClient, ServiceBusSessionReceiver } from "@azure/service-bus";
import { ServiceBusStressTester } from "./serviceBusStressTester";
import { delay } from "rhea-promise";
import parsedArgs from "minimist";

interface ScenarioRenewSessionLockOptions {
  testDurationInMs?: number;
  receiveBatchMaxMessageCount?: number;
  receiveBatchMaxWaitTimeInMs?: number;
  delayBetweenReceivesInMs?: number;
  numberOfMessagesPerSend?: number;
  delayBetweenSendsInMs?: number;
  totalNumberOfMessagesToSend?: number;
  /**
   * Default: false
   * Manual autoLockRenewal happens occurs by default
   * If this flag is set to true, manual lock renewal is disabled, related logging is also gone with it
   */
  autoLockRenewal?: boolean;
  settleMessageOnReceive?: boolean;
  numberOfSessions?: number;
}

function sanitizeOptions(args: string[]): Required<ScenarioRenewSessionLockOptions> {
  const options = parsedArgs<ScenarioRenewSessionLockOptions>(args, {
    boolean: ["autoLockRenewal", "settleMessageOnReceive"],
    default: { autoLockRenewal: false, settleMessageOnReceive: true },
  });
  return {
    testDurationInMs: options.testDurationInMs || 60 * 60 * 1000, // Default = 60 minutes
    receiveBatchMaxMessageCount: options.receiveBatchMaxMessageCount || 10,
    receiveBatchMaxWaitTimeInMs: options.receiveBatchMaxWaitTimeInMs || 10000,
    numberOfSessions: options.numberOfSessions || 16,
    delayBetweenReceivesInMs: options.delayBetweenReceivesInMs || 0,
    numberOfMessagesPerSend: options.numberOfMessagesPerSend || 100,
    delayBetweenSendsInMs: options.delayBetweenSendsInMs || 0,
    totalNumberOfMessagesToSend: options.totalNumberOfMessagesToSend || Infinity,
    autoLockRenewal: !!options.autoLockRenewal,
    settleMessageOnReceive: !!options.settleMessageOnReceive,
  };
}

// TODO: max lock renewal duration to be 70% of testDuration instead of 100%
// TODO: Upon ending max lock renewal duration, pass an option to complete/ignore the message
export async function scenarioRenewSessionLock() {
  const testOptions = sanitizeOptions(process.argv);
  const {
    testDurationInMs,
    receiveBatchMaxMessageCount,
    receiveBatchMaxWaitTimeInMs,
    numberOfSessions,
    delayBetweenReceivesInMs,
    numberOfMessagesPerSend,
    delayBetweenSendsInMs,
    totalNumberOfMessagesToSend,
    autoLockRenewal,
    settleMessageOnReceive,
  } = testOptions;

  const testDurationForSendInMs = testDurationInMs * 0.7;
  // Since we are focusing on session locks in this test
  const receiveMode = "receiveAndDelete";
  const useSessions = true;
  const useScheduleApi = false;

  const startedAt = new Date();

  const stressBase = new ServiceBusStressTester({
    testName: "renewSessionLock",
    snapshotFocus: ["send-info", "receive-info", "session-lock-renewal-info"],
  });

  const operation = async (sbClient: ServiceBusClient) => {
    const sender = sbClient.createSender(stressBase.queueName);

    async function sendMessages() {
      let elapsedTime = new Date().valueOf() - startedAt.valueOf();
      while (
        elapsedTime < testDurationForSendInMs &&
        stressBase.numMessagesSent() < totalNumberOfMessagesToSend
      ) {
        await stressBase.sendMessages(
          [sender],
          numberOfMessagesPerSend,
          useSessions,
          useScheduleApi,
          numberOfSessions
        );
        elapsedTime = new Date().valueOf() - startedAt.valueOf();
        await delay(delayBetweenSendsInMs);
      }
    }

    let receivers: ServiceBusSessionReceiver[] = [];
    async function receiveMessages() {
      let elapsedTime = new Date().valueOf() - startedAt.valueOf();
      while (elapsedTime < testDurationInMs) {
        let receiver;
        try {
          receiver = await sbClient.acceptNextSession(stressBase.queueName, {
            receiveMode,
            maxAutoLockRenewalDurationInMs: !autoLockRenewal ? 0 : testDurationInMs - elapsedTime,
          });
        } catch (error: any) {
          console.log(error);
        }
        if (receiver) {
          await stressBase.receiveMessages(
            receiver,
            receiveBatchMaxMessageCount,
            receiveBatchMaxWaitTimeInMs,
            settleMessageOnReceive
          );
          receivers.push(receiver);
          if (!autoLockRenewal) {
            stressBase.renewSessionLockUntil(receiver, testDurationInMs - elapsedTime);
          }
        }
        elapsedTime = new Date().valueOf() - startedAt.valueOf();
        await delay(delayBetweenReceivesInMs);
      }
    }

    await Promise.all([sendMessages(), receiveMessages()]);
  };

  return stressBase.runStressTest(operation, {
    createQueueOptions: { requiresSession: useSessions },
    additionalEventProperties: testOptions,
  });
}

scenarioRenewSessionLock().catch((err) => {
  console.log("Error occurred: ", err);
});
