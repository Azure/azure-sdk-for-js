/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as chai from "chai";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { BaseTest } from "../baseTest";

describe("model Module Functionality", () => {
  it('should list models', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let versionId = BaseTest.GlobalVersionId;
      let models = await client.model.listModels(BaseTest.GlobalAppId, versionId);
      for (let model of models) {
        if(model.typeId == 1) {
          let entityInfo = await client.model.getEntity(BaseTest.GlobalAppId, versionId, model.id);
          chai.expect(model.name).to.eql(entityInfo.name);

        }
        else{
          let intentInfo = await client.model.getIntent(BaseTest.GlobalAppId, versionId, model.id);
          chai.expect(model.name).to.eql(intentInfo.name);
        }
      }
    });
  });

  it('should create model with no children', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let versionId = BaseTest.GlobalVersionId;
      let entityId = await client.model.addEntity(BaseTest.GlobalAppId, versionId, { name: "New Entity Test with no childern" });
      await client.model.deleteEntity(BaseTest.GlobalAppId, versionId, entityId.body);
    });
  });

  it('should create model with children', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let versionId = BaseTest.GlobalVersionId;
      let entityId = await client.model.addEntity(BaseTest.GlobalAppId, versionId, { name: "New Entity Test with childern", children: [ { name: "child1"}] } );
      await client.model.deleteEntity(BaseTest.GlobalAppId, versionId, entityId.body);
    });
  });

  it('should create model with children and instance of', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let versionId = BaseTest.GlobalVersionId;
      let prebuiltEntitiesAdded = await client.model.addPrebuilt(BaseTest.GlobalAppId, versionId, [ "email" ]);
      let entityId = await client.model.addEntity(BaseTest.GlobalAppId, versionId, { name: "New Entity Test with childern and instanceOf", children: [ { name: "child1", children: [{name: "instanceOf", instanceOf: "email"}]}] } );
      await client.model.deleteEntity(BaseTest.GlobalAppId, versionId, entityId.body);
      await client.model.deletePrebuilt(BaseTest.GlobalAppId, versionId, prebuiltEntitiesAdded[0].id);
    });
  });

  it('should add model child', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let versionId = BaseTest.GlobalVersionId;
      let entityId = await client.model.addEntity(BaseTest.GlobalAppId, versionId, { name: "New Entity to add"} );
      await client.model.addEntityChild(BaseTest.GlobalAppId, versionId, entityId.body, {"name": "child1"});
      await client.model.deleteEntity(BaseTest.GlobalAppId, versionId, entityId.body);
    });
  });

  it('should get model', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let versionId = BaseTest.GlobalVersionId;
      let entityId = await client.model.addEntity(BaseTest.GlobalAppId, versionId, { name: "New Entity Test to get", children: [{name: "child1"}]} );
      let entity = await client.model.getEntity(BaseTest.GlobalAppId, versionId, entityId.body);
      chai.expect(entity.children[0].name).to.eql("child1");
      chai.expect(entity.id, entityId.body);
      await client.model.deleteEntity(BaseTest.GlobalAppId, versionId, entityId.body);
    });
  });

  it('should update model child name', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let versionId = BaseTest.GlobalVersionId;
      let entityId = await client.model.addEntity(BaseTest.GlobalAppId, versionId, { name: "New Entity Test to update" } );
      let entityChild = await client.model.addEntityChild(BaseTest.GlobalAppId, versionId, entityId.body, {name: "child1"});
      await client.model.updateEntityChild(BaseTest.GlobalAppId, versionId, entityChild.body, {name: "child2"});

      let entity = await client.model.getEntity(BaseTest.GlobalAppId, versionId, entityId.body);
      chai.expect(entity.children[0].name).to.eql("child2");
      await client.model.deleteEntity(BaseTest.GlobalAppId, versionId, entityId.body);
    });
  });

});
