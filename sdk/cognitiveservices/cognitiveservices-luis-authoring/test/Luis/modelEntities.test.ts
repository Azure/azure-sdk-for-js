/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as chai from "chai";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { BaseTest } from "../baseTest";


describe("Model Entities Tests", function () {

  it("should list Entities", async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addEntity(BaseTest.GlobalAppId, "0.1", { name: "Existing Entity Test" })
      const results = await client.model.listEntities(BaseTest.GlobalAppId, "0.1");
      await client.model.deleteEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(results.length).not.to.eql(0);
      chai.expect(BaseTest.doesListContain(results, "name", "Existing Entity Test")).to.be.true;
    });
  });


  it("should get entity", async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addEntity(BaseTest.GlobalAppId, "0.1", { name: "New Entity Test" })
      const result = await client.model.getEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deleteEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(result).not.to.be.null;
      chai.expect(result.name).to.eql("New Entity Test");
      chai.expect(result.readableType).to.eql("Entity Extractor");
    }); "Suggestions Entity Test"
  });


  it("should add entity", async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addEntity(BaseTest.GlobalAppId, "0.1", { name: "New Entity Test" })
      const result = await client.model.getEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deleteEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(result).not.to.be.null;
      chai.expect(result.name).to.eql("New Entity Test");
      chai.expect(result.readableType).to.eql("Entity Extractor");
    })
  });

  it("should delete entity", async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addEntity(BaseTest.GlobalAppId, "0.1", { name: "Delete Entity Test" })

      await client.model.deleteEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      const results = await client.model.listEntities(BaseTest.GlobalAppId, "0.1");
      chai.expect(BaseTest.doesListContain(results, "id", entityId)).to.be.false;
    });
  });

  it("should get entity suggestions returning empty", async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {

      const entityId = await client.model.addEntity(BaseTest.GlobalAppId, "0.1", { name: "Suggestions Entity Test" })
      const results = await client.model.listEntitySuggestions(BaseTest.GlobalAppId, "0.1", entityId.body);
      let cnt = 0;
      for (var result of results)
        for (var prediction of result.entityPredictions)
          if (prediction.entityName == "Suggestions Entity Test")
            cnt++;
      await client.model.deleteEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(cnt).to.eql(0);
    });
  });
});
