// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FaceAdministrationContext as Client } from "../index.js";
import {
  faceErrorResponseDeserializer,
  FaceTrainingResult,
  faceTrainingResultDeserializer,
  AddFaceResult,
  addFaceResultDeserializer,
  LargePersonGroup,
  largePersonGroupDeserializer,
  CreatePersonResult,
  createPersonResultDeserializer,
  LargePersonGroupPerson,
  largePersonGroupPersonDeserializer,
  LargePersonGroupPersonFace,
  largePersonGroupPersonFaceDeserializer,
  largePersonGroupArrayDeserializer,
  largePersonGroupPersonArrayDeserializer,
} from "../../../models/models.js";
import { getLongRunningPoller } from "../../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  LargePersonGroupUpdateFaceOptionalParams,
  LargePersonGroupGetFaceOptionalParams,
  LargePersonGroupDeleteFaceOptionalParams,
  LargePersonGroupAddFaceOptionalParams,
  LargePersonGroupAddFaceFromUrlOptionalParams,
  LargePersonGroupGetPersonsOptionalParams,
  LargePersonGroupUpdatePersonOptionalParams,
  LargePersonGroupGetPersonOptionalParams,
  LargePersonGroupDeletePersonOptionalParams,
  LargePersonGroupCreatePersonOptionalParams,
  LargePersonGroupTrainOptionalParams,
  LargePersonGroupGetTrainingStatusOptionalParams,
  LargePersonGroupGetLargePersonGroupsOptionalParams,
  LargePersonGroupUpdateOptionalParams,
  LargePersonGroupGetOptionalParams,
  LargePersonGroupDeleteOptionalParams,
  LargePersonGroupCreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _updateFaceSend(
  context: Client,
  largePersonGroupId: string,
  personId: string,
  persistedFaceId: string,
  options: LargePersonGroupUpdateFaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largepersongroups/{largePersonGroupId}/persons/{personId}/persistedfaces/{persistedFaceId}",
    {
      largePersonGroupId: largePersonGroupId,
      personId: personId,
      persistedFaceId: persistedFaceId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: { userData: options?.userData },
    });
}

export async function _updateFaceDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/update-large-person-group-person-face for more details. */
export async function updateFace(
  context: Client,
  largePersonGroupId: string,
  personId: string,
  persistedFaceId: string,
  options: LargePersonGroupUpdateFaceOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateFaceSend(
    context,
    largePersonGroupId,
    personId,
    persistedFaceId,
    options,
  );
  return _updateFaceDeserialize(result);
}

export function _getFaceSend(
  context: Client,
  largePersonGroupId: string,
  personId: string,
  persistedFaceId: string,
  options: LargePersonGroupGetFaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largepersongroups/{largePersonGroupId}/persons/{personId}/persistedfaces/{persistedFaceId}",
    {
      largePersonGroupId: largePersonGroupId,
      personId: personId,
      persistedFaceId: persistedFaceId,
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

export async function _getFaceDeserialize(
  result: PathUncheckedResponse,
): Promise<LargePersonGroupPersonFace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return largePersonGroupPersonFaceDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/get-large-person-group-person-face for more details. */
export async function getFace(
  context: Client,
  largePersonGroupId: string,
  personId: string,
  persistedFaceId: string,
  options: LargePersonGroupGetFaceOptionalParams = { requestOptions: {} },
): Promise<LargePersonGroupPersonFace> {
  const result = await _getFaceSend(
    context,
    largePersonGroupId,
    personId,
    persistedFaceId,
    options,
  );
  return _getFaceDeserialize(result);
}

export function _deleteFaceSend(
  context: Client,
  largePersonGroupId: string,
  personId: string,
  persistedFaceId: string,
  options: LargePersonGroupDeleteFaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largepersongroups/{largePersonGroupId}/persons/{personId}/persistedfaces/{persistedFaceId}",
    {
      largePersonGroupId: largePersonGroupId,
      personId: personId,
      persistedFaceId: persistedFaceId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteFaceDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/delete-large-person-group-person-face for more details. */
export async function deleteFace(
  context: Client,
  largePersonGroupId: string,
  personId: string,
  persistedFaceId: string,
  options: LargePersonGroupDeleteFaceOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteFaceSend(
    context,
    largePersonGroupId,
    personId,
    persistedFaceId,
    options,
  );
  return _deleteFaceDeserialize(result);
}

export function _addFaceSend(
  context: Client,
  largePersonGroupId: string,
  personId: string,
  imageContent: Uint8Array,
  options: LargePersonGroupAddFaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largepersongroups/{largePersonGroupId}/persons/{personId}/persistedfaces{?targetFace,detectionModel,userData}",
    {
      largePersonGroupId: largePersonGroupId,
      personId: personId,
      targetFace: !options?.targetFace
        ? options?.targetFace
        : options?.targetFace.map((p: any) => {
            return p;
          }),
      detectionModel: options?.detectionModel,
      userData: options?.userData,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/octet-stream",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: imageContent,
    });
}

export async function _addFaceDeserialize(result: PathUncheckedResponse): Promise<AddFaceResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return addFaceResultDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/add-large-person-group-person-face for more details. */
export async function addFace(
  context: Client,
  largePersonGroupId: string,
  personId: string,
  imageContent: Uint8Array,
  options: LargePersonGroupAddFaceOptionalParams = { requestOptions: {} },
): Promise<AddFaceResult> {
  const result = await _addFaceSend(context, largePersonGroupId, personId, imageContent, options);
  return _addFaceDeserialize(result);
}

export function _addFaceFromUrlSend(
  context: Client,
  largePersonGroupId: string,
  personId: string,
  url: string,
  options: LargePersonGroupAddFaceFromUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largepersongroups/{largePersonGroupId}/persons/{personId}/persistedfaces{?targetFace,detectionModel,userData}",
    {
      largePersonGroupId: largePersonGroupId,
      personId: personId,
      targetFace: !options?.targetFace
        ? options?.targetFace
        : options?.targetFace.map((p: any) => {
            return p;
          }),
      detectionModel: options?.detectionModel,
      userData: options?.userData,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: { url: url },
    });
}

export async function _addFaceFromUrlDeserialize(
  result: PathUncheckedResponse,
): Promise<AddFaceResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return addFaceResultDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/add-large-person-group-person-face-from-url for more details. */
export async function addFaceFromUrl(
  context: Client,
  largePersonGroupId: string,
  personId: string,
  url: string,
  options: LargePersonGroupAddFaceFromUrlOptionalParams = { requestOptions: {} },
): Promise<AddFaceResult> {
  const result = await _addFaceFromUrlSend(context, largePersonGroupId, personId, url, options);
  return _addFaceFromUrlDeserialize(result);
}

export function _getPersonsSend(
  context: Client,
  largePersonGroupId: string,
  options: LargePersonGroupGetPersonsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largepersongroups/{largePersonGroupId}/persons{?start,top}",
    {
      largePersonGroupId: largePersonGroupId,
      start: options?.start,
      top: options?.top,
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

export async function _getPersonsDeserialize(
  result: PathUncheckedResponse,
): Promise<LargePersonGroupPerson[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return largePersonGroupPersonArrayDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/get-large-person-group-persons for more details. */
export async function getPersons(
  context: Client,
  largePersonGroupId: string,
  options: LargePersonGroupGetPersonsOptionalParams = { requestOptions: {} },
): Promise<LargePersonGroupPerson[]> {
  const result = await _getPersonsSend(context, largePersonGroupId, options);
  return _getPersonsDeserialize(result);
}

export function _updatePersonSend(
  context: Client,
  largePersonGroupId: string,
  personId: string,
  options: LargePersonGroupUpdatePersonOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largepersongroups/{largePersonGroupId}/persons/{personId}",
    {
      largePersonGroupId: largePersonGroupId,
      personId: personId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: { name: options?.name, userData: options?.userData },
    });
}

export async function _updatePersonDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/update-large-person-group-person for more details. */
export async function updatePerson(
  context: Client,
  largePersonGroupId: string,
  personId: string,
  options: LargePersonGroupUpdatePersonOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updatePersonSend(context, largePersonGroupId, personId, options);
  return _updatePersonDeserialize(result);
}

export function _getPersonSend(
  context: Client,
  largePersonGroupId: string,
  personId: string,
  options: LargePersonGroupGetPersonOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largepersongroups/{largePersonGroupId}/persons/{personId}",
    {
      largePersonGroupId: largePersonGroupId,
      personId: personId,
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

export async function _getPersonDeserialize(
  result: PathUncheckedResponse,
): Promise<LargePersonGroupPerson> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return largePersonGroupPersonDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/get-large-person-group-person for more details. */
export async function getPerson(
  context: Client,
  largePersonGroupId: string,
  personId: string,
  options: LargePersonGroupGetPersonOptionalParams = { requestOptions: {} },
): Promise<LargePersonGroupPerson> {
  const result = await _getPersonSend(context, largePersonGroupId, personId, options);
  return _getPersonDeserialize(result);
}

export function _deletePersonSend(
  context: Client,
  largePersonGroupId: string,
  personId: string,
  options: LargePersonGroupDeletePersonOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largepersongroups/{largePersonGroupId}/persons/{personId}",
    {
      largePersonGroupId: largePersonGroupId,
      personId: personId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deletePersonDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/delete-large-person-group-person for more details. */
export async function deletePerson(
  context: Client,
  largePersonGroupId: string,
  personId: string,
  options: LargePersonGroupDeletePersonOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deletePersonSend(context, largePersonGroupId, personId, options);
  return _deletePersonDeserialize(result);
}

export function _createPersonSend(
  context: Client,
  largePersonGroupId: string,
  name: string,
  options: LargePersonGroupCreatePersonOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largepersongroups/{largePersonGroupId}/persons",
    {
      largePersonGroupId: largePersonGroupId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: { name: name, userData: options?.userData },
    });
}

export async function _createPersonDeserialize(
  result: PathUncheckedResponse,
): Promise<CreatePersonResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return createPersonResultDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/create-large-person-group-person for more details. */
export async function createPerson(
  context: Client,
  largePersonGroupId: string,
  name: string,
  options: LargePersonGroupCreatePersonOptionalParams = { requestOptions: {} },
): Promise<CreatePersonResult> {
  const result = await _createPersonSend(context, largePersonGroupId, name, options);
  return _createPersonDeserialize(result);
}

export function _trainSend(
  context: Client,
  largePersonGroupId: string,
  options: LargePersonGroupTrainOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largepersongroups/{largePersonGroupId}/train",
    {
      largePersonGroupId: largePersonGroupId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _trainDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/train-large-person-group for more details. */
export function train(
  context: Client,
  largePersonGroupId: string,
  options: LargePersonGroupTrainOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _trainDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _trainSend(context, largePersonGroupId, options),
  }) as PollerLike<OperationState<void>, void>;
}

export function _getTrainingStatusSend(
  context: Client,
  largePersonGroupId: string,
  options: LargePersonGroupGetTrainingStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largepersongroups/{largePersonGroupId}/training",
    {
      largePersonGroupId: largePersonGroupId,
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

export async function _getTrainingStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<FaceTrainingResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return faceTrainingResultDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/get-large-person-group-training-status for more details. */
export async function getTrainingStatus(
  context: Client,
  largePersonGroupId: string,
  options: LargePersonGroupGetTrainingStatusOptionalParams = { requestOptions: {} },
): Promise<FaceTrainingResult> {
  const result = await _getTrainingStatusSend(context, largePersonGroupId, options);
  return _getTrainingStatusDeserialize(result);
}

export function _getLargePersonGroupsSend(
  context: Client,
  options: LargePersonGroupGetLargePersonGroupsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largepersongroups{?start,top,returnRecognitionModel}",
    {
      start: options?.start,
      top: options?.top,
      returnRecognitionModel: options?.returnRecognitionModel,
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

export async function _getLargePersonGroupsDeserialize(
  result: PathUncheckedResponse,
): Promise<LargePersonGroup[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return largePersonGroupArrayDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/get-large-person-groups for more details. */
export async function getLargePersonGroups(
  context: Client,
  options: LargePersonGroupGetLargePersonGroupsOptionalParams = { requestOptions: {} },
): Promise<LargePersonGroup[]> {
  const result = await _getLargePersonGroupsSend(context, options);
  return _getLargePersonGroupsDeserialize(result);
}

export function _updateSend(
  context: Client,
  largePersonGroupId: string,
  options: LargePersonGroupUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largepersongroups/{largePersonGroupId}",
    {
      largePersonGroupId: largePersonGroupId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: { name: options?.name, userData: options?.userData },
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/update-large-person-group for more details. */
export async function update(
  context: Client,
  largePersonGroupId: string,
  options: LargePersonGroupUpdateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateSend(context, largePersonGroupId, options);
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  largePersonGroupId: string,
  options: LargePersonGroupGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largepersongroups/{largePersonGroupId}{?returnRecognitionModel}",
    {
      largePersonGroupId: largePersonGroupId,
      returnRecognitionModel: options?.returnRecognitionModel,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<LargePersonGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return largePersonGroupDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/get-large-person-group for more details. */
export async function get(
  context: Client,
  largePersonGroupId: string,
  options: LargePersonGroupGetOptionalParams = { requestOptions: {} },
): Promise<LargePersonGroup> {
  const result = await _getSend(context, largePersonGroupId, options);
  return _getDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  largePersonGroupId: string,
  options: LargePersonGroupDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largepersongroups/{largePersonGroupId}",
    {
      largePersonGroupId: largePersonGroupId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/delete-large-person-group for more details. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  largePersonGroupId: string,
  options: LargePersonGroupDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, largePersonGroupId, options);
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  largePersonGroupId: string,
  name: string,
  options: LargePersonGroupCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largepersongroups/{largePersonGroupId}",
    {
      largePersonGroupId: largePersonGroupId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: {
        name: name,
        userData: options?.userData,
        recognitionModel: options?.recognitionModel,
      },
    });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/create-large-person-group for more details. */
export async function create(
  context: Client,
  largePersonGroupId: string,
  name: string,
  options: LargePersonGroupCreateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _createSend(context, largePersonGroupId, name, options);
  return _createDeserialize(result);
}
