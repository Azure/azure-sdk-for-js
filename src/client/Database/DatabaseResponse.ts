import { CosmosResponse } from "../../request/CosmosResponse";
import { Database } from "./Database";
import { DatabaseDefinition } from "./DatabaseDefinition";

/** Response object for Database operations */
export interface DatabaseResponse extends CosmosResponse<DatabaseDefinition, Database> {
  /** A reference to the {@link Database} that the returned {@link DatabaseDefinition} corresponds to. */
  database: Database;
}
