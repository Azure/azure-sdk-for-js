import { CosmosResponse } from "../../request";
import { User } from "./User";
import { UserDefinition } from "./UserDefinition";

export interface UserResponse extends CosmosResponse<UserDefinition, User> {
  user: User;
}
