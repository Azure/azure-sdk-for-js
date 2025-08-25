// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createClientLogger } from "@azure/logger";
import path from "node:path";
import {
  getBatchTrainingDataContainerSasUrl,
  getBatchTrainingDataResultContainerSasUrl,
  getTestingContainerSasUrl,
  getTrainingContainerSasUrl,
} from "../../utils/injectables.js";

export const ASSET_PATH = path.resolve(path.join(process.cwd(), "assets"));

export function makeTestUrl(urlPath: string): string {
  const testingContainerUrl = getTestingContainerSasUrl();
  const parts = testingContainerUrl.split("?");
  return `${parts[0]}${urlPath}?${parts[1]}`;
}

export function getRandomNumber(): number {
  return Math.ceil(Math.random() * 1000 + 10000);
}

export const containerSasUrl = (): string => getTrainingContainerSasUrl();

export const batchTrainingFilesContainerUrl = (): string => getBatchTrainingDataContainerSasUrl();

export const batchTrainingFilesResultContainerUrl = (): string =>
  getBatchTrainingDataResultContainerSasUrl();

export const logger = createClientLogger("ai-form-recognizer:test");

export function isValidPNG(uint8Array: Uint8Array): boolean {
  const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
  return uint8Array.length >= 8 && pngSignature.every((byte, i) => uint8Array[i] === byte);
}

export function isValidPDF(uint8Array: Uint8Array): boolean {
  const pdfSignature = [37, 80, 68, 70, 45]; // Corresponds to "%PDF-"
  return uint8Array.length >= 5 && pdfSignature.every((byte, i) => uint8Array[i] === byte);
}
