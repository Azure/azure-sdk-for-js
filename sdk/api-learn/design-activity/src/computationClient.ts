// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />
import {
  PipelineOptions,
  TokenCredential,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  InternalPipelineOptions
} from "@azure/core-http";
import { logger } from "./logger";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  ComputeNodeUnion,
  GeneratedClient,
  LinuxComputeNode,
  OperationStatus,
  PageOfComputeNodes,
  WindowsComputeNode
} from "./generated";
import { CancelOnProgress, PollerLike, PollOperationState } from "@azure/core-lro";
import { SDK_VERSION } from "./constants";

export interface ComputationClientOptions extends PipelineOptions {
  // any custom options go here.
}

export type ComputeNode = LinuxComputeNode | WindowsComputeNode;

export type PiResult = number;

export class ComputationClient {
  private generatedClient: GeneratedClient;

  constructor(
    // These have a leading underscore to prevent TS from telling us
    // they are not used anywhere.
    endpointUrl: string,
    credential: TokenCredential,
    options: ComputationClientOptions
  ) {
    // The below code helps us set a proper User-Agent header on all requests
    const libInfo = `azsdk-js-api-learn-implementationtutorial/${SDK_VERSION}`;
    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }
    if (options.userAgentOptions.userAgentPrefix) {
      options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      options.userAgentOptions.userAgentPrefix = libInfo;
    }

    // The AAD scope for an API is usually the baseUri + "/.default", but it may
    // be different for your service.
    const authPolicy = bearerTokenAuthenticationPolicy(credential, `${endpointUrl}/.default`);

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      deserializationOptions: {
        expectedContentTypes: {
          // This helps the protocol layer decode the MIME types
          // send by the service correctly.
          json: [
            "application/vnd.microsoft.appconfig.kvset+json",
            "application/vnd.microsoft.appconfig.kv+json",
            "application/vnd.microsoft.appconfig.kvs+json",
            "application/vnd.microsoft.appconfig.keyset+json",
            "application/vnd.microsoft.appconfig.revs+json"
          ]
        }
      },
      ...{
        loggingOptions: {
          logger: logger.info,
          // This array contains header names we want to log that are not already
          // included as safe. Unknown/unsafe headers are logged as "<REDACTED>".
          allowedHeaderNames: ["x-ms-correlation-request-id"]
        }
      }
    };
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.generatedClient = new GeneratedClient(endpointUrl, pipeline);
  }

  public listComputeNodes(): PagedAsyncIterableIterator<ComputeNode, PageOfComputeNodes> {
    throw new Error("Not yet implemented.");
  }

  public async listComputeNodeAsync(): Promise<
    PagedAsyncIterableIterator<ComputeNode, PageOfComputeNodes>
  > {
    throw new Error('Underlying api only returns a page, how to access the other pages?');
  }

  public getComputeNode(nodeName: string): ComputeNode {
    console.log(nodeName);
    throw new Error("Not yet implemented.");
  }

  public async getComputeNodeAsync(nodeName: string): Promise<ComputeNode> {
    const response = await this.generatedClient.computeNodeAdministration.get(nodeName);
    const rawComputeNode = response._response.parsedBody;
    return this.rawComputeNodeToComputeNodeImpl(rawComputeNode);
  }

  public createComputeNode(node: ComputeNode): ComputeNode {
    console.log(node);
    throw new Error("Not yet implemented.");
  }

  public async createComputeNodeAsync(node: ComputeNode): Promise<ComputeNode> {
    if (!node.name) { throw new Error('Node name cannot be undefined'); }
    const response = await this.generatedClient.computeNodeAdministration.create(node.name, { computeNode: node });
    const rawComputeNode = response._response.parsedBody;
    return this.rawComputeNodeToComputeNodeImpl(rawComputeNode);

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
    if (!node.name) { throw new Error('Undefined node name') };
    const response = await this.generatedClient.computations.computePi(node.name, { precision: precision });
    // This will point to an operation(/operations/{ operationId }) that can be used to monitor the progress
    const operationLocation = response.operationLocation;
    if (!operationLocation) { throw new Error('Operation location is undefined') };
    let pollInterval: NodeJS.Timer;
    const thisScope = this;
    let operationStatus: OperationStatus | undefined;
    const poller = {
      poll(): Promise<void> {
        pollInterval = setInterval(async function () {
          const response = await thisScope.generatedClient.computation(operationLocation);
          operationStatus = response.status;
          if (operationStatus === 'succeeded' || operationStatus === 'cancelled' || operationStatus === 'failed') {
            clearInterval(pollInterval);
          }
        }, 5000);
        throw new Error('Not implemented yet');
      },
      pollUntilDone(): Promise<PiResult> {
        throw new Error('Not implemented yet');
      },
      onProgress(callBack: (state: PollOperationState<PiResult>) => void): CancelOnProgress {
        throw new Error('Not implemented yet');
      },
      isDone(): boolean {
        return (operationStatus === 'succeeded' || operationStatus === 'cancelled' || operationStatus === 'failed');
      },
      stopPolling(): void {
        clearInterval(pollInterval);
        operationStatus = 'cancelled';
      },
      isStopped(): boolean {
        return operationStatus === 'cancelled';
      },
      cancelOperation(): Promise<void> {
        throw new Error('Not implemented yet');
      },
      getOperationState(): PollOperationState<number> {
        if (!operationStatus) { throw new Error(); }
        const status = parseFloat(operationStatus);
        if (typeof status === 'number') {
          return { result: status };
        } else {
          return {
            isStarted: operationStatus === 'running' ? true : false,
            isCompleted: (operationStatus === 'succeeded' || operationStatus === 'cancelled' || operationStatus === 'failed') ? true : false,
            isCancelled: operationStatus === 'cancelled' ? true : false,
            error: operationStatus === 'failed' ? new Error() : undefined,
            result: typeof status === 'number' ? status : undefined // Not sure if this is the right way to get the actual pi result. I dont really see a way of getting it other than this?
          }
        }
      },
      getResult(): PiResult {
        if (!operationStatus) { throw new Error(); }
        const status = parseFloat(operationStatus);
        if (typeof status === 'number') {
          return status; // Not sure if this is the right way to get the actual pi result. I dont really see a way of getting it other than this?
        } else {
          throw new Error('Result not ready yet');
        }
      }
    }
    return poller;
  }

  private rawComputeNodeToComputeNodeImpl(rawComputeNode: ComputeNodeUnion) {
    if (rawComputeNode.kind === 'WindowsComputeNode') {
      return {
        kind: rawComputeNode.kind,
        eTag: rawComputeNode.eTag,
        name: rawComputeNode.name,
        userName: (rawComputeNode as WindowsComputeNode).userName
      }
    } else if (rawComputeNode.kind === 'LinuxComputeNode') {
      return {
        kind: rawComputeNode.kind,
        eTag: rawComputeNode.eTag,
        name: rawComputeNode.name,
        userName: (rawComputeNode as LinuxComputeNode).sshPublicKey
      }
    } else {
      throw new Error('Unknown compute node');
    }
  }
}
