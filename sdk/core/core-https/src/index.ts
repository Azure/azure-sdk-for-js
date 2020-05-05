// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO: use export type when TS 3.8 lands
export { HttpsClient, PipelineRequest, PipelineResponse, SendRequest } from "./interfaces";
export {
  AddPolicyOptions as AddPipelineOptions,
  PipelinePhase,
  PipelinePolicy,
  Pipeline
} from "./pipeline";
