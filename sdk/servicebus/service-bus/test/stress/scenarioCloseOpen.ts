import { ServiceBusClient } from "@azure/service-bus";
import { SBStressTestsBase } from "./stressTestsBase";
import { delay } from "rhea-promise";
import parsedArgs from "minimist";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";

interface ScenarioCloseOptions {
  testDurationInMs?: number;
  receiveBatchMaxMessageCount?: number;
  receiveBatchMaxWaitTimeInMs?: number;
  numberOfMessagesPerSend?: number;
  delayBeforeCallingCloseInMs?: number;
  shouldCreateNewClientEachTime?: boolean;
}

function sanitizeOptions(args: string[]): Required<ScenarioCloseOptions> {
  const options = parsedArgs<ScenarioCloseOptions>(args, {
    boolean: ["shouldCreateNewClientEachTime"],
    default: { shouldCreateNewClientEachTime: true }
  });
  return {
    testDurationInMs: options.testDurationInMs || 60 * 60 * 1000, // Default = 60 minutes
    receiveBatchMaxMessageCount: options.receiveBatchMaxMessageCount || 10,
    receiveBatchMaxWaitTimeInMs: options.receiveBatchMaxWaitTimeInMs || 10000,
    numberOfMessagesPerSend: options.numberOfMessagesPerSend || 1,
    delayBeforeCallingCloseInMs: options.delayBeforeCallingCloseInMs || 100,
    shouldCreateNewClientEachTime: !!options.shouldCreateNewClientEachTime
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
    shouldCreateNewClientEachTime
  } = testOptions;

  const startedAt = new Date();

  const stressBase = new SBStressTestsBase({
    testName: "closeOpen",
    snapshotFocus: ["send-info", "receive-info", "close-info"]
  });
  let sbClient = new ServiceBusClient(connectionString);

  await stressBase.init(undefined, undefined, testOptions);

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
    if (shouldCreateNewClientEachTime) {
      await stressBase.callClose(sbClient, "client");
      sbClient = new ServiceBusClient(connectionString);
    }
    elapsedTime = new Date().valueOf() - startedAt.valueOf();
  }

  await sbClient.close();
  await stressBase.end();
}

scenarioClose().catch((err) => {
  console.log("Error occurred: ", err);
});
