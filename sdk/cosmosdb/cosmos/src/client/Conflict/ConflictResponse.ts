import { CosmosResponse } from "../../request";
import { Resource } from "../Resource";
import { Conflict } from "./Conflict";
import { ConflictDefinition } from "./ConflictDefinition";

export interface ConflictResponse extends CosmosResponse<ConflictDefinition & Resource, Conflict> {
  /** A reference to the {@link Conflict} corresponding to the returned {@link ConflictDefinition}. */
  conflict: Conflict;
}
