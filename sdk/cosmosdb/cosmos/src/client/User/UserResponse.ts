import { CosmosResponse } from "../../request";
import { Resource } from "../Resource";
import { User } from "./User";
import { UserDefinition } from "./UserDefinition";

export interface UserResponse extends CosmosResponse<UserDefinition & Resource, User> {
  /** A reference to the {@link User} corresponding to the returned {@link UserDefinition}. */
  user: User;
}
