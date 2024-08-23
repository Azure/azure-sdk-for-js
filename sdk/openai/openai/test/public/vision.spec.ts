// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure-tools/test-utils-vitest";
import { assert, describe, beforeEach, it, beforeAll } from "vitest";
import { createClient } from "./utils/createClient.js";
import { assertChatCompletions } from "./utils/asserts.js";
import {
  APIMatrix,
  APIVersion,
  DeploymentInfo,
  getDeployments,
  withDeployments,
} from "./utils/utils.js";
import OpenAI, { AzureOpenAI } from "openai";
import { logger } from "@azure/identity";
import { RestError } from "@azure/core-rest-pipeline";
import { visionModelsToSkip } from "./utils/models.js";

describe("OpenAI", function () {
  let deployments: DeploymentInfo[] = [];

  beforeAll(async function () {
    deployments = await getDeployments("vision");
  });

  matrix([APIMatrix] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let client: AzureOpenAI | OpenAI;

      beforeEach(async function () {
        client = createClient(apiVersion, "vision");
      });

      describe("getChatCompletions", function () {
        it("Describes an image", async function () {
          const url =
            "https://www.nasa.gov/wp-content/uploads/2023/11/53296469002-a92ea42cb9-o.jpg";
          await withDeployments(
            deployments,
            (deploymentName) =>
              client.chat.completions.create({
                model: deploymentName,
                messages: [
                  {
                    role: "user",
                    content: [
                      {
                        type: "text",
                        text: "What’s in this image?",
                      },
                      {
                        type: "image_url",
                        image_url: {
                          url,
                          detail: "auto",
                        },
                      },
                    ],
                  },
                ],
              }),
            (res) => {
              assertChatCompletions(res);
              try {
                assert.isTrue(
                  res.choices[0].message?.content?.includes("snow") ||
                    res.choices[0].message?.content?.includes("icy"),
                );
              } catch (error: any) {
                if (error.name === "AssertionError") {
                  logger.info("The content returned is:", res.choices[0].message?.content);
                } else {
                  throw new RestError("Unexpceted error encounterd", error);
                }
              }
            },
            { modelsListToSkip: visionModelsToSkip },
          );
        });
      });
    });
  });
});
