// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { CosmosDiagnostics } from "../../CosmosDiagnostics";
import type { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request/ResourceResponse";
import type { Resource } from "../Resource";
import type { Database } from "./Database";
import type { DatabaseDefinition } from "./DatabaseDefinition";

/** Response object for Database operations */
export class DatabaseResponse extends ResourceResponse<DatabaseDefinition & Resource> {
  constructor(
    resource: DatabaseDefinition & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    database: Database,
    diagnostics: CosmosDiagnostics,
  ) {
    super(resource, headers, statusCode, diagnostics);
    this.database = database;
  }
  /** A reference to the {@link Database} that the returned {@link DatabaseDefinition} corresponds to. */
  public readonly database: Database;
}
