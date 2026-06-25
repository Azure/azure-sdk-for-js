// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type { FaceSessionContext, FaceSessionClientOptionalParams } from "./faceSessionContext.js";
export { createFaceSession } from "./faceSessionContext.js";
export {
  getSessionImage,
  detectFromSessionImage,
  getLivenessWithVerifySessionResult,
  deleteLivenessWithVerifySession,
  createLivenessWithVerifySession,
  getLivenessSessionResult,
  deleteLivenessSession,
  createLivenessSession,
} from "./operations.js";
export type {
  GetSessionImageOptionalParams,
  DetectFromSessionImageOptionalParams,
  GetLivenessWithVerifySessionResultOptionalParams,
  DeleteLivenessWithVerifySessionOptionalParams,
  CreateLivenessWithVerifySessionOptionalParams,
  GetLivenessSessionResultOptionalParams,
  DeleteLivenessSessionOptionalParams,
  CreateLivenessSessionOptionalParams,
} from "./options.js";
