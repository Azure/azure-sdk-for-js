import { EventHubClient, EventPosition, OnMessage, OnError, EventHubsError } from "../lib";

const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";


async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);
  const onMessage: OnMessage = async (eventData: any) => {
    console.log(">>> EventDataObject: ", eventData);
    console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
  }
  const onError: OnError = (err: EventHubsError | Error) => {
    console.log(">>>>> Error occurred: ", err);
  };
  const rcvHandler = client.receiveOnMessage("0", onMessage, onError, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  console.log("rcvHandler: ", rcvHandler.name);
}

main().catch((err) => {
  console.log("error: ", err);
});
