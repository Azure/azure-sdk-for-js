/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as chai from "chai";
import { BaseTest } from "../baseTest";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";

describe("Model Intents Tests", () => {
  it("should list intents", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const intents = await client.model.listIntents(BaseTest.GlobalAppId, "0.1");
      let checker: boolean = true;
      for (var intent of intents) {
        if (intent.readableType != "Intent Classifier")
          checker = false;
      }
      chai.expect(checker).to.be.true;
    });
  });

  it("should add intent", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const newIntentId = await client.model.addIntent(BaseTest.GlobalAppId, "0.1", { name: "TestIntent" });
      const intents = await client.model.listIntents(BaseTest.GlobalAppId, "0.1");
      await client.model.deleteIntent(BaseTest.GlobalAppId, "0.1", newIntentId.body);
      chai.expect(newIntentId).not.to.eql(BaseTest.EmptyId);
      chai.expect(BaseTest.doesListContain(intents, "id", newIntentId.body)).to.be.true;
      chai.expect(BaseTest.doesListContain(intents, "name", "TestIntent")).to.be.true;
    });
  });

  it("should get intent", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const newIntentId = await client.model.addIntent(BaseTest.GlobalAppId, "0.1", { name: "TestIntent" });
      const intent = await client.model.getIntent(BaseTest.GlobalAppId, "0.1", newIntentId.body);
      await client.model.deleteIntent(BaseTest.GlobalAppId, "0.1", newIntentId.body);
      chai.expect(intent.id).to.eql(newIntentId.body);
      chai.expect(intent.name).to.eql("TestIntent");
    });
  })

  it("should update intent", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const intentId = await client.model.addIntent(BaseTest.GlobalAppId, "0.1", { name: "TestIntent" });
      const intent = await client.model.getIntent(BaseTest.GlobalAppId, "0.1", intentId.body);
      await client.model.updateIntent(BaseTest.GlobalAppId, "0.1", intentId.body, { name: "UpdateTest" })
      const newintent = await client.model.getIntent(BaseTest.GlobalAppId, "0.1", intentId.body);
      await client.model.deleteIntent(BaseTest.GlobalAppId, "0.1", intentId.body);
      chai.expect(intent.id).to.eql(newintent.id);
      chai.expect(newintent.name).not.to.eql(intent.name);
      chai.expect(newintent.name).to.eql("UpdateTest");
    });
  });

  it("should delete intent", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const intentId = await client.model.addIntent(BaseTest.GlobalAppId, "0.1", { name: "TestIntent" });
      const intents = await client.model.listIntents(BaseTest.GlobalAppId, "0.1");
      await client.model.deleteIntent(BaseTest.GlobalAppId, "0.1", intentId.body);
      const intentsWithoutDeleted = await client.model.listIntents(BaseTest.GlobalAppId, "0.1");
      chai.expect(BaseTest.doesListContain(intents, "id", intentId.body)).to.be.true;
      chai.expect(BaseTest.doesListContain(intentsWithoutDeleted, "id", intentId.body)).to.be.false;
    });
  });
});
