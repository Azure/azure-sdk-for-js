// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import createClient from "../../../src/textTranslationClient.js";
import { TokenCredential } from "@azure/core-auth";
import { ErrorResponseOutput } from "../../../src/outputModels.js";
import { env } from "@azure-tools/test-recorder";

// Default test distance functions
export function editDistance(s1: string, s2: string): number {
  const n1 = s1.length;
  const n2 = s2.length;
  return distance(s1, s2, n1, n2);
}

export function distance(s1: string, s2: string, n1: number, n2: number): number {
  if (n1 === 0) {
    return n2;
  }

  if (n2 === 0) {
    return n1;
  }

  if (s1[n1 - 1] === s2[n2 - 1]) {
    const d: number = distance(s1, s2, n1 - 1, n2 - 1);
    return d;
  }
  const nums: number[] = [
    distance(s1, s2, n1, n2 - 1),
    distance(s1, s2, n1 - 1, n2),
    distance(s1, s2, n1 - 1, n2 - 1),
  ];
  return 1 + Math.min(...nums);
}

// Helper function to create a client for testing
export function getClient({
  credential,
}: {
  credential?: TokenCredential;
} = {}) {
  const endpoint = env.TRANSLATOR_ENDPOINT || "https://api.cognitive.microsofttranslator.com";
  return createClient(endpoint, {
    credential: credential,
  });
}

// Helper function to extract error response body from error object
export function getErrorResponseBody(error: any): ErrorResponseOutput {
  const body = error.response?.body;
  
  // If the body is already in the expected format, return it
  if (body && typeof body === "object" && body.error) {
    return body as ErrorResponseOutput;
  }
  
  // If the body is a string, try to parse it
  if (body && typeof body === "string") {
    try {
      return JSON.parse(body) as ErrorResponseOutput;
    } catch (e) {
      throw new Error(`Failed to parse error body: ${e}`);
    }
  }
  
  throw new Error("Could not get error response body");
}
