/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as chai from "chai";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { BaseTest } from "../baseTest";
import { ModelAddPrebuiltResponse } from "../../src/models";

let prebuiltEntitiesAdded : ModelAddPrebuiltResponse
let prebuiltEntitiesAddedList : ModelAddPrebuiltResponse
let prebuiltEntitiesToAdd : string[]
let prebuiltEntitiesToAddList : string[]
const defautlVersionId = "0.1";

describe("Patterns Module Functionality Tests", () => {

  before('add prebuiltEntities', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      prebuiltEntitiesToAdd = ["temperature"];
      prebuiltEntitiesToAddList = ["datetimeV2", "age"];
      prebuiltEntitiesAdded = await client.model.addPrebuilt(BaseTest.GlobalAppId, defautlVersionId, prebuiltEntitiesToAdd);
      prebuiltEntitiesAddedList = await client.model.addPrebuilt(BaseTest.GlobalAppId, defautlVersionId, prebuiltEntitiesToAddList);
    });
  });

  after('delete prebuiltEntities', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
    for (let added of prebuiltEntitiesAdded) {
       await client.model.deletePrebuilt(BaseTest.GlobalAppId, defautlVersionId, added.id);
     }
      for (let added of prebuiltEntitiesAddedList) {
        await client.model.deletePrebuilt(BaseTest.GlobalAppId, defautlVersionId, added.id);
      }
    });
  });


  it('should add pattern', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let result = await client.pattern.addPattern(BaseTest.GlobalAppId, "0.1", { intent: "None", pattern: "This is a {temperature}" });
      await client.pattern.deletePattern(BaseTest.GlobalAppId, "0.1", result.id);
      chai.expect(result).not.to.be.null;
      chai.expect(result.id).not.to.be.null;
      chai.expect(result.intent).to.eql("None");
      chai.expect(result.pattern).to.eql("this is a {temperature}");
      chai.expect(result.id).not.to.eql(BaseTest.EmptyId);
    });
  });

  it('should add patterns', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let patterns = [{ intent: "None", pattern: "This is a {age}" }, { intent: "None", pattern: "This is a {datetimeV2}" }]
      let result = await client.pattern.batchAddPatterns(BaseTest.GlobalAppId, "0.1", patterns);
      await client.pattern.deletePatterns(BaseTest.GlobalAppId, "0.1", result.map(p => p.id));
      chai.expect(result).not.to.be.null;
      for (let pattern of result) {
        chai.expect(pattern.id).not.to.be.null;
        chai.expect(pattern.intent).to.eql("None");
        chai.expect(pattern.id).not.to.eql(BaseTest.EmptyId);
      }
    });
  });

  it('should update pattern', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let pattern = { intent: "None", pattern: "This is a {temperature}" };
      let updatedPattern = { intent: "None", pattern: "This [is] a {temperature}" };
      let addResult = await client.pattern.addPattern(BaseTest.GlobalAppId, "0.1", pattern);
      let updateResult = await client.pattern.updatePattern(BaseTest.GlobalAppId, "0.1", addResult.id, updatedPattern);
      await client.pattern.deletePattern(BaseTest.GlobalAppId, "0.1", addResult.id);
      chai.expect(updateResult).not.to.be.null;
      chai.expect(updateResult.id).not.to.be.null;
      chai.expect(updateResult.intent).to.eql("None");
      chai.expect(updateResult.id).to.eql(addResult.id);
      chai.expect(updateResult.id).not.to.eql(BaseTest.EmptyId);
      chai.expect(updateResult.pattern).to.eql("this [is] a {temperature}")
    });
  });

  it('should update patterns', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let patterns = [{ intent: "None", pattern: "This is a {age}" }];
      let addResult = await client.pattern.batchAddPatterns(BaseTest.GlobalAppId, "0.1", patterns);
      let updatedPatterns = [{
        intent: "None", pattern: "This [is] a {datetimeV2}", id: addResult[0].id
      }]
      let updateResult = await client.pattern.updatePatterns(BaseTest.GlobalAppId, "0.1", updatedPatterns);
      await client.pattern.deletePatterns(BaseTest.GlobalAppId, "0.1", updateResult.map(p => p.id));
      chai.expect(updateResult).not.to.be.null;
      chai.expect(updateResult[0].id).not.to.be.null;
      chai.expect(updateResult[0].intent).to.eql("None");
      chai.expect(updateResult[0].id).not.to.eql(BaseTest.EmptyId);
      chai.expect(updateResult[0].id).to.eql(addResult[0].id);
      chai.expect(updateResult[0].intent).to.eql("None");
      chai.expect(updateResult[0].id).to.eql(addResult[0].id);
      chai.expect(updateResult[0].pattern).to.eql("this [is] a {datetimeV2}");
    });
  });

  it('should get patterns', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let patternsToAdd = [{ intent: "None", pattern: "This is a {age}" }, { intent: "None", pattern: "This is a {datetimeV2}" }]
      let result = await client.pattern.batchAddPatterns(BaseTest.GlobalAppId, "0.1", patternsToAdd);
      let patterns = await client.pattern.listPatterns(BaseTest.GlobalAppId, "0.1");
      await client.pattern.deletePatterns(BaseTest.GlobalAppId, "0.1", result.map(p => p.id));
      chai.expect(patterns).to.be.exist;
      chai.expect(patterns).not.to.be.empty;
      for (let pattern of patterns) {
        chai.expect(pattern.id).not.to.be.null;
        chai.expect(pattern.intent).not.to.be.null;
        chai.expect(pattern.pattern).not.to.be.null;
      }
    });
  });


  it('should get intent patterns', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let patternsToAdd = [{ intent: "None", pattern: "This is a {age}" }, { intent: "None", pattern: "This is a {datetimeV2}" }]
      let result = await client.pattern.batchAddPatterns(BaseTest.GlobalAppId, "0.1", patternsToAdd);
      let patterns = await client.pattern.listIntentPatterns(BaseTest.GlobalAppId, "0.1", BaseTest.GlobalNoneId);
      await client.pattern.deletePatterns(BaseTest.GlobalAppId, "0.1", result.map(p => p.id));
      chai.expect(patterns).to.be.exist;
      chai.expect(patterns).not.to.be.empty;
      for (let pattern of patterns) {
        chai.expect(pattern.id).not.to.be.null;
        chai.expect(pattern.intent).not.to.be.null;
        chai.expect(pattern.pattern).not.to.be.null;
        chai.expect(pattern.intent).to.eql("None");
      }
    });
  });

  it('should delete pattern', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let pattern = { intent: "None", pattern: "This is a {temperature}" };
      let result = await client.pattern.addPattern(BaseTest.GlobalAppId, "0.1", pattern);
      await client.pattern.deletePattern(BaseTest.GlobalAppId, "0.1", result.id);
      let existingPatterns = await client.pattern.listPatterns(BaseTest.GlobalAppId, "0.1");
      chai.expect(BaseTest.doesListContain(existingPatterns, "id", result.id)).not.to.be.true;
    });
  });

  it('should delete patterns', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
     let patterns = [{ intent: "None", pattern: "This is a {age}" }, { intent: "None", pattern: "This is a {datetimeV2}" }]
      let result = await client.pattern.batchAddPatterns(BaseTest.GlobalAppId, "0.1", patterns);
      await client.pattern.deletePatterns(BaseTest.GlobalAppId, "0.1", result.map(p => p.id));
      let existingPatterns = await client.pattern.listPatterns(BaseTest.GlobalAppId, "0.1");
      for (let p in result) {
        chai.expect(BaseTest.doesListContain(existingPatterns, "id", p)).not.to.be.true;
      }
    });
  });
});
