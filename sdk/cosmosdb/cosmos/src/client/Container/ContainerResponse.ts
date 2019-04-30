import { Container } from ".";
import { CosmosResponse } from "../../request/CosmosResponse";
import { Resource } from "../Resource";
import { ContainerDefinition } from "./ContainerDefinition";

/** Response object for Container operations */
export interface ContainerResponse extends CosmosResponse<ContainerDefinition & Resource, Container> {
  /** A reference to the {@link Container} that the returned {@link ContainerDefinition} corresponds to. */
  container: Container;
}
