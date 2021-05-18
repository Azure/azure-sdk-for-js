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
export const defaultRequestBodyTransforms: RequestBodyTransformsType = {
  stringTransforms: [],
  jsonTransforms: []
};

/**
 * Transformations to be applied on the requestBody in record mode for "string" fixtures to be able to filter the requests in playback.
 */
export function applyRequestBodyTransformations(
  runtime: "node" | "browser",
  fixture: string,
  requestBodyTransformations?: RequestBodyTransformsType
): string;

/**
 * Transformations to be applied on the requestBody in record mode for "JSON" fixtures to be able to filter the requests in playback.
 */
export function applyRequestBodyTransformations(
  runtime: "node" | "browser",
  fixture: { [x: string]: unknown },
  requestBodyTransformations?: RequestBodyTransformsType
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
export function applyRequestBodyTransformations(
  runtime: "node" | "browser",
  fixture: string | { [x: string]: unknown },
  requestBodyTransformations?: RequestBodyTransformsType
): string | { [x: string]: unknown } {
  if (!requestBodyTransformations) {
    return fixture;
  }
  if (runtime === "node") {
    if (typeof fixture !== "string") {
      // TODO: Handle JSON fixtures here - parts of below can be refactored
      // Not required yet since we're not handling the browser recordings
      return fixture;
    }
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
      let updatedBody = matches[2]; // Must be string - either normal or JSON-stringified
      // normal string
      for (const transformation of requestBodyTransformations.stringTransforms) {
        updatedBody = transformation(updatedBody);
      }
      // TODO: Handle JSON stringified bodies - not required as of now

      // Updated fixture with the new request body
      // Example:
      //    .post('/azuretenantid/oauth2/v2.0/token', "client-request-id=client-request-id&client_secret=azure_client_secret")
      //    .reply(200,....
      updatedFixture = fixture.replace(matches[2], updatedBody);
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
  } else {
    // TODO: Browser side - not needed right now since the browser tests are not using the new identity with msal
    console.log("This feature is not yet supported in the browser");
  }

  return fixture;
}
