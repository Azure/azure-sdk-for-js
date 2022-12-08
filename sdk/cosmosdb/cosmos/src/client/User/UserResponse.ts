// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosHeaders } from "../../queryExecutionContext";
import { Response } from "../../request";
import { GuaranteedResourceResponse } from "../../request/ResourceResponse";
import { assertNotUndefinedOrFail } from "../../utils/typeUtils";
import { Resource } from "../Resource";
import { User } from "./User";
import { UserDefinition } from "./UserDefinition";

export class UserResponse extends GuaranteedResourceResponse<UserDefinition & Resource> {
  constructor(
    resource: UserDefinition & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    user: User
  ) {
    super(resource, headers, statusCode);
    this.user = user;
  }
  /** A reference to the {@link User} corresponding to the returned {@link UserDefinition}. */
  public readonly user: User;
}

export function createUserResponse<T extends UserDefinition = any>(response: Response<T & Resource>, user: User): UserResponse {
  const resource: T & Resource = assertNotUndefinedOrFail(response.result);
  const headers: CosmosHeaders = assertNotUndefinedOrFail(response.headers);
  const code: number = assertNotUndefinedOrFail(response.code);
  return new UserResponse(resource, headers, code, user);
}