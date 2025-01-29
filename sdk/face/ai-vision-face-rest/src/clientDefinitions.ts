// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DetectFromUrlParameters,
  DetectParameters,
  DetectFromSessionImageIdParameters,
  FindSimilarParameters,
  FindSimilarFromFaceListParameters,
  FindSimilarFromLargeFaceListParameters,
  IdentifyFromPersonGroupParameters,
  IdentifyFromLargePersonGroupParameters,
  IdentifyFromPersonDirectoryParameters,
  IdentifyFromDynamicPersonGroupParameters,
  VerifyFaceToFaceParameters,
  VerifyFromPersonGroupParameters,
  VerifyFromLargePersonGroupParameters,
  VerifyFromPersonDirectoryParameters,
  GroupParameters,
  CreateFaceListParameters,
  DeleteFaceListParameters,
  GetFaceListParameters,
  UpdateFaceListParameters,
  GetFaceListsParameters,
  AddFaceListFaceFromUrlParameters,
  AddFaceListFaceParameters,
  DeleteFaceListFaceParameters,
  CreateLargeFaceListParameters,
  DeleteLargeFaceListParameters,
  GetLargeFaceListParameters,
  UpdateLargeFaceListParameters,
  GetLargeFaceListsParameters,
  GetLargeFaceListTrainingStatusParameters,
  TrainLargeFaceListParameters,
  AddLargeFaceListFaceFromUrlParameters,
  AddLargeFaceListFaceParameters,
  GetLargeFaceListFacesParameters,
  DeleteLargeFaceListFaceParameters,
  GetLargeFaceListFaceParameters,
  UpdateLargeFaceListFaceParameters,
  CreatePersonGroupParameters,
  DeletePersonGroupParameters,
  GetPersonGroupParameters,
  UpdatePersonGroupParameters,
  GetPersonGroupsParameters,
  GetPersonGroupTrainingStatusParameters,
  TrainPersonGroupParameters,
  CreatePersonGroupPersonParameters,
  GetPersonGroupPersonsParameters,
  DeletePersonGroupPersonParameters,
  GetPersonGroupPersonParameters,
  UpdatePersonGroupPersonParameters,
  AddPersonGroupPersonFaceFromUrlParameters,
  AddPersonGroupPersonFaceParameters,
  DeletePersonGroupPersonFaceParameters,
  GetPersonGroupPersonFaceParameters,
  UpdatePersonGroupPersonFaceParameters,
  CreateLargePersonGroupParameters,
  DeleteLargePersonGroupParameters,
  GetLargePersonGroupParameters,
  UpdateLargePersonGroupParameters,
  GetLargePersonGroupsParameters,
  GetLargePersonGroupTrainingStatusParameters,
  TrainLargePersonGroupParameters,
  CreateLargePersonGroupPersonParameters,
  GetLargePersonGroupPersonsParameters,
  DeleteLargePersonGroupPersonParameters,
  GetLargePersonGroupPersonParameters,
  UpdateLargePersonGroupPersonParameters,
  AddLargePersonGroupPersonFaceFromUrlParameters,
  AddLargePersonGroupPersonFaceParameters,
  DeleteLargePersonGroupPersonFaceParameters,
  GetLargePersonGroupPersonFaceParameters,
  UpdateLargePersonGroupPersonFaceParameters,
  CreateLivenessSessionParameters,
  DeleteLivenessSessionParameters,
  GetLivenessSessionResultParameters,
  CreateLivenessWithVerifySessionParameters,
  DeleteLivenessWithVerifySessionParameters,
  GetLivenessWithVerifySessionResultParameters,
  GetSessionImageParameters,
} from "./parameters.js";
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
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface DetectFromUrl {
  /**
   * > [!IMPORTANT]
   * > Microsoft has retired or limited facial recognition capabilities that can be used to try to infer emotional states and identity attributes which, if misused, can subject people to stereotyping, discrimination or unfair denial of services. The retired capabilities are emotion and gender. The limited capabilities are age, smile, facial hair, hair and makeup. Email [Azure Face API](mailto:azureface@microsoft.com) if you have a responsible use case that would benefit from the use of any of the limited capabilities. Read more about this decision [here](https://azure.microsoft.com/blog/responsible-ai-investments-and-safeguards-for-facial-recognition/).
   *
   * *
   *   * No image will be stored. Only the extracted face feature(s) will be stored on server. The faceId is an identifier of the face feature and will be used in "Identify", "Verify", and "Find Similar". The stored face features will expire and be deleted at the time specified by faceIdTimeToLive after the original detection call.
   *   * Optional parameters include faceId, landmarks, and attributes. Attributes include headPose, glasses, occlusion, accessories, blur, exposure, noise, mask, and qualityForRecognition. Some of the results returned for specific attributes may not be highly accurate.
   *   * JPEG, PNG, GIF (the first frame), and BMP format are supported. The allowed image file size is from 1KB to 6MB.
   *   * The minimum detectable face size is 36x36 pixels in an image no larger than 1920x1080 pixels. Images with dimensions higher than 1920x1080 pixels will need a proportionally larger minimum face size.
   *   * Up to 100 faces can be returned for an image. Faces are ranked by face rectangle size from large to small.
   *   * For optimal results when querying "Identify", "Verify", and "Find Similar" ('returnFaceId' is true), please use faces that are: frontal, clear, and with a minimum size of 200x200 pixels (100 pixels between eyes).
   *   * Different 'detectionModel' values can be provided. The availability of landmarks and supported attributes depends on the detection model specified. To use and compare different detection models, please refer to [here](https://learn.microsoft.com/azure/ai-services/computer-vision/how-to/specify-detection-model).
   *   * Different 'recognitionModel' values are provided. If follow-up operations like "Verify", "Identify", "Find Similar" are needed, please specify the recognition model with 'recognitionModel' parameter. The default value for 'recognitionModel' is 'recognition_01', if latest model needed, please explicitly specify the model you need in this parameter. Once specified, the detected faceIds will be associated with the specified recognition model. More details, please refer to [here](https://learn.microsoft.com/azure/ai-services/computer-vision/how-to/specify-recognition-model).
   */
  post(
    options: DetectFromUrlParameters,
  ): StreamableMethod<DetectFromUrl200Response | DetectFromUrlDefaultResponse>;
  /**
   * > [!IMPORTANT]
   * > Microsoft has retired or limited facial recognition capabilities that can be used to try to infer emotional states and identity attributes which, if misused, can subject people to stereotyping, discrimination or unfair denial of services. The retired capabilities are emotion and gender. The limited capabilities are age, smile, facial hair, hair and makeup. Email [Azure Face API](mailto:azureface@microsoft.com) if you have a responsible use case that would benefit from the use of any of the limited capabilities. Read more about this decision [here](https://azure.microsoft.com/blog/responsible-ai-investments-and-safeguards-for-facial-recognition/).
   *
   * *
   *   * No image will be stored. Only the extracted face feature(s) will be stored on server. The faceId is an identifier of the face feature and will be used in "Identify", "Verify", and "Find Similar". The stored face features will expire and be deleted at the time specified by faceIdTimeToLive after the original detection call.
   *   * Optional parameters include faceId, landmarks, and attributes. Attributes include headPose, glasses, occlusion, accessories, blur, exposure, noise, mask, and qualityForRecognition. Some of the results returned for specific attributes may not be highly accurate.
   *   * JPEG, PNG, GIF (the first frame), and BMP format are supported. The allowed image file size is from 1KB to 6MB.
   *   * The minimum detectable face size is 36x36 pixels in an image no larger than 1920x1080 pixels. Images with dimensions higher than 1920x1080 pixels will need a proportionally larger minimum face size.
   *   * Up to 100 faces can be returned for an image. Faces are ranked by face rectangle size from large to small.
   *   * For optimal results when querying "Identify", "Verify", and "Find Similar" ('returnFaceId' is true), please use faces that are: frontal, clear, and with a minimum size of 200x200 pixels (100 pixels between eyes).
   *   * Different 'detectionModel' values can be provided. The availability of landmarks and supported attributes depends on the detection model specified. To use and compare different detection models, please refer to [here](https://learn.microsoft.com/azure/ai-services/computer-vision/how-to/specify-detection-model).
   *   * Different 'recognitionModel' values are provided. If follow-up operations like "Verify", "Identify", "Find Similar" are needed, please specify the recognition model with 'recognitionModel' parameter. The default value for 'recognitionModel' is 'recognition_01', if latest model needed, please explicitly specify the model you need in this parameter. Once specified, the detected faceIds will be associated with the specified recognition model. More details, please refer to [here](https://learn.microsoft.com/azure/ai-services/computer-vision/how-to/specify-recognition-model).
   */
  post(options: DetectParameters): StreamableMethod<Detect200Response | DetectDefaultResponse>;
  /**
   * > [!IMPORTANT]
   * > Microsoft has retired or limited facial recognition capabilities that can be used to try to infer emotional states and identity attributes which, if misused, can subject people to stereotyping, discrimination or unfair denial of services. The retired capabilities are emotion and gender. The limited capabilities are age, smile, facial hair, hair and makeup. Email [Azure Face API](mailto:azureface@microsoft.com) if you have a responsible use case that would benefit from the use of any of the limited capabilities. Read more about this decision [here](https://azure.microsoft.com/blog/responsible-ai-investments-and-safeguards-for-facial-recognition/).
   *
   * *
   *   * No image will be stored. Only the extracted face feature(s) will be stored on server. The faceId is an identifier of the face feature and will be used in "Identify", "Verify", and "Find Similar". The stored face features will expire and be deleted at the time specified by faceIdTimeToLive after the original detection call.
   *   * Optional parameters include faceId, landmarks, and attributes. Attributes include headPose, glasses, occlusion, accessories, blur, exposure, noise, mask, and qualityForRecognition. Some of the results returned for specific attributes may not be highly accurate.
   *   * JPEG, PNG, GIF (the first frame), and BMP format are supported. The allowed image file size is from 1KB to 6MB.
   *   * The minimum detectable face size is 36x36 pixels in an image no larger than 1920x1080 pixels. Images with dimensions higher than 1920x1080 pixels will need a proportionally larger minimum face size.
   *   * Up to 100 faces can be returned for an image. Faces are ranked by face rectangle size from large to small.
   *   * For optimal results when querying "Identify", "Verify", and "Find Similar" ('returnFaceId' is true), please use faces that are: frontal, clear, and with a minimum size of 200x200 pixels (100 pixels between eyes).
   *   * Different 'detectionModel' values can be provided. The availability of landmarks and supported attributes depends on the detection model specified. To use and compare different detection models, please refer to [here](https://learn.microsoft.com/azure/ai-services/computer-vision/how-to/specify-detection-model).
   *   * Different 'recognitionModel' values are provided. If follow-up operations like "Verify", "Identify", "Find Similar" are needed, please specify the recognition model with 'recognitionModel' parameter. The default value for 'recognitionModel' is 'recognition_01', if latest model needed, please explicitly specify the model you need in this parameter. Once specified, the detected faceIds will be associated with the specified recognition model. More details, please refer to [here](https://learn.microsoft.com/azure/ai-services/computer-vision/how-to/specify-recognition-model).
   */
  post(
    options: DetectFromSessionImageIdParameters,
  ): StreamableMethod<
    DetectFromSessionImageId200Response | DetectFromSessionImageIdDefaultResponse
  >;
}

export interface FindSimilar {
  /**
   * Depending on the input the returned similar faces list contains faceIds or persistedFaceIds ranked by similarity.
   *
   * Find similar has two working modes, "matchPerson" and "matchFace". "matchPerson" is the default mode that it tries to find faces of the same person as possible by using internal same-person thresholds. It is useful to find a known person's other photos. Note that an empty list will be returned if no faces pass the internal thresholds. "matchFace" mode ignores same-person thresholds and returns ranked similar faces anyway, even the similarity is low. It can be used in the cases like searching celebrity-looking faces.
   *
   * The 'recognitionModel' associated with the query faceId should be the same as the 'recognitionModel' used by the target faceId array.
   */
  post(
    options: FindSimilarParameters,
  ): StreamableMethod<FindSimilar200Response | FindSimilarDefaultResponse>;
  /**
   * Depending on the input the returned similar faces list contains faceIds or persistedFaceIds ranked by similarity.
   *
   * Find similar has two working modes, "matchPerson" and "matchFace". "matchPerson" is the default mode that it tries to find faces of the same person as possible by using internal same-person thresholds. It is useful to find a known person's other photos. Note that an empty list will be returned if no faces pass the internal thresholds. "matchFace" mode ignores same-person thresholds and returns ranked similar faces anyway, even the similarity is low. It can be used in the cases like searching celebrity-looking faces.
   *
   * The 'recognitionModel' associated with the query faceId should be the same as the 'recognitionModel' used by the target Face List.
   */
  post(
    options: FindSimilarFromFaceListParameters,
  ): StreamableMethod<FindSimilarFromFaceList200Response | FindSimilarFromFaceListDefaultResponse>;
  /**
   * Depending on the input the returned similar faces list contains faceIds or persistedFaceIds ranked by similarity.
   *
   * Find similar has two working modes, "matchPerson" and "matchFace". "matchPerson" is the default mode that it tries to find faces of the same person as possible by using internal same-person thresholds. It is useful to find a known person's other photos. Note that an empty list will be returned if no faces pass the internal thresholds. "matchFace" mode ignores same-person thresholds and returns ranked similar faces anyway, even the similarity is low. It can be used in the cases like searching celebrity-looking faces.
   *
   * The 'recognitionModel' associated with the query faceId should be the same as the 'recognitionModel' used by the target Large Face List.
   */
  post(
    options: FindSimilarFromLargeFaceListParameters,
  ): StreamableMethod<
    FindSimilarFromLargeFaceList200Response | FindSimilarFromLargeFaceListDefaultResponse
  >;
}

export interface IdentifyFromPersonGroup {
  /**
   * For each face in the faceIds array, Face Identify will compute similarities between the query face and all the faces in the Person Group (given by personGroupId), and return candidate person(s) for that face ranked by similarity confidence. The Person Group should be trained to make it ready for identification. See more in "Train Person Group".
   * > [!NOTE]
   * >
   * > *
   * >   * The algorithm allows more than one face to be identified independently at the same request, but no more than 10 faces.
   * >   * Each person could have more than one face, but no more than 248 faces.
   * >   * Higher face image quality means better identification precision. Please consider high-quality faces: frontal, clear, and face size is 200x200 pixels (100 pixels between eyes) or bigger.
   * >   * Number of candidates returned is restricted by maxNumOfCandidatesReturned and confidenceThreshold. If no person is identified, the returned candidates will be an empty array.
   * >   * Try "Find Similar" when you need to find similar faces from a Face List/Large Face List instead of a Person Group.
   * >   * The 'recognitionModel' associated with the query faces' faceIds should be the same as the 'recognitionModel' used by the target Person Group.
   */
  post(
    options: IdentifyFromPersonGroupParameters,
  ): StreamableMethod<IdentifyFromPersonGroup200Response | IdentifyFromPersonGroupDefaultResponse>;
  /**
   * For each face in the faceIds array, Face Identify will compute similarities between the query face and all the faces in the Large Person Group (given by largePersonGroupId), and return candidate person(s) for that face ranked by similarity confidence. The Large Person Group should be trained to make it ready for identification. See more in "Train Large Person Group".
   * > [!NOTE]
   * >
   * > *
   * >   * The algorithm allows more than one face to be identified independently at the same request, but no more than 10 faces.
   * >   * Each person could have more than one face, but no more than 248 faces.
   * >   * Higher face image quality means better identification precision. Please consider high-quality faces: frontal, clear, and face size is 200x200 pixels (100 pixels between eyes) or bigger.
   * >   * Number of candidates returned is restricted by maxNumOfCandidatesReturned and confidenceThreshold. If no person is identified, the returned candidates will be an empty array.
   * >   * Try "Find Similar" when you need to find similar faces from a Face List/Large Face List instead of a Person Group/Large Person Group.
   * >   * The 'recognitionModel' associated with the query faces' faceIds should be the same as the 'recognitionModel' used by the target Person Group or Large Person Group.
   */
  post(
    options: IdentifyFromLargePersonGroupParameters,
  ): StreamableMethod<
    IdentifyFromLargePersonGroup200Response | IdentifyFromLargePersonGroupDefaultResponse
  >;
  /**
   * For each face in the faceIds array, Face Identify will compute similarities between the query face and all the faces in the Person Directory Persons (given by personIds), and return candidate person(s) for that face ranked by similarity confidence.
   * Passing personIds with an array with one element "*" can perform the operation over entire person directory.
   * > [!NOTE]
   * >
   * > *
   * >   * The algorithm allows more than one face to be identified independently at the same request, but no more than 10 faces.
   * >   * Each person could have more than one face, but no more than 248 faces.
   * >   * Higher face image quality means better identification precision. Please consider high-quality faces: frontal, clear, and face size is 200x200 pixels (100 pixels between eyes) or bigger.
   * >   * Number of candidates returned is restricted by maxNumOfCandidatesReturned and confidenceThreshold. If no person is identified, the returned candidates will be an empty array.
   * >   * The Identify operation can only match faces obtained with the same recognition model, that is associated with the query faces.
   */
  post(
    options: IdentifyFromPersonDirectoryParameters,
  ): StreamableMethod<
    IdentifyFromPersonDirectory200Response | IdentifyFromPersonDirectoryDefaultResponse
  >;
  /**
   * For each face in the faceIds array, Face Identify will compute similarities between the query face and all the faces in the Dynamic Person Group (given by dynamicPersonGroupId), and return candidate person(s) for that face ranked by similarity confidence.
   * > [!NOTE]
   * >
   * > *
   * >   * The algorithm allows more than one face to be identified independently at the same request, but no more than 10 faces.
   * >   * Each person could have more than one face, but no more than 248 faces.
   * >   * Higher face image quality means better identification precision. Please consider high-quality faces: frontal, clear, and face size is 200x200 pixels (100 pixels between eyes) or bigger.
   * >   * Number of candidates returned is restricted by maxNumOfCandidatesReturned and confidenceThreshold. If no person is identified, the returned candidates will be an empty array.
   * >   * The Identify operation can only match faces obtained with the same recognition model, that is associated with the query faces.
   */
  post(
    options: IdentifyFromDynamicPersonGroupParameters,
  ): StreamableMethod<
    IdentifyFromDynamicPersonGroup200Response | IdentifyFromDynamicPersonGroupDefaultResponse
  >;
}

export interface VerifyFaceToFace {
  /**
   * > [!NOTE]
   * >
   * > *
   * >   * Higher face image quality means better identification precision. Please consider high-quality faces: frontal, clear, and face size is 200x200 pixels (100 pixels between eyes) or bigger.
   * >   * For the scenarios that are sensitive to accuracy please make your own judgment.
   * >   * The 'recognitionModel' associated with the both faces should be the same.
   */
  post(
    options: VerifyFaceToFaceParameters,
  ): StreamableMethod<VerifyFaceToFace200Response | VerifyFaceToFaceDefaultResponse>;
  /**
   * > [!NOTE]
   * >
   * > *
   * >   * Higher face image quality means better identification precision. Please consider high-quality faces: frontal, clear, and face size is 200x200 pixels (100 pixels between eyes) or bigger.
   * >   * For the scenarios that are sensitive to accuracy please make your own judgment.
   * >   * The 'recognitionModel' associated with the query face should be the same as the 'recognitionModel' used by the Person Group.
   */
  post(
    options: VerifyFromPersonGroupParameters,
  ): StreamableMethod<VerifyFromPersonGroup200Response | VerifyFromPersonGroupDefaultResponse>;
  /**
   * > [!NOTE]
   * >
   * > *
   * >   * Higher face image quality means better identification precision. Please consider high-quality faces: frontal, clear, and face size is 200x200 pixels (100 pixels between eyes) or bigger.
   * >   * For the scenarios that are sensitive to accuracy please make your own judgment.
   * >   * The 'recognitionModel' associated with the query face should be the same as the 'recognitionModel' used by the Large Person Group.
   */
  post(
    options: VerifyFromLargePersonGroupParameters,
  ): StreamableMethod<
    VerifyFromLargePersonGroup200Response | VerifyFromLargePersonGroupDefaultResponse
  >;
  /**
   * > [!NOTE]
   * >
   * > *
   * >   * Higher face image quality means better identification precision. Please consider high-quality faces: frontal, clear, and face size is 200x200 pixels (100 pixels between eyes) or bigger.
   * >   * For the scenarios that are sensitive to accuracy please make your own judgment.
   * >   * The Verify operation can only match faces obtained with the same recognition model, that is associated with the query face.
   */
  post(
    options: VerifyFromPersonDirectoryParameters,
  ): StreamableMethod<
    VerifyFromPersonDirectory200Response | VerifyFromPersonDirectoryDefaultResponse
  >;
}

export interface Group {
  /**
   * >
   * *
   *   * The output is one or more disjointed face groups and a messyGroup. A face group contains faces that have similar looking, often of the same person. Face groups are ranked by group size, i.e. number of faces. Notice that faces belonging to a same person might be split into several groups in the result.
   *   * MessyGroup is a special face group containing faces that cannot find any similar counterpart face from original faces. The messyGroup will not appear in the result if all faces found their counterparts.
   *   * Group API needs at least 2 candidate faces and 1000 at most. We suggest to try "Verify Face To Face" when you only have 2 candidate faces.
   *   * The 'recognitionModel' associated with the query faces' faceIds should be the same.
   */
  post(options: GroupParameters): StreamableMethod<Group200Response | GroupDefaultResponse>;
}

export interface CreateFaceList {
  /**
   * Up to 64 Face Lists are allowed in one subscription.
   *
   * Face List is a list of faces, up to 1,000 faces, and used by "Find Similar From Face List".
   *
   * After creation, user should use "Add Face List Face" to import the faces. No image will be stored. Only the extracted face feature(s) will be stored on server until "Delete Face List" is called.
   *
   * "Find Similar" is used for scenario like finding celebrity-like faces, similar face filtering, or as a light way face identification. But if the actual use is to identify person, please use Person Group / Large Person Group and "Identify".
   *
   * Please consider Large Face List when the face number is large. It can support up to 1,000,000 faces.
   */
  put(
    options: CreateFaceListParameters,
  ): StreamableMethod<CreateFaceList200Response | CreateFaceListDefaultResponse>;
  /** Delete a specified Face List. */
  delete(
    options?: DeleteFaceListParameters,
  ): StreamableMethod<DeleteFaceList200Response | DeleteFaceListDefaultResponse>;
  /** Retrieve a Face List's faceListId, name, userData, recognitionModel and faces in the Face List. */
  get(
    options?: GetFaceListParameters,
  ): StreamableMethod<GetFaceList200Response | GetFaceListDefaultResponse>;
  /** Update information of a Face List, including name and userData. */
  patch(
    options: UpdateFaceListParameters,
  ): StreamableMethod<UpdateFaceList200Response | UpdateFaceListDefaultResponse>;
}

export interface GetFaceLists {
  /**
   * List Face Lists' faceListId, name, userData and recognitionModel.
   *
   * To get face information inside Face List use "Get Face List".
   */
  get(
    options?: GetFaceListsParameters,
  ): StreamableMethod<GetFaceLists200Response | GetFaceListsDefaultResponse>;
}

export interface AddFaceListFaceFromUrl {
  /**
   * To deal with an image containing multiple faces, input face can be specified as an image with a targetFace rectangle. It returns a persistedFaceId representing the added face. No image will be stored. Only the extracted face feature(s) will be stored on server until "Delete Face List Face" or "Delete Face List" is called.
   *
   * Note that persistedFaceId is different from faceId generated by "Detect".
   *
   * >
   * *
   *   * Higher face image quality means better recognition precision. Please consider high-quality faces: frontal, clear, and face size is 200x200 pixels (100 pixels between eyes) or bigger.
   *   * JPEG, PNG, GIF (the first frame), and BMP format are supported. The allowed image file size is from 1KB to 6MB.
   *   * "targetFace" rectangle should contain one face. Zero or multiple faces will be regarded as an error. If the provided "targetFace" rectangle is not returned from "Detect", there's no guarantee to detect and add the face successfully.
   *   * Out of detectable face size (36x36 - 4096x4096 pixels), large head-pose, or large occlusions will cause failures.
   *   * The minimum detectable face size is 36x36 pixels in an image no larger than 1920x1080 pixels. Images with dimensions higher than 1920x1080 pixels will need a proportionally larger minimum face size.
   *   * Different 'detectionModel' values can be provided. To use and compare different detection models, please refer to [here](https://learn.microsoft.com/azure/ai-services/computer-vision/how-to/specify-detection-model).
   */
  post(
    options: AddFaceListFaceFromUrlParameters,
  ): StreamableMethod<AddFaceListFaceFromUrl200Response | AddFaceListFaceFromUrlDefaultResponse>;
  /**
   * To deal with an image containing multiple faces, input face can be specified as an image with a targetFace rectangle. It returns a persistedFaceId representing the added face. No image will be stored. Only the extracted face feature(s) will be stored on server until "Delete Face List Face" or "Delete Face List" is called.
   *
   * Note that persistedFaceId is different from faceId generated by "Detect".
   *
   * >
   * *
   *   * Higher face image quality means better recognition precision. Please consider high-quality faces: frontal, clear, and face size is 200x200 pixels (100 pixels between eyes) or bigger.
   *   * JPEG, PNG, GIF (the first frame), and BMP format are supported. The allowed image file size is from 1KB to 6MB.
   *   * "targetFace" rectangle should contain one face. Zero or multiple faces will be regarded as an error. If the provided "targetFace" rectangle is not returned from "Detect", there's no guarantee to detect and add the face successfully.
   *   * Out of detectable face size (36x36 - 4096x4096 pixels), large head-pose, or large occlusions will cause failures.
   *   * The minimum detectable face size is 36x36 pixels in an image no larger than 1920x1080 pixels. Images with dimensions higher than 1920x1080 pixels will need a proportionally larger minimum face size.
   *   * Different 'detectionModel' values can be provided. To use and compare different detection models, please refer to [here](https://learn.microsoft.com/azure/ai-services/computer-vision/how-to/specify-detection-model).
   */
  post(
    options: AddFaceListFaceParameters,
  ): StreamableMethod<AddFaceListFace200Response | AddFaceListFaceDefaultResponse>;
}

export interface DeleteFaceListFace {
  /** Adding/deleting faces to/from a same Face List are processed sequentially and to/from different Face Lists are in parallel. */
  delete(
    options?: DeleteFaceListFaceParameters,
  ): StreamableMethod<DeleteFaceListFace200Response | DeleteFaceListFaceDefaultResponse>;
}

export interface CreateLargeFaceList {
  /**
   * Large Face List is a list of faces, up to 1,000,000 faces, and used by "Find Similar From Large Face List".
   *
   * After creation, user should use Add Large Face List Face to import the faces and Train Large Face List to make it ready for "Find Similar". No image will be stored. Only the extracted face feature(s) will be stored on server until Delete Large Face List is called.
   *
   * "Find Similar" is used for scenario like finding celebrity-like faces, similar face filtering, or as a light way face identification. But if the actual use is to identify person, please use Person Group / Large Person Group and "Identify".
   *
   * > [!NOTE]
   * >
   * > *
   * >   * Free-tier subscription quota: 64 Large Face Lists.
   * >   * S0-tier subscription quota: 1,000,000 Large Face Lists.
   */
  put(
    options: CreateLargeFaceListParameters,
  ): StreamableMethod<CreateLargeFaceList200Response | CreateLargeFaceListDefaultResponse>;
  /** Adding/deleting faces to/from a same Large Face List are processed sequentially and to/from different Large Face Lists are in parallel. */
  delete(
    options?: DeleteLargeFaceListParameters,
  ): StreamableMethod<DeleteLargeFaceList200Response | DeleteLargeFaceListDefaultResponse>;
  /** Retrieve a Large Face List's largeFaceListId, name, userData and recognitionModel. */
  get(
    options?: GetLargeFaceListParameters,
  ): StreamableMethod<GetLargeFaceList200Response | GetLargeFaceListDefaultResponse>;
  /** Update information of a Large Face List, including name and userData. */
  patch(
    options: UpdateLargeFaceListParameters,
  ): StreamableMethod<UpdateLargeFaceList200Response | UpdateLargeFaceListDefaultResponse>;
}

export interface GetLargeFaceLists {
  /**
   * To get face information inside largeFaceList use "Get Large Face List Face".
   *
   * Large Face Lists are stored in alphabetical order of largeFaceListId.
   * >
   * *
   *   * "start" parameter (string, optional) specifies an ID value from which returned entries will have larger IDs based on string comparison. Setting "start" to an empty value indicates that entries should be returned starting from the first item.
   *   * "top" parameter (int, optional) determines the maximum number of entries to be returned, with a limit of up to 1000 entries per call. To retrieve additional entries beyond this limit, specify "start" with the personId of the last entry returned in the current call.
   *
   * > [!TIP]
   * >
   * > * For example, there are total 5 items with their IDs: "itemId1", ..., "itemId5".
   * >   * "start=&top=" will return all 5 items.
   * >   * "start=&top=2" will return "itemId1", "itemId2".
   * >   * "start=itemId2&top=3" will return "itemId3", "itemId4", "itemId5".
   */
  get(
    options?: GetLargeFaceListsParameters,
  ): StreamableMethod<GetLargeFaceLists200Response | GetLargeFaceListsDefaultResponse>;
}

export interface GetLargeFaceListTrainingStatus {
  /**
   * To check the Large Face List training status completed or still ongoing. Large Face List training is an asynchronous operation triggered by "Train Large Face List".
   *
   * Training time depends on the number of face entries in a Large Face List. It could be in seconds, or up to half an hour for 1,000,000 faces.
   */
  get(
    options?: GetLargeFaceListTrainingStatusParameters,
  ): StreamableMethod<
    GetLargeFaceListTrainingStatus200Response | GetLargeFaceListTrainingStatusDefaultResponse
  >;
}

export interface TrainLargeFaceList {
  /**
   * Training is a crucial step that only a trained Large Face List can be used by "Find Similar From Large Face List".
   *
   * The training task is an asynchronous task. Training time depends on the number of face entries in a Large Face List. It could be in seconds, or up to half an hour for 1,000,000 faces. To check training completion, please use "Get Large Face List Training Status".
   */
  post(
    options?: TrainLargeFaceListParameters,
  ): StreamableMethod<TrainLargeFaceList202Response | TrainLargeFaceListDefaultResponse>;
}

export interface AddLargeFaceListFaceFromUrl {
  /**
   * To deal with an image containing multiple faces, input face can be specified as an image with a targetFace rectangle. It returns a persistedFaceId representing the added face. No image will be stored. Only the extracted face feature(s) will be stored on server until "Delete Large Face List Face" or "Delete Large Face List" is called.
   *
   * Note that persistedFaceId is different from faceId generated by "Detect".
   *
   * >
   * *
   *   * Higher face image quality means better recognition precision. Please consider high-quality faces: frontal, clear, and face size is 200x200 pixels (100 pixels between eyes) or bigger.
   *   * JPEG, PNG, GIF (the first frame), and BMP format are supported. The allowed image file size is from 1KB to 6MB.
   *   * "targetFace" rectangle should contain one face. Zero or multiple faces will be regarded as an error. If the provided "targetFace" rectangle is not returned from "Detect", there's no guarantee to detect and add the face successfully.
   *   * Out of detectable face size (36x36 - 4096x4096 pixels), large head-pose, or large occlusions will cause failures.
   *   * The minimum detectable face size is 36x36 pixels in an image no larger than 1920x1080 pixels. Images with dimensions higher than 1920x1080 pixels will need a proportionally larger minimum face size.
   *   * Different 'detectionModel' values can be provided. To use and compare different detection models, please refer to [here](https://learn.microsoft.com/azure/ai-services/computer-vision/how-to/specify-detection-model).
   *
   * > [!NOTE]
   * >
   * > *
   * >   * Free-tier subscription quota: 1,000 faces per Large Face List.
   * >   * S0-tier subscription quota: 1,000,000 faces per Large Face List.
   */
  post(
    options: AddLargeFaceListFaceFromUrlParameters,
  ): StreamableMethod<
    AddLargeFaceListFaceFromUrl200Response | AddLargeFaceListFaceFromUrlDefaultResponse
  >;
  /**
   * To deal with an image containing multiple faces, input face can be specified as an image with a targetFace rectangle. It returns a persistedFaceId representing the added face. No image will be stored. Only the extracted face feature(s) will be stored on server until "Delete Large Face List Face" or "Delete Large Face List" is called.
   *
   * Note that persistedFaceId is different from faceId generated by "Detect".
   *
   * >
   * *
   *   * Higher face image quality means better recognition precision. Please consider high-quality faces: frontal, clear, and face size is 200x200 pixels (100 pixels between eyes) or bigger.
   *   * JPEG, PNG, GIF (the first frame), and BMP format are supported. The allowed image file size is from 1KB to 6MB.
   *   * "targetFace" rectangle should contain one face. Zero or multiple faces will be regarded as an error. If the provided "targetFace" rectangle is not returned from "Detect", there's no guarantee to detect and add the face successfully.
   *   * Out of detectable face size (36x36 - 4096x4096 pixels), large head-pose, or large occlusions will cause failures.
   *   * The minimum detectable face size is 36x36 pixels in an image no larger than 1920x1080 pixels. Images with dimensions higher than 1920x1080 pixels will need a proportionally larger minimum face size.
   *   * Different 'detectionModel' values can be provided. To use and compare different detection models, please refer to [here](https://learn.microsoft.com/azure/ai-services/computer-vision/how-to/specify-detection-model).
   *
   * > [!NOTE]
   * >
   * > *
   * >   * Free-tier subscription quota: 1,000 faces per Large Face List.
   * >   * S0-tier subscription quota: 1,000,000 faces per Large Face List.
   */
  post(
    options: AddLargeFaceListFaceParameters,
  ): StreamableMethod<AddLargeFaceListFace200Response | AddLargeFaceListFaceDefaultResponse>;
  /**
   * Faces are stored in alphabetical order of persistedFaceId created in "Add Large Face List Face".
   * >
   * *
   *   * "start" parameter (string, optional) specifies an ID value from which returned entries will have larger IDs based on string comparison. Setting "start" to an empty value indicates that entries should be returned starting from the first item.
   *   * "top" parameter (int, optional) determines the maximum number of entries to be returned, with a limit of up to 1000 entries per call. To retrieve additional entries beyond this limit, specify "start" with the personId of the last entry returned in the current call.
   *
   * > [!TIP]
   * >
   * > * For example, there are total 5 items with their IDs: "itemId1", ..., "itemId5".
   * >   * "start=&top=" will return all 5 items.
   * >   * "start=&top=2" will return "itemId1", "itemId2".
   * >   * "start=itemId2&top=3" will return "itemId3", "itemId4", "itemId5".
   */
  get(
    options?: GetLargeFaceListFacesParameters,
  ): StreamableMethod<GetLargeFaceListFaces200Response | GetLargeFaceListFacesDefaultResponse>;
}

export interface DeleteLargeFaceListFace {
  /** Delete a face from a Large Face List by specified largeFaceListId and persistedFaceId. */
  delete(
    options?: DeleteLargeFaceListFaceParameters,
  ): StreamableMethod<DeleteLargeFaceListFace200Response | DeleteLargeFaceListFaceDefaultResponse>;
  /** Retrieve persisted face in Large Face List by largeFaceListId and persistedFaceId. */
  get(
    options?: GetLargeFaceListFaceParameters,
  ): StreamableMethod<GetLargeFaceListFace200Response | GetLargeFaceListFaceDefaultResponse>;
  /** Update a specified face's userData field in a Large Face List by its persistedFaceId. */
  patch(
    options: UpdateLargeFaceListFaceParameters,
  ): StreamableMethod<UpdateLargeFaceListFace200Response | UpdateLargeFaceListFaceDefaultResponse>;
}

export interface CreatePersonGroup {
  /**
   * A Person Group is a container holding the uploaded person data, including face recognition features.
   *
   * After creation, use "Create Person Group Person" to add persons into the group, and then call "Train Person Group" to get this group ready for "Identify From Person Group".
   *
   * No image will be stored. Only the person's extracted face feature(s) and userData will be stored on server until "Delete Person Group Person" or "Delete Person Group" is called.
   *
   * 'recognitionModel' should be specified to associate with this Person Group. The default value for 'recognitionModel' is 'recognition_01', if the latest model needed, please explicitly specify the model you need in this parameter. New faces that are added to an existing Person Group will use the recognition model that's already associated with the collection. Existing face feature(s) in a Person Group can't be updated to features extracted by another version of recognition model.
   *
   * > [!NOTE]
   * >
   * > *
   * >   * Free-tier subscription quota: 1,000 Person Groups. Each holds up to 1,000 persons.
   * >   * S0-tier subscription quota: 1,000,000 Person Groups. Each holds up to 10,000 persons.
   * >   * to handle larger scale face identification problem, please consider using Large Person Group.
   */
  put(
    options: CreatePersonGroupParameters,
  ): StreamableMethod<CreatePersonGroup200Response | CreatePersonGroupDefaultResponse>;
  /** Delete an existing Person Group with specified personGroupId. Persisted data in this Person Group will be deleted. */
  delete(
    options?: DeletePersonGroupParameters,
  ): StreamableMethod<DeletePersonGroup200Response | DeletePersonGroupDefaultResponse>;
  /** Retrieve Person Group name, userData and recognitionModel. To get person information under this personGroup, use "Get Person Group Persons". */
  get(
    options?: GetPersonGroupParameters,
  ): StreamableMethod<GetPersonGroup200Response | GetPersonGroupDefaultResponse>;
  /** Update an existing Person Group's name and userData. The properties keep unchanged if they are not in request body. */
  patch(
    options: UpdatePersonGroupParameters,
  ): StreamableMethod<UpdatePersonGroup200Response | UpdatePersonGroupDefaultResponse>;
}

export interface GetPersonGroups {
  /**
   * Person Groups are stored in alphabetical order of personGroupId.
   * >
   * *
   *   * "start" parameter (string, optional) specifies an ID value from which returned entries will have larger IDs based on string comparison. Setting "start" to an empty value indicates that entries should be returned starting from the first item.
   *   * "top" parameter (int, optional) determines the maximum number of entries to be returned, with a limit of up to 1000 entries per call. To retrieve additional entries beyond this limit, specify "start" with the personId of the last entry returned in the current call.
   *
   * > [!TIP]
   * >
   * > * For example, there are total 5 items with their IDs: "itemId1", ..., "itemId5".
   * >   * "start=&top=" will return all 5 items.
   * >   * "start=&top=2" will return "itemId1", "itemId2".
   * >   * "start=itemId2&top=3" will return "itemId3", "itemId4", "itemId5".
   */
  get(
    options?: GetPersonGroupsParameters,
  ): StreamableMethod<GetPersonGroups200Response | GetPersonGroupsDefaultResponse>;
}

export interface GetPersonGroupTrainingStatus {
  /** To check Person Group training status completed or still ongoing. Person Group training is an asynchronous operation triggered by "Train Person Group" API. */
  get(
    options?: GetPersonGroupTrainingStatusParameters,
  ): StreamableMethod<
    GetPersonGroupTrainingStatus200Response | GetPersonGroupTrainingStatusDefaultResponse
  >;
}

export interface TrainPersonGroup {
  /** The training task is an asynchronous task. Training time depends on the number of person entries, and their faces in a Person Group. It could be several seconds to minutes. To check training status, please use "Get Person Group Training Status". */
  post(
    options?: TrainPersonGroupParameters,
  ): StreamableMethod<TrainPersonGroup202Response | TrainPersonGroupDefaultResponse>;
}

export interface CreatePersonGroupPerson {
  /**
   * > [!NOTE]
   * >
   * > *
   * >   * Free-tier subscription quota:
   * >     * 1,000 persons in all Person Groups.
   * >   * S0-tier subscription quota:
   * >     * 10,000 persons per Person Group.
   * >     * 1,000,000 Person Groups.
   * >     * 100,000,000 persons in all Person Groups.
   */
  post(
    options: CreatePersonGroupPersonParameters,
  ): StreamableMethod<CreatePersonGroupPerson200Response | CreatePersonGroupPersonDefaultResponse>;
  /**
   * Persons are stored in alphabetical order of personId created in "Create Person Group Person".
   * >
   * *
   *   * "start" parameter (string, optional) specifies an ID value from which returned entries will have larger IDs based on string comparison. Setting "start" to an empty value indicates that entries should be returned starting from the first item.
   *   * "top" parameter (int, optional) determines the maximum number of entries to be returned, with a limit of up to 1000 entries per call. To retrieve additional entries beyond this limit, specify "start" with the personId of the last entry returned in the current call.
   *
   * > [!TIP]
   * >
   * > * For example, there are total 5 items with their IDs: "itemId1", ..., "itemId5".
   * >   * "start=&top=" will return all 5 items.
   * >   * "start=&top=2" will return "itemId1", "itemId2".
   * >   * "start=itemId2&top=3" will return "itemId3", "itemId4", "itemId5".
   */
  get(
    options?: GetPersonGroupPersonsParameters,
  ): StreamableMethod<GetPersonGroupPersons200Response | GetPersonGroupPersonsDefaultResponse>;
}

export interface DeletePersonGroupPerson {
  /** Delete an existing person from a Person Group. The persistedFaceId, userData, person name and face feature(s) in the person entry will all be deleted. */
  delete(
    options?: DeletePersonGroupPersonParameters,
  ): StreamableMethod<DeletePersonGroupPerson200Response | DeletePersonGroupPersonDefaultResponse>;
  /** Retrieve a person's name and userData, and the persisted faceIds representing the registered person face feature(s). */
  get(
    options?: GetPersonGroupPersonParameters,
  ): StreamableMethod<GetPersonGroupPerson200Response | GetPersonGroupPersonDefaultResponse>;
  /** Update name or userData of a person. */
  patch(
    options: UpdatePersonGroupPersonParameters,
  ): StreamableMethod<UpdatePersonGroupPerson200Response | UpdatePersonGroupPersonDefaultResponse>;
}

export interface AddPersonGroupPersonFaceFromUrl {
  /**
   * To deal with an image containing multiple faces, input face can be specified as an image with a targetFace rectangle. It returns a persistedFaceId representing the added face. No image will be stored. Only the extracted face feature(s) will be stored on server until "Delete Person Group Person Face", "Delete Person Group Person" or "Delete Person Group" is called.
   *
   * Note that persistedFaceId is different from faceId generated by "Detect".
   *
   * >
   * *
   *   * Each person entry can hold up to 248 faces.
   *   * Higher face image quality means better recognition precision. Please consider high-quality faces: frontal, clear, and face size is 200x200 pixels (100 pixels between eyes) or bigger.
   *   * JPEG, PNG, GIF (the first frame), and BMP format are supported. The allowed image file size is from 1KB to 6MB.
   *   * "targetFace" rectangle should contain one face. Zero or multiple faces will be regarded as an error. If the provided "targetFace" rectangle is not returned from "Detect", there's no guarantee to detect and add the face successfully.
   *   * Out of detectable face size (36x36 - 4096x4096 pixels), large head-pose, or large occlusions will cause failures.
   *   * The minimum detectable face size is 36x36 pixels in an image no larger than 1920x1080 pixels. Images with dimensions higher than 1920x1080 pixels will need a proportionally larger minimum face size.
   *   * Different 'detectionModel' values can be provided. To use and compare different detection models, please refer to [here](https://learn.microsoft.com/azure/ai-services/computer-vision/how-to/specify-detection-model).
   */
  post(
    options: AddPersonGroupPersonFaceFromUrlParameters,
  ): StreamableMethod<
    AddPersonGroupPersonFaceFromUrl200Response | AddPersonGroupPersonFaceFromUrlDefaultResponse
  >;
  /**
   * To deal with an image containing multiple faces, input face can be specified as an image with a targetFace rectangle. It returns a persistedFaceId representing the added face. No image will be stored. Only the extracted face feature(s) will be stored on server until "Delete Person Group Person Face", "Delete Person Group Person" or "Delete Person Group" is called.
   *
   * Note that persistedFaceId is different from faceId generated by "Detect".
   *
   * >
   * *
   *   * Each person entry can hold up to 248 faces.
   *   * Higher face image quality means better recognition precision. Please consider high-quality faces: frontal, clear, and face size is 200x200 pixels (100 pixels between eyes) or bigger.
   *   * JPEG, PNG, GIF (the first frame), and BMP format are supported. The allowed image file size is from 1KB to 6MB.
   *   * "targetFace" rectangle should contain one face. Zero or multiple faces will be regarded as an error. If the provided "targetFace" rectangle is not returned from "Detect", there's no guarantee to detect and add the face successfully.
   *   * Out of detectable face size (36x36 - 4096x4096 pixels), large head-pose, or large occlusions will cause failures.
   *   * The minimum detectable face size is 36x36 pixels in an image no larger than 1920x1080 pixels. Images with dimensions higher than 1920x1080 pixels will need a proportionally larger minimum face size.
   *   * Different 'detectionModel' values can be provided. To use and compare different detection models, please refer to [here](https://learn.microsoft.com/azure/ai-services/computer-vision/how-to/specify-detection-model).
   */
  post(
    options: AddPersonGroupPersonFaceParameters,
  ): StreamableMethod<
    AddPersonGroupPersonFace200Response | AddPersonGroupPersonFaceDefaultResponse
  >;
}

export interface DeletePersonGroupPersonFace {
  /** Adding/deleting faces to/from a same person will be processed sequentially. Adding/deleting faces to/from different persons are processed in parallel. */
  delete(
    options?: DeletePersonGroupPersonFaceParameters,
  ): StreamableMethod<
    DeletePersonGroupPersonFace200Response | DeletePersonGroupPersonFaceDefaultResponse
  >;
  /** Retrieve person face information. The persisted person face is specified by its personGroupId, personId and persistedFaceId. */
  get(
    options?: GetPersonGroupPersonFaceParameters,
  ): StreamableMethod<
    GetPersonGroupPersonFace200Response | GetPersonGroupPersonFaceDefaultResponse
  >;
  /** Update a person persisted face's userData field. */
  patch(
    options: UpdatePersonGroupPersonFaceParameters,
  ): StreamableMethod<
    UpdatePersonGroupPersonFace200Response | UpdatePersonGroupPersonFaceDefaultResponse
  >;
}

export interface CreateLargePersonGroup {
  /**
   * A Large Person Group is a container holding the uploaded person data, including the face recognition features. It can hold up to 1,000,000 entities.
   *
   * After creation, use "Create Large Person Group Person" to add person into the group, and call "Train Large Person Group" to get this group ready for "Identify From Large Person Group".
   *
   * No image will be stored. Only the person's extracted face feature(s) and userData will be stored on server until "Delete Large Person Group Person" or "Delete Large Person Group" is called.
   *
   * 'recognitionModel' should be specified to associate with this Large Person Group. The default value for 'recognitionModel' is 'recognition_01', if the latest model needed, please explicitly specify the model you need in this parameter. New faces that are added to an existing Large Person Group will use the recognition model that's already associated with the collection. Existing face feature(s) in a Large Person Group can't be updated to features extracted by another version of recognition model.
   *
   * > [!NOTE]
   * >
   * > *
   * >   * Free-tier subscription quota: 1,000 Large Person Groups.
   * >   * S0-tier subscription quota: 1,000,000 Large Person Groups.
   */
  put(
    options: CreateLargePersonGroupParameters,
  ): StreamableMethod<CreateLargePersonGroup200Response | CreateLargePersonGroupDefaultResponse>;
  /** Delete an existing Large Person Group with specified personGroupId. Persisted data in this Large Person Group will be deleted. */
  delete(
    options?: DeleteLargePersonGroupParameters,
  ): StreamableMethod<DeleteLargePersonGroup200Response | DeleteLargePersonGroupDefaultResponse>;
  /** Retrieve the information of a Large Person Group, including its name, userData and recognitionModel. This API returns Large Person Group information only, use "Get Large Person Group Persons" instead to retrieve person information under the Large Person Group. */
  get(
    options?: GetLargePersonGroupParameters,
  ): StreamableMethod<GetLargePersonGroup200Response | GetLargePersonGroupDefaultResponse>;
  /** Update an existing Large Person Group's name and userData. The properties keep unchanged if they are not in request body. */
  patch(
    options: UpdateLargePersonGroupParameters,
  ): StreamableMethod<UpdateLargePersonGroup200Response | UpdateLargePersonGroupDefaultResponse>;
}

export interface GetLargePersonGroups {
  /**
   * Large Person Groups are stored in alphabetical order of largePersonGroupId.
   * >
   * *
   *   * "start" parameter (string, optional) specifies an ID value from which returned entries will have larger IDs based on string comparison. Setting "start" to an empty value indicates that entries should be returned starting from the first item.
   *   * "top" parameter (int, optional) determines the maximum number of entries to be returned, with a limit of up to 1000 entries per call. To retrieve additional entries beyond this limit, specify "start" with the personId of the last entry returned in the current call.
   *
   * > [!TIP]
   * >
   * > * For example, there are total 5 items with their IDs: "itemId1", ..., "itemId5".
   * >   * "start=&top=" will return all 5 items.
   * >   * "start=&top=2" will return "itemId1", "itemId2".
   * >   * "start=itemId2&top=3" will return "itemId3", "itemId4", "itemId5".
   */
  get(
    options?: GetLargePersonGroupsParameters,
  ): StreamableMethod<GetLargePersonGroups200Response | GetLargePersonGroupsDefaultResponse>;
}

export interface GetLargePersonGroupTrainingStatus {
  /** Training time depends on the number of person entries, and their faces in a Large Person Group. It could be in seconds, or up to half an hour for 1,000,000 persons. */
  get(
    options?: GetLargePersonGroupTrainingStatusParameters,
  ): StreamableMethod<
    GetLargePersonGroupTrainingStatus200Response | GetLargePersonGroupTrainingStatusDefaultResponse
  >;
}

export interface TrainLargePersonGroup {
  /** The training task is an asynchronous task. Training time depends on the number of person entries, and their faces in a Large Person Group. It could be in several seconds, or up to half a hour for 1,000,000 persons. To check training status, please use "Get Large Person Group Training Status". */
  post(
    options?: TrainLargePersonGroupParameters,
  ): StreamableMethod<TrainLargePersonGroup202Response | TrainLargePersonGroupDefaultResponse>;
}

export interface CreateLargePersonGroupPerson {
  /**
   * > [!NOTE]
   * >
   * > *
   * >   * Free-tier subscription quota:
   * >     * 1,000 persons in all Large Person Groups.
   * >   * S0-tier subscription quota:
   * >     * 1,000,000 persons per Large Person Group.
   * >     * 1,000,000 Large Person Groups.
   * >     * 1,000,000,000 persons in all Large Person Groups.
   */
  post(
    options: CreateLargePersonGroupPersonParameters,
  ): StreamableMethod<
    CreateLargePersonGroupPerson200Response | CreateLargePersonGroupPersonDefaultResponse
  >;
  /**
   * Persons are stored in alphabetical order of personId created in "Create Large Person Group Person".
   * >
   * *
   *   * "start" parameter (string, optional) specifies an ID value from which returned entries will have larger IDs based on string comparison. Setting "start" to an empty value indicates that entries should be returned starting from the first item.
   *   * "top" parameter (int, optional) determines the maximum number of entries to be returned, with a limit of up to 1000 entries per call. To retrieve additional entries beyond this limit, specify "start" with the personId of the last entry returned in the current call.
   *
   * > [!TIP]
   * >
   * > * For example, there are total 5 items with their IDs: "itemId1", ..., "itemId5".
   * >   * "start=&top=" will return all 5 items.
   * >   * "start=&top=2" will return "itemId1", "itemId2".
   * >   * "start=itemId2&top=3" will return "itemId3", "itemId4", "itemId5".
   */
  get(
    options?: GetLargePersonGroupPersonsParameters,
  ): StreamableMethod<
    GetLargePersonGroupPersons200Response | GetLargePersonGroupPersonsDefaultResponse
  >;
}

export interface DeleteLargePersonGroupPerson {
  /** Delete an existing person from a Large Person Group. The persistedFaceId, userData, person name and face feature(s) in the person entry will all be deleted. */
  delete(
    options?: DeleteLargePersonGroupPersonParameters,
  ): StreamableMethod<
    DeleteLargePersonGroupPerson200Response | DeleteLargePersonGroupPersonDefaultResponse
  >;
  /** Retrieve a person's name and userData, and the persisted faceIds representing the registered person face feature(s). */
  get(
    options?: GetLargePersonGroupPersonParameters,
  ): StreamableMethod<
    GetLargePersonGroupPerson200Response | GetLargePersonGroupPersonDefaultResponse
  >;
  /** Update name or userData of a person. */
  patch(
    options: UpdateLargePersonGroupPersonParameters,
  ): StreamableMethod<
    UpdateLargePersonGroupPerson200Response | UpdateLargePersonGroupPersonDefaultResponse
  >;
}

export interface AddLargePersonGroupPersonFaceFromUrl {
  /**
   * To deal with an image containing multiple faces, input face can be specified as an image with a targetFace rectangle. It returns a persistedFaceId representing the added face. No image will be stored. Only the extracted face feature(s) will be stored on server until "Delete Large Person Group Person Face", "Delete Large Person Group Person" or "Delete Large Person Group" is called.
   *
   * Note that persistedFaceId is different from faceId generated by "Detect".
   *
   * >
   * *
   *   * Each person entry can hold up to 248 faces.
   *   * Higher face image quality means better recognition precision. Please consider high-quality faces: frontal, clear, and face size is 200x200 pixels (100 pixels between eyes) or bigger.
   *   * JPEG, PNG, GIF (the first frame), and BMP format are supported. The allowed image file size is from 1KB to 6MB.
   *   * "targetFace" rectangle should contain one face. Zero or multiple faces will be regarded as an error. If the provided "targetFace" rectangle is not returned from "Detect", there's no guarantee to detect and add the face successfully.
   *   * Out of detectable face size (36x36 - 4096x4096 pixels), large head-pose, or large occlusions will cause failures.
   *   * The minimum detectable face size is 36x36 pixels in an image no larger than 1920x1080 pixels. Images with dimensions higher than 1920x1080 pixels will need a proportionally larger minimum face size.
   *   * Different 'detectionModel' values can be provided. To use and compare different detection models, please refer to [here](https://learn.microsoft.com/azure/ai-services/computer-vision/how-to/specify-detection-model).
   */
  post(
    options: AddLargePersonGroupPersonFaceFromUrlParameters,
  ): StreamableMethod<
    | AddLargePersonGroupPersonFaceFromUrl200Response
    | AddLargePersonGroupPersonFaceFromUrlDefaultResponse
  >;
  /**
   * To deal with an image containing multiple faces, input face can be specified as an image with a targetFace rectangle. It returns a persistedFaceId representing the added face. No image will be stored. Only the extracted face feature(s) will be stored on server until "Delete Large Person Group Person Face", "Delete Large Person Group Person" or "Delete Large Person Group" is called.
   *
   * Note that persistedFaceId is different from faceId generated by "Detect".
   *
   * >
   * *
   *   * Each person entry can hold up to 248 faces.
   *   * Higher face image quality means better recognition precision. Please consider high-quality faces: frontal, clear, and face size is 200x200 pixels (100 pixels between eyes) or bigger.
   *   * JPEG, PNG, GIF (the first frame), and BMP format are supported. The allowed image file size is from 1KB to 6MB.
   *   * "targetFace" rectangle should contain one face. Zero or multiple faces will be regarded as an error. If the provided "targetFace" rectangle is not returned from "Detect", there's no guarantee to detect and add the face successfully.
   *   * Out of detectable face size (36x36 - 4096x4096 pixels), large head-pose, or large occlusions will cause failures.
   *   * The minimum detectable face size is 36x36 pixels in an image no larger than 1920x1080 pixels. Images with dimensions higher than 1920x1080 pixels will need a proportionally larger minimum face size.
   *   * Different 'detectionModel' values can be provided. To use and compare different detection models, please refer to [here](https://learn.microsoft.com/azure/ai-services/computer-vision/how-to/specify-detection-model).
   */
  post(
    options: AddLargePersonGroupPersonFaceParameters,
  ): StreamableMethod<
    AddLargePersonGroupPersonFace200Response | AddLargePersonGroupPersonFaceDefaultResponse
  >;
}

export interface DeleteLargePersonGroupPersonFace {
  /** Adding/deleting faces to/from a same person will be processed sequentially. Adding/deleting faces to/from different persons are processed in parallel. */
  delete(
    options?: DeleteLargePersonGroupPersonFaceParameters,
  ): StreamableMethod<
    DeleteLargePersonGroupPersonFace200Response | DeleteLargePersonGroupPersonFaceDefaultResponse
  >;
  /** Retrieve person face information. The persisted person face is specified by its largePersonGroupId, personId and persistedFaceId. */
  get(
    options?: GetLargePersonGroupPersonFaceParameters,
  ): StreamableMethod<
    GetLargePersonGroupPersonFace200Response | GetLargePersonGroupPersonFaceDefaultResponse
  >;
  /** Update a person persisted face's userData field. */
  patch(
    options: UpdateLargePersonGroupPersonFaceParameters,
  ): StreamableMethod<
    UpdateLargePersonGroupPersonFace200Response | UpdateLargePersonGroupPersonFaceDefaultResponse
  >;
}

export interface CreateLivenessSession {
  /**
   * A session is best for client device scenarios where developers want to authorize a client device to perform only a liveness detection without granting full access to their resource. Created sessions have a limited life span and only authorize clients to perform the desired action before access is expired.
   *
   * Permissions includes...
   * >
   * *
   *   * Ability to call /detectLiveness/singleModal for up to 3 retries.
   *   * A token lifetime of 10 minutes.
   *
   * > [!NOTE]
   * > Client access can be revoked by deleting the session using the Delete Liveness Session operation. To retrieve a result, use the Get Liveness Session. To audit the individual requests that a client has made to your resource, use the List Liveness Session Audit Entries.
   */
  post(
    options: CreateLivenessSessionParameters,
  ): StreamableMethod<CreateLivenessSession200Response | CreateLivenessSessionDefaultResponse>;
}

export interface DeleteLivenessSession {
  /**
   * > [!NOTE]
   * > Deleting a session deactivates the Session Auth Token by blocking future API calls made with that Auth Token. While this can be used to remove any access for that token, those requests will still count towards overall resource rate limits. It's best to leverage TokenTTL to limit length of tokens in the case that it is misused.
   */
  delete(
    options?: DeleteLivenessSessionParameters,
  ): StreamableMethod<DeleteLivenessSession204Response | DeleteLivenessSessionDefaultResponse>;
  /** Get session result of detectLiveness/singleModal call. */
  get(
    options?: GetLivenessSessionResultParameters,
  ): StreamableMethod<
    GetLivenessSessionResult200Response | GetLivenessSessionResultDefaultResponse
  >;
}

export interface CreateLivenessWithVerifySession {
  /**
   * A session is best for client device scenarios where developers want to authorize a client device to perform only a liveness detection without granting full access to their resource. Created sessions have a limited life span and only authorize clients to perform the desired action before access is expired.
   *
   * Permissions includes...
   * >
   * *
   *   * Ability to call /detectLivenessWithVerify/singleModal for up to 3 retries.
   *   * A token lifetime of 10 minutes.
   *
   * > [!NOTE]
   * >
   * > *
   * >   * Client access can be revoked by deleting the session using the Delete Liveness With Verify Session operation.
   * >   * To retrieve a result, use the Get Liveness With Verify Session.
   * >   * To audit the individual requests that a client has made to your resource, use the List Liveness With Verify Session Audit Entries.
   */
  post(
    options: CreateLivenessWithVerifySessionParameters,
  ): StreamableMethod<
    CreateLivenessWithVerifySession200Response | CreateLivenessWithVerifySessionDefaultResponse
  >;
}

export interface DeleteLivenessWithVerifySession {
  /**
   * > [!NOTE]
   * > Deleting a session deactivates the Session Auth Token by blocking future API calls made with that Auth Token. While this can be used to remove any access for that token, those requests will still count towards overall resource rate limits. It's best to leverage TokenTTL to limit length of tokens in the case that it is misused.
   */
  delete(
    options?: DeleteLivenessWithVerifySessionParameters,
  ): StreamableMethod<
    DeleteLivenessWithVerifySession204Response | DeleteLivenessWithVerifySessionDefaultResponse
  >;
  /** Get session result of detectLivenessWithVerify/singleModal call. */
  get(
    options?: GetLivenessWithVerifySessionResultParameters,
  ): StreamableMethod<
    | GetLivenessWithVerifySessionResult200Response
    | GetLivenessWithVerifySessionResultDefaultResponse
  >;
}

export interface GetSessionImage {
  /** Get session image stored during the liveness session. */
  get(
    options?: GetSessionImageParameters,
  ): StreamableMethod<GetSessionImage200Response | GetSessionImageDefaultResponse>;
}

export interface Routes {
  /** Resource for '/detect' has methods for the following verbs: post */
  (path: "/detect"): DetectFromUrl;
  /** Resource for '/findsimilars' has methods for the following verbs: post */
  (path: "/findsimilars"): FindSimilar;
  /** Resource for '/identify' has methods for the following verbs: post */
  (path: "/identify"): IdentifyFromPersonGroup;
  /** Resource for '/verify' has methods for the following verbs: post */
  (path: "/verify"): VerifyFaceToFace;
  /** Resource for '/group' has methods for the following verbs: post */
  (path: "/group"): Group;
  /** Resource for '/facelists/\{faceListId\}' has methods for the following verbs: put, delete, get, patch */
  (path: "/facelists/{faceListId}", faceListId: string): CreateFaceList;
  /** Resource for '/facelists' has methods for the following verbs: get */
  (path: "/facelists"): GetFaceLists;
  /** Resource for '/facelists/\{faceListId\}/persistedfaces' has methods for the following verbs: post */
  (path: "/facelists/{faceListId}/persistedfaces", faceListId: string): AddFaceListFaceFromUrl;
  /** Resource for '/facelists/\{faceListId\}/persistedfaces/\{persistedFaceId\}' has methods for the following verbs: delete */
  (
    path: "/facelists/{faceListId}/persistedfaces/{persistedFaceId}",
    faceListId: string,
    persistedFaceId: string,
  ): DeleteFaceListFace;
  /** Resource for '/largefacelists/\{largeFaceListId\}' has methods for the following verbs: put, delete, get, patch */
  (path: "/largefacelists/{largeFaceListId}", largeFaceListId: string): CreateLargeFaceList;
  /** Resource for '/largefacelists' has methods for the following verbs: get */
  (path: "/largefacelists"): GetLargeFaceLists;
  /** Resource for '/largefacelists/\{largeFaceListId\}/training' has methods for the following verbs: get */
  (
    path: "/largefacelists/{largeFaceListId}/training",
    largeFaceListId: string,
  ): GetLargeFaceListTrainingStatus;
  /** Resource for '/largefacelists/\{largeFaceListId\}/train' has methods for the following verbs: post */
  (path: "/largefacelists/{largeFaceListId}/train", largeFaceListId: string): TrainLargeFaceList;
  /** Resource for '/largefacelists/\{largeFaceListId\}/persistedfaces' has methods for the following verbs: post, get */
  (
    path: "/largefacelists/{largeFaceListId}/persistedfaces",
    largeFaceListId: string,
  ): AddLargeFaceListFaceFromUrl;
  /** Resource for '/largefacelists/\{largeFaceListId\}/persistedfaces/\{persistedFaceId\}' has methods for the following verbs: delete, get, patch */
  (
    path: "/largefacelists/{largeFaceListId}/persistedfaces/{persistedFaceId}",
    largeFaceListId: string,
    persistedFaceId: string,
  ): DeleteLargeFaceListFace;
  /** Resource for '/persongroups/\{personGroupId\}' has methods for the following verbs: put, delete, get, patch */
  (path: "/persongroups/{personGroupId}", personGroupId: string): CreatePersonGroup;
  /** Resource for '/persongroups' has methods for the following verbs: get */
  (path: "/persongroups"): GetPersonGroups;
  /** Resource for '/persongroups/\{personGroupId\}/training' has methods for the following verbs: get */
  (
    path: "/persongroups/{personGroupId}/training",
    personGroupId: string,
  ): GetPersonGroupTrainingStatus;
  /** Resource for '/persongroups/\{personGroupId\}/train' has methods for the following verbs: post */
  (path: "/persongroups/{personGroupId}/train", personGroupId: string): TrainPersonGroup;
  /** Resource for '/persongroups/\{personGroupId\}/persons' has methods for the following verbs: post, get */
  (path: "/persongroups/{personGroupId}/persons", personGroupId: string): CreatePersonGroupPerson;
  /** Resource for '/persongroups/\{personGroupId\}/persons/\{personId\}' has methods for the following verbs: delete, get, patch */
  (
    path: "/persongroups/{personGroupId}/persons/{personId}",
    personGroupId: string,
    personId: string,
  ): DeletePersonGroupPerson;
  /** Resource for '/persongroups/\{personGroupId\}/persons/\{personId\}/persistedfaces' has methods for the following verbs: post */
  (
    path: "/persongroups/{personGroupId}/persons/{personId}/persistedfaces",
    personGroupId: string,
    personId: string,
  ): AddPersonGroupPersonFaceFromUrl;
  /** Resource for '/persongroups/\{personGroupId\}/persons/\{personId\}/persistedfaces/\{persistedFaceId\}' has methods for the following verbs: delete, get, patch */
  (
    path: "/persongroups/{personGroupId}/persons/{personId}/persistedfaces/{persistedFaceId}",
    personGroupId: string,
    personId: string,
    persistedFaceId: string,
  ): DeletePersonGroupPersonFace;
  /** Resource for '/largepersongroups/\{largePersonGroupId\}' has methods for the following verbs: put, delete, get, patch */
  (
    path: "/largepersongroups/{largePersonGroupId}",
    largePersonGroupId: string,
  ): CreateLargePersonGroup;
  /** Resource for '/largepersongroups' has methods for the following verbs: get */
  (path: "/largepersongroups"): GetLargePersonGroups;
  /** Resource for '/largepersongroups/\{largePersonGroupId\}/training' has methods for the following verbs: get */
  (
    path: "/largepersongroups/{largePersonGroupId}/training",
    largePersonGroupId: string,
  ): GetLargePersonGroupTrainingStatus;
  /** Resource for '/largepersongroups/\{largePersonGroupId\}/train' has methods for the following verbs: post */
  (
    path: "/largepersongroups/{largePersonGroupId}/train",
    largePersonGroupId: string,
  ): TrainLargePersonGroup;
  /** Resource for '/largepersongroups/\{largePersonGroupId\}/persons' has methods for the following verbs: post, get */
  (
    path: "/largepersongroups/{largePersonGroupId}/persons",
    largePersonGroupId: string,
  ): CreateLargePersonGroupPerson;
  /** Resource for '/largepersongroups/\{largePersonGroupId\}/persons/\{personId\}' has methods for the following verbs: delete, get, patch */
  (
    path: "/largepersongroups/{largePersonGroupId}/persons/{personId}",
    largePersonGroupId: string,
    personId: string,
  ): DeleteLargePersonGroupPerson;
  /** Resource for '/largepersongroups/\{largePersonGroupId\}/persons/\{personId\}/persistedfaces' has methods for the following verbs: post */
  (
    path: "/largepersongroups/{largePersonGroupId}/persons/{personId}/persistedfaces",
    largePersonGroupId: string,
    personId: string,
  ): AddLargePersonGroupPersonFaceFromUrl;
  /** Resource for '/largepersongroups/\{largePersonGroupId\}/persons/\{personId\}/persistedfaces/\{persistedFaceId\}' has methods for the following verbs: delete, get, patch */
  (
    path: "/largepersongroups/{largePersonGroupId}/persons/{personId}/persistedfaces/{persistedFaceId}",
    largePersonGroupId: string,
    personId: string,
    persistedFaceId: string,
  ): DeleteLargePersonGroupPersonFace;
  /** Resource for '/detectLiveness-sessions' has methods for the following verbs: post */
  (path: "/detectLiveness-sessions"): CreateLivenessSession;
  /** Resource for '/detectLiveness-sessions/\{sessionId\}' has methods for the following verbs: delete, get */
  (path: "/detectLiveness-sessions/{sessionId}", sessionId: string): DeleteLivenessSession;
  /** Resource for '/detectLivenessWithVerify-sessions' has methods for the following verbs: post */
  (path: "/detectLivenessWithVerify-sessions"): CreateLivenessWithVerifySession;
  /** Resource for '/detectLivenessWithVerify-sessions/\{sessionId\}' has methods for the following verbs: delete, get */
  (
    path: "/detectLivenessWithVerify-sessions/{sessionId}",
    sessionId: string,
  ): DeleteLivenessWithVerifySession;
  /** Resource for '/sessionImages/\{sessionImageId\}' has methods for the following verbs: get */
  (path: "/sessionImages/{sessionImageId}", sessionImageId: string): GetSessionImage;
}

export type FaceClient = Client & {
  path: Routes;
};
