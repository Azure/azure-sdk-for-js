/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ModelsRepositoryClient, ModelsRepositoryClientOptions } from "../../src";
import * as coreClient from "@azure/core-client";

import { assert, expect } from "chai";
import * as sinon from "sinon";

import { dependencyResolutionType } from "../../src/dependencyResolutionType";

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
      repositoryLocation: "devicemodels.contoso.com"
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
      repositoryLocation: "devicemodels.contoso.com"
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
      repositoryLocation: "devicemodels.contoso.com"
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
      repositoryLocation: "devicemodels.contoso.com"
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

    // describe("simple DTDL resolution", function() {
    //   it("should return a promise that resolves to a mapping from a DTMI to a JSON object", function(done) {
    //     const fakeDtmi: string = "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1";
    //     const fakeEndpoint = "devicemodels.contoso.com";
    //     const expectedUri =
    //       "https://devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.json";
    //     const fakeData = JSON.stringify({
    //       fakeDtdl: "fakeBodyAsText"
    //     });
    //     sinon.stub(coreHttp, "ServiceClient").returns({
    //       sendRequest: function(req: any) {
    //         assert.deepEqual(req.url, expectedUri, "URL not formatted for request correctly.");
    //         return Promise.resolve({ bodyAsText: fakeData, status: 200 });
    //       }
    //     });

    //     const resolveResult = resolverTool.resolve(fakeDtmi, fakeEndpoint);
    //     assert(resolveResult instanceof Promise, "resolve method did not return a promise");
    //     resolveResult
    //       .then((actualOutput: any) => {
    //         assert.deepStrictEqual({ [fakeDtmi]: JSON.parse(fakeData) }, actualOutput);
    //         done();
    //       })
    //       .catch((err: any) => done(err));
    //   });
    // });

    // describe("depenency resolution (using pseudo-parsing)", function() {
    //   it("given a DTMI whose DTDL has no dependencies, should return a promise that resolves to a mapping from a DTMI to a JSON object", function(done) {
    //     const fakeDtmi: string = "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1";
    //     const fakeEndpoint: string = "devicemodels.contoso.com";
    //     const expectedUri =
    //       "https://devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.json";
    //     const fakeData = JSON.stringify({
    //       fakeKey: "fakeValue"
    //     });
    //     sinon.stub(coreHttp, "ServiceClient").returns({
    //       sendRequest: function(req: any) {
    //         assert.deepEqual(req.url, expectedUri, "URL not formatted for request correctly.");
    //         return Promise.resolve({ bodyAsText: fakeData, status: 200 });
    //       }
    //     });

    //     const resolveResult = resolverTool.resolve(fakeDtmi, fakeEndpoint, {
    //       resolveDependencies: "enabled"
    //     });
    //     assert(resolveResult instanceof Promise, "resolve method did not return a promise");
    //     resolveResult
    //       .then((actualOutput: any) => {
    //         assert.deepStrictEqual({ [fakeDtmi]: JSON.parse(fakeData) }, actualOutput);
    //         done();
    //       })
    //       .catch((err: any) => done(err));
    //   });

    //   it("given a DTMI whose DTDL has dependencies, should return a promise that resolves to a mapping from DTMIs to JSON objects", function(done) {
    //     const fakeDtmi1: string = "dtmi:contoso:FakeDeviceManagement:TemperatureController;1";
    //     const fakeDtmi2: string = "dtmi:contoso:FakeDeviceManagement:Thermostat;1";
    //     const fakeDtmi3: string = "dtmi:azure:DeviceManagement:DeviceInformation;1";
    //     const fakeEndpoint: string = "devicemodels.contoso.com";
    //     const expectedUri =
    //       "https://devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/temperaturecontroller-1.json";
    //     const expectedUri2 =
    //       "https://devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/thermostat-1.json";
    //     const expectedUri3 =
    //       "https://devicemodels.contoso.com/dtmi/azure/devicemanagement/deviceinformation-1.json";
    //     const localDirectory = path.resolve("./test/node/testModelRepository");
    //     const pathToDtdl = path.join(
    //       localDirectory,
    //       "dtmi/contoso/FakeDeviceManagement/temperaturecontroller-1.json"
    //     );
    //     const fakeData = fs.readFileSync(pathToDtdl).toString();
    //     const fakeData2 = JSON.stringify({ fakeKey: "fakeValue" });
    //     const fakeData3 = JSON.stringify({ fakeKey2: "fakeValue2" });
    //     const expectedOutput = {
    //       [fakeDtmi1]: JSON.parse(fakeData),
    //       [fakeDtmi2]: JSON.parse(fakeData2),
    //       [fakeDtmi3]: JSON.parse(fakeData3)
    //     };
    //     const serviceClientStub = sinon.stub(coreHttp, "ServiceClient");
    //     serviceClientStub.onFirstCall().returns({
    //       sendRequest: function(req: any) {
    //         assert.deepEqual(req.url, expectedUri, "URL not formatted for request correctly.");
    //         return Promise.resolve({ bodyAsText: fakeData, status: 200 });
    //       }
    //     });
    //     serviceClientStub.onSecondCall().returns({
    //       sendRequest: function(req: any) {
    //         assert.deepEqual(req.url, expectedUri2, "URL not formatted for request correctly.");
    //         return Promise.resolve({ bodyAsText: fakeData2, status: 200 });
    //       }
    //     });
    //     serviceClientStub.onThirdCall().returns({
    //       sendRequest: function(req: any) {
    //         assert.deepEqual(req.url, expectedUri3, "URL not formatted for request correctly.");
    //         return Promise.resolve({ bodyAsText: fakeData3, status: 200 });
    //       }
    //     });

    //     const resolveResult = resolverTool.resolve(fakeDtmi1, fakeEndpoint, {
    //       resolveDependencies: "enabled"
    //     });
    //     assert(resolveResult instanceof Promise, "resolve method did not return a promise");
    //     resolveResult
    //       .then((actualOutput: any) => {
    //         assert.deepEqual(
    //           Object.keys(actualOutput),
    //           Object.keys(expectedOutput),
    //           "dtmis in actual output do not align with expected output"
    //         );
    //         assert.deepStrictEqual(expectedOutput, actualOutput);
    //         done();
    //       })
    //       .catch((err: any) => done(err));
    //   });
    // });

    // describe("try from expanded (expanded.json)", function() {
    //   it("should return a promise that resolves to a mapping from a DTMI to a JSON object", function(done) {
    //     const fakeDtmi: string = "dtmi:contoso:FakeDeviceManagement:DeviceInformation;1";
    //     const fakeEndpoint = "devicemodels.contoso.com";
    //     const expectedUri =
    //       "https://devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/deviceinformation-1.expanded.json";
    //     const fakeData = `[${JSON.stringify({
    //       "@id": fakeDtmi,
    //       fakeDtdl: "fakeBodyAsText"
    //     })}]`;
    //     sinon.stub(coreHttp, "ServiceClient").returns({
    //       sendRequest: function(req: any) {
    //         assert.deepEqual(req.url, expectedUri, "URL not formatted for request correctly.");
    //         return Promise.resolve({ bodyAsText: fakeData, status: 200 });
    //       }
    //     });

    //     const resolveResult = resolverTool.resolve(fakeDtmi, fakeEndpoint, {
    //       resolveDependencies: "tryFromExpanded"
    //     });
    //     assert(resolveResult instanceof Promise, "resolve method did not return a promise");
    //     resolveResult
    //       .then((actualOutput: any) => {
    //         assert.deepStrictEqual({ [fakeDtmi]: JSON.parse(fakeData)[0] }, actualOutput);
    //         done();
    //       })
    //       .catch((err: any) => done(err));
    //   });

    //   it("given no expanded format exists for the given DTMI, should fallback to resolution with dependencies", function(done) {
    //     const fakeDtmi1: string = "dtmi:contoso:FakeDeviceManagement:TemperatureController;1";
    //     const fakeDtmi2: string = "dtmi:contoso:FakeDeviceManagement:Thermostat;1";
    //     const fakeDtmi3: string = "dtmi:azure:DeviceManagement:DeviceInformation;1";
    //     const fakeEndpoint: string = "devicemodels.contoso.com";
    //     const expectedUri =
    //       "https://devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/temperaturecontroller-1.json";
    //     const expectedUri2 =
    //       "https://devicemodels.contoso.com/dtmi/contoso/fakedevicemanagement/thermostat-1.json";
    //     const expectedUri3 =
    //       "https://devicemodels.contoso.com/dtmi/azure/devicemanagement/deviceinformation-1.json";
    //     const localDirectory = path.resolve("./test/node/testModelRepository");
    //     const pathToDtdl = path.join(
    //       localDirectory,
    //       "dtmi/contoso/FakeDeviceManagement/temperaturecontroller-1.json"
    //     );
    //     const fakeData = fs.readFileSync(pathToDtdl).toString();
    //     const fakeData2 = JSON.stringify({ fakeKey: "fakeValue" });
    //     const fakeData3 = JSON.stringify({ fakeKey2: "fakeValue2" });
    //     const expectedOutput = {
    //       [fakeDtmi1]: JSON.parse(fakeData),
    //       [fakeDtmi2]: JSON.parse(fakeData2),
    //       [fakeDtmi3]: JSON.parse(fakeData3)
    //     };
    //     const serviceClientStub = sinon.stub(coreHttp, "ServiceClient");
    //     serviceClientStub.onCall(0).returns({
    //       sendRequest: function(req: any) {
    //         assert.deepEqual(
    //           req.url,
    //           expectedUri.replace(".json", ".expanded.json"),
    //           "URL not formatted for request correctly."
    //         );
    //         return Promise.resolve({ status: 404 });
    //       }
    //     });
    //     serviceClientStub.onCall(1).returns({
    //       sendRequest: function(req: any) {
    //         assert.deepEqual(req.url, expectedUri, "URL not formatted for request correctly.");
    //         return Promise.resolve({ bodyAsText: fakeData, status: 200 });
    //       }
    //     });
    //     serviceClientStub.onCall(2).returns({
    //       sendRequest: function(req: any) {
    //         assert.deepEqual(
    //           req.url,
    //           expectedUri2.replace(".json", ".expanded.json"),
    //           "URL not formatted for request correctly."
    //         );
    //         return Promise.resolve({ status: 404 });
    //       }
    //     });
    //     serviceClientStub.onCall(3).returns({
    //       sendRequest: function(req: any) {
    //         assert.deepEqual(req.url, expectedUri2, "URL not formatted for request correctly.");
    //         return Promise.resolve({ bodyAsText: fakeData2, status: 200 });
    //       }
    //     });
    //     serviceClientStub.onCall(4).returns({
    //       sendRequest: function(req: any) {
    //         assert.deepEqual(
    //           req.url,
    //           expectedUri3.replace(".json", ".expanded.json"),
    //           "URL not formatted for request correctly."
    //         );
    //         return Promise.resolve({ status: 404 });
    //       }
    //     });
    //     serviceClientStub.onCall(5).returns({
    //       sendRequest: function(req: any) {
    //         assert.deepEqual(req.url, expectedUri3, "URL not formatted for request correctly.");
    //         return Promise.resolve({ bodyAsText: fakeData3, status: 200 });
    //       }
    //     });

    //     const resolveResult = resolverTool.resolve(fakeDtmi1, fakeEndpoint, {
    //       resolveDependencies: "tryFromExpanded"
    //     });
    //     assert(resolveResult instanceof Promise, "resolve method did not return a promise");
    //     resolveResult
    //       .then((actualOutput: any) => {
    //         assert.deepEqual(
    //           Object.keys(actualOutput),
    //           Object.keys(expectedOutput),
    //           "dtmis in actual output do not align with expected output"
    //         );
    //         assert.deepStrictEqual(expectedOutput, actualOutput);
    //         done();
    //       })
    //       .catch((err: any) => done(err));
    //   });
    // });
  });

  // describe("local file resolution", function() {
  //   describe("simple DTDL resolution", function() {
  //     it("should return a promise that resolves to a mapping from a DTMI to a JSON object", function(done) {
  //       const fakeDtmi: string = "dtmi:contoso:FakeDeviceManagement:thermostat;1";
  //       const localDirectory = path.resolve("./test/node/testModelRepository");
  //       const pathToDtdl = path.join(
  //         localDirectory,
  //         "dtmi/contoso/FakeDeviceManagement/thermostat-1.json"
  //       );
  //       const fakeDtdl = JSON.parse(fs.readFileSync(pathToDtdl, "utf-8"));
  //       const resolveResult = resolverTool.resolve(fakeDtmi, localDirectory);
  //       assert(resolveResult instanceof Promise, "resolve method did not return a promise");
  //       resolveResult
  //         .then((actualOutput: any) => {
  //           assert.deepStrictEqual(
  //             { [fakeDtmi]: fakeDtdl },
  //             actualOutput,
  //             "the expected dtmi mapping did not match the actual value."
  //           );
  //           done();
  //         })
  //         .catch((err: any) => done(err));
  //     });
  //   });

  //   describe("dependency resolution (using pseudo-parsing)", function() {
  //     it("given a DTMI whose DTDL has dependencies, should return a promise that resolves to a mapping from DTMIs to JSON objects", function(done) {
  //       const fakeDtmi1: string = "dtmi:contoso:FakeDeviceManagement:TemperatureController;1";
  //       const fakeDtmi2: string = "dtmi:contoso:FakeDeviceManagement:Thermostat;1";
  //       const fakeDtmi3: string = "dtmi:azure:DeviceManagement:DeviceInformation;1";
  //       const localDirectory = path.resolve("./test/node/testModelRepository");
  //       const pathToDtdl1 = path.join(
  //         localDirectory,
  //         "dtmi/contoso/FakeDeviceManagement/temperaturecontroller-1.json"
  //       );
  //       const pathToDtdl2 = path.join(
  //         localDirectory,
  //         "dtmi/contoso/FakeDeviceManagement/thermostat-1.json"
  //       );
  //       const pathToDtdl3 = path.join(
  //         localDirectory,
  //         "dtmi/azure/DeviceManagement/deviceinformation-1.json"
  //       );
  //       const fakeDtdl1 = JSON.parse(fs.readFileSync(pathToDtdl1, "utf-8"));
  //       const fakeDtdl2 = JSON.parse(fs.readFileSync(pathToDtdl2, "utf-8"));
  //       const fakeDtdl3 = JSON.parse(fs.readFileSync(pathToDtdl3, "utf-8"));

  //       const expectedOutput = {
  //         [fakeDtmi1]: fakeDtdl1,
  //         [fakeDtmi2]: fakeDtdl2,
  //         [fakeDtmi3]: fakeDtdl3
  //       };
  //       const resolveResult = resolverTool.resolve(fakeDtmi1, localDirectory, {
  //         resolveDependencies: "enabled"
  //       });
  //       assert(resolveResult instanceof Promise, "resolve method did not return a promise");
  //       resolveResult
  //         .then((actualOutput: any) => {
  //           assert.deepStrictEqual(
  //             Object.keys(actualOutput),
  //             Object.keys(expectedOutput),
  //             "dtmis do not match"
  //           );
  //           Object.keys(actualOutput).forEach((outputDtmi) => {
  //             assert.deepStrictEqual(
  //               actualOutput[outputDtmi],
  //               expectedOutput[outputDtmi],
  //               `dtdls for given dtmi (${outputDtmi}) did not line up.`
  //             );
  //           });
  //           assert.deepStrictEqual(
  //             actualOutput,
  //             expectedOutput,
  //             "the expected dtmi mapping did not match the actual value."
  //           );
  //           done();
  //         })
  //         .catch((err: any) => done(err));
  //     });

  //     it("given a DTMI whose DTDL has no dependencies, should return a promise that resolves to a mapping from a DTMI to a JSON object", function(done) {
  //       const fakeDtmi1: string = "dtmi:contoso:FakeDeviceManagement:thermostat;1";
  //       const localDirectory = path.resolve("./test/node/testModelRepository");
  //       const pathToDtdl1 = path.join(
  //         localDirectory,
  //         "dtmi/contoso/FakeDeviceManagement/thermostat-1.json"
  //       );
  //       const fakeDtdl1 = JSON.parse(fs.readFileSync(pathToDtdl1, "utf-8"));

  //       const expectedResult = {
  //         [fakeDtmi1]: fakeDtdl1
  //       };
  //       const resolveResult = resolverTool.resolve(fakeDtmi1, localDirectory);
  //       assert(resolveResult instanceof Promise, "resolve method did not return a promise");
  //       resolveResult
  //         .then((actualOutput: any) => {
  //           assert.deepStrictEqual(
  //             expectedResult,
  //             actualOutput,
  //             "the expected dtmi mapping did not match the actual value."
  //           );
  //           done();
  //         })
  //         .catch((err: any) => done(err));
  //     });
  //   });

  //   describe("try from expanded (expanded.json)", function() {
  //     it("should return a promise that resolves to a mapping from the DTMIs to the JSON objects", function(done) {
  //       const fakeDtmi1: string = "dtmi:contoso:FakeDeviceManagement:TemperatureController;1";
  //       const fakeDtmi2: string = "dtmi:contoso:FakeDeviceManagement:Thermostat;1";
  //       const fakeDtmi3: string = "dtmi:azure:DeviceManagement:DeviceInformation;1";
  //       const localDirectory = path.resolve("./test/node/testModelRepository");
  //       const pathToDtdl1 = path.join(
  //         localDirectory,
  //         "dtmi/contoso/FakeDeviceManagement/temperaturecontroller-1.json"
  //       );
  //       const pathToDtdl2 = path.join(
  //         localDirectory,
  //         "dtmi/contoso/FakeDeviceManagement/thermostat-1.json"
  //       );
  //       const pathToDtdl3 = path.join(
  //         localDirectory,
  //         "dtmi/azure/DeviceManagement/deviceinformation-1.json"
  //       );
  //       const fakeDtdl1 = JSON.parse(fs.readFileSync(pathToDtdl1, "utf-8"));
  //       const fakeDtdl2 = JSON.parse(fs.readFileSync(pathToDtdl2, "utf-8"));
  //       const fakeDtdl3 = JSON.parse(fs.readFileSync(pathToDtdl3, "utf-8"));

  //       const expectedResult = {
  //         [fakeDtmi1]: fakeDtdl1,
  //         [fakeDtmi2]: fakeDtdl2,
  //         [fakeDtmi3]: fakeDtdl3
  //       };
  //       const resolveResult = resolverTool.resolve(fakeDtmi1, localDirectory, {
  //         resolveDependencies: "tryFromExpanded"
  //       });
  //       assert(resolveResult instanceof Promise, "resolve method did not return a promise");
  //       resolveResult
  //         .then((actualOutput: any) => {
  //           assert.deepStrictEqual(
  //             expectedResult,
  //             actualOutput,
  //             "the expected dtmi mapping did not match the actual value."
  //           );
  //           done();
  //         })
  //         .catch((err: any) => done(err));
  //     });

  //     it("given no expanded format exists for the given DTMI, should fallback to resolution with dependencies", function(done) {
  //       const fakeDtmi1: string = "dtmi:contoso:FakeDeviceManagement:temperaturecontroller;2";
  //       const fakeDtmi2: string = "dtmi:contoso:FakeDeviceManagement:Thermostat;1";
  //       const fakeDtmi3: string = "dtmi:azure:DeviceManagement:DeviceInformation;1";
  //       const localDirectory = path.resolve("./test/node/testModelRepository");
  //       const pathToDtdl1 = path.join(
  //         localDirectory,
  //         "dtmi/contoso/FakeDeviceManagement/temperaturecontroller-2.json"
  //       );
  //       const pathToDtdl2 = path.join(
  //         localDirectory,
  //         "dtmi/contoso/FakeDeviceManagement/thermostat-1.json"
  //       );
  //       const pathToDtdl3 = path.join(
  //         localDirectory,
  //         "dtmi/azure/DeviceManagement/deviceinformation-1.json"
  //       );
  //       const fakeDtdl1 = JSON.parse(fs.readFileSync(pathToDtdl1, "utf-8"));
  //       const fakeDtdl2 = JSON.parse(fs.readFileSync(pathToDtdl2, "utf-8"));
  //       const fakeDtdl3 = JSON.parse(fs.readFileSync(pathToDtdl3, "utf-8"));

  //       const expectedResult = {
  //         [fakeDtmi1]: fakeDtdl1,
  //         [fakeDtmi2]: fakeDtdl2,
  //         [fakeDtmi3]: fakeDtdl3
  //       };
  //       const resolveResult = resolverTool.resolve(fakeDtmi1, localDirectory, {
  //         resolveDependencies: "tryFromExpanded"
  //       });
  //       assert(resolveResult instanceof Promise, "resolve method did not return a promise");
  //       resolveResult
  //         .then((actualOutput: any) => {
  //           assert.deepEqual(
  //             Object.keys(expectedResult),
  //             Object.keys(actualOutput),
  //             "the expected dtmis do not match"
  //           );
  //           Object.keys(expectedResult).forEach((dtmiKey) => {
  //             assert.deepEqual(expectedResult[dtmiKey], actualOutput[dtmiKey]);
  //           });
  //           done();
  //         })
  //         .catch((err: any) => done(err));
  //     });
  //   });
  // });
});
