import { EventHubClient, EventPosition } from "@azure/event-hubs";

export class EventHubs{

    private static client : EventHubClient;
    private static partitionId : string[];

    static async Run(){
        console.log();
        console.log("------------------------");
        console.log("Event Hubs");
        console.log("------------------------");
        console.log("1) Get partitions ID");
        console.log("2) Send a batch of 3 events");
        console.log("3) Get a batch of events");
        console.log();

        let eventHubName = "myeventhub";
        let connectionString = process.env["EVENT_HUBS_CONNECTION_STRING"] || "<YourConnectionString>";

        EventHubs.client = new EventHubClient(connectionString, eventHubName);

        try{
            await EventHubs.getPartitionsIds();
            await EventHubs.SendAndReceiveEvents();
        }
        finally{
            //At the end the client must be closed.
            await EventHubs.client.close();
        }
    }

    private static async getPartitionsIds(){
        console.log("getting partitions id");
        
        //In this sample, all the events are gonna be send and received from the first partition of the Event Hub.
        //This can be changed since it is not necessary to specify the partitionID when calling a method of the SDK.
        EventHubs.partitionId = await EventHubs.client.getPartitionIds();
        console.log("\tdone");
    }

    private static async SendAndReceiveEvents(){
        console.log("creating consumer...");
        
        const consumer = EventHubs.client.createConsumer(
            EventHubClient.defaultConsumerGroupName,
            EventHubs.partitionId[0],
            EventPosition.fromEnqueuedTime(new Date())
        )

        console.log("sending events...");
        const producerOptions = {
            partitionId : EventHubs.partitionId[0]
        }
        const producer = EventHubs.client.createProducer(producerOptions);
        await producer.send({ body: "JS Event Test 1" });
        await producer.send({ body: "JS Event Test 2" });
        await producer.send({ body: "JS Event Test 3" });

        console.log("receiving events...");
        await consumer.receiveBatch(3, 5);
        console.log("\tdone");
    }
}