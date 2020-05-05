// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO: use type import when TS 3.8 lands.
import { PipelineRequest, PipelineResponse, HttpsClient, SendRequest } from "./interfaces";

/**
 * Policies are executed in phases.
 * The execution order is:
 * 1. Policies not in a phase
 * 2. Serialize Phase
 * 3. Retry Phase
 */
export type PipelinePhase = "Serialize" | "Retry";

const ValidPhaseNames = new Set<PipelinePhase>(["Serialize", "Retry"]);

/**
 * Options when adding a policy to the pipeline.
 * Used to express dependencies on other policies.
 */
export interface AddPolicyOptions {
  /**
   * Policies that this policy must come before.
   */
  beforePolicies?: string[];
  /**
   * Policies that this policy must come after.
   */
  afterPolicies?: string[];
  /**
   * The phase that this policy must come after.
   * By default, policies without a phase occur first.
   */
  afterPhase?: PipelinePhase;
  /**
   * The phase this policy belongs to.
   */
  phase?: PipelinePhase;
}

/**
 * A pipeline policy manipulates a request as it travels through the pipeline.
 * It is conceptually a middleware that is allowed to modify the request before
 * it is made as well as the response when it is received.
 */
export interface PipelinePolicy {
  /**
   * The policy name. Must be a unique string in the pipeline.
   */
  name: string;
  /**
   * The main method to implement that manipulates a request/response.
   * @param request The request being performed.
   * @param next The next policy in the pipeline. Must be called to continue the pipeline.
   */
  sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse>;
}

/**
 * Represents a pipeline for making a HTTPS request to a URL.
 * Pipelines can have multiple policies to manage manipulating each request
 * before and after it is made to the server.
 */
export interface Pipeline {
  /**
   * Add a new policy to the pipeline.
   * @param policy A policy that manipulates a request.
   * @param options A set of options for when the policy should run.
   */
  addPolicy(policy: PipelinePolicy, options?: AddPolicyOptions): void;
  /**
   * Remove a policy from the pipeline.
   * @param options Options that let you specify which policies to remove.
   */
  removePolicy(options: { name?: string; phase?: PipelinePhase }): PipelinePolicy[];
  /**
   * Uses the pipeline to make a HTTPS request.
   * @param httpsClient The HttpsClient that actually performs the request.
   * @param request The request to be made.
   */
  sendRequest(httpsClient: HttpsClient, request: PipelineRequest): Promise<PipelineResponse>;
  /**
   * Returns the current set of policies in the pipeline in the order in which
   * they will be applied to the request. Later in the list is closer to when
   * the request is performed.
   */
  getOrderedPolicies(): PipelinePolicy[];
  /**
   * Duplicates this pipeline to allow for modifying an existing one without mutating it.
   */
  clone(): Pipeline;
}

interface PipelineDescriptor {
  policy: PipelinePolicy;
  options: AddPolicyOptions;
}

interface PolicyGraphNode {
  policy: PipelinePolicy;
  dependsOn: Set<PolicyGraphNode>;
  dependants: Set<PolicyGraphNode>;
  afterPhase?: Set<PolicyGraphNode>;
}

/**
 * A private implementation of Pipeline.
 * Do not export this class from the package.
 * @internal
 */
export class HttpsPipeline implements Pipeline {
  private _policies: PipelineDescriptor[] = [];
  private _orderedPolicies?: PipelinePolicy[];

  private constructor(policies: PipelineDescriptor[] = []) {
    this._policies = policies;
    this._orderedPolicies = undefined;
  }

  public addPolicy(policy: PipelinePolicy, options: AddPolicyOptions = {}): void {
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

  public sendRequest(
    httpsClient: HttpsClient,
    request: PipelineRequest
  ): Promise<PipelineResponse> {
    const policies = this.getOrderedPolicies();

    const pipeline = policies.reduceRight<SendRequest>(
      (next, policy) => {
        return (request: PipelineRequest) => {
          return policy.sendRequest(request, next);
        };
      },
      (request: PipelineRequest) => httpsClient.sendRequest(request)
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
