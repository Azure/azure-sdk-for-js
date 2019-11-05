/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as chai from "chai";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { BaseTest } from "../baseTest";
import { HierarchicalEntityExtractor } from "../../src/models";


describe("model Module Functionality", () => {
  it('should list models', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let versionId = BaseTest.GlobalVersionId;
      let entities = await client.model.listModels(BaseTest.GlobalAppId, versionId);
      for (let entity of entities) {
        let entityInfo = await client.model.getEntity(BaseTest.GlobalAppId, versionId, entity.id);
        chai.expect(entity.name).to.eql(entityInfo.name);
      }
    });
  });

});
