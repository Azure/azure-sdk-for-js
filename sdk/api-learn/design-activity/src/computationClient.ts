// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { PipelineOptions, TokenCredential, OperationOptions, HttpResponse } from "@azure/core-http";
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
export type ReplaceComputeNodeOptions = OperationOptions & {
  onlyIfUnchanged?: boolean;
};

export type GetComputeNodeOptions = OperationOptions;
export type ListComputeNodesOptions = OperationOptions;

export type WithResponse<T> = T & { _response: HttpResponse };
export type CreateComputeNodeResponse = WithResponse<ComputeNode>;
export type ReplaceComputeNodeResponse = WithResponse<ComputeNode>;
export type GetComputeNodeResponse = WithResponse<ComputeNode>;

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
    kind: "Linux" | "Windows",
    options?: CreateComputeNodeOptions
  ): Promise<CreateComputeNodeResponse> {
    return this.client.computeNodeAdministration.create(nodeName, {
      ...options,
      computeNode: {
        kind:
          kind === "Linux"
            ? "LinuxComputeNode"
            : kind === "Windows"
            ? "WindowsComputeNode"
            : "LinuxComputeNode"
      }
    });
  }

  public async replaceComputeNode(
    nodeName: string,
    computeNode: ComputeNodeUnion,
    options?: ReplaceComputeNodeOptions
  ): Promise<ReplaceComputeNodeResponse> {
    return this.client.computeNodeAdministration.create(nodeName, {
      ...options,
      ifMatch: options?.onlyIfUnchanged ? computeNode.eTag : undefined,
      computeNode
    });
  }

  public async getComputeNode(
    nodeName: string,
    options?: GetComputeNodeOptions
  ): Promise<GetComputeNodeResponse> {
    return this.client.computeNodeAdministration.get(nodeName, options);
  }

  public async listComputeNodes(
    options?: ListComputeNodesOptions
  ): Promise<PagedAsyncIterableIterator<ComputeNodeUnion, WithResponse<ComputeNodeUnion>>> {
    return this.client.computeNodeAdministration.list(options) as any;
  }
}
