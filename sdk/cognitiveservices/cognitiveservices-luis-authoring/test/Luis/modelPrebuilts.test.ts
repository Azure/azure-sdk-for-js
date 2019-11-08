/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as chai from "chai";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { BaseTest } from "../baseTest";


describe("Model Prebuilts Tests", () => {

  it('should list prebuilt entities', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      var version = "0.1";
      var prebuiltEntities = await client.model.listPrebuiltEntities(BaseTest.GlobalAppId, version);
      chai.expect(prebuiltEntities).to.have.length.above(0);
    });
  });

  it('should list prebuilts', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      var version = "0.1";
      var addedId = (await client.model.addPrebuilt(BaseTest.GlobalAppId, version, ["ordinal"]))[0].id;
      var prebuiltEntities = await client.model.listPrebuilts(BaseTest.GlobalAppId, version);
      await client.model.deletePrebuilt(BaseTest.GlobalAppId, version, addedId);
      chai.expect(prebuiltEntities).to.have.length.above(0);
      chai.expect(BaseTest.doesListContain(prebuiltEntities, "readableType", "Prebuilt Entity Extractor"))
    });
  });

  it('should add prebuilt', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      var version = "0.1";
      var prebuiltEntitiesToAdd = ["age", "ordinal"];
      var prebuiltEntitiesAdded = await client.model.addPrebuilt(BaseTest.GlobalAppId, version, prebuiltEntitiesToAdd);
      for (var added of prebuiltEntitiesAdded) {
        await client.model.deletePrebuilt(BaseTest.GlobalAppId, version, added.id);
      }
      for (var entity of prebuiltEntitiesToAdd) {
        chai.expect(BaseTest.doesListContain(prebuiltEntitiesAdded, "name", entity)).to.be.true;
      }
    });
  });

  it('should get prebuilt', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      var version = "0.1";
      var addedId = (await client.model.addPrebuilt(BaseTest.GlobalAppId, version, ["ordinal"]))[0].id;
      var prebuiltEntity = await client.model.getPrebuilt(BaseTest.GlobalAppId, version, addedId);
      await client.model.deletePrebuilt(BaseTest.GlobalAppId, version, addedId);
      chai.expect(addedId).to.eql(prebuiltEntity.id);
    });
  });

  it('should delete prebuilt', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      var version = "0.1";
      var addedId = (await client.model.addPrebuilt(BaseTest.GlobalAppId, version, ["ordinal"]))[0].id;
      await client.model.deletePrebuilt(BaseTest.GlobalAppId, version, addedId);
      var prebuiltEntitiesWithoutDeleted = await client.model.listPrebuilts(BaseTest.GlobalAppId, version);
      chai.expect(BaseTest.doesListContain(prebuiltEntitiesWithoutDeleted, "id", addedId));
    });
  });
});
