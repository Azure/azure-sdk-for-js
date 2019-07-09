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

        const endpoint = process.env["COSMOS_END_POINT"];
        const masterKey = process.env["COSMOS_KEY"]; 
        this.client = new CosmosClient({ endpoint, auth: { masterKey } });

        await this.CreateDatabase();
        await this.CreateCollection();
        await this.CreateDocuments();
        await this.DeleteDatabase();
    }

    private static async CreateDatabase(){
        console.log(`Creating "${this.dataBaseName}" database...`)
        const { database: db } = await this.client.databases.create({id: this.dataBaseName});
        this.db = db;
        console.log("\tdone");
    }

    private static async CreateCollection(){
        console.log(`Creating "${this.collectionName}" collection...`);
        const { container } = await this.db.containers.create({id: this.collectionName});
        this.container = container;
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

        let { body } = await this.container.items.create(planetEarth);
        console.log(`\t${planetEarth.id} done`);

        let { body2 } = await this.container.items.create(planetMars);
        console.log(`\t${planetMars.id} done`);
    }

    private static async DeleteDatabase(){
        console.log("Deleting database...");
        await this.db.delete();
        console.log("\tdone");
    }
}