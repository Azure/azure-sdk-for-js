import { EventHubClient, OnError, EventHubsError, OnMessage } from "../lib";

const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";


async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);
  console.log("Created EH client from connection string");
  const receiver = client.createReceiver("0", { epoch: 2 });
  const onMessage: OnMessage = (eventData: any) => {
    console.log("@@@@ receiver 1: ", receiver.name);
    console.log(">>> EventDataObject: ", eventData);
    console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
  }
  const onError: OnError = (err: EventHubsError | Error) => {
    console.log("@@@@ receiver 1: ", receiver.name);
    console.log(">>>>> Error occurred: ", err);
  };
  receiver.start(onMessage, onError);

  const receiver2 = client.createReceiver("0", { epoch: 1 });
  const onMessage2: OnMessage = (eventData: any) => {
    console.log("@@@@ receiver 2: ", receiver2.name);
    console.log(">>> EventDataObject: ", eventData);
    console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
  }
  const onError2: OnError = (err: EventHubsError | Error) => {
    console.log("@@@@ receiver 2: ", receiver2.name);
    console.log(">>>>> Error occurred: ", err);
  };
  receiver2.start(onMessage2, onError2);
}

main().catch((err) => {
  console.log("error: ", err);
});