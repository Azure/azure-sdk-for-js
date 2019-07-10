import {CosmosClient} from "@azure/cosmos";

export class CosmosDB {  
   
    private static dataBaseName = "jsSolarSystem";
    private static collectionName = "PlanetsCollection";
    private static client;
    private static db;
    private static container;

    static async Run(){
        console.log();
        console.log("------------------------");
        console.log("Cosmos DB");
        console.log("------------------------");
        console.log("1) Create a database");
        console.log("2) Create a collection");
        console.log("3) Create documents (items) in the collection");
        console.log("4) Delete the database (Clean up the resource)");
        console.log();

        const endpoint = process.env["COSMOS_ENDPOINT"];
        const masterKey = process.env["COSMOS_KEY"]; 
        CosmosDB.client = new CosmosClient({ endpoint, auth: { masterKey } });

        await CosmosDB.CreateDatabase();
        await CosmosDB.CreateCollection();
        await CosmosDB.CreateDocuments();
        await CosmosDB.DeleteDatabase();
    }

    private static async CreateDatabase(){
        console.log(`Creating "${CosmosDB.dataBaseName}" database...`)
        const { database: db } = await CosmosDB.client.databases.create({id: CosmosDB.dataBaseName});
        CosmosDB.db = db;
        console.log("\tdone");
    }

    private static async CreateCollection(){
        console.log(`Creating "${CosmosDB.collectionName}" collection...`);
        const { container } = await CosmosDB.db.containers.create({id: CosmosDB.collectionName});
        CosmosDB.container = container;
        console.log("\tdone");
    }

    private static async CreateDocuments(){
        console.log("Creating documents (items)...");
        
        //In order to identify the object, cosmos will expect an 'id' peroperty in any object.
        //If there is not an 'id' property, cosmos will asign a random id string to it.
        let planetEarth =
        {
            "id" : "Earth",
            "HasRings" : false,
            "Radius" : 3959,
            "Moons" : 
            [
                {
                    "Name" : "Moon"
                }
            ]
        };
    
        let planetMars =
        {
            "id" : "Mars",
            "HasRings" : false,
            "Radius" : 2106,
            "Moons" : 
            [
                {
                    "Name" : "Phobos"
                },
                {
                    "Name" : "Deimos"
                }
            ]
        };

        let { body } = await CosmosDB.container.items.create(planetEarth);
        console.log(`\t${planetEarth.id} done`);

        let { body2 } = await CosmosDB.container.items.create(planetMars);
        console.log(`\t${planetMars.id} done`);
    }

    private static async DeleteDatabase(){
        console.log("Deleting database...");
        await CosmosDB.db.delete();
        console.log("\tdone");
    }
}