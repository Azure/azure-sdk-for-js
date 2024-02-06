// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { expect } from "chai";
import { ModelsRepositoryClient } from "../../src";

describe("resolver -  browser", () => {
  describe("single resolution (no pseudo-parsing)", () => {
    it("integration works in browser", async function () {
      const dtmi: string = "dtmi:azure:DeviceManagement:DeviceInformation;1";
      const endpoint = "https://devicemodels.azure.com";
      const client = new ModelsRepositoryClient({ repositoryLocation: endpoint });
      const actualOutput: { [x: string]: any } = await client.getModels(dtmi, {
        dependencyResolution: "tryFromExpanded",
      });
      expect(actualOutput["dtmi:azure:DeviceManagement:DeviceInformation;1"]).to.not.equal(
        undefined
      );
      expect(actualOutput["dtmi:azure:DeviceManagement:DeviceInformation;1"]["@id"]).to.equal(
        "dtmi:azure:DeviceManagement:DeviceInformation;1"
      );
    });
  });
});
