import { CosmosClient } from "../../CosmosClient";
import {ClientSecretCredential } from "@azure/identity";


const clientappcredential= new ClientSecretCredential(
   "72f988bf-86f1-41af-91ab-2d7cd011db47",
   "ed2ddc00-796c-41a1-ba9c-f7f06fe43e53", 
   "8LR8Q~mxjo5jJrVhwwQpmOi1bczNorTJg~7QVaXu"
)

const client = new CosmosClient({
    endpoint: "https://localhost:8081",
    key: "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==", 
    credentials: clientappcredential

})

const { database } = await client.databases.createIfNotExists({ id: "demo" });