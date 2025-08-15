// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe } from "vitest";
import { testWithDeployments, APIMatrix, type APIVersion } from "../utils/utils.js";
import { createClientsAndDeployments } from "../utils/createClients.js";

describe.concurrent.each(APIMatrix)("AbortSignal [%s]", (apiVersion: APIVersion) => {
  const clientsAndDeploymentsInfo = createClientsAndDeployments(apiVersion, {
    chatCompletion: "true",
  });

  describe.concurrent("chat.completions.stream.events.abort", () => {
    testWithDeployments({
      clientsAndDeploymentsInfo,
      apiVersion,
      modelsListToSkip: [{ name: "gpt-4o-audio-preview" }, { name: "gpt-4o-mini-audio-preview" }],
      run: async (client, model) => {
        try {
          const params: any = {
            model,
            messages: [
              {
                role: "user",
                content: "start rambling",
              },
            ],
            stream: true,
          };

          const events = client.chat.completions.stream(params);

          for await (const event of events) {
            assert.isDefined(event);
            events.abort();
          }

          assert.fail("Expected to abort streaming");
        } catch (error: any) {
          if (!/aborted/.test(error.message)) {
            throw error;
          }
        }
      },
      acceptableErrors: {
        messageSubstring: ["is enabled only for api versions"],
      },
    });
  });
});
