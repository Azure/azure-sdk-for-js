import { Container } from ".";
import { CosmosResponse } from "../../request/CosmosResponse";
import { ContainerDefinition } from "./ContainerDefinition";

/** Response object for Container operations */
export interface ContainerResponse extends CosmosResponse<ContainerDefinition, Container> {
  /** A reference to the {@link Container} that the returned {@link ContainerDefinition} corresponds to. */
  container: Container;
}
