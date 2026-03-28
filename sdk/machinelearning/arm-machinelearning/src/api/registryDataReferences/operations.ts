// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  GetBlobReferenceSASRequestDto,
  GetBlobReferenceSASResponseDto,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  getBlobReferenceSASRequestDtoSerializer,
  getBlobReferenceSASResponseDtoDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { RegistryDataReferencesGetBlobReferenceSASOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getBlobReferenceSASSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  name: string,
  version: string,
  body: GetBlobReferenceSASRequestDto,
  options: RegistryDataReferencesGetBlobReferenceSASOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/datareferences/{name}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: getBlobReferenceSASRequestDtoSerializer(body),
  });
}

export async function _getBlobReferenceSASDeserialize(
  result: PathUncheckedResponse,
): Promise<GetBlobReferenceSASResponseDto> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return getBlobReferenceSASResponseDtoDeserializer(result.body);
}

/** Get blob reference SAS Uri. */
export async function getBlobReferenceSAS(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  name: string,
  version: string,
  body: GetBlobReferenceSASRequestDto,
  options: RegistryDataReferencesGetBlobReferenceSASOptionalParams = { requestOptions: {} },
): Promise<GetBlobReferenceSASResponseDto> {
  const result = await _getBlobReferenceSASSend(
    context,
    resourceGroupName,
    registryName,
    name,
    version,
    body,
    options,
  );
  return _getBlobReferenceSASDeserialize(result);
}
