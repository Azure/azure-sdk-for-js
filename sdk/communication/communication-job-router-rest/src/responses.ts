// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import type {
  ClassificationPolicyOutput,
  PagedClassificationPolicyOutput,
  DistributionPolicyOutput,
  PagedDistributionPolicyOutput,
  ExceptionPolicyOutput,
  PagedExceptionPolicyOutput,
  RouterQueueOutput,
  PagedRouterQueueOutput,
  RouterJobOutput,
  ReclassifyJobResultOutput,
  CancelJobResultOutput,
  CompleteJobResultOutput,
  CloseJobResultOutput,
  PagedRouterJobOutput,
  RouterJobPositionDetailsOutput,
  UnassignJobResultOutput,
  AcceptJobOfferResultOutput,
  DeclineJobOfferResultOutput,
  RouterQueueStatisticsOutput,
  RouterWorkerOutput,
  PagedRouterWorkerOutput,
} from "./outputModels";

export interface UpsertClassificationPolicy200Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface UpsertClassificationPolicy200Response extends HttpResponse {
  status: "200";
  body: ClassificationPolicyOutput;
  headers: RawHttpHeaders & UpsertClassificationPolicy200Headers;
}

export interface UpsertClassificationPolicy201Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface UpsertClassificationPolicy201Response extends HttpResponse {
  status: "201";
  body: ClassificationPolicyOutput;
  headers: RawHttpHeaders & UpsertClassificationPolicy201Headers;
}

export interface UpsertClassificationPolicyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpsertClassificationPolicyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UpsertClassificationPolicyDefaultHeaders;
}

export interface GetClassificationPolicy200Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface GetClassificationPolicy200Response extends HttpResponse {
  status: "200";
  body: ClassificationPolicyOutput;
  headers: RawHttpHeaders & GetClassificationPolicy200Headers;
}

export interface GetClassificationPolicyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetClassificationPolicyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetClassificationPolicyDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteClassificationPolicy204Response extends HttpResponse {
  status: "204";
}

export interface DeleteClassificationPolicyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteClassificationPolicyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteClassificationPolicyDefaultHeaders;
}

/** The request has succeeded. */
export interface ListClassificationPolicies200Response extends HttpResponse {
  status: "200";
  body: PagedClassificationPolicyOutput;
}

export interface ListClassificationPoliciesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListClassificationPoliciesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListClassificationPoliciesDefaultHeaders;
}

export interface UpsertDistributionPolicy200Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface UpsertDistributionPolicy200Response extends HttpResponse {
  status: "200";
  body: DistributionPolicyOutput;
  headers: RawHttpHeaders & UpsertDistributionPolicy200Headers;
}

export interface UpsertDistributionPolicy201Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface UpsertDistributionPolicy201Response extends HttpResponse {
  status: "201";
  body: DistributionPolicyOutput;
  headers: RawHttpHeaders & UpsertDistributionPolicy201Headers;
}

export interface UpsertDistributionPolicyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpsertDistributionPolicyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UpsertDistributionPolicyDefaultHeaders;
}

export interface GetDistributionPolicy200Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface GetDistributionPolicy200Response extends HttpResponse {
  status: "200";
  body: DistributionPolicyOutput;
  headers: RawHttpHeaders & GetDistributionPolicy200Headers;
}

export interface GetDistributionPolicyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDistributionPolicyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetDistributionPolicyDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteDistributionPolicy204Response extends HttpResponse {
  status: "204";
}

export interface DeleteDistributionPolicyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteDistributionPolicyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteDistributionPolicyDefaultHeaders;
}

/** The request has succeeded. */
export interface ListDistributionPolicies200Response extends HttpResponse {
  status: "200";
  body: PagedDistributionPolicyOutput;
}

export interface ListDistributionPoliciesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListDistributionPoliciesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListDistributionPoliciesDefaultHeaders;
}

export interface UpsertExceptionPolicy200Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface UpsertExceptionPolicy200Response extends HttpResponse {
  status: "200";
  body: ExceptionPolicyOutput;
  headers: RawHttpHeaders & UpsertExceptionPolicy200Headers;
}

export interface UpsertExceptionPolicy201Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface UpsertExceptionPolicy201Response extends HttpResponse {
  status: "201";
  body: ExceptionPolicyOutput;
  headers: RawHttpHeaders & UpsertExceptionPolicy201Headers;
}

export interface UpsertExceptionPolicyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpsertExceptionPolicyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UpsertExceptionPolicyDefaultHeaders;
}

export interface GetExceptionPolicy200Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface GetExceptionPolicy200Response extends HttpResponse {
  status: "200";
  body: ExceptionPolicyOutput;
  headers: RawHttpHeaders & GetExceptionPolicy200Headers;
}

export interface GetExceptionPolicyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetExceptionPolicyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetExceptionPolicyDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteExceptionPolicy204Response extends HttpResponse {
  status: "204";
}

export interface DeleteExceptionPolicyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteExceptionPolicyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteExceptionPolicyDefaultHeaders;
}

/** The request has succeeded. */
export interface ListExceptionPolicies200Response extends HttpResponse {
  status: "200";
  body: PagedExceptionPolicyOutput;
}

export interface ListExceptionPoliciesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListExceptionPoliciesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListExceptionPoliciesDefaultHeaders;
}

export interface UpsertQueue200Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface UpsertQueue200Response extends HttpResponse {
  status: "200";
  body: RouterQueueOutput;
  headers: RawHttpHeaders & UpsertQueue200Headers;
}

export interface UpsertQueue201Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface UpsertQueue201Response extends HttpResponse {
  status: "201";
  body: RouterQueueOutput;
  headers: RawHttpHeaders & UpsertQueue201Headers;
}

export interface UpsertQueueDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpsertQueueDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UpsertQueueDefaultHeaders;
}

export interface GetQueue200Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface GetQueue200Response extends HttpResponse {
  status: "200";
  body: RouterQueueOutput;
  headers: RawHttpHeaders & GetQueue200Headers;
}

export interface GetQueueDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetQueueDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetQueueDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteQueue204Response extends HttpResponse {
  status: "204";
}

export interface DeleteQueueDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteQueueDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteQueueDefaultHeaders;
}

/** The request has succeeded. */
export interface ListQueues200Response extends HttpResponse {
  status: "200";
  body: PagedRouterQueueOutput;
}

export interface ListQueuesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListQueuesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListQueuesDefaultHeaders;
}

export interface UpsertJob200Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface UpsertJob200Response extends HttpResponse {
  status: "200";
  body: RouterJobOutput;
  headers: RawHttpHeaders & UpsertJob200Headers;
}

export interface UpsertJob201Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface UpsertJob201Response extends HttpResponse {
  status: "201";
  body: RouterJobOutput;
  headers: RawHttpHeaders & UpsertJob201Headers;
}

export interface UpsertJobDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpsertJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UpsertJobDefaultHeaders;
}

export interface GetJob200Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface GetJob200Response extends HttpResponse {
  status: "200";
  body: RouterJobOutput;
  headers: RawHttpHeaders & GetJob200Headers;
}

export interface GetJobDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetJobDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteJob204Response extends HttpResponse {
  status: "204";
}

export interface DeleteJobDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteJobDefaultHeaders;
}

/** The request has succeeded. */
export interface Reclassify200Response extends HttpResponse {
  status: "200";
  body: ReclassifyJobResultOutput;
}

export interface ReclassifyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ReclassifyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ReclassifyDefaultHeaders;
}

/** The request has succeeded. */
export interface Cancel200Response extends HttpResponse {
  status: "200";
  body: CancelJobResultOutput;
}

export interface CancelDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CancelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CancelDefaultHeaders;
}

/** The request has succeeded. */
export interface Complete200Response extends HttpResponse {
  status: "200";
  body: CompleteJobResultOutput;
}

export interface CompleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CompleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CompleteDefaultHeaders;
}

/** The request has succeeded. */
export interface Close200Response extends HttpResponse {
  status: "200";
  body: CloseJobResultOutput;
}

export interface CloseDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CloseDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CloseDefaultHeaders;
}

/** The request has succeeded. */
export interface ListJobs200Response extends HttpResponse {
  status: "200";
  body: PagedRouterJobOutput;
}

export interface ListJobsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListJobsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListJobsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetInQueuePosition200Response extends HttpResponse {
  status: "200";
  body: RouterJobPositionDetailsOutput;
}

export interface GetInQueuePositionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetInQueuePositionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetInQueuePositionDefaultHeaders;
}

/** The request has succeeded. */
export interface Unassign200Response extends HttpResponse {
  status: "200";
  body: UnassignJobResultOutput;
}

export interface UnassignDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UnassignDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UnassignDefaultHeaders;
}

/** The request has succeeded. */
export interface Accept200Response extends HttpResponse {
  status: "200";
  body: AcceptJobOfferResultOutput;
}

export interface AcceptDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AcceptDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AcceptDefaultHeaders;
}

/** The request has succeeded. */
export interface Decline200Response extends HttpResponse {
  status: "200";
  body: DeclineJobOfferResultOutput;
}

export interface DeclineDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeclineDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeclineDefaultHeaders;
}

/** The request has succeeded. */
export interface GetQueueStatistics200Response extends HttpResponse {
  status: "200";
  body: RouterQueueStatisticsOutput;
}

export interface GetQueueStatisticsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetQueueStatisticsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetQueueStatisticsDefaultHeaders;
}

export interface UpsertWorker200Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface UpsertWorker200Response extends HttpResponse {
  status: "200";
  body: RouterWorkerOutput;
  headers: RawHttpHeaders & UpsertWorker200Headers;
}

export interface UpsertWorker201Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface UpsertWorker201Response extends HttpResponse {
  status: "201";
  body: RouterWorkerOutput;
  headers: RawHttpHeaders & UpsertWorker201Headers;
}

export interface UpsertWorkerDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpsertWorkerDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UpsertWorkerDefaultHeaders;
}

export interface GetWorker200Headers {
  /** The entity tag for the response. */
  etag?: string;
  /** The last modified timestamp. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface GetWorker200Response extends HttpResponse {
  status: "200";
  body: RouterWorkerOutput;
  headers: RawHttpHeaders & GetWorker200Headers;
}

export interface GetWorkerDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetWorkerDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetWorkerDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteWorker204Response extends HttpResponse {
  status: "204";
}

export interface DeleteWorkerDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteWorkerDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteWorkerDefaultHeaders;
}

/** The request has succeeded. */
export interface ListWorkers200Response extends HttpResponse {
  status: "200";
  body: PagedRouterWorkerOutput;
}

export interface ListWorkersDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListWorkersDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListWorkersDefaultHeaders;
}
