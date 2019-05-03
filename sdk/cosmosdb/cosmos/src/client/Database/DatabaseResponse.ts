import { CosmosResponse } from "../../request/CosmosResponse";
import { Resource } from "../Resource";
import { Database } from "./Database";
import { DatabaseDefinition } from "./DatabaseDefinition";

/** Response object for Database operations */
export interface DatabaseResponse extends CosmosResponse<DatabaseDefinition & Resource, Database> {
  /** A reference to the {@link Database} that the returned {@link DatabaseDefinition} corresponds to. */
  database: Database;
}
