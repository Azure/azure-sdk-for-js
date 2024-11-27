// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { CosmosDiagnostics } from "../../CosmosDiagnostics";
import type { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request";
import type { Resource } from "../Resource";
import type { Conflict } from "./Conflict";
import type { ConflictDefinition } from "./ConflictDefinition";

export class ConflictResponse extends ResourceResponse<ConflictDefinition & Resource> {
  constructor(
    resource: ConflictDefinition & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    conflict: Conflict,
    diagnostics: CosmosDiagnostics,
  ) {
    super(resource, headers, statusCode, diagnostics);
    this.conflict = conflict;
  }
  /** A reference to the {@link Conflict} corresponding to the returned {@link ConflictDefinition}. */
  public readonly conflict: Conflict;
}
