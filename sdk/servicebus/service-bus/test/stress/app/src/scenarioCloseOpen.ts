import { ServiceBusClient } from "@azure/service-bus";
import { ServiceBusStressTester } from "./serviceBusStressTester";
import { delay } from "rhea-promise";
import parsedArgs from "minimist";

interface ScenarioCloseOptions {
  testDurationInMs?: number;
  receiveBatchMaxMessageCount?: number;
  receiveBatchMaxWaitTimeInMs?: number;
  numberOfMessagesPerSend?: number;
  delayBeforeCallingCloseInMs?: number;
}

function sanitizeOptions(args: string[]): Required<ScenarioCloseOptions> {
  const options = parsedArgs<ScenarioCloseOptions>(args, {
    boolean: ["shouldCreateNewClientEachTime"],
    default: { shouldCreateNewClientEachTime: true },
  });
  return {
    testDurationInMs: options.testDurationInMs || 60 * 60 * 1000, // Default = 60 minutes
    receiveBatchMaxMessageCount: options.receiveBatchMaxMessageCount || 10,
    receiveBatchMaxWaitTimeInMs: options.receiveBatchMaxWaitTimeInMs || 10000,
    numberOfMessagesPerSend: options.numberOfMessagesPerSend || 1,
    delayBeforeCallingCloseInMs: options.delayBeforeCallingCloseInMs || 100,
  };
}

export async function scenarioClose() {
  const testOptions = sanitizeOptions(process.argv);

  const {
    testDurationInMs,
    receiveBatchMaxMessageCount,
    receiveBatchMaxWaitTimeInMs,
    numberOfMessagesPerSend,
    delayBeforeCallingCloseInMs,
  } = testOptions;

  const startedAt = new Date();

  const stressBase = new ServiceBusStressTester({
    testName: "closeOpen",
    snapshotFocus: ["send-info", "receive-info", "close-info"],
  });

  const operation = async (sbClient: ServiceBusClient) => {
    let elapsedTime = new Date().valueOf() - startedAt.valueOf();
    while (elapsedTime < testDurationInMs) {
      const sender = sbClient.createSender(stressBase.queueName);
      const receiver = sbClient.createReceiver(stressBase.queueName);
      await stressBase.sendMessages([sender], numberOfMessagesPerSend);
      await stressBase.receiveMessages(
        receiver,
        receiveBatchMaxMessageCount,
        receiveBatchMaxWaitTimeInMs
      );
      await delay(delayBeforeCallingCloseInMs);
      await stressBase.callClose(sender, "sender");
      await stressBase.callClose(receiver, "receiver");

      elapsedTime = new Date().valueOf() - startedAt.valueOf();
    }
  };

  return stressBase.runStressTest(operation, {
    additionalEventProperties: testOptions,
  });
}

scenarioClose().catch((err) => {
  console.log("Error occurred: ", err);
});
