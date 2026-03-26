// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Allowed recording endpoint host suffixes.
 * These are the only domains permitted for recording URLs to prevent credential exfiltration.
 */
const ALLOWED_HOST_SUFFIXES = [
  ".asm.skype.com",
  ".asyncgw.teams.microsoft.com",
] as const;

/**
 * Validates that a recording URL points to Azure Communication Services
 * This prevents credential exfiltration via SSRF attacks.
 *
 * @param recordingUrl - The recording URL to validate.
 * @param parameterName - The parameter name for exception messages.
 */
export function validateRecordingUrl(recordingUrl: string, parameterName: string): void {
  if (!recordingUrl) {
    throw new TypeError(`${parameterName} cannot be null or undefined.`);
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(recordingUrl);
  } catch (error) {
    throw new Error(`${parameterName} must be a valid absolute URI.`);
  }

  // Ensure the URL is absolute and uses HTTPS
  if (!parsedUrl.protocol) {
    throw new Error(`${parameterName} must be an absolute URI.`);
  }

  if (parsedUrl.protocol.toLowerCase() !== "https:") {
    throw new Error(`${parameterName} must use HTTPS scheme for security.`);
  }

  const host = parsedUrl.hostname.toLowerCase();

  // Check against allowed suffixes
  const isValidEndpoint = ALLOWED_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix));

  if (!isValidEndpoint) {
    throw new Error(
      `${parameterName} host '${host}' is not a valid Azure Communication Services recording endpoint. ` +
        "Only URLs pointing to *.asm.skype.com, *.asyncgw.teams.microsoft.com are allowed.",
    );
  }
}