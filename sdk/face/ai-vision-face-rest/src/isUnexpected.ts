// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DetectFromUrl200Response,
  DetectFromUrlDefaultResponse,
  Detect200Response,
  DetectDefaultResponse,
  DetectFromSessionImageId200Response,
  DetectFromSessionImageIdDefaultResponse,
  FindSimilar200Response,
  FindSimilarDefaultResponse,
  FindSimilarFromFaceList200Response,
  FindSimilarFromFaceListDefaultResponse,
  FindSimilarFromLargeFaceList200Response,
  FindSimilarFromLargeFaceListDefaultResponse,
  IdentifyFromPersonGroup200Response,
  IdentifyFromPersonGroupDefaultResponse,
  IdentifyFromLargePersonGroup200Response,
  IdentifyFromLargePersonGroupDefaultResponse,
  IdentifyFromPersonDirectory200Response,
  IdentifyFromPersonDirectoryDefaultResponse,
  IdentifyFromDynamicPersonGroup200Response,
  IdentifyFromDynamicPersonGroupDefaultResponse,
  VerifyFaceToFace200Response,
  VerifyFaceToFaceDefaultResponse,
  VerifyFromPersonGroup200Response,
  VerifyFromPersonGroupDefaultResponse,
  VerifyFromLargePersonGroup200Response,
  VerifyFromLargePersonGroupDefaultResponse,
  VerifyFromPersonDirectory200Response,
  VerifyFromPersonDirectoryDefaultResponse,
  Group200Response,
  GroupDefaultResponse,
  CreateFaceList200Response,
  CreateFaceListDefaultResponse,
  DeleteFaceList200Response,
  DeleteFaceListDefaultResponse,
  GetFaceList200Response,
  GetFaceListDefaultResponse,
  UpdateFaceList200Response,
  UpdateFaceListDefaultResponse,
  GetFaceLists200Response,
  GetFaceListsDefaultResponse,
  AddFaceListFaceFromUrl200Response,
  AddFaceListFaceFromUrlDefaultResponse,
  AddFaceListFace200Response,
  AddFaceListFaceDefaultResponse,
  DeleteFaceListFace200Response,
  DeleteFaceListFaceDefaultResponse,
  CreateLargeFaceList200Response,
  CreateLargeFaceListDefaultResponse,
  DeleteLargeFaceList200Response,
  DeleteLargeFaceListDefaultResponse,
  GetLargeFaceList200Response,
  GetLargeFaceListDefaultResponse,
  UpdateLargeFaceList200Response,
  UpdateLargeFaceListDefaultResponse,
  GetLargeFaceLists200Response,
  GetLargeFaceListsDefaultResponse,
  GetLargeFaceListTrainingStatus200Response,
  GetLargeFaceListTrainingStatusDefaultResponse,
  TrainLargeFaceList202Response,
  TrainLargeFaceListLogicalResponse,
  TrainLargeFaceListDefaultResponse,
  AddLargeFaceListFaceFromUrl200Response,
  AddLargeFaceListFaceFromUrlDefaultResponse,
  AddLargeFaceListFace200Response,
  AddLargeFaceListFaceDefaultResponse,
  GetLargeFaceListFaces200Response,
  GetLargeFaceListFacesDefaultResponse,
  DeleteLargeFaceListFace200Response,
  DeleteLargeFaceListFaceDefaultResponse,
  GetLargeFaceListFace200Response,
  GetLargeFaceListFaceDefaultResponse,
  UpdateLargeFaceListFace200Response,
  UpdateLargeFaceListFaceDefaultResponse,
  CreatePersonGroup200Response,
  CreatePersonGroupDefaultResponse,
  DeletePersonGroup200Response,
  DeletePersonGroupDefaultResponse,
  GetPersonGroup200Response,
  GetPersonGroupDefaultResponse,
  UpdatePersonGroup200Response,
  UpdatePersonGroupDefaultResponse,
  GetPersonGroups200Response,
  GetPersonGroupsDefaultResponse,
  GetPersonGroupTrainingStatus200Response,
  GetPersonGroupTrainingStatusDefaultResponse,
  TrainPersonGroup202Response,
  TrainPersonGroupLogicalResponse,
  TrainPersonGroupDefaultResponse,
  CreatePersonGroupPerson200Response,
  CreatePersonGroupPersonDefaultResponse,
  GetPersonGroupPersons200Response,
  GetPersonGroupPersonsDefaultResponse,
  DeletePersonGroupPerson200Response,
  DeletePersonGroupPersonDefaultResponse,
  GetPersonGroupPerson200Response,
  GetPersonGroupPersonDefaultResponse,
  UpdatePersonGroupPerson200Response,
  UpdatePersonGroupPersonDefaultResponse,
  AddPersonGroupPersonFaceFromUrl200Response,
  AddPersonGroupPersonFaceFromUrlDefaultResponse,
  AddPersonGroupPersonFace200Response,
  AddPersonGroupPersonFaceDefaultResponse,
  DeletePersonGroupPersonFace200Response,
  DeletePersonGroupPersonFaceDefaultResponse,
  GetPersonGroupPersonFace200Response,
  GetPersonGroupPersonFaceDefaultResponse,
  UpdatePersonGroupPersonFace200Response,
  UpdatePersonGroupPersonFaceDefaultResponse,
  CreateLargePersonGroup200Response,
  CreateLargePersonGroupDefaultResponse,
  DeleteLargePersonGroup200Response,
  DeleteLargePersonGroupDefaultResponse,
  GetLargePersonGroup200Response,
  GetLargePersonGroupDefaultResponse,
  UpdateLargePersonGroup200Response,
  UpdateLargePersonGroupDefaultResponse,
  GetLargePersonGroups200Response,
  GetLargePersonGroupsDefaultResponse,
  GetLargePersonGroupTrainingStatus200Response,
  GetLargePersonGroupTrainingStatusDefaultResponse,
  TrainLargePersonGroup202Response,
  TrainLargePersonGroupLogicalResponse,
  TrainLargePersonGroupDefaultResponse,
  CreateLargePersonGroupPerson200Response,
  CreateLargePersonGroupPersonDefaultResponse,
  GetLargePersonGroupPersons200Response,
  GetLargePersonGroupPersonsDefaultResponse,
  DeleteLargePersonGroupPerson200Response,
  DeleteLargePersonGroupPersonDefaultResponse,
  GetLargePersonGroupPerson200Response,
  GetLargePersonGroupPersonDefaultResponse,
  UpdateLargePersonGroupPerson200Response,
  UpdateLargePersonGroupPersonDefaultResponse,
  AddLargePersonGroupPersonFaceFromUrl200Response,
  AddLargePersonGroupPersonFaceFromUrlDefaultResponse,
  AddLargePersonGroupPersonFace200Response,
  AddLargePersonGroupPersonFaceDefaultResponse,
  DeleteLargePersonGroupPersonFace200Response,
  DeleteLargePersonGroupPersonFaceDefaultResponse,
  GetLargePersonGroupPersonFace200Response,
  GetLargePersonGroupPersonFaceDefaultResponse,
  UpdateLargePersonGroupPersonFace200Response,
  UpdateLargePersonGroupPersonFaceDefaultResponse,
  CreateLivenessSession200Response,
  CreateLivenessSessionDefaultResponse,
  DeleteLivenessSession204Response,
  DeleteLivenessSessionDefaultResponse,
  GetLivenessSessionResult200Response,
  GetLivenessSessionResultDefaultResponse,
  CreateLivenessWithVerifySession200Response,
  CreateLivenessWithVerifySessionDefaultResponse,
  DeleteLivenessWithVerifySession204Response,
  DeleteLivenessWithVerifySessionDefaultResponse,
  GetLivenessWithVerifySessionResult200Response,
  GetLivenessWithVerifySessionResultDefaultResponse,
  GetSessionImage200Response,
  GetSessionImageDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "POST /detect": ["200"],
  "POST /findsimilars": ["200"],
  "POST /identify": ["200"],
  "POST /verify": ["200"],
  "POST /group": ["200"],
  "PUT /facelists/{faceListId}": ["200"],
  "DELETE /facelists/{faceListId}": ["200"],
  "GET /facelists/{faceListId}": ["200"],
  "PATCH /facelists/{faceListId}": ["200"],
  "GET /facelists": ["200"],
  "POST /facelists/{faceListId}/persistedfaces": ["200"],
  "DELETE /facelists/{faceListId}/persistedfaces/{persistedFaceId}": ["200"],
  "PUT /largefacelists/{largeFaceListId}": ["200"],
  "DELETE /largefacelists/{largeFaceListId}": ["200"],
  "GET /largefacelists/{largeFaceListId}": ["200"],
  "PATCH /largefacelists/{largeFaceListId}": ["200"],
  "GET /largefacelists": ["200"],
  "GET /largefacelists/{largeFaceListId}/training": ["200"],
  "GET /largefacelists/{largeFaceListId}/train": ["200", "202"],
  "POST /largefacelists/{largeFaceListId}/train": ["202"],
  "POST /largefacelists/{largeFaceListId}/persistedfaces": ["200"],
  "GET /largefacelists/{largeFaceListId}/persistedfaces": ["200"],
  "DELETE /largefacelists/{largeFaceListId}/persistedfaces/{persistedFaceId}": [
    "200",
  ],
  "GET /largefacelists/{largeFaceListId}/persistedfaces/{persistedFaceId}": [
    "200",
  ],
  "PATCH /largefacelists/{largeFaceListId}/persistedfaces/{persistedFaceId}": [
    "200",
  ],
  "PUT /persongroups/{personGroupId}": ["200"],
  "DELETE /persongroups/{personGroupId}": ["200"],
  "GET /persongroups/{personGroupId}": ["200"],
  "PATCH /persongroups/{personGroupId}": ["200"],
  "GET /persongroups": ["200"],
  "GET /persongroups/{personGroupId}/training": ["200"],
  "GET /persongroups/{personGroupId}/train": ["200", "202"],
  "POST /persongroups/{personGroupId}/train": ["202"],
  "POST /persongroups/{personGroupId}/persons": ["200"],
  "GET /persongroups/{personGroupId}/persons": ["200"],
  "DELETE /persongroups/{personGroupId}/persons/{personId}": ["200"],
  "GET /persongroups/{personGroupId}/persons/{personId}": ["200"],
  "PATCH /persongroups/{personGroupId}/persons/{personId}": ["200"],
  "POST /persongroups/{personGroupId}/persons/{personId}/persistedfaces": [
    "200",
  ],
  "DELETE /persongroups/{personGroupId}/persons/{personId}/persistedfaces/{persistedFaceId}":
    ["200"],
  "GET /persongroups/{personGroupId}/persons/{personId}/persistedfaces/{persistedFaceId}":
    ["200"],
  "PATCH /persongroups/{personGroupId}/persons/{personId}/persistedfaces/{persistedFaceId}":
    ["200"],
  "PUT /largepersongroups/{largePersonGroupId}": ["200"],
  "DELETE /largepersongroups/{largePersonGroupId}": ["200"],
  "GET /largepersongroups/{largePersonGroupId}": ["200"],
  "PATCH /largepersongroups/{largePersonGroupId}": ["200"],
  "GET /largepersongroups": ["200"],
  "GET /largepersongroups/{largePersonGroupId}/training": ["200"],
  "GET /largepersongroups/{largePersonGroupId}/train": ["200", "202"],
  "POST /largepersongroups/{largePersonGroupId}/train": ["202"],
  "POST /largepersongroups/{largePersonGroupId}/persons": ["200"],
  "GET /largepersongroups/{largePersonGroupId}/persons": ["200"],
  "DELETE /largepersongroups/{largePersonGroupId}/persons/{personId}": ["200"],
  "GET /largepersongroups/{largePersonGroupId}/persons/{personId}": ["200"],
  "PATCH /largepersongroups/{largePersonGroupId}/persons/{personId}": ["200"],
  "POST /largepersongroups/{largePersonGroupId}/persons/{personId}/persistedfaces":
    ["200"],
  "DELETE /largepersongroups/{largePersonGroupId}/persons/{personId}/persistedfaces/{persistedFaceId}":
    ["200"],
  "GET /largepersongroups/{largePersonGroupId}/persons/{personId}/persistedfaces/{persistedFaceId}":
    ["200"],
  "PATCH /largepersongroups/{largePersonGroupId}/persons/{personId}/persistedfaces/{persistedFaceId}":
    ["200"],
  "POST /detectLiveness-sessions": ["200"],
  "DELETE /detectLiveness-sessions/{sessionId}": ["204"],
  "GET /detectLiveness-sessions/{sessionId}": ["200"],
  "POST /detectLivenessWithVerify-sessions": ["200"],
  "DELETE /detectLivenessWithVerify-sessions/{sessionId}": ["204"],
  "GET /detectLivenessWithVerify-sessions/{sessionId}": ["200"],
  "GET /sessionImages/{sessionImageId}": ["200"],
};

export function isUnexpected(
  response: DetectFromUrl200Response | DetectFromUrlDefaultResponse,
): response is DetectFromUrlDefaultResponse;
export function isUnexpected(
  response: Detect200Response | DetectDefaultResponse,
): response is DetectDefaultResponse;
export function isUnexpected(
  response:
    | DetectFromSessionImageId200Response
    | DetectFromSessionImageIdDefaultResponse,
): response is DetectFromSessionImageIdDefaultResponse;
export function isUnexpected(
  response: FindSimilar200Response | FindSimilarDefaultResponse,
): response is FindSimilarDefaultResponse;
export function isUnexpected(
  response:
    | FindSimilarFromFaceList200Response
    | FindSimilarFromFaceListDefaultResponse,
): response is FindSimilarFromFaceListDefaultResponse;
export function isUnexpected(
  response:
    | FindSimilarFromLargeFaceList200Response
    | FindSimilarFromLargeFaceListDefaultResponse,
): response is FindSimilarFromLargeFaceListDefaultResponse;
export function isUnexpected(
  response:
    | IdentifyFromPersonGroup200Response
    | IdentifyFromPersonGroupDefaultResponse,
): response is IdentifyFromPersonGroupDefaultResponse;
export function isUnexpected(
  response:
    | IdentifyFromLargePersonGroup200Response
    | IdentifyFromLargePersonGroupDefaultResponse,
): response is IdentifyFromLargePersonGroupDefaultResponse;
export function isUnexpected(
  response:
    | IdentifyFromPersonDirectory200Response
    | IdentifyFromPersonDirectoryDefaultResponse,
): response is IdentifyFromPersonDirectoryDefaultResponse;
export function isUnexpected(
  response:
    | IdentifyFromDynamicPersonGroup200Response
    | IdentifyFromDynamicPersonGroupDefaultResponse,
): response is IdentifyFromDynamicPersonGroupDefaultResponse;
export function isUnexpected(
  response: VerifyFaceToFace200Response | VerifyFaceToFaceDefaultResponse,
): response is VerifyFaceToFaceDefaultResponse;
export function isUnexpected(
  response:
    | VerifyFromPersonGroup200Response
    | VerifyFromPersonGroupDefaultResponse,
): response is VerifyFromPersonGroupDefaultResponse;
export function isUnexpected(
  response:
    | VerifyFromLargePersonGroup200Response
    | VerifyFromLargePersonGroupDefaultResponse,
): response is VerifyFromLargePersonGroupDefaultResponse;
export function isUnexpected(
  response:
    | VerifyFromPersonDirectory200Response
    | VerifyFromPersonDirectoryDefaultResponse,
): response is VerifyFromPersonDirectoryDefaultResponse;
export function isUnexpected(
  response: Group200Response | GroupDefaultResponse,
): response is GroupDefaultResponse;
export function isUnexpected(
  response: CreateFaceList200Response | CreateFaceListDefaultResponse,
): response is CreateFaceListDefaultResponse;
export function isUnexpected(
  response: DeleteFaceList200Response | DeleteFaceListDefaultResponse,
): response is DeleteFaceListDefaultResponse;
export function isUnexpected(
  response: GetFaceList200Response | GetFaceListDefaultResponse,
): response is GetFaceListDefaultResponse;
export function isUnexpected(
  response: UpdateFaceList200Response | UpdateFaceListDefaultResponse,
): response is UpdateFaceListDefaultResponse;
export function isUnexpected(
  response: GetFaceLists200Response | GetFaceListsDefaultResponse,
): response is GetFaceListsDefaultResponse;
export function isUnexpected(
  response:
    | AddFaceListFaceFromUrl200Response
    | AddFaceListFaceFromUrlDefaultResponse,
): response is AddFaceListFaceFromUrlDefaultResponse;
export function isUnexpected(
  response: AddFaceListFace200Response | AddFaceListFaceDefaultResponse,
): response is AddFaceListFaceDefaultResponse;
export function isUnexpected(
  response: DeleteFaceListFace200Response | DeleteFaceListFaceDefaultResponse,
): response is DeleteFaceListFaceDefaultResponse;
export function isUnexpected(
  response: CreateLargeFaceList200Response | CreateLargeFaceListDefaultResponse,
): response is CreateLargeFaceListDefaultResponse;
export function isUnexpected(
  response: DeleteLargeFaceList200Response | DeleteLargeFaceListDefaultResponse,
): response is DeleteLargeFaceListDefaultResponse;
export function isUnexpected(
  response: GetLargeFaceList200Response | GetLargeFaceListDefaultResponse,
): response is GetLargeFaceListDefaultResponse;
export function isUnexpected(
  response: UpdateLargeFaceList200Response | UpdateLargeFaceListDefaultResponse,
): response is UpdateLargeFaceListDefaultResponse;
export function isUnexpected(
  response: GetLargeFaceLists200Response | GetLargeFaceListsDefaultResponse,
): response is GetLargeFaceListsDefaultResponse;
export function isUnexpected(
  response:
    | GetLargeFaceListTrainingStatus200Response
    | GetLargeFaceListTrainingStatusDefaultResponse,
): response is GetLargeFaceListTrainingStatusDefaultResponse;
export function isUnexpected(
  response:
    | TrainLargeFaceList202Response
    | TrainLargeFaceListLogicalResponse
    | TrainLargeFaceListDefaultResponse,
): response is TrainLargeFaceListDefaultResponse;
export function isUnexpected(
  response:
    | AddLargeFaceListFaceFromUrl200Response
    | AddLargeFaceListFaceFromUrlDefaultResponse,
): response is AddLargeFaceListFaceFromUrlDefaultResponse;
export function isUnexpected(
  response:
    | AddLargeFaceListFace200Response
    | AddLargeFaceListFaceDefaultResponse,
): response is AddLargeFaceListFaceDefaultResponse;
export function isUnexpected(
  response:
    | GetLargeFaceListFaces200Response
    | GetLargeFaceListFacesDefaultResponse,
): response is GetLargeFaceListFacesDefaultResponse;
export function isUnexpected(
  response:
    | DeleteLargeFaceListFace200Response
    | DeleteLargeFaceListFaceDefaultResponse,
): response is DeleteLargeFaceListFaceDefaultResponse;
export function isUnexpected(
  response:
    | GetLargeFaceListFace200Response
    | GetLargeFaceListFaceDefaultResponse,
): response is GetLargeFaceListFaceDefaultResponse;
export function isUnexpected(
  response:
    | UpdateLargeFaceListFace200Response
    | UpdateLargeFaceListFaceDefaultResponse,
): response is UpdateLargeFaceListFaceDefaultResponse;
export function isUnexpected(
  response: CreatePersonGroup200Response | CreatePersonGroupDefaultResponse,
): response is CreatePersonGroupDefaultResponse;
export function isUnexpected(
  response: DeletePersonGroup200Response | DeletePersonGroupDefaultResponse,
): response is DeletePersonGroupDefaultResponse;
export function isUnexpected(
  response: GetPersonGroup200Response | GetPersonGroupDefaultResponse,
): response is GetPersonGroupDefaultResponse;
export function isUnexpected(
  response: UpdatePersonGroup200Response | UpdatePersonGroupDefaultResponse,
): response is UpdatePersonGroupDefaultResponse;
export function isUnexpected(
  response: GetPersonGroups200Response | GetPersonGroupsDefaultResponse,
): response is GetPersonGroupsDefaultResponse;
export function isUnexpected(
  response:
    | GetPersonGroupTrainingStatus200Response
    | GetPersonGroupTrainingStatusDefaultResponse,
): response is GetPersonGroupTrainingStatusDefaultResponse;
export function isUnexpected(
  response:
    | TrainPersonGroup202Response
    | TrainPersonGroupLogicalResponse
    | TrainPersonGroupDefaultResponse,
): response is TrainPersonGroupDefaultResponse;
export function isUnexpected(
  response:
    | CreatePersonGroupPerson200Response
    | CreatePersonGroupPersonDefaultResponse,
): response is CreatePersonGroupPersonDefaultResponse;
export function isUnexpected(
  response:
    | GetPersonGroupPersons200Response
    | GetPersonGroupPersonsDefaultResponse,
): response is GetPersonGroupPersonsDefaultResponse;
export function isUnexpected(
  response:
    | DeletePersonGroupPerson200Response
    | DeletePersonGroupPersonDefaultResponse,
): response is DeletePersonGroupPersonDefaultResponse;
export function isUnexpected(
  response:
    | GetPersonGroupPerson200Response
    | GetPersonGroupPersonDefaultResponse,
): response is GetPersonGroupPersonDefaultResponse;
export function isUnexpected(
  response:
    | UpdatePersonGroupPerson200Response
    | UpdatePersonGroupPersonDefaultResponse,
): response is UpdatePersonGroupPersonDefaultResponse;
export function isUnexpected(
  response:
    | AddPersonGroupPersonFaceFromUrl200Response
    | AddPersonGroupPersonFaceFromUrlDefaultResponse,
): response is AddPersonGroupPersonFaceFromUrlDefaultResponse;
export function isUnexpected(
  response:
    | AddPersonGroupPersonFace200Response
    | AddPersonGroupPersonFaceDefaultResponse,
): response is AddPersonGroupPersonFaceDefaultResponse;
export function isUnexpected(
  response:
    | DeletePersonGroupPersonFace200Response
    | DeletePersonGroupPersonFaceDefaultResponse,
): response is DeletePersonGroupPersonFaceDefaultResponse;
export function isUnexpected(
  response:
    | GetPersonGroupPersonFace200Response
    | GetPersonGroupPersonFaceDefaultResponse,
): response is GetPersonGroupPersonFaceDefaultResponse;
export function isUnexpected(
  response:
    | UpdatePersonGroupPersonFace200Response
    | UpdatePersonGroupPersonFaceDefaultResponse,
): response is UpdatePersonGroupPersonFaceDefaultResponse;
export function isUnexpected(
  response:
    | CreateLargePersonGroup200Response
    | CreateLargePersonGroupDefaultResponse,
): response is CreateLargePersonGroupDefaultResponse;
export function isUnexpected(
  response:
    | DeleteLargePersonGroup200Response
    | DeleteLargePersonGroupDefaultResponse,
): response is DeleteLargePersonGroupDefaultResponse;
export function isUnexpected(
  response: GetLargePersonGroup200Response | GetLargePersonGroupDefaultResponse,
): response is GetLargePersonGroupDefaultResponse;
export function isUnexpected(
  response:
    | UpdateLargePersonGroup200Response
    | UpdateLargePersonGroupDefaultResponse,
): response is UpdateLargePersonGroupDefaultResponse;
export function isUnexpected(
  response:
    | GetLargePersonGroups200Response
    | GetLargePersonGroupsDefaultResponse,
): response is GetLargePersonGroupsDefaultResponse;
export function isUnexpected(
  response:
    | GetLargePersonGroupTrainingStatus200Response
    | GetLargePersonGroupTrainingStatusDefaultResponse,
): response is GetLargePersonGroupTrainingStatusDefaultResponse;
export function isUnexpected(
  response:
    | TrainLargePersonGroup202Response
    | TrainLargePersonGroupLogicalResponse
    | TrainLargePersonGroupDefaultResponse,
): response is TrainLargePersonGroupDefaultResponse;
export function isUnexpected(
  response:
    | CreateLargePersonGroupPerson200Response
    | CreateLargePersonGroupPersonDefaultResponse,
): response is CreateLargePersonGroupPersonDefaultResponse;
export function isUnexpected(
  response:
    | GetLargePersonGroupPersons200Response
    | GetLargePersonGroupPersonsDefaultResponse,
): response is GetLargePersonGroupPersonsDefaultResponse;
export function isUnexpected(
  response:
    | DeleteLargePersonGroupPerson200Response
    | DeleteLargePersonGroupPersonDefaultResponse,
): response is DeleteLargePersonGroupPersonDefaultResponse;
export function isUnexpected(
  response:
    | GetLargePersonGroupPerson200Response
    | GetLargePersonGroupPersonDefaultResponse,
): response is GetLargePersonGroupPersonDefaultResponse;
export function isUnexpected(
  response:
    | UpdateLargePersonGroupPerson200Response
    | UpdateLargePersonGroupPersonDefaultResponse,
): response is UpdateLargePersonGroupPersonDefaultResponse;
export function isUnexpected(
  response:
    | AddLargePersonGroupPersonFaceFromUrl200Response
    | AddLargePersonGroupPersonFaceFromUrlDefaultResponse,
): response is AddLargePersonGroupPersonFaceFromUrlDefaultResponse;
export function isUnexpected(
  response:
    | AddLargePersonGroupPersonFace200Response
    | AddLargePersonGroupPersonFaceDefaultResponse,
): response is AddLargePersonGroupPersonFaceDefaultResponse;
export function isUnexpected(
  response:
    | DeleteLargePersonGroupPersonFace200Response
    | DeleteLargePersonGroupPersonFaceDefaultResponse,
): response is DeleteLargePersonGroupPersonFaceDefaultResponse;
export function isUnexpected(
  response:
    | GetLargePersonGroupPersonFace200Response
    | GetLargePersonGroupPersonFaceDefaultResponse,
): response is GetLargePersonGroupPersonFaceDefaultResponse;
export function isUnexpected(
  response:
    | UpdateLargePersonGroupPersonFace200Response
    | UpdateLargePersonGroupPersonFaceDefaultResponse,
): response is UpdateLargePersonGroupPersonFaceDefaultResponse;
export function isUnexpected(
  response:
    | CreateLivenessSession200Response
    | CreateLivenessSessionDefaultResponse,
): response is CreateLivenessSessionDefaultResponse;
export function isUnexpected(
  response:
    | DeleteLivenessSession204Response
    | DeleteLivenessSessionDefaultResponse,
): response is DeleteLivenessSessionDefaultResponse;
export function isUnexpected(
  response:
    | GetLivenessSessionResult200Response
    | GetLivenessSessionResultDefaultResponse,
): response is GetLivenessSessionResultDefaultResponse;
export function isUnexpected(
  response:
    | CreateLivenessWithVerifySession200Response
    | CreateLivenessWithVerifySessionDefaultResponse,
): response is CreateLivenessWithVerifySessionDefaultResponse;
export function isUnexpected(
  response:
    | DeleteLivenessWithVerifySession204Response
    | DeleteLivenessWithVerifySessionDefaultResponse,
): response is DeleteLivenessWithVerifySessionDefaultResponse;
export function isUnexpected(
  response:
    | GetLivenessWithVerifySessionResult200Response
    | GetLivenessWithVerifySessionResultDefaultResponse,
): response is GetLivenessWithVerifySessionResultDefaultResponse;
export function isUnexpected(
  response: GetSessionImage200Response | GetSessionImageDefaultResponse,
): response is GetSessionImageDefaultResponse;
export function isUnexpected(
  response:
    | DetectFromUrl200Response
    | DetectFromUrlDefaultResponse
    | Detect200Response
    | DetectDefaultResponse
    | DetectFromSessionImageId200Response
    | DetectFromSessionImageIdDefaultResponse
    | FindSimilar200Response
    | FindSimilarDefaultResponse
    | FindSimilarFromFaceList200Response
    | FindSimilarFromFaceListDefaultResponse
    | FindSimilarFromLargeFaceList200Response
    | FindSimilarFromLargeFaceListDefaultResponse
    | IdentifyFromPersonGroup200Response
    | IdentifyFromPersonGroupDefaultResponse
    | IdentifyFromLargePersonGroup200Response
    | IdentifyFromLargePersonGroupDefaultResponse
    | IdentifyFromPersonDirectory200Response
    | IdentifyFromPersonDirectoryDefaultResponse
    | IdentifyFromDynamicPersonGroup200Response
    | IdentifyFromDynamicPersonGroupDefaultResponse
    | VerifyFaceToFace200Response
    | VerifyFaceToFaceDefaultResponse
    | VerifyFromPersonGroup200Response
    | VerifyFromPersonGroupDefaultResponse
    | VerifyFromLargePersonGroup200Response
    | VerifyFromLargePersonGroupDefaultResponse
    | VerifyFromPersonDirectory200Response
    | VerifyFromPersonDirectoryDefaultResponse
    | Group200Response
    | GroupDefaultResponse
    | CreateFaceList200Response
    | CreateFaceListDefaultResponse
    | DeleteFaceList200Response
    | DeleteFaceListDefaultResponse
    | GetFaceList200Response
    | GetFaceListDefaultResponse
    | UpdateFaceList200Response
    | UpdateFaceListDefaultResponse
    | GetFaceLists200Response
    | GetFaceListsDefaultResponse
    | AddFaceListFaceFromUrl200Response
    | AddFaceListFaceFromUrlDefaultResponse
    | AddFaceListFace200Response
    | AddFaceListFaceDefaultResponse
    | DeleteFaceListFace200Response
    | DeleteFaceListFaceDefaultResponse
    | CreateLargeFaceList200Response
    | CreateLargeFaceListDefaultResponse
    | DeleteLargeFaceList200Response
    | DeleteLargeFaceListDefaultResponse
    | GetLargeFaceList200Response
    | GetLargeFaceListDefaultResponse
    | UpdateLargeFaceList200Response
    | UpdateLargeFaceListDefaultResponse
    | GetLargeFaceLists200Response
    | GetLargeFaceListsDefaultResponse
    | GetLargeFaceListTrainingStatus200Response
    | GetLargeFaceListTrainingStatusDefaultResponse
    | TrainLargeFaceList202Response
    | TrainLargeFaceListLogicalResponse
    | TrainLargeFaceListDefaultResponse
    | AddLargeFaceListFaceFromUrl200Response
    | AddLargeFaceListFaceFromUrlDefaultResponse
    | AddLargeFaceListFace200Response
    | AddLargeFaceListFaceDefaultResponse
    | GetLargeFaceListFaces200Response
    | GetLargeFaceListFacesDefaultResponse
    | DeleteLargeFaceListFace200Response
    | DeleteLargeFaceListFaceDefaultResponse
    | GetLargeFaceListFace200Response
    | GetLargeFaceListFaceDefaultResponse
    | UpdateLargeFaceListFace200Response
    | UpdateLargeFaceListFaceDefaultResponse
    | CreatePersonGroup200Response
    | CreatePersonGroupDefaultResponse
    | DeletePersonGroup200Response
    | DeletePersonGroupDefaultResponse
    | GetPersonGroup200Response
    | GetPersonGroupDefaultResponse
    | UpdatePersonGroup200Response
    | UpdatePersonGroupDefaultResponse
    | GetPersonGroups200Response
    | GetPersonGroupsDefaultResponse
    | GetPersonGroupTrainingStatus200Response
    | GetPersonGroupTrainingStatusDefaultResponse
    | TrainPersonGroup202Response
    | TrainPersonGroupLogicalResponse
    | TrainPersonGroupDefaultResponse
    | CreatePersonGroupPerson200Response
    | CreatePersonGroupPersonDefaultResponse
    | GetPersonGroupPersons200Response
    | GetPersonGroupPersonsDefaultResponse
    | DeletePersonGroupPerson200Response
    | DeletePersonGroupPersonDefaultResponse
    | GetPersonGroupPerson200Response
    | GetPersonGroupPersonDefaultResponse
    | UpdatePersonGroupPerson200Response
    | UpdatePersonGroupPersonDefaultResponse
    | AddPersonGroupPersonFaceFromUrl200Response
    | AddPersonGroupPersonFaceFromUrlDefaultResponse
    | AddPersonGroupPersonFace200Response
    | AddPersonGroupPersonFaceDefaultResponse
    | DeletePersonGroupPersonFace200Response
    | DeletePersonGroupPersonFaceDefaultResponse
    | GetPersonGroupPersonFace200Response
    | GetPersonGroupPersonFaceDefaultResponse
    | UpdatePersonGroupPersonFace200Response
    | UpdatePersonGroupPersonFaceDefaultResponse
    | CreateLargePersonGroup200Response
    | CreateLargePersonGroupDefaultResponse
    | DeleteLargePersonGroup200Response
    | DeleteLargePersonGroupDefaultResponse
    | GetLargePersonGroup200Response
    | GetLargePersonGroupDefaultResponse
    | UpdateLargePersonGroup200Response
    | UpdateLargePersonGroupDefaultResponse
    | GetLargePersonGroups200Response
    | GetLargePersonGroupsDefaultResponse
    | GetLargePersonGroupTrainingStatus200Response
    | GetLargePersonGroupTrainingStatusDefaultResponse
    | TrainLargePersonGroup202Response
    | TrainLargePersonGroupLogicalResponse
    | TrainLargePersonGroupDefaultResponse
    | CreateLargePersonGroupPerson200Response
    | CreateLargePersonGroupPersonDefaultResponse
    | GetLargePersonGroupPersons200Response
    | GetLargePersonGroupPersonsDefaultResponse
    | DeleteLargePersonGroupPerson200Response
    | DeleteLargePersonGroupPersonDefaultResponse
    | GetLargePersonGroupPerson200Response
    | GetLargePersonGroupPersonDefaultResponse
    | UpdateLargePersonGroupPerson200Response
    | UpdateLargePersonGroupPersonDefaultResponse
    | AddLargePersonGroupPersonFaceFromUrl200Response
    | AddLargePersonGroupPersonFaceFromUrlDefaultResponse
    | AddLargePersonGroupPersonFace200Response
    | AddLargePersonGroupPersonFaceDefaultResponse
    | DeleteLargePersonGroupPersonFace200Response
    | DeleteLargePersonGroupPersonFaceDefaultResponse
    | GetLargePersonGroupPersonFace200Response
    | GetLargePersonGroupPersonFaceDefaultResponse
    | UpdateLargePersonGroupPersonFace200Response
    | UpdateLargePersonGroupPersonFaceDefaultResponse
    | CreateLivenessSession200Response
    | CreateLivenessSessionDefaultResponse
    | DeleteLivenessSession204Response
    | DeleteLivenessSessionDefaultResponse
    | GetLivenessSessionResult200Response
    | GetLivenessSessionResultDefaultResponse
    | CreateLivenessWithVerifySession200Response
    | CreateLivenessWithVerifySessionDefaultResponse
    | DeleteLivenessWithVerifySession204Response
    | DeleteLivenessWithVerifySessionDefaultResponse
    | GetLivenessWithVerifySessionResult200Response
    | GetLivenessWithVerifySessionResultDefaultResponse
    | GetSessionImage200Response
    | GetSessionImageDefaultResponse,
): response is
  | DetectFromUrlDefaultResponse
  | DetectDefaultResponse
  | DetectFromSessionImageIdDefaultResponse
  | FindSimilarDefaultResponse
  | FindSimilarFromFaceListDefaultResponse
  | FindSimilarFromLargeFaceListDefaultResponse
  | IdentifyFromPersonGroupDefaultResponse
  | IdentifyFromLargePersonGroupDefaultResponse
  | IdentifyFromPersonDirectoryDefaultResponse
  | IdentifyFromDynamicPersonGroupDefaultResponse
  | VerifyFaceToFaceDefaultResponse
  | VerifyFromPersonGroupDefaultResponse
  | VerifyFromLargePersonGroupDefaultResponse
  | VerifyFromPersonDirectoryDefaultResponse
  | GroupDefaultResponse
  | CreateFaceListDefaultResponse
  | DeleteFaceListDefaultResponse
  | GetFaceListDefaultResponse
  | UpdateFaceListDefaultResponse
  | GetFaceListsDefaultResponse
  | AddFaceListFaceFromUrlDefaultResponse
  | AddFaceListFaceDefaultResponse
  | DeleteFaceListFaceDefaultResponse
  | CreateLargeFaceListDefaultResponse
  | DeleteLargeFaceListDefaultResponse
  | GetLargeFaceListDefaultResponse
  | UpdateLargeFaceListDefaultResponse
  | GetLargeFaceListsDefaultResponse
  | GetLargeFaceListTrainingStatusDefaultResponse
  | TrainLargeFaceListDefaultResponse
  | AddLargeFaceListFaceFromUrlDefaultResponse
  | AddLargeFaceListFaceDefaultResponse
  | GetLargeFaceListFacesDefaultResponse
  | DeleteLargeFaceListFaceDefaultResponse
  | GetLargeFaceListFaceDefaultResponse
  | UpdateLargeFaceListFaceDefaultResponse
  | CreatePersonGroupDefaultResponse
  | DeletePersonGroupDefaultResponse
  | GetPersonGroupDefaultResponse
  | UpdatePersonGroupDefaultResponse
  | GetPersonGroupsDefaultResponse
  | GetPersonGroupTrainingStatusDefaultResponse
  | TrainPersonGroupDefaultResponse
  | CreatePersonGroupPersonDefaultResponse
  | GetPersonGroupPersonsDefaultResponse
  | DeletePersonGroupPersonDefaultResponse
  | GetPersonGroupPersonDefaultResponse
  | UpdatePersonGroupPersonDefaultResponse
  | AddPersonGroupPersonFaceFromUrlDefaultResponse
  | AddPersonGroupPersonFaceDefaultResponse
  | DeletePersonGroupPersonFaceDefaultResponse
  | GetPersonGroupPersonFaceDefaultResponse
  | UpdatePersonGroupPersonFaceDefaultResponse
  | CreateLargePersonGroupDefaultResponse
  | DeleteLargePersonGroupDefaultResponse
  | GetLargePersonGroupDefaultResponse
  | UpdateLargePersonGroupDefaultResponse
  | GetLargePersonGroupsDefaultResponse
  | GetLargePersonGroupTrainingStatusDefaultResponse
  | TrainLargePersonGroupDefaultResponse
  | CreateLargePersonGroupPersonDefaultResponse
  | GetLargePersonGroupPersonsDefaultResponse
  | DeleteLargePersonGroupPersonDefaultResponse
  | GetLargePersonGroupPersonDefaultResponse
  | UpdateLargePersonGroupPersonDefaultResponse
  | AddLargePersonGroupPersonFaceFromUrlDefaultResponse
  | AddLargePersonGroupPersonFaceDefaultResponse
  | DeleteLargePersonGroupPersonFaceDefaultResponse
  | GetLargePersonGroupPersonFaceDefaultResponse
  | UpdateLargePersonGroupPersonFaceDefaultResponse
  | CreateLivenessSessionDefaultResponse
  | DeleteLivenessSessionDefaultResponse
  | GetLivenessSessionResultDefaultResponse
  | CreateLivenessWithVerifySessionDefaultResponse
  | DeleteLivenessWithVerifySessionDefaultResponse
  | GetLivenessWithVerifySessionResultDefaultResponse
  | GetSessionImageDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function getParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: string[] = [];

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (
      let i = candidateParts.length - 1, j = pathParts.length - 1;
      i >= 1 && j >= 1;
      i--, j--
    ) {
      if (
        candidateParts[i]?.startsWith("{") &&
        candidateParts[i]?.indexOf("}") !== -1
      ) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(
          `${candidateParts[i]?.slice(start, end)}`,
        ).test(pathParts[j] || "");

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
