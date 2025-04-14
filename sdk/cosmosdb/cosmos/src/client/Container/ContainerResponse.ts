// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import type { CosmosHeaders } from "../../queryExecutionContext/index.js";
import { ResourceResponse } from "../../request/ResourceResponse.js";
import type { Resource } from "../Resource.js";
import type { ContainerDefinition } from "./ContainerDefinition.js";
import type { Container } from "./index.js";

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
