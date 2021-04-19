// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export type RequestBodyTransformsType = {
  stringTransforms?: Array<(body: string) => string>;
  jsonTransforms?: Array<(body: { [x: string]: unknown }) => { [x: string]: unknown }>;
};

/**
 * Provides the default customizations that need to be applied on the generated recordings
 */
export const defaultRequestBodyTransforms: RequestBodyTransformsType = {
  stringTransforms: [
    (body: string) =>
      body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id")
  ],
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
      updatedFixture = fixture.replace(matches[2], updatedBody);
    }

    // Modify the updated fixture with `.filteringRequestBody` method to be able to match the request in playback
    matches = updatedFixture.match(/\.post\((.*)\, (.*)\)\n\s*.reply\(/);
    if (matches?.[0] && requestBodyTransformations.stringTransforms) {
      for (const transformation of requestBodyTransformations.stringTransforms) {
        updatedFixture = updatedFixture.replace(
          matches[0],
          `.filteringRequestBody(${transformation.toString()})\n  ` + matches[0]
        );
      }
    }
    return updatedFixture;
  } else {
    // TODO: Browser side - not needed right now since identity is not being upgraded to msal
  }

  return fixture;
}
