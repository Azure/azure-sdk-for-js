// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FaceAdministrationContext as Client } from "../index.js";
import {
  faceErrorResponseDeserializer,
  LargeFaceList,
  largeFaceListDeserializer,
  FaceTrainingResult,
  faceTrainingResultDeserializer,
  AddFaceResult,
  addFaceResultDeserializer,
  LargeFaceListFace,
  largeFaceListFaceDeserializer,
  largeFaceListArrayDeserializer,
  largeFaceListFaceArrayDeserializer,
} from "../../../models/models.js";
import { getLongRunningPoller } from "../../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  LargeFaceListGetFacesOptionalParams,
  LargeFaceListUpdateFaceOptionalParams,
  LargeFaceListGetFaceOptionalParams,
  LargeFaceListDeleteFaceOptionalParams,
  LargeFaceListAddFaceOptionalParams,
  LargeFaceListAddFaceFromUrlOptionalParams,
  LargeFaceListTrainOptionalParams,
  LargeFaceListGetTrainingStatusOptionalParams,
  LargeFaceListGetLargeFaceListsOptionalParams,
  LargeFaceListUpdateOptionalParams,
  LargeFaceListGetOptionalParams,
  LargeFaceListDeleteOptionalParams,
  LargeFaceListCreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _getFacesSend(
  context: Client,
  largeFaceListId: string,
  options: LargeFaceListGetFacesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largefacelists/{largeFaceListId}/persistedfaces{?start,top}",
    {
      largeFaceListId: largeFaceListId,
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

export async function _getFacesDeserialize(
  result: PathUncheckedResponse,
): Promise<LargeFaceListFace[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return largeFaceListFaceArrayDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/get-large-face-list-faces for more details. */
export async function getFaces(
  context: Client,
  largeFaceListId: string,
  options: LargeFaceListGetFacesOptionalParams = { requestOptions: {} },
): Promise<LargeFaceListFace[]> {
  const result = await _getFacesSend(context, largeFaceListId, options);
  return _getFacesDeserialize(result);
}

export function _updateFaceSend(
  context: Client,
  largeFaceListId: string,
  persistedFaceId: string,
  options: LargeFaceListUpdateFaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largefacelists/{largeFaceListId}/persistedfaces/{persistedFaceId}",
    {
      largeFaceListId: largeFaceListId,
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

/** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/update-large-face-list-face for more details. */
export async function updateFace(
  context: Client,
  largeFaceListId: string,
  persistedFaceId: string,
  options: LargeFaceListUpdateFaceOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateFaceSend(context, largeFaceListId, persistedFaceId, options);
  return _updateFaceDeserialize(result);
}

export function _getFaceSend(
  context: Client,
  largeFaceListId: string,
  persistedFaceId: string,
  options: LargeFaceListGetFaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largefacelists/{largeFaceListId}/persistedfaces/{persistedFaceId}",
    {
      largeFaceListId: largeFaceListId,
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
): Promise<LargeFaceListFace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return largeFaceListFaceDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/get-large-face-list-face for more details. */
export async function getFace(
  context: Client,
  largeFaceListId: string,
  persistedFaceId: string,
  options: LargeFaceListGetFaceOptionalParams = { requestOptions: {} },
): Promise<LargeFaceListFace> {
  const result = await _getFaceSend(context, largeFaceListId, persistedFaceId, options);
  return _getFaceDeserialize(result);
}

export function _deleteFaceSend(
  context: Client,
  largeFaceListId: string,
  persistedFaceId: string,
  options: LargeFaceListDeleteFaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largefacelists/{largeFaceListId}/persistedfaces/{persistedFaceId}",
    {
      largeFaceListId: largeFaceListId,
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

/** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/delete-large-face-list-face for more details. */
export async function deleteFace(
  context: Client,
  largeFaceListId: string,
  persistedFaceId: string,
  options: LargeFaceListDeleteFaceOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteFaceSend(context, largeFaceListId, persistedFaceId, options);
  return _deleteFaceDeserialize(result);
}

export function _addFaceSend(
  context: Client,
  largeFaceListId: string,
  imageContent: Uint8Array,
  options: LargeFaceListAddFaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largefacelists/{largeFaceListId}/persistedfaces{?targetFace,detectionModel,userData}",
    {
      largeFaceListId: largeFaceListId,
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

/** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/add-large-face-list-face for more details. */
export async function addFace(
  context: Client,
  largeFaceListId: string,
  imageContent: Uint8Array,
  options: LargeFaceListAddFaceOptionalParams = { requestOptions: {} },
): Promise<AddFaceResult> {
  const result = await _addFaceSend(context, largeFaceListId, imageContent, options);
  return _addFaceDeserialize(result);
}

export function _addFaceFromUrlSend(
  context: Client,
  largeFaceListId: string,
  url: string,
  options: LargeFaceListAddFaceFromUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largefacelists/{largeFaceListId}/persistedfaces{?targetFace,detectionModel,userData}",
    {
      largeFaceListId: largeFaceListId,
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

/** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/add-large-face-list-face-from-url for more details. */
export async function addFaceFromUrl(
  context: Client,
  largeFaceListId: string,
  url: string,
  options: LargeFaceListAddFaceFromUrlOptionalParams = { requestOptions: {} },
): Promise<AddFaceResult> {
  const result = await _addFaceFromUrlSend(context, largeFaceListId, url, options);
  return _addFaceFromUrlDeserialize(result);
}

export function _trainSend(
  context: Client,
  largeFaceListId: string,
  options: LargeFaceListTrainOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largefacelists/{largeFaceListId}/train",
    {
      largeFaceListId: largeFaceListId,
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

/** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/train-large-face-list for more details. */
export function train(
  context: Client,
  largeFaceListId: string,
  options: LargeFaceListTrainOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _trainDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _trainSend(context, largeFaceListId, options),
  }) as PollerLike<OperationState<void>, void>;
}

export function _getTrainingStatusSend(
  context: Client,
  largeFaceListId: string,
  options: LargeFaceListGetTrainingStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largefacelists/{largeFaceListId}/training",
    {
      largeFaceListId: largeFaceListId,
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

/** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/get-large-face-list-training-status for more details. */
export async function getTrainingStatus(
  context: Client,
  largeFaceListId: string,
  options: LargeFaceListGetTrainingStatusOptionalParams = { requestOptions: {} },
): Promise<FaceTrainingResult> {
  const result = await _getTrainingStatusSend(context, largeFaceListId, options);
  return _getTrainingStatusDeserialize(result);
}

export function _getLargeFaceListsSend(
  context: Client,
  options: LargeFaceListGetLargeFaceListsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largefacelists{?start,top,returnRecognitionModel}",
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

export async function _getLargeFaceListsDeserialize(
  result: PathUncheckedResponse,
): Promise<LargeFaceList[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return largeFaceListArrayDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/get-large-face-lists for more details. */
export async function getLargeFaceLists(
  context: Client,
  options: LargeFaceListGetLargeFaceListsOptionalParams = { requestOptions: {} },
): Promise<LargeFaceList[]> {
  const result = await _getLargeFaceListsSend(context, options);
  return _getLargeFaceListsDeserialize(result);
}

export function _updateSend(
  context: Client,
  largeFaceListId: string,
  options: LargeFaceListUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largefacelists/{largeFaceListId}",
    {
      largeFaceListId: largeFaceListId,
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

/** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/update-large-face-list for more details. */
export async function update(
  context: Client,
  largeFaceListId: string,
  options: LargeFaceListUpdateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateSend(context, largeFaceListId, options);
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  largeFaceListId: string,
  options: LargeFaceListGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largefacelists/{largeFaceListId}{?returnRecognitionModel}",
    {
      largeFaceListId: largeFaceListId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<LargeFaceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = faceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return largeFaceListDeserializer(result.body);
}

/** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/get-large-face-list for more details. */
export async function get(
  context: Client,
  largeFaceListId: string,
  options: LargeFaceListGetOptionalParams = { requestOptions: {} },
): Promise<LargeFaceList> {
  const result = await _getSend(context, largeFaceListId, options);
  return _getDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  largeFaceListId: string,
  options: LargeFaceListDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largefacelists/{largeFaceListId}",
    {
      largeFaceListId: largeFaceListId,
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

/** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/delete-large-face-list for more details. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  largeFaceListId: string,
  options: LargeFaceListDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, largeFaceListId, options);
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  largeFaceListId: string,
  name: string,
  options: LargeFaceListCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/largefacelists/{largeFaceListId}",
    {
      largeFaceListId: largeFaceListId,
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

/** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/create-large-face-list for more details. */
export async function create(
  context: Client,
  largeFaceListId: string,
  name: string,
  options: LargeFaceListCreateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _createSend(context, largeFaceListId, name, options);
  return _createDeserialize(result);
}
