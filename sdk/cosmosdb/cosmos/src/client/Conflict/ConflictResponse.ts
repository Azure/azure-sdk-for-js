// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosHeaders } from "../../queryExecutionContext";
import { GuaranteedResourceResponse, MaterializedResponse } from "../../request";
import { Resource } from "../Resource";
import { Conflict } from "./Conflict";
import { ConflictDefinition, ConflictDefinitionResponse } from "./ConflictDefinition";

export class ConflictResponse extends GuaranteedResourceResponse<ConflictDefinitionResponse & Resource> {
  constructor(
    resource: ConflictDefinitionResponse & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    conflict: Conflict
  ) {
    super(resource, headers, statusCode);
    this.conflict = conflict;
  }
  /** A reference to the {@link Conflict} corresponding to the returned {@link ConflictDefinitionResponse}. */
  public readonly conflict: Conflict;
}


export function createConflictResponse<T extends ConflictDefinition = any>(response: MaterializedResponse<T & Resource>, conflict: Conflict): ConflictResponse {
  const resource = response.result;
  if (resource.resourceId !== undefined && resource.resourceType !== undefined && resource.operationType !== undefined && resource.content !== undefined) {
    const checkedResource: ConflictDefinitionResponse & Resource = {
      ...resource,
      resourceId: resource.resourceId,
      resourceType: resource.resourceType,
      content: resource.content,
      operationType: resource.operationType
    }
    return new ConflictResponse(
      checkedResource,
      response.headers,
      response.code,
      conflict
    );
  }
  throw new Error("Necessary properties of ContainerDefinition missing.");
}