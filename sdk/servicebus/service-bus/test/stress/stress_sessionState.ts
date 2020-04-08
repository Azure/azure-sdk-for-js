/*
Test Scenario summary:
- Creates a single session receiver on a session enabled queue.
- Autolockrenewal is enabled and set to test duration.
- Set state to value #1, wait for half test durations (12 hours), get state to retrieve value #1
- Wait for other half test durations (12 hours), set state to value #2, get state to retrieve value #2
- Set state to value #3 and get state to retrieve value #3

The test assumes no other process is working with the queues defined in here,
but the queues must be empty and use default configurations before running the test.

For running this test, connection string of the Service Bus namespace and queue name
must be supplied.
*/

import { delay, ReceiveMode } from "../../src";
import { ServiceBusClient } from "../../src/old/serviceBusClient";

const connectionString = "";
const queueName = "";

const testDurationInMilliseconds = 60000 * 5 * 12 * 24; // 24 hours

async function main(): Promise<void> {
  await setGetSessionState("session-1");
}

async function setGetSessionState(sessionId: string): Promise<void> {
  const ns = new ServiceBusClient(connectionString);
  const client = ns.createQueueClient(queueName);

  try {
    const receiver = client.createReceiver(ReceiveMode.peekLock, {
      sessionId: sessionId,
      autoRenewLockDurationInMs: testDurationInMilliseconds + 60 * 1000
    });

    const firstState = { testKey: "testValue-a" };
    await receiver.setState(firstState);

    await delay(testDurationInMilliseconds / 2);

    const retrievedFirstState = await receiver.getState();
    console.log(`Value of first state - ${retrievedFirstState.testKey}`);

    if (retrievedFirstState.testKey !== firstState.testKey) {
      throw new Error(
        `Step 1 - Expected ${firstState.testKey} but got ${retrievedFirstState.testKey}`
      );
    }

    await delay(testDurationInMilliseconds / 2);

    const secondState = { testKey: "testValue-b" };
    await receiver.setState(secondState);

    const retrievedSecondState = await receiver.getState();
    console.log(`Value of second state - ${retrievedSecondState.testKey}`);

    if (retrievedSecondState.testKey !== secondState.testKey) {
      throw new Error(
        `Step 2 - Expected ${secondState.testKey} but got ${retrievedSecondState.testKey}`
      );
    }

    await receiver.close();
  } finally {
    await client.close();
    await ns.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
