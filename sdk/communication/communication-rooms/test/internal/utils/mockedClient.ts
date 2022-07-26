// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import * as RestModel from "../../../src/generated/src/models";
import { RoomsClient } from "../../../src";
import { CommunicationIdentifierModel } from "../../../src/generated/src";

export const mockCommunicationIdentifier: CommunicationIdentifierModel = {
  communicationUser: { id: "id" },
  rawId: "id",
};

export const mockParticipant: RestModel.RoomParticipant = {
  communicationIdentifier: mockCommunicationIdentifier,
  role: "Presenter"
};

export const mockSdkModelParticipant =  {
  id: {
    kind: "communicationUser", 
    communicationUserId: mockParticipant.communicationIdentifier.communicationUser?.id as string,
  },
  role: mockParticipant.role
};

export const mockCreateRoomsResult: RestModel.RoomsCreateRoomResponse = {
  id: "id",
  createdDateTime: new Date("2022-07-12T18:06:06Z"),
  validFrom: new Date("2022-07-16T18:06:06Z"),
  validUntil: new Date("2022-07-17T18:06:06Z"),
  roomJoinPolicy: "InviteOnly",
  participants: [mockParticipant]
};

export const mockUpdateRoomsResult: RestModel.RoomsCreateRoomResponse = {
  id: "id",
  createdDateTime: new Date("2022-07-12T18:06:06Z"),
  validFrom: new Date("2022-08-16T18:06:06Z"),
  validUntil: new Date("2022-08-17T18:06:06Z"),
  roomJoinPolicy: "InviteOnly",
  participants: [mockParticipant]
};
export const generateHttpClient = (status: number, parsedBody?: unknown): HttpClient => {
  const mockHttpClient: HttpClient = {
    async sendRequest(httpRequest: PipelineRequest): Promise<PipelineResponse> {
      return {
        status: status,
        headers: createHttpHeaders(),
        request: httpRequest,
        bodyAsText: JSON.stringify(parsedBody),
      };
    },
  };
  return mockHttpClient;
};

export const createRoomsClient = (mockHttpClient: HttpClient): RoomsClient => {
  const baseUri = "https://contoso.api.fake";
  const connectionString = `endpoint=${baseUri};accesskey=banana`;
  return new RoomsClient(connectionString, {
    httpClient: mockHttpClient,
  });
};
