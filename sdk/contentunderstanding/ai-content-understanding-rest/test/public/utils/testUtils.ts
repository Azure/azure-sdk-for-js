// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to sample files
export const SAMPLE_FILES_PATH = path.resolve(__dirname, "../../../sample_files");

/**
 * Generate a unique analyzer ID for testing
 */
export function generateTestAnalyzerId(prefix: string = "test-analyzer"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(7)}`;
}

/**
 * Sleep for a specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Create a test URL for a public sample document
 */
export function getPublicTestDocumentUrl(): string {
  return "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-invoice.pdf";
}
