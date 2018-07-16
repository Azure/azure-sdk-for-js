import { CosmosResponse } from "../../request";
import { Conflict } from "./Conflict";
import { ConflictDefinition } from "./ConflictDefinition";

export interface ConflictResponse extends CosmosResponse<ConflictDefinition, Conflict> {
  conflict: Conflict;
}
