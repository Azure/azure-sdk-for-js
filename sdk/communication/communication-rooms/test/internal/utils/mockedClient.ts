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

export const mockCreateRoomsResult: RestModel.RoomsCreateResponse = {
  id: "id",
  createdAt: new Date("2022-07-12T18:06:06Z"),
  validFrom: new Date("2022-07-16T18:06:06Z"),
  validUntil: new Date("2022-07-17T18:06:06Z"),
};

export const mockUpdateRoomsResult: RestModel.RoomsCreateResponse = {
  id: "id",
  createdAt: new Date("2022-07-12T18:06:06Z"),
  validFrom: new Date("2022-08-16T18:06:06Z"),
  validUntil: new Date("2022-08-17T18:06:06Z"),
};

export const mockListRoomsResultWithNextLink: RestModel.RoomsListResponse = {
  value: [
    {
      id: "1001",
      createdAt: new Date("2022-07-12T18:06:06Z"),
      validFrom: new Date("2022-08-16T18:06:06Z"),
      validUntil: new Date("2022-08-17T18:06:06Z"),
    },
    {
      id: "1002",
      createdAt: new Date("2022-07-12T18:06:06Z"),
      validFrom: new Date("2022-08-18T18:06:06Z"),
      validUntil: new Date("2022-08-19T18:06:06Z"),
    },
    {
      id: "1003",
      createdAt: new Date("2022-07-12T18:06:06Z"),
      validFrom: new Date("2022-08-20T18:06:06Z"),
      validUntil: new Date("2022-08-21T18:06:06Z"),
    },
    {
      id: "1004",
      createdAt: new Date("2022-07-12T18:06:06Z"),
      validFrom: new Date("2022-08-22T18:06:06Z"),
      validUntil: new Date("2022-08-23T18:06:06Z"),
    },
    {
      id: "1005",
      createdAt: new Date("2022-07-12T18:06:06Z"),
      validFrom: new Date("2022-08-24T18:06:06Z"),
      validUntil: new Date("2022-08-25T18:06:06Z"),
    },
  ],
  nextLink: "http://localhost/rooms?nextLink=abcdefgh&api-version=2023-03-31-preview",
};

export const mockListRoomsResultWithoutNextLink: RestModel.RoomsListResponse = {
  value: [
    {
      id: "1001",
      createdAt: new Date("2022-07-12T18:06:06Z"),
      validFrom: new Date("2022-08-16T18:06:06Z"),
      validUntil: new Date("2022-08-17T18:06:06Z"),
    },
    {
      id: "1002",
      createdAt: new Date("2022-07-12T18:06:06Z"),
      validFrom: new Date("2022-08-18T18:06:06Z"),
      validUntil: new Date("2022-08-19T18:06:06Z"),
    },
    {
      id: "1003",
      createdAt: new Date("2022-07-12T18:06:06Z"),
      validFrom: new Date("2022-08-20T18:06:06Z"),
      validUntil: new Date("2022-08-21T18:06:06Z"),
    },
    {
      id: "1004",
      createdAt: new Date("2022-07-12T18:06:06Z"),
      validFrom: new Date("2022-08-22T18:06:06Z"),
      validUntil: new Date("2022-08-23T18:06:06Z"),
    },
    {
      id: "1005",
      createdAt: new Date("2022-07-12T18:06:06Z"),
      validFrom: new Date("2022-08-24T18:06:06Z"),
      validUntil: new Date("2022-08-25T18:06:06Z"),
    },
  ],
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
