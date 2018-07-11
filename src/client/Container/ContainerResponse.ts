import { Container } from ".";
import { CosmosResponse } from "../../request/CosmosResponse";
import { ContainerDefinition } from "./ContainerDefinition";

export interface ContainerResponse extends CosmosResponse<ContainerDefinition, Container> {
    container: Container;
}
