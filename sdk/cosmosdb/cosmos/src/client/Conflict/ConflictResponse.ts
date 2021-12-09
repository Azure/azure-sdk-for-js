// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Conflict } from "./Conflict";
import { ConflictDefinition } from "./ConflictDefinition";
import { CosmosHeaders } from "../../queryExecutionContext";
import { Resource } from "../Resource";
import { ResourceResponse } from "../../request";

export class ConflictResponse extends ResourceResponse<ConflictDefinition & Resource> {
  constructor(
    resource: ConflictDefinition & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    conflict: Conflict
  ) {
    super(resource, headers, statusCode);
    this.conflict = conflict;
  }
  /** A reference to the {@link Conflict} corresponding to the returned {@link ConflictDefinition}. */
  public readonly conflict: Conflict;
}
