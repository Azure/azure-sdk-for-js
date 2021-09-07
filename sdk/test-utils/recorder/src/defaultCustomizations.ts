import {
  decodeHexEncodingIfExistsInNockFixture,
  isBrowser,
  maskAccessTokenInBrowserRecording,
  maskAccessTokenInNockFixture,
  sanitizeScopeUrl
} from "./utils";

export const defaultCustomizationsForNodeRecordings = [
  // Decodes "hex" strings in the response from the recorded fixture if any exists.
  decodeHexEncodingIfExistsInNockFixture,
  // Masks "access_token"s in the json response from the recording if any exists.
  maskAccessTokenInNockFixture,
  // Sanitizes the scope url in the request bodies to clean false positives in cred-scan reports
  sanitizeScopeUrl
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
