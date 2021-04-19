// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { expect } from "chai";
import { ModelsRepositoryClient } from "../../src";

describe("resolver -  browser", () => {
  describe("single resolution (no pseudo-parsing)", () => {
    it.only("integration works in browser", function(done) {
      const dtmi: string = "dtmi:azure:DeviceManagement:DeviceInformation;1";
      const endpoint = "https://devicemodels.azure.com";
      const client = new ModelsRepositoryClient({repositoryLocation: endpoint});
      const result = client.getModels(dtmi, {dependencyResolution: 'tryFromExpanded'});
      result
        .then((actualOutput: any) => {
          expect(actualOutput).to.equal('test');
          done();
        })
        .catch((err: any) => done(err));
    });
  });
});
