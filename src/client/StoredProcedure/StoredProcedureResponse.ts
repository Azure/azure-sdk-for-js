import { CosmosResponse } from "../../request";
import { StoredProcedure } from "./StoredProcedure";
import { StoredProcedureDefinition } from "./StoredProcedureDefinition";

export interface StoredProcedureResponse extends CosmosResponse<StoredProcedureDefinition, StoredProcedure> {
  storedProcedure: StoredProcedure;
}
