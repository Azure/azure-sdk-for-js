// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  getLongRunningPoller,
  isUnexpected,
  type DocumentClassifierDetailsOutput,
  type DocumentIntelligenceClient,
} from "@azure-rest/ai-document-intelligence";
import { getClassifierTrainingDataContainerSasUrl } from "../../utils/injectables.js";
import { assert } from "vitest";
import { getRandomNumber } from "./utils.js";
import type { Recorder } from "@azure-tools/test-recorder";

function containerSasUrl(): string {
  return getClassifierTrainingDataContainerSasUrl();
}

let _classifier: DocumentClassifierDetailsOutput;

export async function buildClassifier(
  client: DocumentIntelligenceClient,
  recorder: Recorder,
): Promise<DocumentClassifierDetailsOutput> {
  if (!_classifier) {
    const customClassifierDescription = "Custom classifier description";
    const classifierId = recorder.variable("classifierId", `test-classifier-${getRandomNumber()}`);
    const initialResponse = await client.path("/documentClassifiers:build").post({
      body: {
        classifierId,
        description: customClassifierDescription,
        docTypes: {
          foo: {
            azureBlobSource: {
              containerUrl: containerSasUrl(),
              prefix: "IRS-1040-A/train",
            },
          },
          bar: {
            azureBlobSource: {
              containerUrl: containerSasUrl(),
              prefix: "IRS-1040-B/train",
            },
          },
        },
      },
      queryParameters: { customClassifierDescription },
    });

    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }
    const response = await getLongRunningPoller(client, initialResponse);
    _classifier = response.body as DocumentClassifierDetailsOutput;

    assert.equal(_classifier.description, customClassifierDescription);
    assert.equal(_classifier.classifierId, classifierId);
  }

  return _classifier;
}
