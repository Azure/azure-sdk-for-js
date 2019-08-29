/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as chai from "chai";
import { BaseTest } from "../baseTest";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { ModelGetPatternAnyEntityInfoResponse } from "../../src/models";


describe("Model Patters Tests", () => {

  it("should list entities", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createPatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", { name: "Pattern.Any entity", explicitList: ["item"] });
      const results = await client.model.listPatternAnyEntityInfos(BaseTest.GlobalAppId, "0.1");
      await client.model.deletePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      let model: ModelGetPatternAnyEntityInfoResponse = null;
      for (var result of results) {
        if (result.name == "Pattern.Any entity")
          model = result as ModelGetPatternAnyEntityInfoResponse;
      }
      chai.expect(model).not.to.be.null;
      chai.expect(model.name).to.eql("Pattern.Any entity");
      chai.expect(model.explicitList[0].explicitListItem).to.eql("item");
    });
  });


  it("should get entity", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createPatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", { name: "New Entity Test", explicitList: ["item"] });
      const result = await client.model.getPatternAnyEntityInfo(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deletePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(result).not.to.be.null;
      chai.expect(result.name).to.eql("New Entity Test");
      chai.expect(result.readableType).to.eql("Pattern.Any Entity Extractor")
      chai.expect(result.explicitList[0].explicitListItem).to.eql("item");
    });
  });

  it("should add entity", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createPatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", { name: "New Entity Test", explicitList: ["item"] });

      const result = await client.model.getPatternAnyEntityInfo(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deletePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(result).not.to.be.null;
      chai.expect(result.name).to.eql("New Entity Test");
      chai.expect(result.readableType).to.eql("Pattern.Any Entity Extractor")
      chai.expect(result.explicitList[0].explicitListItem).to.eql("item");
    });
  });


  it("should update entity", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createPatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", { name: "New Entity Test", explicitList: ["item"] });
      await client.model.updatePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body, {
        name: "Entity Test Renamed", explicitList: ["item1"]
      });
      const result = await client.model.getPatternAnyEntityInfo(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deletePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(result).not.to.be.null;
      chai.expect(result.name).to.eql("Entity Test Renamed");
      chai.expect(result.readableType).to.eql("Pattern.Any Entity Extractor")
      chai.expect(result.explicitList[0].explicitListItem).to.eql("item1");
    });
  });


  it("should delete entity", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createPatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", { name: "New Entity Test", explicitList: ["item"] });
      await client.model.deletePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      const results = await client.model.listPatternAnyEntityInfos(BaseTest.GlobalAppId, "0.1");
      chai.expect(BaseTest.doesListContain(results, "id", entityId)).to.be.false;
    });
  });

  it("should get explicit list", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createPatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", { name: "New Entity Test", explicitList: ["item1", "item2"] });
      const result = await client.model.getExplicitList(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deletePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(result).not.to.be.null;
      chai.expect(BaseTest.doesListContain(result, "explicitListItem", "item1")).to.be.true;
      chai.expect(BaseTest.doesListContain(result, "explicitListItem", "item2")).to.be.true;
    });
  });


  it("should add explicit list item", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createPatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", { name: "New Entity Test", explicitList: ["item1"] });
      const itemId = await client.model.addExplicitListItem(BaseTest.GlobalAppId, "0.1", entityId.body, { explicitListItem: "item2" });
      const item = await client.model.getExplicitListItem(BaseTest.GlobalAppId, "0.1", entityId.body, itemId.body);
      await client.model.deletePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(item).not.to.be.null;
      chai.expect(item.explicitListItem).to.eql("item2");
    });
  });


  it("should get explicit list item", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createPatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", { name: "New Entity Test", explicitList: [] });
      const itemId = await client.model.addExplicitListItem(BaseTest.GlobalAppId, "0.1", entityId.body, { explicitListItem: "item" });
      const item = await client.model.getExplicitListItem(BaseTest.GlobalAppId, "0.1", entityId.body, itemId.body);
      await client.model.deletePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(item).not.to.be.null;
      chai.expect(item.explicitListItem).to.eql("item");
    });
  });

  it("should update explicit list item", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createPatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", { name: "New Entity Test", explicitList: [] });
      const itemId = await client.model.addExplicitListItem(BaseTest.GlobalAppId, "0.1", entityId.body, { explicitListItem: "item" });
      await client.model.updateExplicitListItem(BaseTest.GlobalAppId, "0.1", entityId.body, itemId.body, { explicitListItem: "item1" });
      const item = await client.model.getExplicitListItem(BaseTest.GlobalAppId, "0.1", entityId.body, itemId.body);
      await client.model.deletePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(item).not.to.be.null;
      chai.expect(item.explicitListItem).to.eql("item1");
    });
  });


  it("should delete explicit list item", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createPatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", { name: "New Entity Test", explicitList: [] });
      const itemId = await client.model.addExplicitListItem(BaseTest.GlobalAppId, "0.1", entityId.body, { explicitListItem: "item" });
      await client.model.deleteExplicitListItem(BaseTest.GlobalAppId, "0.1", entityId.body, itemId.body);
      const list = await client.model.getExplicitList(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deletePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(list).not.to.be.null;
      chai.expect(list).to.be.empty;
    });
  });
});
