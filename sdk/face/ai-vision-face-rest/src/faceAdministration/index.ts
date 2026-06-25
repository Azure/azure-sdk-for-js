// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { FaceAdministrationClient } from "./faceAdministrationClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  FaceAdministrationContext,
  FaceAdministrationClientOptionalParams,
} from "./api/index.js";
export type {
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
} from "./api/largeFaceList/index.js";
export type {
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
} from "./api/largePersonGroup/index.js";
export type { LargeFaceListOperations, LargePersonGroupOperations } from "./classic/index.js";
