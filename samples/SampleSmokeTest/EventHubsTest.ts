import { EventHubClient } from "@azure/event-hubs";

export class EventHubs{
    service = "Event Hubs";
    description = 
                "1) Get partitions ID\n"+
                "2) Send a batch of 3 events\n"+
                "3) Get a batch of events\n";

    private client : EventHubClient;
    private partitionId : string[];

    constructor(){
        let eventHubName = "myeventhub";
        let connectionString = process.env["EVENT_HUBS_CONNECTION_STRING"];
        
        this.client = EventHubClient.createFromConnectionString(connectionString,eventHubName);
    }

    async Run(){
        try{
            await this.getPartitionsIds();
            await this.sendBatchOfEvents();
            await this.receiveBatchOfEvents();
        }
        catch (ex){
            //If something goes wrong, the client must be closed in order for the app to end.
            await this.client.close();
            throw ex;
        }
        //At the end the client should be closed.
        await this.client.close();
    }

    private async getPartitionsIds(){
        console.log("getting partitions id");
        
        //In this sample, all the events are gonna be send and received from the first partition of the Event Hub.
        //This can be changed since it is not necessary to specify the partitionID when calling a method of the SDK.
        this.partitionId = await this.client.getPartitionIds();
        console.log("\tdone");
        
    }

    private async sendBatchOfEvents(){
        console.log("sending a batch");
        await this.client.sendBatch(
            [
                { body: "JS Event Test 1" },
                { body: "JS Event Test 2" },
                { body: "JS Event Test 3" }
            ], this.partitionId[0]
            );
            console.log("\tdone");
    }

    private async receiveBatchOfEvents(){
        console.log("receiving a batch");
        //This will get a batch of events, but not necesarily the same ones sended before.
        //This will get a batch of events from the EvenHub, depending on the configuration of how many days the event hub will keep the events.
        const myEvents = await this.client.receiveBatch(this.partitionId[0],3);
        console.log("\tdone");
        
    }

}