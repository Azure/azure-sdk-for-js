// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Callbacks to be applied on the generated recordings
 * - stringTransforms - callbacks to be applied on the string based request body
 * - jsonTransforms - callbacks to be applied on the json based request body
 */
export type RequestBodyTransformsType = {
  stringTransforms?: Array<(body: string) => string>;
  jsonTransforms?: Array<(body: { [x: string]: unknown }) => { [x: string]: unknown }>;
};

/**
 * Provides the default RequestBodyTransforms that need to be applied on the generated recordings
 */
export const defaultRequestBodyTransforms: Required<RequestBodyTransformsType> = {
  stringTransforms: [
    // 1. Identity v2 with the new msal, has unique request-ids in request body, to be able to
    //    match the ids in playback we apply the following method on the request body
    //    - before saving the recording
    //      and
    //    - as a filter on the new requests to be able to match the request bodies
    // 2. Sanitizes the scope values in the recordings - to reduce the noise from cred scan reports
    (body: string) =>
      body
        .replace(/client-request-id=[^&"]*/g, "client-request-id=client-request-id")
        .replace(/scope=https%3A%2F%2F[^&"]*/g, "scope=https%3A%2F%2Fsanitized%2F")
  ],
  jsonTransforms: []
};

/**
 * Transformations to be applied on the requestBody in record mode for "string" fixtures to be able to filter the requests in playback.
 */
export function applyRequestBodyTransformationsOnFixture(
  runtime: "node" | "browser",
  fixture: string,
  requestBodyTransformations: Required<RequestBodyTransformsType>
): string;

/**
 * Transformations to be applied on the requestBody in record mode for "JSON" fixtures to be able to filter the requests in playback.
 */
export function applyRequestBodyTransformationsOnFixture(
  runtime: "node" | "browser",
  fixture: { [x: string]: unknown },
  requestBodyTransformations: Required<RequestBodyTransformsType>
): { [x: string]: unknown };

/**
 * Transformations to be applied on the requestBody in record mode to be able to filter the requests in playback.
 *
 * Example:
 *     Input:
 *        nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
 *          .post('/azuretenantid/oauth2/v2.0/token', "client-request-id=11111111-1111-1111-1111-111111111111&client_secret=azure_client_secret")
 *          .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
 *          ...
 *        ]);
 *     Output:
 *        nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
 *          .filteringRequestBody((body) => body.replace(/client-request-id=[^&]<star>/g, "client-request-id=client-request-id"))
 *          .post('/azuretenantid/oauth2/v2.0/token', "client-request-id=client-request-id&client_secret=azure_client_secret")
 *          .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
 *          ...
 *        ]);
 */
export function applyRequestBodyTransformationsOnFixture(
  runtime: "node" | "browser",
  fixture: string | { [x: string]: unknown },
  requestBodyTransformations: Required<RequestBodyTransformsType>
): string | { [x: string]: unknown } {
  if (!requestBodyTransformations) {
    return fixture;
  }
  if (runtime === "node" && typeof fixture === "string") {
    // Modify the request body
    let updatedFixture = fixture;

    // TODO: PUT and PATCH may also have request bodies, currently focusing only on POST - can be extended as needed

    // Matching the following at this point
    //    .post('/azuretenantid/oauth2/v2.0/token', "client-request-id=11111111-1111-1111-1111-111111111111&client_secret=azure_client_secret")
    //    .reply(200,....
    let matches = fixture.match(/\.post\((.*)\, (.*)\)\n\s*.reply\(/);
    if (
      matches?.[2] &&
      typeof matches[2] === "string" &&
      requestBodyTransformations.stringTransforms
    ) {
      const updatedBody = applyRequestBodyTransformations(matches[2], requestBodyTransformations); // Must be string - either normal or JSON-stringified
      // TODO: Handle JSON stringified bodies - not required as of now

      // Updated fixture with the new request body
      // Example:
      //    .post('/azuretenantid/oauth2/v2.0/token', "client-request-id=client-request-id&client_secret=azure_client_secret")
      //    .reply(200,....
      updatedFixture = updatedFixture.replace(matches[2], updatedBody);
    }

    if (updatedFixture === fixture) {
      // No need to update the fixture with filtering method since the body didn't change
      return fixture;
    }
    // Modify the updated fixture with `.filteringRequestBody` method to be able to match the request in playback
    matches = updatedFixture.match(/\.post\((.*)\, (.*)\)\n\s*.reply\(/);
    if (matches?.[0] && requestBodyTransformations.stringTransforms) {
      for (const transformation of requestBodyTransformations.stringTransforms) {
        // Add .filteringRequestBody method with the transformation in the recording
        // Example: `.filteringRequestBody((body) => body.replace(/client-request-id=[^&]<star>/g, "client-request-id=client-request-id"))`
        //
        // Recording would look like the following
        //  nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
        //   .filteringRequestBody((body) => body.replace(/client-request-id=[^&]<star>/g, "client-request-id=client-request-id"))
        //   .post('/azuretenantid/oauth2/v2.0/token', "client-request-id=client-request-id&client_secret=azure_client_secret")
        //   ...
        //  ]);
        updatedFixture = updatedFixture.replace(
          matches[0],
          `.filteringRequestBody(${transformation.toString()})\n  ` + matches[0]
        );
      }
    }
    return updatedFixture;
  } else if (runtime === "browser" && typeof fixture !== "string") {
    if (fixture?.requestBody) {
      if (typeof fixture.requestBody === "string") {
        const updatedFixture = {
          ...fixture,
          requestBody: applyRequestBodyTransformations(
            fixture.requestBody,
            requestBodyTransformations
          )
        };
        return updatedFixture;
      } else {
        // TODO: If the request body is not string - can be null or JSON
        // Not implemented yet
      }
    }
  }

  return fixture;
}

/**
 * Transformations to be applied on the requestBody in record mode for "string" bodies to be able to filter the requests in playback.
 */
export function applyRequestBodyTransformations(
  body: string,
  requestBodyTransformations: RequestBodyTransformsType
): string;

/**
 * Transformations to be applied on the requestBody in record mode for "JSON" bodies to be able to filter the requests in playback.
 */
export function applyRequestBodyTransformations(
  body: { [x: string]: unknown },
  requestBodyTransformations: RequestBodyTransformsType
): { [x: string]: unknown };

/**
 * Transformations to be applied on the requestBody in record mode to be able to filter the requests in playback.
 *
 * Example:
 *     Input:
 *        "client-request-id=11111111-1111-1111-1111-111111111111&client_secret=azure_client_secret"
 *        with
 *         (body: string) => body.replace(/client-request-id=[^&]*<slash>g, "client-request-id=client-request-id")
 *     Output:
 *        "client-request-id=client-request-id&client_secret=azure_client_secret")
 */
export function applyRequestBodyTransformations(
  body: string | { [x: string]: unknown },
  requestBodyTransformations: RequestBodyTransformsType
): string | { [x: string]: unknown } {
  if (typeof body === "string") {
    if (!requestBodyTransformations.stringTransforms) {
      return body;
    }
    let updatedBody = body;
    for (const transformation of requestBodyTransformations.stringTransforms) {
      updatedBody = transformation(updatedBody);
    }
    return updatedBody;
  } else if (typeof body === "object") {
    // TODO: Expecting JSON object or null - Yet to be implemented
  }
  return body;
}
