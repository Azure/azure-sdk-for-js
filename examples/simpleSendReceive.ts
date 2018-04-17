import { EventHubClient, EventPosition, OnMessage, OnError, EventHubsError } from "../lib";

const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";
let client: EventHubClient;
async function main(): Promise<void> {
  client = EventHubClient.createFromConnectionString(str, path);
  const ids = await client.getPartitionIds();
  const hub = await client.getHubRuntimeInformation();
  console.log(">>>> Hub: \n", hub);
  for (let i = 0; i < ids.length; i++) {
    const receiver = client.createReceiver(ids[i], { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
    console.log("***********Created receiver %d", i);
    const sender = client.createSender(ids[i]);
    console.log("***********Created sender %d", i);
    const onMessage: OnMessage = async (eventData: any) => {
      console.log(">>> EventDataObject: ", eventData);
      console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
      await receiver.close();
    }
    const onError: OnError = (err: EventHubsError | Error) => {
      console.log(">>>>> Error occurred: ", err);
    };
    //console.log(onMessage, onError);
    await sender.send({ body: "Hello awesome world!!" + new Date().toString() });
    await sender.close();
    receiver.start(onMessage, onError);
    // Either use receiver.start()  or use receiver.receive().
    // const datas = await receiver.receive(2, 5);
    // console.log("@@@@@@@@ Event Data objects: \n", datas);
  }

}

main().catch((err) => {
  console.log("error: ", err);
});
