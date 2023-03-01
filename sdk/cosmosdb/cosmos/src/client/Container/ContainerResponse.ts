// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosHeaders } from "../../queryExecutionContext";
import { CosmosDiagnostics } from "../../request/CosmosDiagnostics";
import { ResourceResponse } from "../../request/ResourceResponse";
import { Resource } from "../Resource";
import { ContainerDefinition } from "./ContainerDefinition";
import { Container } from "./index";

/** Response object for Container operations */
export class ContainerResponse extends ResourceResponse<ContainerDefinition & Resource> {
  constructor(
    resource: ContainerDefinition & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    diagnostics: CosmosDiagnostics,
    container: Container
  ) {
    super(resource, headers, statusCode, diagnostics);
    this.container = container;
  }
  /** A reference to the {@link Container} that the returned {@link ContainerDefinition} corresponds to. */
  public readonly container: Container;
}
