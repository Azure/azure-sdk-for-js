/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as chai from "chai";
import * as fs from "fs";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { BaseTest } from "../baseTest";


describe("Features Module Functionality", () => {
  it('should list features', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      await fs.readFile("test/SessionRecords/ImportApp.json", "utf-8", async (err, data) => {
        if (err) {
          throw err;
        }
        let app = JSON.parse(data);
        let appId = await client.apps.importMethod(app, { appName: "features of LUIS App" });
        var versionId = "0.2";
        var features = await client.features.list(appId.body, versionId);
        await client.apps.deleteMethod(appId.body);
        chai.expect(features.phraselistFeatures.length > 0).to.be.true;
      });
    });
  });

    it('should add required feature', async () => {
      await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
        var entityId = await client.model.addEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, {name: "flat entity"});
        var featureEntityId = await client.model.addEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, {name: "feature entity"});
        client.features.addEntityFeature(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body, {
          modelName: "feature entity",
          isRequired: true
        })
        var features = await client.features.list(BaseTest.GlobalAppId, BaseTest.GlobalVersionId);
        await client.model.deleteEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);
        await client.model.deleteEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, featureEntityId.body);
      });
  });
});
