// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationContext as Client } from "../index.js";
import {
  errorDeserializer,
  _FeatureFlagListResult,
  _featureFlagListResultDeserializer,
  FeatureFlag,
  featureFlagSerializer,
  featureFlagDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  FeatureFlagClientCheckFeatureFlagRevisionsOptionalParams,
  FeatureFlagClientGetFeatureFlagRevisionsOptionalParams,
  FeatureFlagClientDeleteFeatureFlagOptionalParams,
  FeatureFlagClientPutFeatureFlagOptionalParams,
  FeatureFlagClientCheckFeatureFlagOptionalParams,
  FeatureFlagClientGetFeatureFlagOptionalParams,
  FeatureFlagClientCheckFeatureFlagsOptionalParams,
  FeatureFlagClientGetFeatureFlagsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _checkFeatureFlagRevisionsSend(
  context: Client,
  options: FeatureFlagClientCheckFeatureFlagRevisionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/ff-revisions{?api%2Dversion,name,label,After,%24Select,tags*}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      name: options?.name,
      label: options?.label,
      After: options?.after,
      "%24Select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      tags: !options?.tags
        ? options?.tags
        : options?.tags.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .head({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _checkFeatureFlagRevisionsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** Requests the headers and status of the given resource. */
export async function checkFeatureFlagRevisions(
  context: Client,
  options: FeatureFlagClientCheckFeatureFlagRevisionsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkFeatureFlagRevisionsSend(context, options);
  return _checkFeatureFlagRevisionsDeserialize(result);
}

export function _getFeatureFlagRevisionsSend(
  context: Client,
  options: FeatureFlagClientGetFeatureFlagRevisionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/ff-revisions{?api%2Dversion,name,label,After,%24Select,tags*}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      name: options?.name,
      label: options?.label,
      After: options?.after,
      "%24Select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      tags: !options?.tags
        ? options?.tags
        : options?.tags.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept:
          'application/json;profile="https://azconfig.io/mime-profiles/ffset";charset=utf-8, application/problem+json',
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getFeatureFlagRevisionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_FeatureFlagListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return _featureFlagListResultDeserializer(result.body);
}
/** Gets a list of feature flag revisions. */
export function getFeatureFlagRevisions(
  context: Client,
  options: FeatureFlagClientGetFeatureFlagRevisionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FeatureFlag> {
  return buildPagedAsyncIterator(
    context,
    () => _getFeatureFlagRevisionsSend(context, options),
    _getFeatureFlagRevisionsDeserialize,
    ["200"],
    {
      itemName: "items",
      nextLinkName: "@nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _deleteFeatureFlagSend(
  context: Client,
  name: string,
  options: FeatureFlagClientDeleteFeatureFlagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/ff/{name}{?api%2Dversion,label}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      label: options?.label,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept:
          'application/json;profile="https://azconfig.io/mime-profiles/ff";charset=utf-8, application/problem+json',
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteFeatureFlagDeserialize(
  result: PathUncheckedResponse,
): Promise<FeatureFlag | void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  if (!result.body) {
    return;
  }

  return featureFlagDeserializer(result.body);
}
/** Deletes a feature flag. */
export async function deleteFeatureFlag(
  context: Client,
  name: string,
  options: FeatureFlagClientDeleteFeatureFlagOptionalParams = { requestOptions: {} },
): Promise<FeatureFlag | void> {
  const result = await _deleteFeatureFlagSend(context, name, options);
  return _deleteFeatureFlagDeserialize(result);
}

export function _putFeatureFlagSend(
  context: Client,
  name: string,
  options: FeatureFlagClientPutFeatureFlagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/ff/{name}{?api%2Dversion,label}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      label: options?.label,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: 'application/json;profile="https://azconfig.io/mime-profiles/ff";charset=utf-8',
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept:
          'application/json;profile="https://azconfig.io/mime-profiles/ff";charset=utf-8, application/problem+json',
        ...options.requestOptions?.headers,
      },
      body: !options?.entity ? options?.entity : featureFlagSerializer(options?.entity),
    });
}

export async function _putFeatureFlagDeserialize(
  result: PathUncheckedResponse,
): Promise<FeatureFlag> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return featureFlagDeserializer(result.body);
}
/** Creates a feature flag. */
export async function putFeatureFlag(
  context: Client,
  name: string,
  options: FeatureFlagClientPutFeatureFlagOptionalParams = { requestOptions: {} },
): Promise<FeatureFlag> {
  const result = await _putFeatureFlagSend(context, name, options);
  return _putFeatureFlagDeserialize(result);
}

export function _checkFeatureFlagSend(
  context: Client,
  name: string,
  options: FeatureFlagClientCheckFeatureFlagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/ff/{name}{?api%2Dversion,label,%24Select,tags*}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      label: options?.label,
      "%24Select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      tags: !options?.tags
        ? options?.tags
        : options?.tags.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .head({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.acceptDatetime !== undefined
          ? { "accept-datetime": options?.acceptDatetime }
          : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _checkFeatureFlagDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** Requests the headers and status of the given resource. */
export async function checkFeatureFlag(
  context: Client,
  name: string,
  options: FeatureFlagClientCheckFeatureFlagOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkFeatureFlagSend(context, name, options);
  return _checkFeatureFlagDeserialize(result);
}

export function _getFeatureFlagSend(
  context: Client,
  name: string,
  options: FeatureFlagClientGetFeatureFlagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/ff/{name}{?api%2Dversion,label,%24Select,tags*}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      label: options?.label,
      "%24Select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      tags: !options?.tags
        ? options?.tags
        : options?.tags.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.acceptDatetime !== undefined
          ? { "accept-datetime": options?.acceptDatetime }
          : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept:
          'application/json;profile="https://azconfig.io/mime-profiles/ff";charset=utf-8, application/problem+json',
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getFeatureFlagDeserialize(
  result: PathUncheckedResponse,
): Promise<FeatureFlag> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return featureFlagDeserializer(result.body);
}
/** Gets a single feature flag. */
export async function getFeatureFlag(
  context: Client,
  name: string,
  options: FeatureFlagClientGetFeatureFlagOptionalParams = { requestOptions: {} },
): Promise<FeatureFlag> {
  const result = await _getFeatureFlagSend(context, name, options);
  return _getFeatureFlagDeserialize(result);
}

export function _checkFeatureFlagsSend(
  context: Client,
  options: FeatureFlagClientCheckFeatureFlagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/ff{?api%2Dversion,name,label,After,%24Select,tags*}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      name: options?.name,
      label: options?.label,
      After: options?.after,
      "%24Select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      tags: !options?.tags
        ? options?.tags
        : options?.tags.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .head({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.acceptDatetime !== undefined
          ? { "accept-datetime": options?.acceptDatetime }
          : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _checkFeatureFlagsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** Requests the headers and status of the given resource. */
export async function checkFeatureFlags(
  context: Client,
  options: FeatureFlagClientCheckFeatureFlagsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkFeatureFlagsSend(context, options);
  return _checkFeatureFlagsDeserialize(result);
}

export function _getFeatureFlagsSend(
  context: Client,
  options: FeatureFlagClientGetFeatureFlagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/ff{?api%2Dversion,name,label,After,%24Select,tags*}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      name: options?.name,
      label: options?.label,
      After: options?.after,
      "%24Select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      tags: !options?.tags
        ? options?.tags
        : options?.tags.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.acceptDatetime !== undefined
          ? { "accept-datetime": options?.acceptDatetime }
          : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept:
          'application/json;profile="https://azconfig.io/mime-profiles/ffset";charset=utf-8, application/problem+json',
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getFeatureFlagsDeserialize(
  result: PathUncheckedResponse,
): Promise<_FeatureFlagListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return _featureFlagListResultDeserializer(result.body);
}
/** Gets a list of feature flags. */
export function getFeatureFlags(
  context: Client,
  options: FeatureFlagClientGetFeatureFlagsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FeatureFlag> {
  return buildPagedAsyncIterator(
    context,
    () => _getFeatureFlagsSend(context, options),
    _getFeatureFlagsDeserialize,
    ["200"],
    {
      itemName: "items",
      nextLinkName: "@nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}
