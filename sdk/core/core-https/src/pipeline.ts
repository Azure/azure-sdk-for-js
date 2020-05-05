// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest, PipelineResponse, HttpsClient, SendRequest } from "./interfaces";

export type PipelinePhase = "Serialize" | "Retry";

const ValidPhaseNames = new Set<PipelinePhase>(["Serialize", "Retry"]);

export interface AddPipelineOptions {
  beforePolicies?: string[];
  afterPolicies?: string[];
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
  afterPhase?: Set<PolicyGraphNode>;
}

export class HttpsPipeline implements Pipeline {
  private _policies: PipelineDescriptor[] = [];
  private _orderedPolicies?: PipelinePolicy[];

  private constructor(policies: PipelineDescriptor[] = []) {
    this._policies = policies;
    this._orderedPolicies = undefined;
  }

  public addPolicy(policy: PipelinePolicy, options: AddPipelineOptions = {}): void {
    if (options.phase && options.afterPhase) {
      throw new Error("Policies inside a phase cannot specify afterPhase.");
    }
    if (options.phase && !ValidPhaseNames.has(options.phase)) {
      throw new Error(`Invalid phase name: ${options.phase}`);
    }
    if (options.afterPhase && !ValidPhaseNames.has(options.afterPhase)) {
      throw new Error(`Invalid phase name: ${options.afterPhase}`);
    }
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
    const noPhase = new Set<PolicyGraphNode>();
    const serializePhase = new Set<PolicyGraphNode>();
    const retryPhase = new Set<PolicyGraphNode>();

    function getPhase(phase: PipelinePhase | undefined): Set<PolicyGraphNode> {
      if (phase === "Retry") {
        return retryPhase;
      } else if (phase === "Serialize") {
        return serializePhase;
      } else {
        return noPhase;
      }
    }

    for (const descriptor of this._policies) {
      const policy = descriptor.policy;
      const options = descriptor.options;
      const policyName = policy.name;
      if (policyMap.has(policyName)) {
        throw new Error("Duplicate policy names not allowed in pipeline");
      } else {
        const node: PolicyGraphNode = {
          policy,
          dependsOn: new Set<PolicyGraphNode>(),
          dependants: new Set<PolicyGraphNode>()
        };
        if (options.afterPhase) {
          node.afterPhase = getPhase(options.afterPhase);
        }
        policyMap.set(policyName, node);
        const phase = getPhase(options.phase);
        phase.add(node);
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

    function walkPhase(phase: Set<PolicyGraphNode>): void {
      for (const node of phase) {
        if (node.afterPhase && node.afterPhase.size) {
          continue;
        }
        if (node.dependsOn.size === 0) {
          result.push(node.policy);
          for (const dependant of node.dependants) {
            dependant.dependsOn.delete(node);
          }
          policyMap.delete(node.policy.name);
          phase.delete(node);
        }
      }
    }

    while (policyMap.size > 0) {
      const initialResultLength = result.length;
      walkPhase(noPhase);
      walkPhase(serializePhase);
      walkPhase(retryPhase);
      if (result.length <= initialResultLength) {
        throw new Error("Cannot satisfy policy dependencies due to requirements cycle.");
      }
    }

    return result;
  }
}
