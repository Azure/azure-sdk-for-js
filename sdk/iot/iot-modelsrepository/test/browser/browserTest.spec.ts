// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ModelsRepositoryClient } from "../../src/index.js";
import { ServiceClient } from "@azure/core-client";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { afterEach, describe, it, expect, vi } from "vitest";

afterEach(() => vi.restoreAllMocks());

describe("resolver -  browser", () => {
  describe("single resolution (no pseudo-parsing)", () => {
    it("resolves an expanded model in browser", async () => {
      const dtmi = "dtmi:azure:DeviceManagement:DeviceInformation;1";
      const endpoint = "https://www.devicemodels.contoso.com";
      vi.spyOn(ServiceClient.prototype, "sendRequest").mockImplementation(async (request) => {
        expect(request.url).to.equal(
          `${endpoint}/dtmi/azure/devicemanagement/deviceinformation-1.expanded.json`,
        );
        return {
          request,
          bodyAsText: JSON.stringify([{ "@id": dtmi }]),
          status: 200,
          headers: createHttpHeaders(),
        };
      });
      const client = new ModelsRepositoryClient({ repositoryLocation: endpoint });
      const actualOutput = await client.getModels(dtmi, {
        dependencyResolution: "tryFromExpanded",
      });
      expect(actualOutput[dtmi]).to.deep.equal({ "@id": dtmi });
    });
  });
});
