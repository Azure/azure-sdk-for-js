// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-undef */

import {
  dependencyResolutionType,
  ModelsRepositoryClient,
  ModelsRepositoryClientOptions,
} from "../../../src";

import { assert, expect } from "chai";
import * as sinon from "sinon";

import { ServiceClient } from "@azure/core-client";
import { PipelineRequest } from "@azure/core-rest-pipeline";
import { DEPENDENCY_MODE_DISABLED, DEPENDENCY_MODE_ENABLED } from "../../../src/utils/constants";
import { ModelsRepositoryMetadata } from "../../../src/interfaces/modelsRepositoryMetadata";

interface RemoteResolutionScenario {
  name: string;
  clientOptions: {
    repositoryLocation: string;
  };
  getModelsOptions: {
    dependencyResolution?: dependencyResolutionType;
  };
  dtmis: {
    dtmi: string;
    expectedUri: string;
    mockedResponse: unknown;
    expectedOutputJson: unknown;
  }[];
  metadata?: ModelsRepositoryMetadata;
}

const remoteRepositoryLocation = "https://www.devicemodels.contoso.com";

const metadataBodyWithExpanded: ModelsRepositoryMetadata = {
  commitId: "test",
  features: {
    expanded: true,
    index: true
  },
  publishDateUtc: new Date("2021-09-27T15:01:01.325386+00:00"),
  sourceRepo: "Azure/iot-plugandplay-models",
  totalModelCount: 1337
};

const metadataBodyWithoutExpanded: ModelsRepositoryMetadata = {
  commitId: "test",
  features: {
    expanded: false,
    index: true
  },
  publishDateUtc: new Date("2021-09-27T15:01:01.325386+00:00"),
  sourceRepo: "Azure/iot-plugandplay-models",
  totalModelCount: 1337
};

const remoteResolutionScenarios: RemoteResolutionScenario[] = [
  {
    name: "dependencyResolution: disabled, single DTMI, no options",
    clientOptions: {
      repositoryLocation: remoteRepositoryLocation
    },
    getModelsOptions: {
      dependencyResolution: DEPENDENCY_MODE_DISABLED
    },
    dtmis: [
      {
        dtmi: "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
        expectedUri:
          "https://www.devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.json",
        mockedResponse: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText"
        },
        expectedOutputJson: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText"
        }
      }
    ]
  },
  {
    name: "dependencyResolution: disabled, single DTMI, no dependencies",
    clientOptions: {
      repositoryLocation: remoteRepositoryLocation
    },
    getModelsOptions: {
      dependencyResolution: DEPENDENCY_MODE_DISABLED
    },
    dtmis: [
      {
        dtmi: "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
        expectedUri:
          "https://www.devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.json",
        mockedResponse: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText"
        },
        expectedOutputJson: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText"
        }
      }
    ]
  },
  {
    name: "dependencyResolution: enabled, single DTMI, no dependencies",
    clientOptions: {
      repositoryLocation: remoteRepositoryLocation
    },
    getModelsOptions: {
      dependencyResolution: DEPENDENCY_MODE_ENABLED
    },
    dtmis: [
      {
        dtmi: "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
        expectedUri:
          "https://www.devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.expanded.json",
        mockedResponse: [
          {
            "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
            fakeDtdl: "fakeBodyAsText"
          }
        ],
        expectedOutputJson: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText"
        }
      }
    ],
    metadata: metadataBodyWithExpanded
  },
  {
    name: "dependencyResolution: enabled, single DTMI, no dependencies",
    clientOptions: {
      repositoryLocation: remoteRepositoryLocation
    },
    getModelsOptions: {
      dependencyResolution: DEPENDENCY_MODE_ENABLED
    },
    dtmis: [
      {
        dtmi: "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
        expectedUri:
          "https://www.devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.expanded.json",
        mockedResponse: [
          {
            "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
            fakeDtdl: "fakeBodyAsText"
          }
        ],
        expectedOutputJson: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText"
        }
      }
    ],
    metadata: metadataBodyWithExpanded
  },
  {
    name: "dependencyResolution: enabled, multiple DTMI, no dependencies",
    clientOptions: {
      repositoryLocation: remoteRepositoryLocation
    },
    getModelsOptions: {
      dependencyResolution: DEPENDENCY_MODE_ENABLED
    },
    dtmis: [
      {
        dtmi: "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
        expectedUri:
          "https://www.devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.expanded.json",
        mockedResponse: [
          {
            "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
            fakeDtdl: "fakeBodyAsText"
          }
        ],
        expectedOutputJson: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText"
        }
      },
      {
        dtmi: "dtmi:com:FooFooFoo;4",
        expectedUri: "https://www.devicemodels.contoso.com/dtmi/com/foofoofoo-4.expanded.json",
        mockedResponse: [{ "@id": "dtmi:com:FooFooFoo;4", fakeDtdl: "fakeBodyAsText" }],
        expectedOutputJson: { "@id": "dtmi:com:FooFooFoo;4", fakeDtdl: "fakeBodyAsText" }
      }
    ],
    metadata: metadataBodyWithExpanded
  },
  {
    name: "dependencyResolution: enabled, multiple DTMI, no dependencies, metadata not expanded",
    clientOptions: {
      repositoryLocation: remoteRepositoryLocation
    },
    getModelsOptions: {
      dependencyResolution: DEPENDENCY_MODE_ENABLED
    },
    dtmis: [
      {
        dtmi: "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
        expectedUri:
          "https://www.devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.json",
        mockedResponse: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText"
        },
        expectedOutputJson: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText"
        }
      },
      {
        dtmi: "dtmi:com:FooFooFoo;4",
        expectedUri: "https://www.devicemodels.contoso.com/dtmi/com/foofoofoo-4.json",
        mockedResponse: { "@id": "dtmi:com:FooFooFoo;4", fakeDtdl: "fakeBodyAsText" },
        expectedOutputJson: { "@id": "dtmi:com:FooFooFoo;4", fakeDtdl: "fakeBodyAsText" }
      }
    ],
    metadata: metadataBodyWithoutExpanded
  },
  {
    name: "dependencyResolution: enabled, multiple DTMI, no dependencies, metadata failure",
    clientOptions: {
      repositoryLocation: remoteRepositoryLocation
    },
    getModelsOptions: {
      dependencyResolution: DEPENDENCY_MODE_ENABLED
    },
    dtmis: [
      {
        dtmi: "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
        expectedUri:
          "https://www.devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.json",
        mockedResponse: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText"
        },
        expectedOutputJson: {
          "@id": "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1",
          fakeDtdl: "fakeBodyAsText"
        }
      },
      {
        dtmi: "dtmi:com:FooFooFoo;4",
        expectedUri: "https://www.devicemodels.contoso.com/dtmi/com/foofoofoo-4.json",
        mockedResponse: { "@id": "dtmi:com:FooFooFoo;4", fakeDtdl: "fakeBodyAsText" },
        expectedOutputJson: { "@id": "dtmi:com:FooFooFoo;4", fakeDtdl: "fakeBodyAsText" }
      }
    ]
  }
];


const resolveRepositoryMetadata = (scenario: RemoteResolutionScenario) => {
  return (request: PipelineRequest) => {
    expect(request.url, "Did not fetch metadata").to.equal(
      `${remoteRepositoryLocation}/metadata.json`
    );
    const pipelineResponse: any = {
      request: request,
      bodyAsText: JSON.stringify(scenario.metadata ?? {}),
      status: scenario.metadata ? "200" : "404",
      headers: undefined
    };
    return Promise.resolve(pipelineResponse);
  };
};

describe("resolver - node", function () {
  afterEach(function () {
    sinon.restore();
  });

  describe("remote URL resolution", function () {
    remoteResolutionScenarios.forEach((scenario: RemoteResolutionScenario) => {
      it(scenario.name, async function () {
        console.log(scenario.name);
        const myStub = sinon.stub(ServiceClient.prototype, "sendRequest");
        let calls = 0;
        let checkedMetadata = false;
        for (let i = 0; i < scenario.dtmis.length; i++) {
          if (
            scenario.getModelsOptions.dependencyResolution === DEPENDENCY_MODE_ENABLED &&
            !checkedMetadata
          ) {
            myStub.onCall(calls++).callsFake(resolveRepositoryMetadata(scenario));
            checkedMetadata = true;
          }
          myStub.onCall(calls++).callsFake((request: PipelineRequest) => {
            expect(request.url, "URL not formatted for request correctly.").to.deep.equal(
              scenario.dtmis[i].expectedUri
            );
            const pipelineResponse: any = {
              request: request,
              bodyAsText: JSON.stringify(scenario.dtmis[i].mockedResponse),
              status: 200,
              headers: undefined
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
