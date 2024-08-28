// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { CosmosDiagnostics } from "../../CosmosDiagnostics";
import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request";
import { Resource } from "../Resource";
import { StoredProcedure } from "./StoredProcedure";
import { StoredProcedureDefinition } from "./StoredProcedureDefinition";

export class StoredProcedureResponse extends ResourceResponse<
  StoredProcedureDefinition & Resource
> {
  constructor(
    resource: StoredProcedureDefinition & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    storedProcedure: StoredProcedure,
    diagnostics: CosmosDiagnostics,
  ) {
    super(resource, headers, statusCode, diagnostics);
    this.storedProcedure = storedProcedure;
  }
  /**
   * A reference to the {@link StoredProcedure} which the {@link StoredProcedureDefinition} corresponds to.
   */
  public readonly storedProcedure: StoredProcedure;

  /**
   * Alias for storedProcedure.
   *
   * A reference to the {@link StoredProcedure} which the {@link StoredProcedureDefinition} corresponds to.
   */
  public get sproc(): StoredProcedure {
    return this.storedProcedure;
  }
}
