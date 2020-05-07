// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const SDK_VERSION: string = "1.0.0-preview.3";

export const DEFAULT_COGNITIVE_SCOPE = "https://cognitiveservices.azure.com/.default";

export const LIB_INFO = `azsdk-js-ai-formrecognizer/${SDK_VERSION}`;

/**
 * Maximum size of input documents allowed by the Azure Form Recognizer service.
 * @internal
 */
export const MAX_INPUT_DOCUMENT_SIZE = 50 * 1024 * 1024; // 50 MB
