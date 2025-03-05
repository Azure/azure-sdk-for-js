// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { assert, describe, beforeEach, it } from "vitest";
import { createClientsAndDeployments } from "../utils/createClients.js";
import { assertChatCompletions } from "../utils/asserts.js";
import { APIMatrix, type APIVersion, withDeployments } from "../utils/utils.js";
import { RestError } from "@azure/core-rest-pipeline";
import type { ClientsAndDeploymentsInfo } from "../utils/types.js";
import { logger } from "../utils/logger.js";

describe("Vision", function () {
  matrix([APIMatrix] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let clientsAndDeployments: ClientsAndDeploymentsInfo;

      beforeEach(async () => {
        clientsAndDeployments = createClientsAndDeployments(
          apiVersion,
          { chatCompletion: "true" },
          {
            modelsToSkip: [{ name: "gpt-4o-audio-preview" }, { name: "o1" }, { name: "o3-mini" }],
          },
        );
      });

      describe("chat.completions.create", function () {
        it("Describes an image", async () => {
          const url =
            "https://www.nasa.gov/wp-content/uploads/2023/11/53296469002-a92ea42cb9-o.jpg";
          await withDeployments(
            clientsAndDeployments,
            (client, deploymentName) =>
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
          );
        });
      });
    });
  });
});
