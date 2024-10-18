// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  inputDataUnionSerializer,
  evaluatorConfigurationSerializer,
  triggerUnionSerializer,
  samplingStrategySerializer,
  Evaluation,
  EvaluationSchedule,
  _CustomPage,
} from "../../models/models.js";
import {
  deserializeInputDataUnion,
  deserializeTriggerUnion,
} from "../../utils/deserializeUtil.js";
import { ClientContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import { serializeRecord } from "../../helpers/serializerHelpers.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  EvaluationsGetOptionalParams,
  EvaluationsCreateOptionalParams,
  EvaluationsListOptionalParams,
  EvaluationsUpdateOptionalParams,
  EvaluationsGetScheduleOptionalParams,
  EvaluationsCreateOrReplaceScheduleOptionalParams,
  EvaluationsListScheduleOptionalParams,
  EvaluationsDeleteScheduleOptionalParams,
} from "../../models/options.js";

export function _getSend(
  context: Client,
  id: string,
  options: EvaluationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/evaluations/runs/{id}", id)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
      },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<Evaluation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    data: deserializeInputDataUnion(result.body.data),
    displayName: result.body["displayName"],
    description: result.body["description"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    status: result.body["status"],
    tags: result.body["tags"],
    properties: result.body["properties"],
    evaluators: result.body["evaluators"],
  };
}

/** Resource read operation template. */
export async function get(
  context: Client,
  id: string,
  options: EvaluationsGetOptionalParams = { requestOptions: {} },
): Promise<Evaluation> {
  const result = await _getSend(context, id, options);
  return _getDeserialize(result);
}

export function _createSend(
  context: Client,
  evaluation: Evaluation,
  options: EvaluationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/evaluations/runs:run")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        data: inputDataUnionSerializer(evaluation.data),
        displayName: evaluation["displayName"],
        description: evaluation["description"],
        tags: !evaluation.tags
          ? evaluation.tags
          : (serializeRecord(evaluation.tags as any) as any),
        properties: !evaluation.properties
          ? evaluation.properties
          : (serializeRecord(evaluation.properties as any) as any),
        evaluators: serializeRecord(
          evaluation.evaluators as any,
          evaluatorConfigurationSerializer,
        ) as any,
      },
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<Evaluation> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    data: deserializeInputDataUnion(result.body.data),
    displayName: result.body["displayName"],
    description: result.body["description"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    status: result.body["status"],
    tags: result.body["tags"],
    properties: result.body["properties"],
    evaluators: result.body["evaluators"],
  };
}

/** Run the evaluation. */
export async function create(
  context: Client,
  evaluation: Evaluation,
  options: EvaluationsCreateOptionalParams = { requestOptions: {} },
): Promise<Evaluation> {
  const result = await _createSend(context, evaluation, options);
  return _createDeserialize(result);
}

export function _listSend(
  context: Client,
  options: EvaluationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/evaluations/runs")
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
      },
      queryParameters: {
        top: options?.top,
        skip: options?.skip,
        maxpagesize: options?.maxpagesize,
      },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_CustomPage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
      return {
        id: p["id"],
        data: deserializeInputDataUnion(p.data),
        displayName: p["displayName"],
        description: p["description"],
        systemData: !p.systemData
          ? undefined
          : {
              createdAt:
                p.systemData?.["createdAt"] !== undefined
                  ? new Date(p.systemData?.["createdAt"])
                  : undefined,
              createdBy: p.systemData?.["createdBy"],
              createdByType: p.systemData?.["createdByType"],
              lastModifiedAt:
                p.systemData?.["lastModifiedAt"] !== undefined
                  ? new Date(p.systemData?.["lastModifiedAt"])
                  : undefined,
            },
        status: p["status"],
        tags: p["tags"],
        properties: p["properties"],
        evaluators: p["evaluators"],
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** Resource list operation template. */
export function list(
  context: Client,
  options: EvaluationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Evaluation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _updateSend(
  context: Client,
  id: string,
  resource: Evaluation,
  options: EvaluationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/evaluations/runs/{id}", id)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType:
        (options.contentType as any) ?? "application/merge-patch+json",
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
      },
      body: {
        data: inputDataUnionSerializer(resource.data),
        displayName: resource["displayName"],
        description: resource["description"],
        tags: !resource.tags
          ? resource.tags
          : (serializeRecord(resource.tags as any) as any),
        properties: !resource.properties
          ? resource.properties
          : (serializeRecord(resource.properties as any) as any),
        evaluators: serializeRecord(
          resource.evaluators as any,
          evaluatorConfigurationSerializer,
        ) as any,
      },
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<Evaluation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    data: deserializeInputDataUnion(result.body.data),
    displayName: result.body["displayName"],
    description: result.body["description"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    status: result.body["status"],
    tags: result.body["tags"],
    properties: result.body["properties"],
    evaluators: result.body["evaluators"],
  };
}

/** Resource update operation template. */
export async function update(
  context: Client,
  id: string,
  resource: Evaluation,
  options: EvaluationsUpdateOptionalParams = { requestOptions: {} },
): Promise<Evaluation> {
  const result = await _updateSend(context, id, resource, options);
  return _updateDeserialize(result);
}

export function _getScheduleSend(
  context: Client,
  id: string,
  options: EvaluationsGetScheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/evaluations/schedules/{id}", id)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
      },
    });
}

export async function _getScheduleDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluationSchedule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    data: deserializeInputDataUnion(result.body.data),
    displayName: result.body["displayName"],
    description: result.body["description"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    provisioningStatus: result.body["provisioningStatus"],
    tags: result.body["tags"],
    properties: result.body["properties"],
    evaluators: result.body["evaluators"],
    trigger: deserializeTriggerUnion(result.body.trigger),
    samplingStrategy: { rate: result.body.samplingStrategy["rate"] },
  };
}

/** Resource read operation template. */
export async function getSchedule(
  context: Client,
  id: string,
  options: EvaluationsGetScheduleOptionalParams = { requestOptions: {} },
): Promise<EvaluationSchedule> {
  const result = await _getScheduleSend(context, id, options);
  return _getScheduleDeserialize(result);
}

export function _createOrReplaceScheduleSend(
  context: Client,
  id: string,
  resource: EvaluationSchedule,
  options: EvaluationsCreateOrReplaceScheduleOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path("/evaluations/schedules/{id}", id)
    .put({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
      },
      body: {
        data: inputDataUnionSerializer(resource.data),
        displayName: resource["displayName"],
        description: resource["description"],
        tags: !resource.tags
          ? resource.tags
          : (serializeRecord(resource.tags as any) as any),
        properties: !resource.properties
          ? resource.properties
          : (serializeRecord(resource.properties as any) as any),
        evaluators: serializeRecord(
          resource.evaluators as any,
          evaluatorConfigurationSerializer,
        ) as any,
        trigger: triggerUnionSerializer(resource.trigger),
        samplingStrategy: samplingStrategySerializer(resource.samplingStrategy),
      },
    });
}

export async function _createOrReplaceScheduleDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluationSchedule> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    data: deserializeInputDataUnion(result.body.data),
    displayName: result.body["displayName"],
    description: result.body["description"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    provisioningStatus: result.body["provisioningStatus"],
    tags: result.body["tags"],
    properties: result.body["properties"],
    evaluators: result.body["evaluators"],
    trigger: deserializeTriggerUnion(result.body.trigger),
    samplingStrategy: { rate: result.body.samplingStrategy["rate"] },
  };
}

/** Create or replace operation template. */
export async function createOrReplaceSchedule(
  context: Client,
  id: string,
  resource: EvaluationSchedule,
  options: EvaluationsCreateOrReplaceScheduleOptionalParams = {
    requestOptions: {},
  },
): Promise<EvaluationSchedule> {
  const result = await _createOrReplaceScheduleSend(
    context,
    id,
    resource,
    options,
  );
  return _createOrReplaceScheduleDeserialize(result);
}

export function _listScheduleSend(
  context: Client,
  options: EvaluationsListScheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/evaluations/schedules")
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
      },
      queryParameters: {
        top: options?.top,
        skip: options?.skip,
        maxpagesize: options?.maxpagesize,
      },
    });
}

export async function _listScheduleDeserialize(
  result: PathUncheckedResponse,
): Promise<_CustomPage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
      return {
        id: p["id"],
        data: deserializeInputDataUnion(p.data),
        displayName: p["displayName"],
        description: p["description"],
        systemData: !p.systemData
          ? undefined
          : {
              createdAt:
                p.systemData?.["createdAt"] !== undefined
                  ? new Date(p.systemData?.["createdAt"])
                  : undefined,
              createdBy: p.systemData?.["createdBy"],
              createdByType: p.systemData?.["createdByType"],
              lastModifiedAt:
                p.systemData?.["lastModifiedAt"] !== undefined
                  ? new Date(p.systemData?.["lastModifiedAt"])
                  : undefined,
            },
        provisioningStatus: p["provisioningStatus"],
        tags: p["tags"],
        properties: p["properties"],
        evaluators: p["evaluators"],
        trigger: deserializeTriggerUnion(p.trigger),
        samplingStrategy: { rate: p.samplingStrategy["rate"] },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** Resource list operation template. */
export function listSchedule(
  context: Client,
  options: EvaluationsListScheduleOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluationSchedule> {
  return buildPagedAsyncIterator(
    context,
    () => _listScheduleSend(context, options),
    _listScheduleDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deleteScheduleSend(
  context: Client,
  id: string,
  options: EvaluationsDeleteScheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/evaluations/schedules/{id}", id)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
      },
    });
}

export async function _deleteScheduleDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Resource delete operation template. */
export async function deleteSchedule(
  context: Client,
  id: string,
  options: EvaluationsDeleteScheduleOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteScheduleSend(context, id, options);
  return _deleteScheduleDeserialize(result);
}
