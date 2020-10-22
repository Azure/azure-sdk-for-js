// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />
import { PipelineOptions, TokenCredential } from "@azure/core-http";
import { PagedAsyncIterableIterator } from "../../../core/core-paging";
import {
  GeneratedClient,
  LinuxComputeNode,
  PageOfComputeNodes,
  WindowsComputeNode
} from "./generated";
import { PollerLike } from "../../../core/core-lro/src/poller";
import { PollOperationState } from "../../../core/core-lro/src/pollOperation";

export interface ComputationClientOptions extends PipelineOptions {
  // any custom options go here.
}

export type ComputeNode = LinuxComputeNode | WindowsComputeNode;

export type PiResult = number;

export class ComputationClient {
  private generatedClient: GeneratedClient | undefined;

  constructor(connectionString: string, options?: ComputationClientOptions);
  constructor(
    // These have a leading underscore to prevent TS from telling us
    // they are not used anywhere.
    _endpointUrl: string,
    _credential: TokenCredential,
    _options: ComputationClientOptions
  );
  constructor() {
    console.log(this.generatedClient);
    throw new Error("Not yet implemented.");
  }

  public listComputeNodes(): PagedAsyncIterableIterator<ComputeNode, PageOfComputeNodes> {
    throw new Error("Not yet implemented.");
  }

  public async listComputeNodeAsync(): Promise<
    PagedAsyncIterableIterator<ComputeNode, PageOfComputeNodes>
  > {
    throw new Error("Not yet implemented.");
  }

  public getComputeNode(nodeName: string): ComputeNode {
    console.log(nodeName);
    throw new Error("Not yet implemented.");
  }

  public async getComputeNodeAsync(nodeName: string): Promise<ComputeNode> {
    console.log(nodeName);
    throw new Error("Not yet implemented.");
  }

  public createComputeNode(node: ComputeNode): ComputeNode {
    console.log(node);
    throw new Error("Not yet implemented.");
  }

  public async createComputeNodeAsync(node: ComputeNode): Promise<ComputeNode> {
    console.log(node);
    throw new Error("Not yet implemented.");
  }

  public beginComputePi(
    node: ComputeNode,
    precision: number
  ): PollerLike<PollOperationState<PiResult>, PiResult> {
    console.log(node);
    console.log(precision);
    throw new Error("Not yet implemented.");
  }

  public async beginComputePiAsync(
    node: ComputeNode,
    precision: number
  ): Promise<PollerLike<PollOperationState<PiResult>, PiResult>> {
    console.log(node);
    console.log(precision);
    throw new Error("Not yet implemented.");
  }
}
