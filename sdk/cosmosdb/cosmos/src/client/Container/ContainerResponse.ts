// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { CosmosDiagnostics } from "../../CosmosDiagnostics";
import type { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request/ResourceResponse";
import type { Resource } from "../Resource";
import type { ContainerDefinition } from "./ContainerDefinition";
import type { Container } from "./index";

/** Response object for Container operations */
export class ContainerResponse extends ResourceResponse<ContainerDefinition & Resource> {
  constructor(
    resource: ContainerDefinition & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    container: Container,
    diagnostics: CosmosDiagnostics,
  ) {
    super(resource, headers, statusCode, diagnostics);
    this.container = container;
  }
  /** A reference to the {@link Container} that the returned {@link ContainerDefinition} corresponds to. */
  public readonly container: Container;
}
