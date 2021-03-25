// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineRequest,
  PipelineResponse,
  HttpClient,
  SendRequest,
  ProxySettings
} from "./interfaces";
import { LogPolicyOptions, logPolicy } from "./policies/logPolicy";
import { UserAgentPolicyOptions, userAgentPolicy } from "./policies/userAgentPolicy";
import { RedirectPolicyOptions, redirectPolicy } from "./policies/redirectPolicy";
import {
  ExponentialRetryPolicyOptions,
  exponentialRetryPolicy
} from "./policies/exponentialRetryPolicy";
import { tracingPolicy } from "./policies/tracingPolicy";
import { setClientRequestIdPolicy } from "./policies/setClientRequestIdPolicy";
import { throttlingRetryPolicy } from "./policies/throttlingRetryPolicy";
import { systemErrorRetryPolicy } from "./policies/systemErrorRetryPolicy";
import { decompressResponsePolicy } from "./policies/decompressResponsePolicy";
import { proxyPolicy } from "./policies/proxyPolicy";
import { isNode } from "./util/helpers";
import { formDataPolicy } from "./policies/formDataPolicy";

/**
 * Policies are executed in phases.
 * The execution order is:
 * 1. Serialize Phase
 * 2. Policies not in a phase
 * 3. Deserialize Phase
 * 4. Retry Phase
 */
export type PipelinePhase = "Deserialize" | "Serialize" | "Retry";

const ValidPhaseNames = new Set<PipelinePhase>(["Deserialize", "Serialize", "Retry"]);

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
   * @param request - The request being performed.
   * @param next - The next policy in the pipeline. Must be called to continue the pipeline.
   */
  sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse>;
}

/**
 * Represents a pipeline for making a HTTP request to a URL.
 * Pipelines can have multiple policies to manage manipulating each request
 * before and after it is made to the server.
 */
export interface Pipeline {
  /**
   * Add a new policy to the pipeline.
   * @param policy - A policy that manipulates a request.
   * @param options - A set of options for when the policy should run.
   */
  addPolicy(policy: PipelinePolicy, options?: AddPolicyOptions): void;
  /**
   * Remove a policy from the pipeline.
   * @param options - Options that let you specify which policies to remove.
   */
  removePolicy(options: { name?: string; phase?: PipelinePhase }): PipelinePolicy[];
  /**
   * Uses the pipeline to make a HTTP request.
   * @param httpClient - The HttpClient that actually performs the request.
   * @param request - The request to be made.
   */
  sendRequest(httpClient: HttpClient, request: PipelineRequest): Promise<PipelineResponse>;
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
class HttpPipeline implements Pipeline {
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
      throw new Error(`Invalid afterPhase name: ${options.afterPhase}`);
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

  public sendRequest(httpClient: HttpClient, request: PipelineRequest): Promise<PipelineResponse> {
    const policies = this.getOrderedPolicies();

    const pipeline = policies.reduceRight<SendRequest>(
      (next, policy) => {
        return (req: PipelineRequest) => {
          return policy.sendRequest(req, next);
        };
      },
      (req: PipelineRequest) => httpClient.sendRequest(req)
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
    return new HttpPipeline(this._policies);
  }

  public static create(): Pipeline {
    return new HttpPipeline();
  }

  private orderPolicies(): PipelinePolicy[] {
    /**
     * The goal of this method is to reliably order pipeline policies
     * based on their declared requirements when they were added.
     *
     * Order is first determined by phase:
     *
     * 1. Serialize Phase
     * 2. Policies not in a phase
     * 3. Deserialize Phase
     * 4. Retry Phase
     *
     * Within each phase, policies are executed in the order
     * they were added unless they were specified to execute
     * before/after other policies or after a particular phase.
     *
     * To determine the final order, we will walk the policy list
     * in phase order multiple times until all dependencies are
     * satisfied.
     *
     * `afterPolicies` are the set of policies that must be
     * executed before a given policy. This requirement is
     * considered satisfied when each of the listed policies
     * have been scheduled.
     *
     * `beforePolicies` are the set of policies that must be
     * executed after a given policy. Since this dependency
     * can be expressed by converting it into a equivalent
     * `afterPolicies` declarations, they are normalized
     * into that form for simplicity.
     *
     * An `afterPhase` dependency is considered satisfied when all
     * policies in that phase have scheduled.
     *
     */
    const result: PipelinePolicy[] = [];

    // Track all policies we know about.
    const policyMap: Map<string, PolicyGraphNode> = new Map<string, PolicyGraphNode>();

    // Track policies for each phase.
    const serializePhase = new Set<PolicyGraphNode>();
    const noPhase = new Set<PolicyGraphNode>();
    const deserializePhase = new Set<PolicyGraphNode>();
    const retryPhase = new Set<PolicyGraphNode>();

    // a list of phases in order
    const orderedPhases = [serializePhase, noPhase, deserializePhase, retryPhase];

    // Small helper function to map phase name to each Set bucket.
    function getPhase(phase: PipelinePhase | undefined): Set<PolicyGraphNode> {
      if (phase === "Retry") {
        return retryPhase;
      } else if (phase === "Serialize") {
        return serializePhase;
      } else if (phase === "Deserialize") {
        return deserializePhase;
      } else {
        return noPhase;
      }
    }

    // First walk each policy and create a node to track metadata.
    for (const descriptor of this._policies) {
      const policy = descriptor.policy;
      const options = descriptor.options;
      const policyName = policy.name;
      if (policyMap.has(policyName)) {
        throw new Error("Duplicate policy names not allowed in pipeline");
      }
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

    // Now that each policy has a node, connect dependency references.
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
            // Linking in both directions helps later
            // when we want to notify dependants.
            node.dependsOn.add(afterNode);
            afterNode.dependants.add(node);
          }
        }
      }
      if (options.beforePolicies) {
        for (const beforePolicyName of options.beforePolicies) {
          const beforeNode = policyMap.get(beforePolicyName);
          if (beforeNode) {
            // To execute before another node, make it
            // depend on the current node.
            beforeNode.dependsOn.add(node);
            node.dependants.add(beforeNode);
          }
        }
      }
    }

    function walkPhase(phase: Set<PolicyGraphNode>): void {
      // Sets iterate in insertion order
      for (const node of phase) {
        if (node.afterPhase && node.afterPhase.size) {
          // If this node is waiting on a phase to complete,
          // we need to skip it for now.
          continue;
        }
        if (node.dependsOn.size === 0) {
          // If there's nothing else we're waiting for, we can
          // add this policy to the result list.
          result.push(node.policy);
          // Notify anything that depends on this policy that
          // the policy has been scheduled.
          for (const dependant of node.dependants) {
            dependant.dependsOn.delete(node);
          }
          policyMap.delete(node.policy.name);
          phase.delete(node);
        }
      }
    }

    function walkPhases(): void {
      let noPhaseRan = false;

      for (const phase of orderedPhases) {
        walkPhase(phase);
        if (phase === noPhase) {
          noPhaseRan = true;
        }
        // if the phase isn't complete
        if (phase.size > 0 && phase !== noPhase) {
          if (noPhaseRan === false) {
            // Try running noPhase to see if that unblocks this phase next tick.
            // This can happen if a phase that happens before noPhase
            // is waiting on a noPhase policy to complete.
            walkPhase(noPhase);
          }
          // Don't proceed to the next phase until this phase finishes.
          return;
        }
      }
    }

    // Iterate until we've put every node in the result list.
    while (policyMap.size > 0) {
      const initialResultLength = result.length;
      // Keep walking each phase in order until we can order every node.
      walkPhases();
      // The result list *should* get at least one larger each time.
      // Otherwise, we're going to loop forever.
      if (result.length <= initialResultLength) {
        throw new Error("Cannot satisfy policy dependencies due to requirements cycle.");
      }
    }

    return result;
  }
}

/**
 * Creates a totally empty pipeline.
 * Useful for testing or creating a custom one.
 */
export function createEmptyPipeline(): Pipeline {
  return HttpPipeline.create();
}

/**
 * Defines options that are used to configure the HTTP pipeline for
 * an SDK client.
 */
export interface PipelineOptions {
  /**
   * Options that control how to retry failed requests.
   */
  retryOptions?: ExponentialRetryPolicyOptions;

  /**
   * Options to configure a proxy for outgoing requests.
   */
  proxyOptions?: ProxySettings;

  /**
   * Options for how redirect responses are handled.
   */
  redirectOptions?: RedirectPolicyOptions;

  /**
   * Options for adding user agent details to outgoing requests.
   */
  userAgentOptions?: UserAgentPolicyOptions;
}

/**
 * Defines options that are used to configure internal options of
 * the HTTP pipeline for an SDK client.
 */
export interface InternalPipelineOptions extends PipelineOptions {
  /**
   * Options to configure request/response logging.
   */
  loggingOptions?: LogPolicyOptions;
}

/**
 * Create a new pipeline with a default set of customizable policies.
 * @param options - Options to configure a custom pipeline.
 */
export function createPipelineFromOptions(options: InternalPipelineOptions): Pipeline {
  const pipeline = HttpPipeline.create();

  if (isNode) {
    pipeline.addPolicy(proxyPolicy(options.proxyOptions));
    pipeline.addPolicy(decompressResponsePolicy());
  }

  pipeline.addPolicy(formDataPolicy());
  pipeline.addPolicy(tracingPolicy(options.userAgentOptions));
  pipeline.addPolicy(userAgentPolicy(options.userAgentOptions));
  pipeline.addPolicy(setClientRequestIdPolicy());
  pipeline.addPolicy(throttlingRetryPolicy(), { phase: "Retry" });
  pipeline.addPolicy(systemErrorRetryPolicy(options.retryOptions), { phase: "Retry" });
  pipeline.addPolicy(exponentialRetryPolicy(options.retryOptions), { phase: "Retry" });
  pipeline.addPolicy(redirectPolicy(options.redirectOptions), { afterPhase: "Retry" });
  pipeline.addPolicy(logPolicy(options.loggingOptions), { afterPhase: "Retry" });

  return pipeline;
}
