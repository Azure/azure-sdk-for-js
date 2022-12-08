// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosHeaders } from "../../queryExecutionContext";
import { GuaranteedResourceResponse} from "../../request";
import { MaterializedResponse } from "../../request/Response";
import { Resource } from "../Resource";
import { ContainerDefinition, ContainerDefinitionResponse } from "./ContainerDefinition";
import { Container } from "./index";

/** Response object for Container operations */
export class ContainerResponse extends GuaranteedResourceResponse<ContainerDefinitionResponse & Resource> {
  constructor(
    resource: ContainerDefinitionResponse & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    container: Container
  ) {
    super(resource, headers, statusCode);
    this.container = container;
  }
  /** A reference to the {@link Container} that the returned {@link ContainerDefinition} corresponds to. */
  public readonly container: Container;
}

export function createContainerResponse<T extends ContainerDefinition = any>(response: MaterializedResponse<T & Resource>, container: Container): ContainerResponse {
  const resource = response.result;
  if (resource.id !== undefined && resource.partitionKey !== undefined) {
    const checkedResource: ContainerDefinitionResponse & Resource = {
      ...resource,
      partitionKey: resource.partitionKey,
    }
    return new ContainerResponse(
      checkedResource,
      response.headers,
      response.code,
      container
    );
  }
  throw new Error("Necessary properties of ContainerDefinition missing.");
}