// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosHeaders } from "../../queryExecutionContext";
import { Response } from "../../request";
import { ResourceResponse } from "../../request/ResourceResponse";
import { assertNotUndefinedOrFail } from "../../utils/typeUtils";
import { Resource } from "../Resource";
import { ContainerDefinition } from "./ContainerDefinition";
import { Container } from "./index";

/** Response object for Container operations */
export class ContainerResponse extends ResourceResponse<ContainerDefinition & Resource> {
  constructor(
    resource: ContainerDefinition & Resource,
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

export function createContainerResponse<T extends ContainerDefinition = any>(response: Response<T & Resource>, container: Container): ContainerResponse {
  const resource: T & Resource = assertNotUndefinedOrFail(response.result);
  const headers: CosmosHeaders = assertNotUndefinedOrFail(response.headers);
  const code: number = assertNotUndefinedOrFail(response.code);
  return new ContainerResponse(
    resource,
    headers,
    code,
    container
  );
}