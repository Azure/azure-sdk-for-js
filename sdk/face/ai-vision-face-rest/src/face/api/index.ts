// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type { FaceContext, FaceClientOptionalParams } from "./faceContext.js";
export { createFace } from "./faceContext.js";
export {
  verifyFromLargePersonGroup,
  identifyFromLargePersonGroup,
  findSimilarFromLargeFaceList,
  group,
  verifyFaceToFace,
  findSimilar,
  detect,
  detectFromUrl,
} from "./operations.js";
export type {
  VerifyFromLargePersonGroupOptionalParams,
  IdentifyFromLargePersonGroupOptionalParams,
  FindSimilarFromLargeFaceListOptionalParams,
  GroupOptionalParams,
  VerifyFaceToFaceOptionalParams,
  FindSimilarOptionalParams,
  DetectOptionalParams,
  DetectFromUrlOptionalParams,
} from "./options.js";
