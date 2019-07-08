import {CosmosClient} from "@azure/cosmos";

export class CosmosDB {
    service = "Cosmos DB";
    description = 
                "1) Create a database\n"+
                "2) Create a collection\n"+
                "3) Create documents (items) in the collection\n"+
                "4) Delete the database (Clean up the resource)\n";
   
    private dataBaseName = "jsSolarSystem";
    private collectionName = "PlanetsCollection";

    private client;
    private db;
    private container;

    constructor(){
        //THIS CLASS EXPECTS TO FIND THE FOLLOWING ENVIRONMENT VARIABLES
        const endpoint = process.env["COSMOS_END_POINT"];
        const masterKey = process.env["COSMOS_KEY"]; 
        
        this.client = new CosmosClient({ endpoint, auth: { masterKey } });
    }

    async Run(){
        await this.CreateDatabase();
        await this.CreateCollection();
        await this.CreateDocuments();
        await this.DeleteDatabase();
    }

    private async CreateDatabase(){
        console.log(`Creating "${this.dataBaseName}" database...`)
        const { database: db } = await this.client.databases.create({id: this.dataBaseName});
        this.db = db;
        console.log("\tdone");
    }

    private async CreateCollection(){
        console.log(`Creating "${this.collectionName}" collection...`);
        const { container } = await this.db.containers.create({id: this.collectionName});
        this.container = container;
        console.log("\tdone");
    }

    private async CreateDocuments(){
        console.log("Creating documents (items)...");
        
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

    private async DeleteDatabase(){
        console.log("Deleting database...");
        await this.db.delete();
        console.log("\tdone");
    }
}