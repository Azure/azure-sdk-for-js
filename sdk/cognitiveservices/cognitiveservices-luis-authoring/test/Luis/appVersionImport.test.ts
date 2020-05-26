/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as fs from "fs";
import * as chai from "chai";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { BaseTest } from "../baseTest";
import { delay } from "@azure/ms-rest-js";

let appIds: Array<string> = [];

describe("Import Tests", () => {

  it("should import version", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      fs.readFile("test/SessionRecords/ImportApp.json", "utf-8", async (err, data) => {
        if (err) {
          throw err;
        }
        let app = JSON.parse(data);
        let importVersion = await client.apps.add({
          name: "LUIS App to be import version",
          description: "New LUIS App",
          culture: "en-us",
          domain: "Comics",
          usageScenario: "IoT"
        });
        var newVersion = await client.versions.importMethod(importVersion.body, app, { versionId: "0.2" });

        chai.expect(newVersion.body, "0.2");

        await delay(1000);
        var deleteRespose = await client.apps.deleteMethod(importVersion.body);
        chai.expect(deleteRespose.code, "Success");
        await delay(1000);
      });
    });
  });
   
  it("should import version in Lu format", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      fs.readFile("test/SessionRecords/ImportLuApp.json", "utf-8", async (err, app) => {
        if (err) {
          throw err;
        }
        let importLuVersion = await client.apps.add({
          name: "LUIS App to be import lu format version",
          description: "New LUIS App",
          culture: "en-us",
          domain: "Comics",
          usageScenario: "IoT"
        });
        var newVersion = await client.versions.importLuFormat(importLuVersion.body, app, { versionId: "0.2" });
        
        chai.expect(newVersion.body, "0.2");

        await delay(1000);
        var deleteRespose = await client.apps.deleteMethod(importLuVersion.body);
        chai.expect(deleteRespose.code, "Success");  
        await delay(1000);
      });
    });
  });

  it("should import v2 version", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      fs.readFile("test/SessionRecords/ImportV2App.json", "utf-8", async (err, data) => {
        if (err) {
          throw err;
        }     
        let importV2Version = await client.apps.add({
          name: "LUIS App to import V2 version",
          description: "New LUIS App",
          culture: "en-us",
          domain: "Comics",
          usageScenario: "IoT"
        });
        let app = JSON.parse(data);
        const newVersion = await client.versions.importV2App(importV2Version.body, app);
        var newVersionApp = await client.apps.get(importV2Version.body);

        chai.expect(newVersionApp.versionsCount).equal(2);

        await delay(1000);
        var deleteRespose = await client.apps.deleteMethod(importV2Version.body);
        chai.expect(deleteRespose.code, "Success");  
        await delay(1000);
      });
    });
  });
});
