// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineRequest,
  PipelineResponse,
  HttpsClient,
  SendRequest,
  ProxySettings
} from "./interfaces";
import { LogPolicyOptions, logPolicy } from "./policies/logPolicy";
import { UserAgentPolicyOptions, userAgentPolicy } from "./policies/userAgentPolicy";
import { RedirectPolicyOptions, redirectPolicy } from "./policies/redirectPolicy";
import { KeepAlivePolicyOptions, keepAlivePolicy } from "./policies/keepAlivePolicy";
import {
  ExponentialRetryPolicyOptions,
  exponentialRetryPolicy
} from "./policies/exponentialRetryPolicy";
import { tracingPolicy } from "./policies/tracingPolicy";
import { setClientRequestIdPolicy } from "./policies/setClientRequestIdPolicy";
import { throttlingRetryPolicy } from "./policies/throttlingRetryPolicy";
import { systemErrorRetryPolicy } from "./policies/systemErrorRetryPolicy";
import { disableResponseDecompressionPolicy } from "./policies/disableResponseDecompressionPolicy";
import { proxyPolicy } from "./policies/proxyPolicy";
import { isNode } from "./util/helpers";
import { formDataPolicy } from "./policies/formDataPolicy";

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
class HttpsPipeline implements Pipeline {
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
    /**
     * The goal of this method is to reliably order pipeline policies
     * based on their declared requirements when they were added.
     *
     * Order is first determined by phase:
     *
     * 1. Policies not in a phase
     * 2. Serialize
     * 3. Retry
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
    const noPhase = new Set<PolicyGraphNode>();
    const serializePhase = new Set<PolicyGraphNode>();
    const retryPhase = new Set<PolicyGraphNode>();

    // Small helper function to map phase name to each Set bucket.
    function getPhase(phase: PipelinePhase | undefined): Set<PolicyGraphNode> {
      if (phase === "Retry") {
        return retryPhase;
      } else if (phase === "Serialize") {
        return serializePhase;
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

    // Iterate until we've put every node in the result list.
    while (policyMap.size > 0) {
      const initialResultLength = result.length;
      // Keep walking each phase in order until we can order every node.
      walkPhase(noPhase);
      walkPhase(serializePhase);
      walkPhase(retryPhase);
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
  return HttpsPipeline.create();
}

/**
 * Options that allow configuring redirect behavior.
 */
export interface PipelineRedirectOptions extends RedirectPolicyOptions {
  /**
   * If true, disables automatic following of redirects.
   */
  disable?: boolean;
}

/**
 * Defines options that are used to configure the HTTP pipeline for
 * an SDK client.
 */
export interface PipelineOptions {
  /**
   * The HttpsClient implementation to use for outgoing HTTP requests.
   * Defaults to DefaultHttpsClient.
   */
  httpsClient?: HttpsClient;

  /**
   * Options that control how to retry failed requests.
   */
  retryOptions?: ExponentialRetryPolicyOptions;

  /**
   * Options to configure a proxy for outgoing requests.
   */
  proxyOptions?: ProxySettings;

  /**
   * Options for how HTTP connections should be maintained for future
   * requests.
   */
  keepAliveOptions?: KeepAlivePolicyOptions;

  /**
   * Options for how redirect responses are handled.
   */
  redirectOptions?: PipelineRedirectOptions;

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

  /**
   * Configure whether to decompress response according to Accept-Encoding header (node-fetch only)
   */
  decompressResponse?: boolean;
}

/**
 * Create a new pipeline with a default set of customizable policies.
 * @param options Options to configure a custom pipeline.
 */
export function createPipelineFromOptions(options: InternalPipelineOptions): Pipeline {
  const pipeline = HttpsPipeline.create();

  if (isNode) {
    pipeline.addPolicy(proxyPolicy(options.proxyOptions));

    if (options.decompressResponse === false) {
      pipeline.addPolicy(disableResponseDecompressionPolicy());
    }
  }

  pipeline.addPolicy(formDataPolicy());
  pipeline.addPolicy(tracingPolicy(options.userAgentOptions));
  pipeline.addPolicy(keepAlivePolicy(options.keepAliveOptions));
  pipeline.addPolicy(userAgentPolicy(options.userAgentOptions));
  pipeline.addPolicy(setClientRequestIdPolicy());
  pipeline.addPolicy(throttlingRetryPolicy(), { phase: "Retry" });
  pipeline.addPolicy(systemErrorRetryPolicy(options.retryOptions), { phase: "Retry" });
  pipeline.addPolicy(exponentialRetryPolicy(options.retryOptions), { phase: "Retry" });

  if (!options.redirectOptions?.disable) {
    pipeline.addPolicy(redirectPolicy(options.redirectOptions), { afterPhase: "Retry" });
  }

  pipeline.addPolicy(logPolicy(options.loggingOptions), { afterPhase: "Retry" });

  return pipeline;
}
