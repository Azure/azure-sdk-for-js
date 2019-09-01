/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as chai from "chai";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { BaseTest } from "../baseTest";

const regextEntitySample = {
  name: "regex entity 1",
  regexPattern: "regex pattern 1"
};


describe("Model Regex Entities Tests", () => {
  it('should get regex entities', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const regexEntityId = await client.model.createRegexEntityModel(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, regextEntitySample);
      const regexEntities = await client.model.listRegexEntityInfos(BaseTest.GlobalAppId, BaseTest.GlobalVersionId);
      await client.model.deleteRegexEntityModel(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, regexEntityId.body);
      chai.expect(regexEntities).not.to.be.null;
    });
  });


  it('should create regex entity', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const regexEntityId = await client.model.createRegexEntityModel(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, regextEntitySample);
      await client.model.deleteRegexEntityModel(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, regexEntityId.body);
      chai.expect(regexEntityId.body).not.to.eql(BaseTest.EmptyId);
    });
  });


  it('should get regex entity', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const regexEntityId = await client.model.createRegexEntityModel(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, regextEntitySample);
      const regexEntity = await client.model.getRegexEntityEntityInfo(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, regexEntityId.body);
      await client.model.deleteRegexEntityModel(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, regexEntityId.body);
      chai.expect(regexEntity.name).to.eql("regex entity 1");
      chai.expect(regexEntity.regexPattern).to.eql("regex pattern 1");
    });
  });


  it('should update regex entity', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const regexEntityId = await client.model.createRegexEntityModel(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, regextEntitySample);
      await client.model.updateRegexEntityModel(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, regexEntityId.body, { name: "regex entity 2", regexPattern: "regex pattern 2" });
      const updatedRegexEntity = await client.model.getRegexEntityEntityInfo(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, regexEntityId.body);
      await client.model.deleteRegexEntityModel(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, regexEntityId.body);
      chai.expect(updatedRegexEntity.name).to.eql("regex entity 2");
      chai.expect(updatedRegexEntity.regexPattern).to.eql("regex pattern 2");
    });
  });

  it('should delete regex entity', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const regexEntityId = await client.model.createRegexEntityModel(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, regextEntitySample);
      await client.model.deleteRegexEntityModel(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, regexEntityId.body);
      const regexEntities = await client.model.listRegexEntityInfos(BaseTest.GlobalAppId, BaseTest.GlobalVersionId);
      chai.expect(BaseTest.doesListContain(regexEntities, "id", regexEntityId.body)).to.be.false;
    });
  });
});
