// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RegisterWorkerRequest,
  CreateJobRequest,
  ReclassifyJobRequest,
  UpsertQueueRequest
} from "../generated/src/models";

export type LabelValue = string | number | boolean | null;

export interface RestCreateJobRequest extends CreateJobRequest {
  labels?: { [propertyName: string]: LabelValue };
}

export interface RestRegisterWorkerRequest extends RegisterWorkerRequest {
  labels?: { [propertyName: string]: LabelValue };
}

export interface RestReclassifyJobRequest extends ReclassifyJobRequest {
  labelsToUpsert?: { [propertyName: string]: LabelValue };
}

export interface RestUpsertQueueRequest extends UpsertQueueRequest {
  labels?: { [propertyName: string]: LabelValue };
}

export {
  CancelJobRequest,
  CloseJobRequest,
  CompleteJobRequest,
  ReleaseAssignmentRequest,
  UpsertChannelRequest,
  UpsertDistributionPolicyRequest,
  UpsertExceptionPolicyRequest,
  UpdateJobClassificationRequest,
  UpsertClassificationPolicyRequest
} from "../generated/src/models";
