// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InferCancerProfileParameters } from "./parameters";
import {
  InferCancerProfile200Response,
  InferCancerProfile202Response,
  InferCancerProfileDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface InferCancerProfile {
  /** Creates an Onco Phenotype job with the given request body. */
  post(
    options?: InferCancerProfileParameters
  ): StreamableMethod<
    | InferCancerProfile200Response
    | InferCancerProfile202Response
    | InferCancerProfileDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/oncophenotype/jobs' has methods for the following verbs: post */
  (path: "/oncophenotype/jobs"): InferCancerProfile;
}

export type CancerProfilingRestClient = Client & {
  path: Routes;
};
