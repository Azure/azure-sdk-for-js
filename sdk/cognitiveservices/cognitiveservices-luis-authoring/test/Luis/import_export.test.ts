/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as fs from "fs";
import * as chai from "chai";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { BaseTest } from "../baseTest";


describe("Import and Export Tests", () => {
  it("should export version", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const appId = await client.apps.add({
        name: "LUIS App to be exported",
        description: "New LUIS App",
        culture: "en-us",
        domain: "Comics",
        usageScenario: "IoT"
      });
      const luisApp = await client.versions.exportMethod(appId.body, "0.1");
      await client.apps.deleteMethod(appId.body);
      chai.expect(luisApp).to.exist;
      chai.expect(luisApp.name).to.eql("LUIS App to be exported");
    });
  });

  it("should import version", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      fs.readFile("test/SessionRecords/ImportApp.json", "utf-8", async (err, data) => {
        if (err) {
          throw err;
        }
        let app = JSON.parse(data);
        const testAppId = await client.apps.add({
          name: "LUIS App to be exported",
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
});
