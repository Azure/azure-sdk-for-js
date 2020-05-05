// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest, PipelineResponse, HttpsClient, SendRequest } from "./interfaces";

export type PipelinePhase = "Serialize" | "Retry";

export interface AddPipelineOptions {
  beforePolicies?: string[];
  afterPolicies?: string[];
  beforePhase?: PipelinePhase;
  afterPhase?: PipelinePhase;
  phase?: PipelinePhase;
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

interface PolicyGraphNode {
  policy: PipelinePolicy;
  dependsOn: Set<PolicyGraphNode>;
  dependants: Set<PolicyGraphNode>;
  phase: PipelinePhase | "Unassigned";
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
        (options.phase && policyDescriptor.options.phase === options.phase)
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

    const policyMap: Map<string, PolicyGraphNode> = new Map<string, PolicyGraphNode>();

    for (const descriptor of this._policies) {
      const policy = descriptor.policy;
      const policyName = policy.name;
      if (policyMap.has(policyName)) {
        throw new Error("Duplicate policy names not allowed in pipeline");
      } else {
        const node: PolicyGraphNode = {
          policy,
          dependsOn: new Set<PolicyGraphNode>(),
          dependants: new Set<PolicyGraphNode>(),
          phase: descriptor.options.phase ?? "Unassigned"
        };
        policyMap.set(policyName, node);
      }
    }

    for (const descriptor of this._policies) {
      const { policy, options } = descriptor;
      const policyName = policy.name;
      const node = policyMap.get(policyName);
      if (!node) {
        throw new Error(`Missing node for policy ${policyName}`);
      }

      if (options.afterPolicies) {
        for (const afterPolicyName of options.afterPolicies) {
          const afterNode = policyMap.get(afterPolicyName);
          if (afterNode) {
            node.dependsOn.add(afterNode);
            afterNode.dependants.add(node);
          }
        }
      }
      if (options.beforePolicies) {
        for (const beforePolicyName of options.beforePolicies) {
          const beforeNode = policyMap.get(beforePolicyName);
          if (beforeNode) {
            beforeNode.dependsOn.add(node);
            node.dependants.add(beforeNode);
          }
        }
      }
    }

    while (policyMap.size > 0) {
      const initialResultLength = result.length;
      for (const [name, node] of policyMap) {
        if (node.dependsOn.size === 0) {
          result.push(node.policy);
          for (const dependant of node.dependants) {
            dependant.dependsOn.delete(node);
          }
          policyMap.delete(name);
        }
      }
      if (result.length <= initialResultLength) {
        throw new Error("Cannot satisfy policy dependencies due to cycle.");
      }
    }

    return result;
  }
}
