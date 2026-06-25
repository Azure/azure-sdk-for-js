// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { JobRouterAdministrationContext as Client } from "./index.js";
import {
  DistributionPolicy,
  distributionPolicySerializer,
  distributionPolicyDeserializer,
  _PagedDistributionPolicy,
  _pagedDistributionPolicyDeserializer,
  ClassificationPolicy,
  classificationPolicySerializer,
  classificationPolicyDeserializer,
  _PagedClassificationPolicy,
  _pagedClassificationPolicyDeserializer,
  ExceptionPolicy,
  exceptionPolicySerializer,
  exceptionPolicyDeserializer,
  _PagedExceptionPolicy,
  _pagedExceptionPolicyDeserializer,
  RouterQueue,
  routerQueueSerializer,
  routerQueueDeserializer,
  _PagedRouterQueue,
  _pagedRouterQueueDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DeleteQueueOptionalParams,
  ListQueuesOptionalParams,
  GetQueueOptionalParams,
  UpsertQueueOptionalParams,
  DeleteExceptionPolicyOptionalParams,
  ListExceptionPoliciesOptionalParams,
  GetExceptionPolicyOptionalParams,
  UpsertExceptionPolicyOptionalParams,
  DeleteClassificationPolicyOptionalParams,
  ListClassificationPoliciesOptionalParams,
  GetClassificationPolicyOptionalParams,
  UpsertClassificationPolicyOptionalParams,
  DeleteDistributionPolicyOptionalParams,
  ListDistributionPoliciesOptionalParams,
  GetDistributionPolicyOptionalParams,
  UpsertDistributionPolicyOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _deleteQueueSend(
  context: Client,
  queueId: string,
  options: DeleteQueueOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/queues/{queueId}{?api%2Dversion}",
    {
      queueId: queueId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteQueueDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes a queue by Id. */
export async function deleteQueue(
  context: Client,
  queueId: string,
  options: DeleteQueueOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteQueueSend(context, queueId, options);
  return _deleteQueueDeserialize(result);
}

export function _listQueuesSend(
  context: Client,
  options: ListQueuesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/queues{?api%2Dversion,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listQueuesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedRouterQueue> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedRouterQueueDeserializer(result.body);
}

/** Retrieves existing queues. */
export function listQueues(
  context: Client,
  options: ListQueuesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RouterQueue> {
  return buildPagedAsyncIterator(
    context,
    () => _listQueuesSend(context, options),
    _listQueuesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-01-18-preview",
    },
  );
}

export function _getQueueSend(
  context: Client,
  queueId: string,
  options: GetQueueOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/queues/{queueId}{?api%2Dversion}",
    {
      queueId: queueId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getQueueDeserialize(result: PathUncheckedResponse): Promise<RouterQueue> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return routerQueueDeserializer(result.body);
}

/** Retrieves an existing queue by Id. */
export async function getQueue(
  context: Client,
  queueId: string,
  options: GetQueueOptionalParams = { requestOptions: {} },
): Promise<RouterQueue> {
  const result = await _getQueueSend(context, queueId, options);
  return _getQueueDeserialize(result);
}

export function _upsertQueueSend(
  context: Client,
  queueId: string,
  resource: RouterQueue,
  options: UpsertQueueOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/queues/{queueId}{?api%2Dversion}",
    {
      queueId: queueId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: routerQueueSerializer(resource),
    });
}

export async function _upsertQueueDeserialize(result: PathUncheckedResponse): Promise<RouterQueue> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return routerQueueDeserializer(result.body);
}

/** Creates or updates a queue. */
export async function upsertQueue(
  context: Client,
  queueId: string,
  resource: RouterQueue,
  options: UpsertQueueOptionalParams = { requestOptions: {} },
): Promise<RouterQueue> {
  const result = await _upsertQueueSend(context, queueId, resource, options);
  return _upsertQueueDeserialize(result);
}

export function _deleteExceptionPolicySend(
  context: Client,
  exceptionPolicyId: string,
  options: DeleteExceptionPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/exceptionPolicies/{exceptionPolicyId}{?api%2Dversion}",
    {
      exceptionPolicyId: exceptionPolicyId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteExceptionPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes a exception policy by Id. */
export async function deleteExceptionPolicy(
  context: Client,
  exceptionPolicyId: string,
  options: DeleteExceptionPolicyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteExceptionPolicySend(context, exceptionPolicyId, options);
  return _deleteExceptionPolicyDeserialize(result);
}

export function _listExceptionPoliciesSend(
  context: Client,
  options: ListExceptionPoliciesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/exceptionPolicies{?api%2Dversion,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listExceptionPoliciesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedExceptionPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedExceptionPolicyDeserializer(result.body);
}

/** Retrieves existing exception policies. */
export function listExceptionPolicies(
  context: Client,
  options: ListExceptionPoliciesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExceptionPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listExceptionPoliciesSend(context, options),
    _listExceptionPoliciesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-01-18-preview",
    },
  );
}

export function _getExceptionPolicySend(
  context: Client,
  exceptionPolicyId: string,
  options: GetExceptionPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/exceptionPolicies/{exceptionPolicyId}{?api%2Dversion}",
    {
      exceptionPolicyId: exceptionPolicyId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getExceptionPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<ExceptionPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return exceptionPolicyDeserializer(result.body);
}

/** Retrieves an existing exception policy by Id. */
export async function getExceptionPolicy(
  context: Client,
  exceptionPolicyId: string,
  options: GetExceptionPolicyOptionalParams = { requestOptions: {} },
): Promise<ExceptionPolicy> {
  const result = await _getExceptionPolicySend(context, exceptionPolicyId, options);
  return _getExceptionPolicyDeserialize(result);
}

export function _upsertExceptionPolicySend(
  context: Client,
  exceptionPolicyId: string,
  resource: ExceptionPolicy,
  options: UpsertExceptionPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/exceptionPolicies/{exceptionPolicyId}{?api%2Dversion}",
    {
      exceptionPolicyId: exceptionPolicyId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: exceptionPolicySerializer(resource),
    });
}

export async function _upsertExceptionPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<ExceptionPolicy> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return exceptionPolicyDeserializer(result.body);
}

/** Creates or updates a exception policy. */
export async function upsertExceptionPolicy(
  context: Client,
  exceptionPolicyId: string,
  resource: ExceptionPolicy,
  options: UpsertExceptionPolicyOptionalParams = { requestOptions: {} },
): Promise<ExceptionPolicy> {
  const result = await _upsertExceptionPolicySend(context, exceptionPolicyId, resource, options);
  return _upsertExceptionPolicyDeserialize(result);
}

export function _deleteClassificationPolicySend(
  context: Client,
  classificationPolicyId: string,
  options: DeleteClassificationPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/classificationPolicies/{classificationPolicyId}{?api%2Dversion}",
    {
      classificationPolicyId: classificationPolicyId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteClassificationPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a classification policy by Id. */
export async function deleteClassificationPolicy(
  context: Client,
  classificationPolicyId: string,
  options: DeleteClassificationPolicyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteClassificationPolicySend(context, classificationPolicyId, options);
  return _deleteClassificationPolicyDeserialize(result);
}

export function _listClassificationPoliciesSend(
  context: Client,
  options: ListClassificationPoliciesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/classificationPolicies{?api%2Dversion,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listClassificationPoliciesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedClassificationPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedClassificationPolicyDeserializer(result.body);
}

/** Retrieves existing classification policies. */
export function listClassificationPolicies(
  context: Client,
  options: ListClassificationPoliciesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ClassificationPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listClassificationPoliciesSend(context, options),
    _listClassificationPoliciesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-01-18-preview",
    },
  );
}

export function _getClassificationPolicySend(
  context: Client,
  classificationPolicyId: string,
  options: GetClassificationPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/classificationPolicies/{classificationPolicyId}{?api%2Dversion}",
    {
      classificationPolicyId: classificationPolicyId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getClassificationPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<ClassificationPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return classificationPolicyDeserializer(result.body);
}

/** Retrieves an existing classification policy by Id. */
export async function getClassificationPolicy(
  context: Client,
  classificationPolicyId: string,
  options: GetClassificationPolicyOptionalParams = { requestOptions: {} },
): Promise<ClassificationPolicy> {
  const result = await _getClassificationPolicySend(context, classificationPolicyId, options);
  return _getClassificationPolicyDeserialize(result);
}

export function _upsertClassificationPolicySend(
  context: Client,
  classificationPolicyId: string,
  resource: ClassificationPolicy,
  options: UpsertClassificationPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/classificationPolicies/{classificationPolicyId}{?api%2Dversion}",
    {
      classificationPolicyId: classificationPolicyId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: classificationPolicySerializer(resource),
    });
}

export async function _upsertClassificationPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<ClassificationPolicy> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return classificationPolicyDeserializer(result.body);
}

/** Creates or updates a classification policy. */
export async function upsertClassificationPolicy(
  context: Client,
  classificationPolicyId: string,
  resource: ClassificationPolicy,
  options: UpsertClassificationPolicyOptionalParams = { requestOptions: {} },
): Promise<ClassificationPolicy> {
  const result = await _upsertClassificationPolicySend(
    context,
    classificationPolicyId,
    resource,
    options,
  );
  return _upsertClassificationPolicyDeserialize(result);
}

export function _deleteDistributionPolicySend(
  context: Client,
  distributionPolicyId: string,
  options: DeleteDistributionPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/distributionPolicies/{distributionPolicyId}{?api%2Dversion}",
    {
      distributionPolicyId: distributionPolicyId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteDistributionPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a distribution policy by Id. */
export async function deleteDistributionPolicy(
  context: Client,
  distributionPolicyId: string,
  options: DeleteDistributionPolicyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteDistributionPolicySend(context, distributionPolicyId, options);
  return _deleteDistributionPolicyDeserialize(result);
}

export function _listDistributionPoliciesSend(
  context: Client,
  options: ListDistributionPoliciesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/distributionPolicies{?api%2Dversion,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDistributionPoliciesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDistributionPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDistributionPolicyDeserializer(result.body);
}

/** Retrieves existing distribution policies. */
export function listDistributionPolicies(
  context: Client,
  options: ListDistributionPoliciesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DistributionPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listDistributionPoliciesSend(context, options),
    _listDistributionPoliciesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-01-18-preview",
    },
  );
}

export function _getDistributionPolicySend(
  context: Client,
  distributionPolicyId: string,
  options: GetDistributionPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/distributionPolicies/{distributionPolicyId}{?api%2Dversion}",
    {
      distributionPolicyId: distributionPolicyId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDistributionPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<DistributionPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return distributionPolicyDeserializer(result.body);
}

/** Retrieves an existing distribution policy by Id. */
export async function getDistributionPolicy(
  context: Client,
  distributionPolicyId: string,
  options: GetDistributionPolicyOptionalParams = { requestOptions: {} },
): Promise<DistributionPolicy> {
  const result = await _getDistributionPolicySend(context, distributionPolicyId, options);
  return _getDistributionPolicyDeserialize(result);
}

export function _upsertDistributionPolicySend(
  context: Client,
  distributionPolicyId: string,
  resource: DistributionPolicy,
  options: UpsertDistributionPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/routing/distributionPolicies/{distributionPolicyId}{?api%2Dversion}",
    {
      distributionPolicyId: distributionPolicyId,
      "api%2Dversion": context.apiVersion ?? "2024-01-18-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: distributionPolicySerializer(resource),
    });
}

export async function _upsertDistributionPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<DistributionPolicy> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return distributionPolicyDeserializer(result.body);
}

/** Creates or updates a distribution policy. */
export async function upsertDistributionPolicy(
  context: Client,
  distributionPolicyId: string,
  resource: DistributionPolicy,
  options: UpsertDistributionPolicyOptionalParams = { requestOptions: {} },
): Promise<DistributionPolicy> {
  const result = await _upsertDistributionPolicySend(
    context,
    distributionPolicyId,
    resource,
    options,
  );
  return _upsertDistributionPolicyDeserialize(result);
}
