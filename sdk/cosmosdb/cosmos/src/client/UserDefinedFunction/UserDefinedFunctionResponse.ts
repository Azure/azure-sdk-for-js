// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import type { CosmosHeaders } from "../../queryExecutionContext/index.js";
import { ResourceResponse } from "../../request/index.js";
import type { Resource } from "../Resource.js";
import type { UserDefinedFunction } from "./UserDefinedFunction.js";
import type { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition.js";

export class UserDefinedFunctionResponse extends ResourceResponse<
  UserDefinedFunctionDefinition & Resource
> {
  constructor(
    resource: UserDefinedFunctionDefinition & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    udf: UserDefinedFunction,
    diagnostics: CosmosDiagnostics,
  ) {
    super(resource, headers, statusCode, diagnostics);
    this.userDefinedFunction = udf;
  }
  /** A reference to the {@link UserDefinedFunction} corresponding to the returned {@link UserDefinedFunctionDefinition}. */
  public readonly userDefinedFunction: UserDefinedFunction;
  /**
   * Alias for `userDefinedFunction(id)`.
   *
   * A reference to the {@link UserDefinedFunction} corresponding to the returned {@link UserDefinedFunctionDefinition}.
   */
  public get udf(): UserDefinedFunction {
    return this.userDefinedFunction;
  }
}
