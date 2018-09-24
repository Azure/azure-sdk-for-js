import { CosmosResponse } from "../../request";
import { Resource } from "../Resource";
import { UserDefinedFunction } from "./UserDefinedFunction";
import { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition";

export interface UserDefinedFunctionResponse
  extends CosmosResponse<UserDefinedFunctionDefinition & Resource, UserDefinedFunction> {
  /** A reference to the {@link UserDefinedFunction} corresponding to the returned {@link UserDefinedFunctionDefinition}. */
  userDefinedFunction: UserDefinedFunction;
  /**
   * Alias for `userDefinedFunction(id).
   *
   * A reference to the {@link UserDefinedFunction} corresponding to the returned {@link UserDefinedFunctionDefinition}.
   */
  udf: UserDefinedFunction;
}
