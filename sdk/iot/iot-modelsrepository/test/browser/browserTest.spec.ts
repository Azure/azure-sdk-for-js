// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ModelsRepositoryClient } from "../../src/index.js";
import { ServiceClient } from "@azure/core-client";
import type { PipelineRequest } from "@azure/core-rest-pipeline";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("resolver -  browser", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("single resolution (no pseudo-parsing)", () => {
    it("integration works in browser", async () => {
      const dtmi: string = "dtmi:azure:DeviceManagement:DeviceInformation;1";
      const endpoint = "https://devicemodels.azure.com";
      const expectedUri =
        "https://devicemodels.azure.com/dtmi/azure/devicemanagement/deviceinformation-1.expanded.json";
      const mockedModel = {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:azure:DeviceManagement:DeviceInformation;1",
        "@type": "Interface",
        displayName: "Device Information",
        contents: [
          {
            "@type": "Property",
            name: "manufacturer",
            displayName: "Manufacturer",
            schema: "string",
          },
        ],
      };

      const sendRequestStub = vi.spyOn(ServiceClient.prototype, "sendRequest");
      sendRequestStub.mockImplementation((request: PipelineRequest) => {
        expect(request.url, "URL not formatted for request correctly.").to.equal(expectedUri);
        const pipelineResponse: any = {
          request,
          bodyAsText: JSON.stringify([mockedModel]),
          status: 200,
          headers: undefined,
        };
        return Promise.resolve(pipelineResponse);
      });

      const client = new ModelsRepositoryClient({ repositoryLocation: endpoint });
      const actualOutput: { [x: string]: any } = await client.getModels(dtmi, {
        dependencyResolution: "tryFromExpanded",
      });

      expect(sendRequestStub).toHaveBeenCalledOnce();
      expect(actualOutput["dtmi:azure:DeviceManagement:DeviceInformation;1"]).to.not.equal(
        undefined,
      );
      expect(actualOutput["dtmi:azure:DeviceManagement:DeviceInformation;1"]["@id"]).to.equal(
        "dtmi:azure:DeviceManagement:DeviceInformation;1",
      );
    });
  });
});
