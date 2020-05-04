// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest, PipelineResponse, HttpsClient, SendRequest } from "./interfaces";

export type PipelinePhase = "Serialize" | "Retry";

export interface AddPipelineOptions {
  beforePolicies?: string[];
  afterPolicies?: string[];
  beforePhases?: PipelinePhase[];
  afterPhases?: PipelinePhase[];
  duringPhase?: PipelinePhase;
}

export interface PipelinePolicy {
  name: string;
  sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse>;
}

export interface Pipeline {
  addPolicy(policy: PipelinePolicy, options?: AddPipelineOptions): void;
  removePolicy(options: { name?: string; phase?: PipelinePhase }): PipelinePolicy[];
  sendRequest(httpClient: HttpsClient, request: PipelineRequest): Promise<PipelineResponse>;
  getOrderedPolicies(): PipelinePolicy[];
  clone(): Pipeline;
}

interface PipelineDescriptor {
  policy: PipelinePolicy;
  options: AddPipelineOptions;
}

export class HttpsPipeline implements Pipeline {
  private _policies: PipelineDescriptor[] = [];
  private _orderedPolicies?: PipelinePolicy[];

  private constructor(policies: PipelineDescriptor[] = []) {
    this._policies = policies;
    this._orderedPolicies = undefined;
  }

  public addPolicy(policy: PipelinePolicy, options: AddPipelineOptions = {}): void {
    this._policies.push({
      policy,
      options
    });
    this._orderedPolicies = undefined;
  }
  public removePolicy(options: { name?: string; phase?: string }): PipelinePolicy[] {
    const removedPolicies: PipelinePolicy[] = [];

    this._policies = this._policies.filter((policyDescriptor) => {
      if (
        (options.name && policyDescriptor.policy.name === options.name) ||
        (options.phase && policyDescriptor.options.duringPhase === options.phase)
      ) {
        removedPolicies.push(policyDescriptor.policy);
        return false;
      } else {
        return true;
      }
    });
    this._orderedPolicies = undefined;

    return removedPolicies;
  }
  public sendRequest(httpClient: HttpsClient, request: PipelineRequest): Promise<PipelineResponse> {
    const policies = this.getOrderedPolicies();

    const pipeline = policies.reduceRight<SendRequest>(
      (next, policy) => {
        return (request: PipelineRequest) => {
          return policy.sendRequest(request, next);
        };
      },
      (request: PipelineRequest) => httpClient.sendRequest(request)
    );

    return pipeline(request);
  }

  public getOrderedPolicies(): PipelinePolicy[] {
    if (!this._orderedPolicies) {
      this._orderedPolicies = this.orderPolicies();
    }
    return this._orderedPolicies;
  }

  public clone(): Pipeline {
    return new HttpsPipeline(this._policies);
  }

  public static create(): Pipeline {
    return new HttpsPipeline();
  }

  private orderPolicies(): PipelinePolicy[] {
    const result: PipelinePolicy[] = [];

    for (const descriptor of this._policies) {
      result.push(descriptor.policy);
    }

    return result;
  }
}
