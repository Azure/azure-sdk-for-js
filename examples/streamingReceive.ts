import { EventHubClient, EventPosition, OnMessage, OnError, EventHubsError, ReceiveOptions } from "azure-arm-event-hubs";

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
  const options: ReceiveOptions = {
    eventPosition: EventPosition.fromEnqueuedTime(Date.now()),
    enableReceiverRuntimeMetric: true
  }
  const rcvHandler = client.receive("0", onMessage, onError, options);
  console.log("rcvHandler: ", rcvHandler.name);
}

main().catch((err) => {
  console.log("error: ", err);
});
