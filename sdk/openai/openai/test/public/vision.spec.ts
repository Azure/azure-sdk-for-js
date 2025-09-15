// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe } from "vitest";
import { assertChatCompletions } from "../utils/asserts.js";
import { createClientsAndDeployments } from "../utils/createClients.js";
import { visionModelsToSkip } from "../utils/models.js";
import type { ClientsAndDeploymentsInfo } from "../utils/types.js";
import { APIMatrix, APIVersion, testWithDeployments } from "../utils/utils.js";

describe.concurrent.each(APIMatrix)("Vision [%s]", (apiVersion: APIVersion) => {
  const clientsAndDeploymentsInfo: ClientsAndDeploymentsInfo = createClientsAndDeployments(
    apiVersion,
    { chatCompletion: "true" },
  );

  describe.skipIf(apiVersion === APIVersion.v2024_10_21)("chat.completions.create", function () {
    describe("Describes an image from external URL", () => {
      testWithDeployments({
        clientsAndDeploymentsInfo,
        apiVersion,
        run: async (client, deploymentName) => {
          const url =
            "https://www.nasa.gov/wp-content/uploads/2023/11/53296469002-a92ea42cb9-o.jpg";
          return client.chat.completions.create({
            model: deploymentName,
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: "What's in this image?",
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
          });
        },
        modelsListToSkip: visionModelsToSkip,
        validate: (res) => {
          assertChatCompletions(res);
        },
      });
    });
    describe("Describes an image from base64", () => {
      const base64Image =
        "data:image/gif;base64,R0lGODdhAQABAIEAAAAAAAAAAAAAAAAAACwAAAAAAQABAAAIBAABBAQAOw==";
      testWithDeployments({
        clientsAndDeploymentsInfo,
        apiVersion,
        run: async (client, deploymentName) => {
          return client.chat.completions.create({
            model: deploymentName,
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: "What's in this image?" },
                  {
                    type: "image_url",
                    image_url: {
                      url: `${base64Image}`,
                      detail: "auto",
                    },
                  },
                ],
              },
            ],
          });
        },
        modelsListToSkip: visionModelsToSkip,
        validate: (res) => {
          assertChatCompletions(res);
        },
      });
    });
  });
});
