// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ModelsRepositoryClientOptions,
  dependencyResolutionType,
} from "@azure/iot-modelsrepository";
import { ModelsRepositoryClient } from "@azure/iot-modelsrepository";
import { ServiceClient } from "@azure/core-client";
import type { PipelineRequest } from "@azure/core-rest-pipeline";
import { describe, it, assert, expect, vi } from "vitest";

interface RemoteResolutionScenario {
  name: string;
  clientOptions: {
    dependencyResolution: dependencyResolutionType;
    repositoryLocation: string;
  };
  getModelsOptions: any;
  dtmis: {
    dtmi: string;
    expectedUri: string;
    mockedResponse: unknown;
    expectedOutputJson: unknown;
  }[];
}

const remoteResolutionScenarios: RemoteResolutionScenario[] = [
  {
    name: "dependencyResolution: disabled, single DTMI, no options",
    clientOptions: {
      dependencyResolution: "disabled",
      repositoryLocation: "https://www.devicemodels.contoso.com",
    },
    getModelsOptions: undefined,
    dtmis: [
      {
        dtmi: "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
        expectedUri:
          "https://www.devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.json",
        mockedResponse: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText",
        },
        expectedOutputJson: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText",
        },
      },
    ],
  },
  {
    name: "dependencyResolution: disabled, single DTMI, no dependencies",
    clientOptions: {
      dependencyResolution: "disabled",
      repositoryLocation: "https://www.devicemodels.contoso.com",
    },
    getModelsOptions: {},
    dtmis: [
      {
        dtmi: "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
        expectedUri:
          "https://www.devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.json",
        mockedResponse: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText",
        },
        expectedOutputJson: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText",
        },
      },
    ],
  },
  {
    name: "dependencyResolution: enabled, single DTMI, no dependencies",
    clientOptions: {
      dependencyResolution: "enabled",
      repositoryLocation: "https://www.devicemodels.contoso.com",
    },
    getModelsOptions: {},
    dtmis: [
      {
        dtmi: "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
        expectedUri:
          "https://www.devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.json",
        mockedResponse: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText",
        },
        expectedOutputJson: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText",
        },
      },
    ],
  },
  {
    name: "dependencyResolution: tryFromExpanded, single DTMI, no dependencies",
    clientOptions: {
      dependencyResolution: "tryFromExpanded",
      repositoryLocation: "https://www.devicemodels.contoso.com",
    },
    getModelsOptions: {},
    dtmis: [
      {
        dtmi: "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
        expectedUri:
          "https://www.devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.expanded.json",
        mockedResponse: [
          {
            "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
            fakeDtdl: "fakeBodyAsText",
          },
        ],
        expectedOutputJson: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText",
        },
      },
    ],
  },
  {
    name: "dependencyResolution: disabled, multiple DTMI, no dependencies",
    clientOptions: {
      dependencyResolution: "tryFromExpanded",
      repositoryLocation: "https://www.devicemodels.contoso.com",
    },
    getModelsOptions: {},
    dtmis: [
      {
        dtmi: "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
        expectedUri:
          "https://www.devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.expanded.json",
        mockedResponse: [
          {
            "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
            fakeDtdl: "fakeBodyAsText",
          },
        ],
        expectedOutputJson: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText",
        },
      },
      {
        dtmi: "dtmi:com:FooFooFoo;4",
        expectedUri: "https://www.devicemodels.contoso.com/dtmi/com/foofoofoo-4.expanded.json",
        mockedResponse: [{ "@id": "dtmi:com:FooFooFoo;4", fakeDtdl: "fakeBodyAsText" }],
        expectedOutputJson: { "@id": "dtmi:com:FooFooFoo;4", fakeDtdl: "fakeBodyAsText" },
      },
    ],
  },
];

describe("resolver - node", () => {
  describe("remote URL resolution", () => {
    remoteResolutionScenarios.forEach((scenario: RemoteResolutionScenario) => {
      it(scenario.name, async () => {
        console.log(scenario.name);
        const myStub = vi.spyOn(ServiceClient.prototype, "sendRequest");
        for (let i = 0; i < scenario.dtmis.length; i++) {
          myStub.mockImplementationOnce((request: PipelineRequest) => {
            expect(request.url, "URL not formatted for request correctly.").to.deep.equal(
              scenario.dtmis[i].expectedUri,
            );
            const pipelineResponse: any = {
              request: request,
              bodyAsText: JSON.stringify(scenario.dtmis[i].mockedResponse),
              status: 200,
              headers: undefined,
            };
            return Promise.resolve(pipelineResponse);
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
        const actualOutput: any = await result;
        expect(actualOutput).to.deep.equal(expectedOutput);
      });
    });
  });
});
