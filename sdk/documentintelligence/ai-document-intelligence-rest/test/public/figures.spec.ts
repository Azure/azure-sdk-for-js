// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { env } from "@azure-tools/test-recorder";
import DocumentIntelligence from "../../src/documentIntelligence.js";
import { describe, it } from "vitest";
import fs from "fs";
import path from "path";
import { getLongRunningPoller, isUnexpected } from "../../src/index.js";
import {
  ASSET_PATH,
} from "./utils/utils.js";

describe("DocumentIntelligenceClient", () => {
  describe("get AnalyzeResult methods", function () {
    it("getAnalyzeResult figures", async function () {
      await analyze();
    });
  });
});


const MODEL_ID = 'prebuilt-layout';

const FILE_PATH = path.join(ASSET_PATH, "test.pdf");

const API_ENDPOINT = env.DOCUMENT_INTELLIGENCE_ENDPOINT || "";
const API_KEY = env.DOCUMENT_INTELLIGENCE_API_KEY || "";

const client = DocumentIntelligence(API_ENDPOINT, {
  key: API_KEY,
}, {
  additionalPolicies: [{
    policy: {
      name: 'documentIntelligencePolicy',
      async sendRequest(request, next) {
        console.log(`Request: ${request.url}`);
        return next(request);
      }
    },
    position: "perCall"
  }]
}
);


interface AnalyzeResponse {
  analyzeResult?: {
    figures?: Figure[];
  };
}

interface Figure {
  id?: string;
}

async function fetchFigure(responseId: string, figureId: string): Promise<void | null> {
  console.log(`modelId: ${MODEL_ID}, responseId: ${responseId}, figureId: ${figureId}`);
  const response = await client
    .path(`/documentModels/{modelId}/analyzeResults/{resultId}/figures/{figureId}`, MODEL_ID, responseId, figureId)
    .get();

  console.log(response.headers["content-type"]);
  console.log(response);
  const { body } = response;

  if (Buffer.isBuffer(body)) {
    await fs.promises.writeFile(`./figures/${figureId}.png`, body);
  }
}

async function analyze(): Promise<void> {
  const base64Source = fs.readFileSync(FILE_PATH, { encoding: 'base64' });
  await fs.promises.rm(`./figures`, { recursive: true }).catch(() => { });
  await fs.promises.mkdir(`./figures`);

  const initialResponse = await client.path(`/documentModels/{modelId}:analyze`, MODEL_ID).post({
    contentType: 'application/json',
    body: { base64Source },
    queryParameters: {
      output: ['figures'],
    },
  });

  const poller = await getLongRunningPoller(client, initialResponse);

  const response = await poller.pollUntilDone();

  if (isUnexpected(response)) {
    console.log(response);
    throw new Error("The response was unexpected.");
  }

  const figures = (response.body as AnalyzeResponse).analyzeResult?.figures || [];

  for (const figure of figures) {
    if (figure.id) {

      await fetchFigure(poller.getOperationId(), figure.id);
    }
  };
}
