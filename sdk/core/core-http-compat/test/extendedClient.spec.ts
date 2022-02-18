// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { PipelinePolicy } from "@azure/core-rest-pipeline";
import { ExtendedServiceClient, disbaleKeepAlivePolicyName } from "../src/index";

describe("Extended Client", () => {
  it("should add the disable keep alive policy", () => {
    const extendedClient: ExtendedServiceClient = new ExtendedServiceClient({
      keepAliveOptions: {
        enable: false,
      },
    });

    const pipelinePolicies: PipelinePolicy[] = extendedClient.pipeline.getOrderedPolicies();
    let disableKeepAlivePolicyFound: boolean = false;

    for (const pipelinePolicy of pipelinePolicies) {
      if (pipelinePolicy.name === disbaleKeepAlivePolicyName) {
        disableKeepAlivePolicyFound = true;
      }
    }

    assert.deepStrictEqual(disableKeepAlivePolicyFound, true);
  });

  it("should remove the redirect policy", () => {
    const extendedClient: ExtendedServiceClient = new ExtendedServiceClient({
      redirectOptions: {
        handleRedirects: false,
      },
    });

    const pipelinePolicies: PipelinePolicy[] = extendedClient.pipeline.getOrderedPolicies();
    let redirectPolicyFound: boolean = false;

    for (const pipelinePolicy of pipelinePolicies) {
      if (pipelinePolicy.name === disbaleKeepAlivePolicyName) {
        redirectPolicyFound = true;
      }
    }

    assert.deepStrictEqual(redirectPolicyFound, false);
  });
});
