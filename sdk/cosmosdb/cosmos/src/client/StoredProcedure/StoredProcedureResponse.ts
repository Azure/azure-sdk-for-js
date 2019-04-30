import { CosmosResponse } from "../../request";
import { Resource } from "../Resource";
import { StoredProcedure } from "./StoredProcedure";
import { StoredProcedureDefinition } from "./StoredProcedureDefinition";

export interface StoredProcedureResponse extends CosmosResponse<StoredProcedureDefinition & Resource, StoredProcedure> {
  /**
   * A reference to the {@link StoredProcedure} which the {@link StoredProcedureDefinition} corresponds to.
   */
  storedProcedure: StoredProcedure;

  /**
   * Alias for storedProcedure.
   *
   * A reference to the {@link StoredProcedure} which the {@link StoredProcedureDefinition} corresponds to.
   */
  sproc: StoredProcedure;
}
