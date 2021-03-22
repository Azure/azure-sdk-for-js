import {
  decodeHexEncodingIfExistsInNockFixture,
  handleSingleQuotesInUrlPath,
  isBrowser,
  maskAccessTokenInBrowserRecording,
  maskAccessTokenInNockFixture
} from "./utils";

export const defaultCustomizationsForNodeRecordings = [
  // Decodes "hex" strings in the response from the recorded fixture if any exists.
  decodeHexEncodingIfExistsInNockFixture,
  // Nock bug: Single quotes in the path of the url are not handled by nock.
  // (Link to the bug 🐛: https://github.com/nock/nock/issues/2136)
  // The following is the workaround we use in the recorder until nock fixes it.
  handleSingleQuotesInUrlPath,
  // Masks "access_token"s in the json response from the recording if any exists.
  maskAccessTokenInNockFixture
];

export const defaultCustomizationsForBrowserRecordings = [
  // Masks "access_token"s in the json response from the recording if any exists.
  maskAccessTokenInBrowserRecording
];

/**
 * Provides the default customizations that need to be applied on the generated recordings
 */
export const defaultCustomizationsOnRecordings: ((fixture: any) => any)[] = !isBrowser()
  ? defaultCustomizationsForNodeRecordings
  : defaultCustomizationsForBrowserRecordings;
