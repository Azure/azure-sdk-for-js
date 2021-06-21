// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Client, getClient, PathUncheckedResponse } from "@azure-rest/core-client";
import { paginateResponse } from "../src/paginate";
import { PipelineResponse, createHttpHeaders } from "@azure/core-rest-pipeline";
import { URL } from "../src/url";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

/**
 * This is a sample of how code generator can generate code around the Swagger spec for pagination to improve UX
 */

// Helper type to extract the type of an array
type GetArrayType<T> = T extends Array<infer TData> ? TData : unknown;

// Helper type to infer the Type of the paged elements from the response type
// This type will be generated based on the swagger information for x-ms-pageable
// specifically on the itemName property which indicates the property of the response
// where the page items are found. The default value is `value`
export type PaginateReturn<TResult> = TResult extends
  | {
      body: { value: infer TPage };
    }
  | {
      // In the tests below we are using values as a custom pagination property
      // In cases like this the generator will have to generate one of these
      // entries for each unique value of itemName in the swagger. Most of the times
      // the itemName remains constant throughout the swagger, but that is not a requirement
      body: { values: infer TPage };
    }
  ? GetArrayType<TPage>
  : Array<unknown>;

/**
 * Shapes of the test responses
 */
interface TestItem {
  foo?: number;
}

interface TestResponse extends PathUncheckedResponse {
  body: {
    value: Array<TestItem>;
  };
}

interface TestResponseValues extends PathUncheckedResponse {
  body: {
    values: Array<TestItem>;
  };
}

/**
 * This is the default paginate helper function
 */
export function paginate<TReturn extends PathUncheckedResponse>(
  client: Client,
  initialResponse: TReturn
): PagedAsyncIterableIterator<PaginateReturn<TReturn>, PaginateReturn<TReturn>[]> {
  return paginateResponse<PaginateReturn<TReturn>>(client, initialResponse);
}

/**
 *  Paginate helper function defining a custom property to find the paged elements.
 */
export function paginateCustom<TReturn extends PathUncheckedResponse>(
  client: Client,
  initialResponse: TReturn
): PagedAsyncIterableIterator<PaginateReturn<TReturn>, PaginateReturn<TReturn>[]> {
  // The generator would generate this based on the swagger so that our users don't need to specify the itemName
  // when it can be taken from the swagger
  return paginateResponse<PaginateReturn<TReturn>>(client, initialResponse, { itemName: "values" });
}

describe("Paginate heleper", () => {
  let client: Client;

  beforeEach(() => {
    client = getClient("http://localhost:3000", { allowInsecureConnection: true });
    client.pipeline.getOrderedPolicies().forEach(({ name }) => {
      client.pipeline.removePolicy({ name });
    });
  });

  it("Paging_getNoItemNamePages", async () => {
    // Paginate assumes the resource supports get and nextLink is an opaque url to which a get can be done
    // by default and following autorest x-ms-pageable extension, Paginate assumes that the pageable result
    // will contain a property nextLink which is the opaque url for the next page, and a value property containing
    // an array with the results (the page);
    const expectedPage = [{ foo: 1 }];
    mockResponse(client, [
      { path: "/paging/noitemname", response: { status: 200, body: { value: expectedPage } } },
    ]);
    const response: TestResponse = await client.pathUnchecked("/paging/noitemname").get();
    const items = paginate(client, response);
    const result = [];

    for await (const item of items) {
      result.push(item);
    }

    assert.deepEqual(result, expectedPage);
  });

  it("Paging_getNullNextLinkNamePages", async () => {
    // A paging operation that must ignore any kind of nextLink, and stop after page 1.

    const expectedPage = [{ foo: 1 }];
    mockResponse(client, [
      {
        path: "/paging/nullnextlink",
        response: { status: 200, body: { value: expectedPage, nextLink: "/paging/nullnextlink" } },
      },
      {
        path: "/paging/nullnextlink",
        response: { status: 400, body: { value: expectedPage, nextLink: "/paging/nullnextlink" } },
      },
    ]);

    const response: TestResponse = await client.pathUnchecked("/paging/nullnextlink").get();
    const items = paginateResponse(client, response, { nextLinkName: null });
    const result = [];

    for await (const item of items) {
      result.push(item);
    }

    assert.deepEqual(result, expectedPage);
  });

  it("Paging_getSinglePages", async () => {
    // Autorest x-ms-pageable extension allows setting a different name for the property that contains the page
    // we can allow overriding this through the pagingOptions values.
    // The extension also allows setting a custom nextLink property name.

    const expectedPage = [{ foo: 1 }];
    mockResponse(client, [
      { path: "/paging/single", response: { status: 200, body: { values: expectedPage } } },
    ]);

    const response: TestResponseValues = await client.pathUnchecked("/paging/single").get();
    const items = paginateCustom(client, response);
    const result = [];
    for await (const item of items) {
      // We get a strong type for item :)
      result.push(item);
    }

    assert.deepEqual(result, expectedPage);
  });

  it("Paging_firstResponseEmpty", async () => {
    // First response has an empty [] next page contains a page with an element
    const expectedPage = [{ foo: 1 }];
    mockResponse(client, [
      {
        path: "/paging/firstResponseEmpty/1",
        response: { status: 200, body: { value: [], nextLink: "/paging/firstResponseEmpty/2" } },
      },
      {
        path: "/paging/firstResponseEmpty/2",
        response: { status: 200, body: { value: expectedPage } },
      },
    ]);

    const response: TestResponse = await client.pathUnchecked("/paging/firstResponseEmpty/1").get();
    const items = paginate(client, response);
    const result = [];
    for await (const item of items) {
      result.push(item);
    }

    assert.deepEqual(result, expectedPage);
  });

  it("Paging_getMultiplePages", async () => {
    const expectedPages = [{ foo: 1 }, { foo: 2 }, { foo: 3 }];

    const mockResponses: MockResponse[] = [
      {
        path: "/paging/multiple",
        response: {
          status: 200,
          body: { value: [expectedPages[0]], nextLink: "/paging/multiple/1" },
        },
      },
      {
        path: "/paging/multiple/1",
        response: {
          status: 200,
          body: { value: [expectedPages[1]], nextLink: "/paging/multiple/2" },
        },
      },
      {
        path: "/paging/multiple/2",
        response: {
          status: 200,
          body: { value: [expectedPages[2]], nextLink: undefined },
        },
      },
    ];

    mockResponse(client, mockResponses);

    const response: TestResponse = await client.pathUnchecked("/paging/multiple").get();
    const items = paginate(client, response);
    const result = [];
    for await (const item of items) {
      result.push(item);
    }

    assert.deepEqual(result, [...expectedPages]);
  });
});

interface MockResponse {
  path: string;
  response: {
    status: number;
    body: any;
  };
}

/**
 * Creates a pipeline with a mocked service call
 * @param client - client to mock requests for
 * @param response - Responses to return, the actual request url is matched to one of the paths in the responses and the defined object is returned.
 * if no path matches a 404 error is returned
 */
function mockResponse(client: Client, responses: MockResponse[]) {
  let count = 0;

  client.pipeline.addPolicy({
    name: "mockClient",
    sendRequest: async (request, _next): Promise<PipelineResponse> => {
      if (count < responses.length) {
        count++;
      }

      const path = new URL(request.url).pathname;

      const response = responses.find((r) => r.path === path);

      if (!response) {
        return {
          headers: createHttpHeaders(),
          request,
          status: 404,
        };
      }

      const { body, status } = response.response;
      const bodyAsText = JSON.stringify(body);
      return {
        headers: createHttpHeaders(),
        request,
        status,
        bodyAsText,
      };
    },
  });
}
