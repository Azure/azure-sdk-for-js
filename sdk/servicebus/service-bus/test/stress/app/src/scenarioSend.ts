import { ServiceBusClient } from "@azure/service-bus";
import { ServiceBusStressTester } from "./serviceBusStressTester";
import { delay } from "rhea-promise";
import parsedArgs from "minimist";

interface ScenarioSimpleSendOptions {
  testDurationInMs?: number;
  numberOfMessagesPerSend?: number;
  delayBetweenSendsInMs?: number;
  totalNumberOfMessagesToSend?: number;
  useScheduleApi?: boolean;
}

function sanitizeOptions(args: string[]): Required<ScenarioSimpleSendOptions> {
  const options = parsedArgs<ScenarioSimpleSendOptions>(args, {
    boolean: ["useScheduleApi"],
    default: { useScheduleApi: false },
  });
  return {
    testDurationInMs: options.testDurationInMs || 60 * 60 * 1000, // Default = 60 minutes
    numberOfMessagesPerSend: options.numberOfMessagesPerSend || 1,
    delayBetweenSendsInMs: options.delayBetweenSendsInMs || 0,
    totalNumberOfMessagesToSend: options.totalNumberOfMessagesToSend || Infinity,
    useScheduleApi: !!options.useScheduleApi,
  };
}

async function main() {
  const testOptions = sanitizeOptions(process.argv);

  const {
    testDurationInMs,
    numberOfMessagesPerSend,
    delayBetweenSendsInMs,
    totalNumberOfMessagesToSend,
    useScheduleApi,
  } = testOptions;

  const stressTester = new ServiceBusStressTester({
    testName: "send",
    snapshotFocus: ["send-info"],
  });

  await stressTester.runStressTest(
    async (sbClient: ServiceBusClient) => {
      const sender = sbClient.createSender(stressTester.queueName);

      const startedAt = new Date();
      let elapsedTime = 0;
      while (
        elapsedTime < testDurationInMs &&
        stressTester.numMessagesSent() < totalNumberOfMessagesToSend
      ) {
        await stressTester.sendMessages([sender], numberOfMessagesPerSend, false, useScheduleApi);
        elapsedTime = new Date().valueOf() - startedAt.valueOf();
        await delay(delayBetweenSendsInMs);
      }
    },
    {
      additionalEventProperties: testOptions,
    }
  );
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
