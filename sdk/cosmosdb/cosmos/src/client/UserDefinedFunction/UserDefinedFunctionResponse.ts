// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request";
import { Resource } from "../Resource";
import { UserDefinedFunction } from "./UserDefinedFunction";
import { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition";

export class UserDefinedFunctionResponse extends ResourceResponse<
  UserDefinedFunctionDefinition & Resource
> {
  constructor(
    resource: UserDefinedFunctionDefinition & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    udf: UserDefinedFunction
  ) {
    super(resource, headers, statusCode);
    this.userDefinedFunction = udf;
  }
  /** A reference to the {@link UserDefinedFunction} corresponding to the returned {@link UserDefinedFunctionDefinition}. */
  public readonly userDefinedFunction: UserDefinedFunction;
  /**
   * Alias for `userDefinedFunction(id).
   *
   * A reference to the {@link UserDefinedFunction} corresponding to the returned {@link UserDefinedFunctionDefinition}.
   */
  public get udf(): UserDefinedFunction {
    return this.userDefinedFunction;
  }
}
