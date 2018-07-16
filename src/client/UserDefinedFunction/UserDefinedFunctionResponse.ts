import { CosmosResponse } from "../../request";
import { UserDefinedFunction } from "./UserDefinedFunction";
import { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition";

export interface UserDefinedFunctionResponse
  extends CosmosResponse<UserDefinedFunctionDefinition, UserDefinedFunction> {
  userDefinedFunction: UserDefinedFunction;
  udf: UserDefinedFunction;
}
