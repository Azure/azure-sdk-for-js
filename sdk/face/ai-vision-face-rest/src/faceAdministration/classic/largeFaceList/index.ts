// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FaceAdministrationContext } from "../../api/faceAdministrationContext.js";
import {
  LargeFaceList,
  FaceTrainingResult,
  AddFaceResult,
  LargeFaceListFace,
} from "../../../models/models.js";
import {
  getFaces,
  updateFace,
  getFace,
  deleteFace,
  addFace,
  addFaceFromUrl,
  train,
  getTrainingStatus,
  getLargeFaceLists,
  update,
  get,
  $delete,
  create,
} from "../../api/largeFaceList/operations.js";
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
} from "../../api/largeFaceList/options.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LargeFaceList operations. */
export interface LargeFaceListOperations {
  /** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/get-large-face-list-faces for more details. */
  getFaces: (
    largeFaceListId: string,
    options?: LargeFaceListGetFacesOptionalParams,
  ) => Promise<LargeFaceListFace[]>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/update-large-face-list-face for more details. */
  updateFace: (
    largeFaceListId: string,
    persistedFaceId: string,
    options?: LargeFaceListUpdateFaceOptionalParams,
  ) => Promise<void>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/get-large-face-list-face for more details. */
  getFace: (
    largeFaceListId: string,
    persistedFaceId: string,
    options?: LargeFaceListGetFaceOptionalParams,
  ) => Promise<LargeFaceListFace>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/delete-large-face-list-face for more details. */
  deleteFace: (
    largeFaceListId: string,
    persistedFaceId: string,
    options?: LargeFaceListDeleteFaceOptionalParams,
  ) => Promise<void>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/add-large-face-list-face for more details. */
  addFace: (
    largeFaceListId: string,
    imageContent: Uint8Array,
    options?: LargeFaceListAddFaceOptionalParams,
  ) => Promise<AddFaceResult>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/add-large-face-list-face-from-url for more details. */
  addFaceFromUrl: (
    largeFaceListId: string,
    url: string,
    options?: LargeFaceListAddFaceFromUrlOptionalParams,
  ) => Promise<AddFaceResult>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/train-large-face-list for more details. */
  train: (
    largeFaceListId: string,
    options?: LargeFaceListTrainOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/get-large-face-list-training-status for more details. */
  getTrainingStatus: (
    largeFaceListId: string,
    options?: LargeFaceListGetTrainingStatusOptionalParams,
  ) => Promise<FaceTrainingResult>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/get-large-face-lists for more details. */
  getLargeFaceLists: (
    options?: LargeFaceListGetLargeFaceListsOptionalParams,
  ) => Promise<LargeFaceList[]>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/update-large-face-list for more details. */
  update: (largeFaceListId: string, options?: LargeFaceListUpdateOptionalParams) => Promise<void>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/get-large-face-list for more details. */
  get: (
    largeFaceListId: string,
    options?: LargeFaceListGetOptionalParams,
  ) => Promise<LargeFaceList>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/delete-large-face-list for more details. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (largeFaceListId: string, options?: LargeFaceListDeleteOptionalParams) => Promise<void>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/face-list-operations/create-large-face-list for more details. */
  create: (
    largeFaceListId: string,
    name: string,
    options?: LargeFaceListCreateOptionalParams,
  ) => Promise<void>;
}

function _getLargeFaceList(context: FaceAdministrationContext) {
  return {
    getFaces: (largeFaceListId: string, options?: LargeFaceListGetFacesOptionalParams) =>
      getFaces(context, largeFaceListId, options),
    updateFace: (
      largeFaceListId: string,
      persistedFaceId: string,
      options?: LargeFaceListUpdateFaceOptionalParams,
    ) => updateFace(context, largeFaceListId, persistedFaceId, options),
    getFace: (
      largeFaceListId: string,
      persistedFaceId: string,
      options?: LargeFaceListGetFaceOptionalParams,
    ) => getFace(context, largeFaceListId, persistedFaceId, options),
    deleteFace: (
      largeFaceListId: string,
      persistedFaceId: string,
      options?: LargeFaceListDeleteFaceOptionalParams,
    ) => deleteFace(context, largeFaceListId, persistedFaceId, options),
    addFace: (
      largeFaceListId: string,
      imageContent: Uint8Array,
      options?: LargeFaceListAddFaceOptionalParams,
    ) => addFace(context, largeFaceListId, imageContent, options),
    addFaceFromUrl: (
      largeFaceListId: string,
      url: string,
      options?: LargeFaceListAddFaceFromUrlOptionalParams,
    ) => addFaceFromUrl(context, largeFaceListId, url, options),
    train: (largeFaceListId: string, options?: LargeFaceListTrainOptionalParams) =>
      train(context, largeFaceListId, options),
    getTrainingStatus: (
      largeFaceListId: string,
      options?: LargeFaceListGetTrainingStatusOptionalParams,
    ) => getTrainingStatus(context, largeFaceListId, options),
    getLargeFaceLists: (options?: LargeFaceListGetLargeFaceListsOptionalParams) =>
      getLargeFaceLists(context, options),
    update: (largeFaceListId: string, options?: LargeFaceListUpdateOptionalParams) =>
      update(context, largeFaceListId, options),
    get: (largeFaceListId: string, options?: LargeFaceListGetOptionalParams) =>
      get(context, largeFaceListId, options),
    delete: (largeFaceListId: string, options?: LargeFaceListDeleteOptionalParams) =>
      $delete(context, largeFaceListId, options),
    create: (largeFaceListId: string, name: string, options?: LargeFaceListCreateOptionalParams) =>
      create(context, largeFaceListId, name, options),
  };
}

export function _getLargeFaceListOperations(
  context: FaceAdministrationContext,
): LargeFaceListOperations {
  return {
    ..._getLargeFaceList(context),
  };
}
