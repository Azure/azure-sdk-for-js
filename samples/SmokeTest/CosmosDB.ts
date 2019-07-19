import { CosmosClient, Database, Container } from "@azure/cosmos";

export class CosmosDB {
  private static dataBaseName = "jsSolarSystem";
  private static collectionName = "PlanetsCollection";
  private static client: CosmosClient;
  private static db: Database;
  private static container: Container;

  static async Run() {
    console.log(`
        ------------------------
        Cosmos DB
        ------------------------
        1) Create a database
        2) Create a collection
        3) Create documents (items) in the collection
        4) Delete the database (Clean up the resource)
        `);

    const endpoint = process.env["COSMOS_ENDPOINT"] || "<YourEndpoint>";
    const masterKey = process.env["COSMOS_KEY"] || "<YourKey>";
    CosmosDB.client = new CosmosClient({ endpoint, auth: { masterKey } });

    //Ensure that the resource is clean
    try {
      await CosmosDB.DeleteDatabase();
    } catch {}

    await CosmosDB.CreateDatabase();
    await CosmosDB.CreateCollection();
    await CosmosDB.CreateDocuments();
    await CosmosDB.DeleteDatabase();
  }

  private static async CreateDatabase() {
    console.log(`Creating "${CosmosDB.dataBaseName}" database...`);
    const { database: db } = await CosmosDB.client.databases.create({ id: CosmosDB.dataBaseName });
    CosmosDB.db = db;
    console.log("\tdone");
  }

  private static async CreateCollection() {
    console.log(`Creating "${CosmosDB.collectionName}" collection...`);
    const { container } = await CosmosDB.db.containers.create({ id: CosmosDB.collectionName });
    CosmosDB.container = container;
    console.log("\tdone");
  }

  private static async CreateDocuments() {
    console.log("Creating documents (items)...");

    //In order to identify the object, cosmos will expect an 'id' peroperty in any object.
    //If there is not an 'id' property, cosmos will asign a random id string to it.
    let planetEarth = {
      id: "Earth",
      HasRings: false,
      Radius: 3959,
      Moons: [
        {
          Name: "Moon"
        }
      ]
    };

    let planetMars = {
      id: "Mars",
      HasRings: false,
      Radius: 2106,
      Moons: [
        {
          Name: "Phobos"
        },
        {
          Name: "Deimos"
        }
      ]
    };

    await CosmosDB.container.items.create(planetEarth);
    console.log(`\t${planetEarth.id} done`);

    await CosmosDB.container.items.create(planetMars);
    console.log(`\t${planetMars.id} done`);
  }

  private static async DeleteDatabase() {
    console.log("Deleting database...");
    await CosmosDB.db.delete();
    console.log("\tdone");
  }
}
