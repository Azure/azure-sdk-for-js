// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FaceAdministrationContext } from "../../api/faceAdministrationContext.js";
import {
  FaceTrainingResult,
  AddFaceResult,
  LargePersonGroup,
  CreatePersonResult,
  LargePersonGroupPerson,
  LargePersonGroupPersonFace,
} from "../../../models/models.js";
import {
  updateFace,
  getFace,
  deleteFace,
  addFace,
  addFaceFromUrl,
  getPersons,
  updatePerson,
  getPerson,
  deletePerson,
  createPerson,
  train,
  getTrainingStatus,
  getLargePersonGroups,
  update,
  get,
  $delete,
  create,
} from "../../api/largePersonGroup/operations.js";
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
} from "../../api/largePersonGroup/options.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LargePersonGroup operations. */
export interface LargePersonGroupOperations {
  /** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/update-large-person-group-person-face for more details. */
  updateFace: (
    largePersonGroupId: string,
    personId: string,
    persistedFaceId: string,
    options?: LargePersonGroupUpdateFaceOptionalParams,
  ) => Promise<void>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/get-large-person-group-person-face for more details. */
  getFace: (
    largePersonGroupId: string,
    personId: string,
    persistedFaceId: string,
    options?: LargePersonGroupGetFaceOptionalParams,
  ) => Promise<LargePersonGroupPersonFace>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/delete-large-person-group-person-face for more details. */
  deleteFace: (
    largePersonGroupId: string,
    personId: string,
    persistedFaceId: string,
    options?: LargePersonGroupDeleteFaceOptionalParams,
  ) => Promise<void>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/add-large-person-group-person-face for more details. */
  addFace: (
    largePersonGroupId: string,
    personId: string,
    imageContent: Uint8Array,
    options?: LargePersonGroupAddFaceOptionalParams,
  ) => Promise<AddFaceResult>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/add-large-person-group-person-face-from-url for more details. */
  addFaceFromUrl: (
    largePersonGroupId: string,
    personId: string,
    url: string,
    options?: LargePersonGroupAddFaceFromUrlOptionalParams,
  ) => Promise<AddFaceResult>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/get-large-person-group-persons for more details. */
  getPersons: (
    largePersonGroupId: string,
    options?: LargePersonGroupGetPersonsOptionalParams,
  ) => Promise<LargePersonGroupPerson[]>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/update-large-person-group-person for more details. */
  updatePerson: (
    largePersonGroupId: string,
    personId: string,
    options?: LargePersonGroupUpdatePersonOptionalParams,
  ) => Promise<void>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/get-large-person-group-person for more details. */
  getPerson: (
    largePersonGroupId: string,
    personId: string,
    options?: LargePersonGroupGetPersonOptionalParams,
  ) => Promise<LargePersonGroupPerson>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/delete-large-person-group-person for more details. */
  deletePerson: (
    largePersonGroupId: string,
    personId: string,
    options?: LargePersonGroupDeletePersonOptionalParams,
  ) => Promise<void>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/create-large-person-group-person for more details. */
  createPerson: (
    largePersonGroupId: string,
    name: string,
    options?: LargePersonGroupCreatePersonOptionalParams,
  ) => Promise<CreatePersonResult>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/train-large-person-group for more details. */
  train: (
    largePersonGroupId: string,
    options?: LargePersonGroupTrainOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/get-large-person-group-training-status for more details. */
  getTrainingStatus: (
    largePersonGroupId: string,
    options?: LargePersonGroupGetTrainingStatusOptionalParams,
  ) => Promise<FaceTrainingResult>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/get-large-person-groups for more details. */
  getLargePersonGroups: (
    options?: LargePersonGroupGetLargePersonGroupsOptionalParams,
  ) => Promise<LargePersonGroup[]>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/update-large-person-group for more details. */
  update: (
    largePersonGroupId: string,
    options?: LargePersonGroupUpdateOptionalParams,
  ) => Promise<void>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/get-large-person-group for more details. */
  get: (
    largePersonGroupId: string,
    options?: LargePersonGroupGetOptionalParams,
  ) => Promise<LargePersonGroup>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/delete-large-person-group for more details. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    largePersonGroupId: string,
    options?: LargePersonGroupDeleteOptionalParams,
  ) => Promise<void>;
  /** Please refer to https://learn.microsoft.com/rest/api/face/person-group-operations/create-large-person-group for more details. */
  create: (
    largePersonGroupId: string,
    name: string,
    options?: LargePersonGroupCreateOptionalParams,
  ) => Promise<void>;
}

function _getLargePersonGroup(context: FaceAdministrationContext) {
  return {
    updateFace: (
      largePersonGroupId: string,
      personId: string,
      persistedFaceId: string,
      options?: LargePersonGroupUpdateFaceOptionalParams,
    ) => updateFace(context, largePersonGroupId, personId, persistedFaceId, options),
    getFace: (
      largePersonGroupId: string,
      personId: string,
      persistedFaceId: string,
      options?: LargePersonGroupGetFaceOptionalParams,
    ) => getFace(context, largePersonGroupId, personId, persistedFaceId, options),
    deleteFace: (
      largePersonGroupId: string,
      personId: string,
      persistedFaceId: string,
      options?: LargePersonGroupDeleteFaceOptionalParams,
    ) => deleteFace(context, largePersonGroupId, personId, persistedFaceId, options),
    addFace: (
      largePersonGroupId: string,
      personId: string,
      imageContent: Uint8Array,
      options?: LargePersonGroupAddFaceOptionalParams,
    ) => addFace(context, largePersonGroupId, personId, imageContent, options),
    addFaceFromUrl: (
      largePersonGroupId: string,
      personId: string,
      url: string,
      options?: LargePersonGroupAddFaceFromUrlOptionalParams,
    ) => addFaceFromUrl(context, largePersonGroupId, personId, url, options),
    getPersons: (largePersonGroupId: string, options?: LargePersonGroupGetPersonsOptionalParams) =>
      getPersons(context, largePersonGroupId, options),
    updatePerson: (
      largePersonGroupId: string,
      personId: string,
      options?: LargePersonGroupUpdatePersonOptionalParams,
    ) => updatePerson(context, largePersonGroupId, personId, options),
    getPerson: (
      largePersonGroupId: string,
      personId: string,
      options?: LargePersonGroupGetPersonOptionalParams,
    ) => getPerson(context, largePersonGroupId, personId, options),
    deletePerson: (
      largePersonGroupId: string,
      personId: string,
      options?: LargePersonGroupDeletePersonOptionalParams,
    ) => deletePerson(context, largePersonGroupId, personId, options),
    createPerson: (
      largePersonGroupId: string,
      name: string,
      options?: LargePersonGroupCreatePersonOptionalParams,
    ) => createPerson(context, largePersonGroupId, name, options),
    train: (largePersonGroupId: string, options?: LargePersonGroupTrainOptionalParams) =>
      train(context, largePersonGroupId, options),
    getTrainingStatus: (
      largePersonGroupId: string,
      options?: LargePersonGroupGetTrainingStatusOptionalParams,
    ) => getTrainingStatus(context, largePersonGroupId, options),
    getLargePersonGroups: (options?: LargePersonGroupGetLargePersonGroupsOptionalParams) =>
      getLargePersonGroups(context, options),
    update: (largePersonGroupId: string, options?: LargePersonGroupUpdateOptionalParams) =>
      update(context, largePersonGroupId, options),
    get: (largePersonGroupId: string, options?: LargePersonGroupGetOptionalParams) =>
      get(context, largePersonGroupId, options),
    delete: (largePersonGroupId: string, options?: LargePersonGroupDeleteOptionalParams) =>
      $delete(context, largePersonGroupId, options),
    create: (
      largePersonGroupId: string,
      name: string,
      options?: LargePersonGroupCreateOptionalParams,
    ) => create(context, largePersonGroupId, name, options),
  };
}

export function _getLargePersonGroupOperations(
  context: FaceAdministrationContext,
): LargePersonGroupOperations {
  return {
    ..._getLargePersonGroup(context),
  };
}
