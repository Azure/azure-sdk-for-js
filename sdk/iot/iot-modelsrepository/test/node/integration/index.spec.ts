// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-undef */

import {
  dependencyResolutionType,
  ModelsRepositoryClient,
  ModelsRepositoryClientOptions
} from "../../../src";

import { assert, expect } from "chai";
import * as sinon from "sinon";

import { ServiceClient } from "@azure/core-client";
import { PipelineRequest } from "@azure/core-rest-pipeline";
import {
  DEPENDENCY_MODE_DISABLED,
  DEPENDENCY_MODE_ENABLED,
  METADATA_PATH
} from "../../../src/utils/constants";
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
const noMetadataRepositoryLocation =
  "https://raw.githubusercontent.com/Azure/iot-plugandplay-models/main";

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

const liveDTMIs: { [dtmi: string]: any } = {
  "dtmi:azure:DeviceManagement:DeviceInformation;1": {
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
        description:
          "Company name of the device manufacturer. This could be the same as the name of the original equipment manufacturer (OEM). Ex. Contoso."
      },
      {
        "@type": "Property",
        name: "model",
        displayName: "Device model",
        schema: "string",
        description: "Device model name or ID. Ex. Surface Book 2."
      },
      {
        "@type": "Property",
        name: "swVersion",
        displayName: "Software version",
        schema: "string",
        description:
          "Version of the software on your device. This could be the version of your firmware. Ex. 1.3.45"
      },
      {
        "@type": "Property",
        name: "osName",
        displayName: "Operating system name",
        schema: "string",
        description: "Name of the operating system on the device. Ex. Windows 10 IoT Core."
      },
      {
        "@type": "Property",
        name: "processorArchitecture",
        displayName: "Processor architecture",
        schema: "string",
        description: "Architecture of the processor on the device. Ex. x64 or ARM."
      },
      {
        "@type": "Property",
        name: "processorManufacturer",
        displayName: "Processor manufacturer",
        schema: "string",
        description: "Name of the manufacturer of the processor on the device. Ex. Intel."
      },
      {
        "@type": "Property",
        name: "totalStorage",
        displayName: "Total storage",
        schema: "double",
        description: "Total available storage on the device in kilobytes. Ex. 2048000 kilobytes."
      },
      {
        "@type": "Property",
        name: "totalMemory",
        displayName: "Total memory",
        schema: "double",
        description: "Total available memory on the device in kilobytes. Ex. 256000 kilobytes."
      }
    ]
  },
  "dtmi:com:example:Thermostat;1": {
    "@context": "dtmi:dtdl:context;2",
    "@id": "dtmi:com:example:Thermostat;1",
    "@type": "Interface",
    displayName: "Thermostat",
    description: "Reports current temperature and provides desired temperature control.",
    contents: [
      {
        "@type": ["Telemetry", "Temperature"],
        name: "temperature",
        displayName: "Temperature",
        description: "Temperature in degrees Celsius.",
        schema: "double",
        unit: "degreeCelsius"
      },
      {
        "@type": ["Property", "Temperature"],
        name: "targetTemperature",
        schema: "double",
        displayName: "Target Temperature",
        description: "Allows to remotely specify the desired target temperature.",
        unit: "degreeCelsius",
        writable: true
      },
      {
        "@type": ["Property", "Temperature"],
        name: "maxTempSinceLastReboot",
        schema: "double",
        unit: "degreeCelsius",
        displayName: "Max temperature since last reboot.",
        description: "Returns the max temperature since last device reboot."
      },
      {
        "@type": "Command",
        name: "getMaxMinReport",
        displayName: "Get Max-Min report.",
        description:
          "This command returns the max, min and average temperature from the specified time to the current time.",
        request: {
          name: "since",
          displayName: "Since",
          description: "Period to return the max-min report.",
          schema: "dateTime"
        },
        response: {
          name: "tempReport",
          displayName: "Temperature Report",
          schema: {
            "@type": "Object",
            fields: [
              {
                name: "maxTemp",
                displayName: "Max temperature",
                schema: "double"
              },
              {
                name: "minTemp",
                displayName: "Min temperature",
                schema: "double"
              },
              {
                name: "avgTemp",
                displayName: "Average Temperature",
                schema: "double"
              },
              {
                name: "startTime",
                displayName: "Start Time",
                schema: "dateTime"
              },
              {
                name: "endTime",
                displayName: "End Time",
                schema: "dateTime"
              }
            ]
          }
        }
      }
    ]
  }
};

const resolveRepositoryMetadata = (scenario: RemoteResolutionScenario) => {
  return (request: PipelineRequest) => {
    expect(request.url, "Did not fetch metadata").to.equal(
      `${remoteRepositoryLocation}/${METADATA_PATH}`
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

describe("resolver - node", () => {
  afterEach(() => sinon.restore());

  describe("remote URL resolution", () => {
    remoteResolutionScenarios.forEach((scenario: RemoteResolutionScenario) => {
      it(scenario.name, async () => {
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

  describe("live integration test, expand enabled (default)", () => {
    const client = new ModelsRepositoryClient();
    for (const dtmi in liveDTMIs) {
      it(`correctly resolves ${dtmi}`, async () => {
        const model = await client.getModels(dtmi);
        expect(model[dtmi]).to.deep.equal(liveDTMIs[dtmi]);
      });
    }
  });

  describe("live integration test, expand disabled", () => {
    const client = new ModelsRepositoryClient();
    for (const dtmi in liveDTMIs) {
      it(`correctly resolves ${dtmi}`, async () => {
        const model = await client.getModels(dtmi, { dependencyResolution: "disabled" });
        expect(model[dtmi]).to.deep.equal(liveDTMIs[dtmi]);
      });
    }
  });

  describe("live integration test, expand disabled, metadata disabled (github raw)", () => {
    const client = new ModelsRepositoryClient({
      repositoryLocation: noMetadataRepositoryLocation
    });
    for (const dtmi in liveDTMIs) {
      it(`correctly resolves ${dtmi}`, async () => {
        const model = await client.getModels(dtmi, { dependencyResolution: "disabled" });
        expect(model[dtmi]).to.deep.equal(liveDTMIs[dtmi]);
      });
    }
  });
  describe("live integration test, expand enabled, metadata disabled (github raw)", () => {
    const client = new ModelsRepositoryClient({
      repositoryLocation: noMetadataRepositoryLocation
    });
    for (const dtmi in liveDTMIs) {
      it(`correctly resolves ${dtmi}`, async () => {
        const model = await client.getModels(dtmi, { dependencyResolution: "enabled" });
        expect(model[dtmi]).to.deep.equal(liveDTMIs[dtmi]);
      });
    }
  });
});
