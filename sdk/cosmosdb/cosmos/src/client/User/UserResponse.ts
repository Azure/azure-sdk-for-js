// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { CosmosDiagnostics } from "../../CosmosDiagnostics";
import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request";
import { Resource } from "../Resource";
import { User } from "./User";
import { UserDefinition } from "./UserDefinition";

export class UserResponse extends ResourceResponse<UserDefinition & Resource> {
  constructor(
    resource: UserDefinition & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    user: User,
    diagnostics: CosmosDiagnostics,
  ) {
    super(resource, headers, statusCode, diagnostics);
    this.user = user;
  }
  /** A reference to the {@link User} corresponding to the returned {@link UserDefinition}. */
  public readonly user: User;
}
