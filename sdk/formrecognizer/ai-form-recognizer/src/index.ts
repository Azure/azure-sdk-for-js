// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference path="../dom-shims.d.ts" />

export { AzureKeyCredential } from "@azure/core-auth";

export {
  FormContentType,
  FormRecognizerClientOptions,
  FormRecognizerOperationOptions
} from "./common";
export * from "./formRecognizerClient";
export * from "./formTrainingClient";
export * from "./models";

// src/lro/analyze/contentPoller.ts:38:3 - (ae-forgotten-export) The symbol "GeneratedClientAnalyzeLayoutAsyncResponse" needs to be exported by the entry point index.d.ts
// src/lro/analyze/contentPoller.ts:44:3 - (ae-forgotten-export) The symbol "RecognizeContentResultResponse" needs to be exported by the entry point index.d.ts
// src/lro/analyze/customFormPoller.ts:38:3 - (ae-forgotten-export) The symbol "GeneratedClientAnalyzeWithCustomModelResponse" needs to be exported by the entry point index.d.ts
// src/lro/analyze/customFormPoller.ts:45:3 - (ae-forgotten-export) The symbol "RecognizeFormResultResponse" needs to be exported by the entry point index.d.ts
// src/lro/analyze/receiptPoller.ts:38:3 - (ae-forgotten-export) The symbol "GeneratedClientAnalyzeReceiptAsyncResponse" needs to be exported by the entry point index.d.ts
// src/lro/copy/poller.ts:37:3 - (ae-forgotten-export) The symbol "GeneratedClientCopyCustomModelResponse" needs to be exported by the entry point index.d.ts
// src/lro/copy/poller.ts:43:3 - (ae-forgotten-export) The symbol "GeneratedClientGetCustomModelCopyResultResponse" needs to be exported by the entry point index.d.ts
// src/lro/train/poller.ts:21:3 - (ae-forgotten-export) The symbol "GeneratedClientTrainCustomModelAsyncResponse" needs to be exported by the entry point index.d.ts

// TODO: api-extractor wants these internal types to be exported,
//       but we should be able to avoid most of them by changing
//       the export * from above to be more conservative in our
//       exports.

export {
  GeneratedClientAnalyzeLayoutAsyncResponse,
  GeneratedClientAnalyzeWithCustomModelResponse,
  GeneratedClientAnalyzeReceiptAsyncResponse,
  GeneratedClientCopyCustomModelResponse,
  GeneratedClientGetCustomModelCopyResultResponse,
  GeneratedClientTrainCustomModelAsyncResponse
} from "./generated/models";

// TODO: These internals shouldn't need to be exported.

export { RecognizeContentResultResponse, RecognizeFormResultResponse } from "./internalModels";
