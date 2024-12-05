// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import type { CosmosHeaders } from "../../queryExecutionContext/index.js";
import { ResourceResponse } from "../../request/ResourceResponse.js";
import type { Resource } from "../Resource.js";
import type { Database } from "./Database.js";
import type { DatabaseDefinition } from "./DatabaseDefinition.js";

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
