/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ModelsRepositoryClient, ModelsRepositoryClientOptions } from "../../../src";
import * as coreClient from "@azure/core-client";

import { assert, expect } from "chai";
import * as sinon from "sinon";

import { dependencyResolutionType } from "../../../src/dependencyResolutionType";

interface remoteResolutionScenario {
  name: string;
  clientOptions: {
    dependencyResolution: dependencyResolutionType;
    repositoryLocation: string;
  };
  getModelsOptions: any;
  dtmis: {
    dtmi: string;
    expectedUri: string;
    expectedOutputJson: {
      fakeDtdl: string;
    };
  }[];
}

const remoteResolutionScenarios: remoteResolutionScenario[] = [
  {
    name: "dependencyResolution: disabled, single DTMI, no dependencies",
    clientOptions: {
      dependencyResolution: "disabled",
      repositoryLocation: "https://www.devicemodels.contoso.com"
    },
    getModelsOptions: {},
    dtmis: [
      {
        dtmi: "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
        expectedUri:
          "https://devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.json",
        expectedOutputJson: { fakeDtdl: "fakeBodyAsText" }
      }
    ]
  },
  {
    name: "dependencyResolution: enabled, single DTMI, no dependencies",
    clientOptions: {
      dependencyResolution: "enabled",
      repositoryLocation: "https://www.devicemodels.contoso.com"
    },
    getModelsOptions: {},
    dtmis: [
      {
        dtmi: "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
        expectedUri:
          "https://devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.json",
        expectedOutputJson: { fakeDtdl: "fakeBodyAsText" }
      }
    ]
  },
  {
    name: "dependencyResolution: tryFromExpanded, single DTMI, no dependencies",
    clientOptions: {
      dependencyResolution: "tryFromExpanded",
      repositoryLocation: "https://www.devicemodels.contoso.com"
    },
    getModelsOptions: {},
    dtmis: [
      {
        dtmi: "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
        expectedUri:
          "https://devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.json",
        expectedOutputJson: { fakeDtdl: "fakeBodyAsText" }
      }
    ]
  },
  {
    name: "dependencyResolution: disabled, multiple DTMI, no dependencies",
    clientOptions: {
      dependencyResolution: "tryFromExpanded",
      repositoryLocation: "https://www.devicemodels.contoso.com"
    },
    getModelsOptions: {},
    dtmis: [
      {
        dtmi: "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
        expectedUri:
          "https://devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.json",
        expectedOutputJson: { fakeDtdl: "fakeBodyAsText" }
      }
    ]
  }
];

describe("resolver - node", function() {
  afterEach(function() {
    sinon.restore();
  });

  describe("remote URL resolution", function() {
    remoteResolutionScenarios.forEach((scenario: remoteResolutionScenario) => {
      it(scenario.name, function(done) {
        let myStub = sinon.stub(coreClient, "ServiceClient");
        for (let i = 0; i < scenario.dtmis.length; i++) {
          myStub.onCall(i).returns({
            sendRequest: function(req: any) {
              assert.deepEqual(
                req.url,
                scenario.dtmis[i].expectedUri,
                "URL not formatted for request correctly."
              );
              return Promise.resolve({
                bodyAsText: JSON.stringify(scenario.dtmis[i].expectedOutputJson),
                status: 200
              });
            }
          });
        }

        const myOptions: ModelsRepositoryClientOptions = scenario.clientOptions;
        const dtmiClient = new ModelsRepositoryClient(myOptions);
        const listOfDtmis = scenario.dtmis.map((x) => x.dtmi);
        const result = dtmiClient.getModels(listOfDtmis, scenario.getModelsOptions);
        const expectedOutput: any = {};
        scenario.dtmis.forEach((element) => {
          expectedOutput[element.dtmi] = element.expectedOutputJson;
        });
        assert(result instanceof Promise, "resolve method did not return a promise");
        result
          .then((actualOutput: any) => {
            expect(actualOutput).to.deep.equal(expectedOutput);
            done();
          })
          .catch((err: any) => done(err));
      });
    });
  });
});
