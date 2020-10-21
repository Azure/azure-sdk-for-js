// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { PipelineOptions, TokenCredential, OperationOptions } from "@azure/core-http";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ComputeNodeClient } from "./computeNodeClient";
import {
  GeneratedClient,
  ComputeNodeUnion,
  ComputeNode,
  LinuxComputeNode,
  WindowsComputeNode
} from "./generated";

export { ComputeNodeUnion, ComputeNode, LinuxComputeNode, WindowsComputeNode };
export * from "./computeNodeClient";

export interface ComputationClientOptions extends PipelineOptions {
  nodeName?: string;
}

export type CreateComputeNodeOptions = OperationOptions;
export type GetComputeNodeOptions = OperationOptions;
export type ListComputeNodesOptions = OperationOptions;

export class ComputationClient {
  private readonly client: GeneratedClient;

  constructor(
    private readonly endpointUrl: string,
    private readonly credential: TokenCredential,
    options?: ComputationClientOptions
  ) {
    this.client = new GeneratedClient(endpointUrl, options);
  }

  public getComputeNodeClient(nodeName: string): ComputeNodeClient {
    return new ComputeNodeClient(nodeName, this.endpointUrl, this.credential);
  }

  public async createComputeNode(
    nodeName: string,
    options?: CreateComputeNodeOptions
  ): Promise<ComputeNodeUnion> {
    return this.client.computeNodeAdministration.create(nodeName, options);
  }

  public async getComputeNode(
    nodeName: string,
    options?: GetComputeNodeOptions
  ): Promise<ComputeNodeUnion> {
    return this.client.computeNodeAdministration.get(nodeName, options);
  }

  public async listComputeNodes(
    options?: ListComputeNodesOptions
  ): Promise<PagedAsyncIterableIterator<ComputeNodeUnion>> {
    return this.client.computeNodeAdministration.list(options) as any;
  }
}
