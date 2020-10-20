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
  constructor(
    private readonly endpointUrl: string,
    private readonly credential: TokenCredential,
    options?: ComputationClientOptions
  ) {
    console.dir(options);
  }

  public getComputeNodeClient(nodeName: string): ComputeNodeClient {
    return new ComputeNodeClient(nodeName, this.endpointUrl, this.credential);
  }

  public async createComputeNode(
    nodeName: string,
    options?: CreateComputeNodeOptions
  ): Promise<ComputeNodeUnion> {
    const client = new GeneratedClient(this.endpointUrl, nodeName);
    return client.computeNodeAdministration.create(options);
  }

  public async getComputeNode(
    nodeName: string,
    options?: GetComputeNodeOptions
  ): Promise<ComputeNodeUnion> {
    const client = new GeneratedClient(this.endpointUrl, nodeName);
    return client.computeNodeAdministration.get(options);
  }

  public async listComputeNodes(
    options?: ListComputeNodesOptions
  ): Promise<PagedAsyncIterableIterator<ComputeNodeUnion>> {
    const client = new GeneratedClient(this.endpointUrl, "");
    return client.computeNodeAdministration.list(options) as any;
  }
}
