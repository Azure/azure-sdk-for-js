import {
  decodeHexEncodingIfExistsInNockFixture,
  handleSingleQuotesInUrlPath,
  isBrowser,
  maskAccessTokenInRecording
} from "./utils";

export const defaultCustomizationsForNodeRecordings = [
  // Decodes "hex" strings in the response from the recorded fixture if any exists.
  decodeHexEncodingIfExistsInNockFixture,
  // Nock bug: Single quotes in the path of the url are not handled by nock.
  // (Link to the bug 🐛: https://github.com/nock/nock/issues/2136)
  // The following is the workaround we use in the recorder until nock fixes it.
  handleSingleQuotesInUrlPath
];

export const defaultCustomizationsForBrowserRecordings = [];

/**
 * Provides the default customizations that need to be applied on the generated recordings
 */
export const defaultCustomizationsOnRecordings = [
  // Masks "access_token"s in the json response from the recording if any exists.
  maskAccessTokenInRecording
].concat(
  !isBrowser() ? defaultCustomizationsForNodeRecordings : defaultCustomizationsForBrowserRecordings
);
