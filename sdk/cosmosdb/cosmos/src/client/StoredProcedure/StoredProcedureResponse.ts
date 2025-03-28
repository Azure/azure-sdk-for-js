// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import type { CosmosHeaders } from "../../queryExecutionContext/index.js";
import { ResourceResponse } from "../../request/index.js";
import type { Resource } from "../Resource.js";
import type { StoredProcedure } from "./StoredProcedure.js";
import type { StoredProcedureDefinition } from "./StoredProcedureDefinition.js";

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
