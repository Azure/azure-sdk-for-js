import { EventHubClient, OnError, EventHubsError, OnMessage, delay } from "azure-arm-event-hubs";

const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";


async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);
  console.log("Created EH client from connection string");
  const onMessage: OnMessage = (eventData: any) => {
    console.log("@@@@ receiver with epoch 2.");
    console.log(">>> EventDataObject: ", eventData);
    console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
  }
  const onError: OnError = (err: EventHubsError | Error) => {
    console.log("@@@@ receiver with epoch 2.");
    console.log(">>>>> Error occurred for receiver with epoch 2: ", err);
  };
  client.receiveOnMessage("0", onMessage, onError, { epoch: 2 });

  console.log("$$$$ Waiting for 8 seconds to let receiver 1 set up and start receiving messages...");
  await delay(8000);
  const onMessage2: OnMessage = (eventData: any) => {
    console.log("@@@@ receiver with epoch 1.");
    console.log(">>> EventDataObject: ", eventData);
    console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
  }
  const onError2: OnError = (err: EventHubsError | Error) => {
    console.log("@@@@ receiver with epoch 1.");
    console.log(">>>>> Error occurred for receiver with epoch 1: ", err);
  };
  console.log("$$$$ Will start receiving messages from receiver with epoch value 1...");
  client.receiveOnMessage("0", onMessage2, onError2, { epoch: 1 });
}

main().catch((err) => {
  console.log("error: ", err);
});