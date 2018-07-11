import { CosmosResponse } from "../../request/CosmosResponse";
import { Database } from "./Database";
import { DatabaseDefinition } from "./DatabaseDefinition";

export interface DatabaseResponse extends CosmosResponse<DatabaseDefinition, Database> {
    database: Database;
}
