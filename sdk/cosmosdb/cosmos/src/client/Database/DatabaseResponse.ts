// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosHeaders } from "../../queryExecutionContext";
import { GuaranteedResourceResponse, MaterializedResponse } from "../../request";
import { assertNotUndefinedOrFail } from "../../utils/typeUtils";
import { Resource } from "../Resource";
import { Database } from "./Database";
import { DatabaseDefinition, DatabaseDefinitionResponse } from "./DatabaseDefinition";

/** Response object for Database operations */
export class DatabaseResponse extends GuaranteedResourceResponse<DatabaseDefinition & Resource> {
  constructor(
    resource: DatabaseDefinitionResponse & Resource,
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

export function createDatabaseResponse<T extends DatabaseDefinition = any>(response: MaterializedResponse<T & Resource>, database: Database): DatabaseResponse {
  const resource: T & Resource = assertNotUndefinedOrFail(response.result); const checkedResource: DatabaseDefinitionResponse & Resource = resource
  return new DatabaseResponse(
    checkedResource,
    response.headers,
    response.code,
    database
  );
}