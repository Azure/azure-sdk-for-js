// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CosmosHeaders } from "../../queryExecutionContext";
import { Database } from "./Database";
import { DatabaseDefinition } from "./DatabaseDefinition";
import { Resource } from "../Resource";
import { ResourceResponse } from "../../request/ResourceResponse";

/** Response object for Database operations */
export class DatabaseResponse extends ResourceResponse<DatabaseDefinition & Resource> {
  constructor(
    resource: DatabaseDefinition & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    database: Database
  ) {
    super(resource, headers, statusCode);
    this.database = database;
  }
  /** A reference to the {@link Database} that the returned {@link DatabaseDefinition} corresponds to. */
  public readonly database: Database;
}
