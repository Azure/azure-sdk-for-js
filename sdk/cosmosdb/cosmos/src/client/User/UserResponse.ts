// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import type { CosmosHeaders } from "../../queryExecutionContext/index.js";
import { ResourceResponse } from "../../request/index.js";
import type { Resource } from "../Resource.js";
import type { User } from "./User.js";
import type { UserDefinition } from "./UserDefinition.js";

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
