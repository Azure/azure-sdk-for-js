// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementContext as Client } from "../index.js";
import {
  errorDetailsDeserializer,
  IotFhirDestination,
  _IotFhirDestinationCollection,
  _iotFhirDestinationCollectionDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { FhirDestinationsListByIotConnectorOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByIotConnectorSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  iotConnectorName: string,
  options: FhirDestinationsListByIotConnectorOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors/{iotConnectorName}/fhirdestinations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      iotConnectorName: iotConnectorName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
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

export async function _listByIotConnectorDeserialize(
  result: PathUncheckedResponse,
): Promise<_IotFhirDestinationCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return _iotFhirDestinationCollectionDeserializer(result.body);
}

/** Lists all FHIR destinations for the given IoT Connector */
export function listByIotConnector(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  iotConnectorName: string,
  options: FhirDestinationsListByIotConnectorOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IotFhirDestination> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByIotConnectorSend(context, resourceGroupName, workspaceName, iotConnectorName, options),
    _listByIotConnectorDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-04-01-preview",
    },
  );
}
