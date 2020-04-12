/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as fs from "fs";
import * as chai from "chai";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { BaseTest } from "../baseTest";


describe("Import Tests", () => {

  it("should import version", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      fs.readFile("test/SessionRecords/ImportApp.json", "utf-8", async (err, data) => {
        if (err) {
          throw err;
        }
        let app = JSON.parse(data);
        const testAppId = await client.apps.add({
          name: "LUIS App to be import version",
          description: "New LUIS App",
          culture: "en-us",
          domain: "Comics",
          usageScenario: "IoT"
        });

        const newVersion = await client.versions.importMethod(testAppId.body, app, { versionId: "0.2" });
        await client.apps.deleteMethod(testAppId.body);

        chai.expect(newVersion.body, "0.2");
      });
    });
  });

  it("should import application", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      fs.readFile("test/SessionRecords/ImportApp.json", "utf-8", async (err, data) => {
        if (err) {
          throw err;
        }
        let app = JSON.parse(data);
        var testAppId = await client.apps.importMethod(app, { appName: "Test Import LUIS App" });
        var testApp = await client.apps.get(testAppId.body);
        await client.apps.deleteMethod(testAppId.body);
        chai.expect(testApp).to.exist;
      });
    });
  });

  it("should import application in Lu format", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      fs.readFile("test/SessionRecords/ImportLuApp.json", "utf-8", async (err, app) => {
        if (err) {
          throw err;
        }     
        var testAppId = await client.apps.importLuFromat(app, { appName: "Test Import LUIS App in Lu format" });
        var testApp = await client.apps.get(testAppId.body);
        await client.apps.deleteMethod(testAppId.body);
        chai.expect(testApp).to.exist;
      });
    });
  });
   
  it("should import version in Lu format", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      fs.readFile("test/SessionRecords/ImportLuApp.json", "utf-8", async (err, app) => {
        if (err) {
          throw err;
        }
        const testAppId = await client.apps.add({
          name: "LUIS App to be import lu format version",
          description: "New LUIS App",
          culture: "en-us",
          domain: "Comics",
          usageScenario: "IoT"
        });

        const newVersion = await client.versions.importLuFormat(testAppId.body, app, { versionId: "0.2" });
        await client.apps.deleteMethod(testAppId.body);

        chai.expect(newVersion.body, "0.2");
      });
    });
  });

  it("should import v2 application", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      fs.readFile("test/SessionRecords/ImportV2App.json", "utf-8", async (err, data) => {
        if (err) {
          throw err;
        }     
        let app = JSON.parse(data);
        var testAppId = await client.apps.importV2App(app, { appName: "Test Import V2 LUIS App" });
        var testApp = await client.apps.get(testAppId.body);
        await client.apps.deleteMethod(testAppId.body);
        chai.expect(testApp).to.exist;
      });
    });
  });

  it("should import v2 version", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      fs.readFile("test/SessionRecords/ImportV2App.json", "utf-8", async (err, data) => {
        if (err) {
          throw err;
        }     
        var testAppId = await client.apps.add({
          name: "LUIS App to import V2 version",
          description: "New LUIS App",
          culture: "en-us",
          domain: "Comics",
          usageScenario: "IoT"
        });
        let app = JSON.parse(data);
        const newVersion = await client.versions.importV2App(testAppId.body, app, { appName: "Test Import V2 LUIS App" });
        var newVersionApp = await client.apps.get(newVersion.body);
        await client.apps.deleteMethod(newVersion.body);
        chai.expect(newVersionApp).to.exist;
      });
    });
  });
});
