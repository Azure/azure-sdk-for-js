// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MatchTrialsParameters } from "./parameters";
import {
  MatchTrials200Response,
  MatchTrials202Response,
  MatchTrialsDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface MatchTrials {
  /** Creates a Trial Matcher job with the given request body. */
  post(
    options?: MatchTrialsParameters
  ): StreamableMethod<
    MatchTrials200Response | MatchTrials202Response | MatchTrialsDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/trialmatcher/jobs' has methods for the following verbs: post */
  (path: "/trialmatcher/jobs"): MatchTrials;
}

export type ClinicalMatchingRestClient = Client & {
  path: Routes;
};
