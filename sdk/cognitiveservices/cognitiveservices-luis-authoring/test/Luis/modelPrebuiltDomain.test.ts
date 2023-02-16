/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as chai from "chai";
import { BaseTest } from "../baseTest";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";

describe("Model Prebuilt Domain Tests", function () {
  it('should add custom prebuilt domain', async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const appId = await client.apps.add({
        name: "Existing LUIS App",
        description: "New LUIS App",
        culture: "en-us",
        domain: "Comics",
        usageScenario: "IoT"
      });
      let versionsApp = await client.versions.list(appId.body);
      let version = '0.1';
      let results = await client.model.addCustomPrebuiltDomain(appId.body, version, { domainName: "Communication" });
      let prebuiltModels = await client.model.listCustomPrebuiltModels(appId.body, version);
      await client.model.deleteCustomPrebuiltDomain(appId.body, version, "Communication");
      await client.apps.deleteMethod(appId.body);
      // to check if prebuiltModels is subset of results
      let fine = true;
      for (let model of prebuiltModels) {
        let found = false;
        for (let result of results)
          if (result == model.id)
            found = true;
        fine = (found && fine);
      }
      chai.expect(fine).to.be.true;
    });
  });

  it('should delete custom prebuilt domain', async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const appId = await client.apps.add({
        name: "Existing LUIS App",
        description: "New LUIS App",
        culture: "en-us",
        domain: "Comics",
        usageScenario: "IoT"
      });
      let versionsApp = await client.versions.list(appId.body);
      let version = versionsApp[0].version;
      let results = await client.model.addCustomPrebuiltDomain(appId.body, version, { domainName: "Communication" });
      let prebuiltModels = await client.model.listCustomPrebuiltModels(appId.body, version);
      chai.expect(BaseTest.doesListContain(prebuiltModels, "customPrebuiltDomainName", "Communication")).to.be.true;

      await client.model.deleteCustomPrebuiltDomain(appId.body, version, "Communication")

      prebuiltModels = await client.model.listCustomPrebuiltModels(appId.body, version);
      await client.apps.deleteMethod(appId.body);
      chai.expect(BaseTest.doesListContain(prebuiltModels, "customPrebuiltDomainName", "Communication")).to.be.false;

    });
  });

  it('should list custom prebuilt entities', async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const appId = await client.apps.add({
        name: "Existing LUIS App",
        description: "New LUIS App",
        culture: "en-us",
        domain: "Comics",
        usageScenario: "IoT"
      });

      let versionsApp = await client.versions.list(appId.body);
      let version = versionsApp[0].version;

      let results = await client.model.addCustomPrebuiltDomain(appId.body, version, {
        domainName: "Communication"
      });
      let prebuiltEntities = await client.model.listCustomPrebuiltEntities(appId.body, version);
      await client.model.deleteCustomPrebuiltDomain(appId.body, version, "Communication")
      await client.apps.deleteMethod(appId.body);

      chai.expect(BaseTest.doesListContain(prebuiltEntities, "customPrebuiltDomainName", "Communication")).to.be.true;


    });
  });

  it('should add custom prebuilt entity', async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const appId = await client.apps.add({
        name: "Existing LUIS App",
        description: "New LUIS App",
        culture: "en-us",
        domain: "Comics",
        usageScenario: "IoT"
      });
      let versionsApp = await client.versions.list(appId.body);
      let version = versionsApp[0].version;
      let guidModel = await client.model.addCustomPrebuiltEntity(appId.body, version, {
        domainName: "Communication",
        modelName: "Category"
      });
      let prebuiltEntities = await client.model.listCustomPrebuiltEntities(appId.body, version);
      await client.model.deleteEntity(appId.body, "0.1", guidModel.body);
      await client.apps.deleteMethod(appId.body);
      chai.expect(BaseTest.doesListContain(prebuiltEntities, "id", guidModel.body)).to.be.true;
    });
  });


  it('should list custom prebuilt intents', async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const appId = await client.apps.add({
        name: "Existing LUIS App",
        description: "New LUIS App",
        culture: "en-us",
        domain: "Comics",
        usageScenario: "IoT"
      });
      let versionsApp = await client.versions.list(appId.body);
      let version = versionsApp[0].version;
      let results = await client.model.addCustomPrebuiltDomain(appId.body, version, { domainName: "Communication" });
      let prebuiltIntents = await client.model.listCustomPrebuiltIntents(appId.body, version);
      await client.model.deleteCustomPrebuiltDomain(appId.body, version, "Communication")
      await client.apps.deleteMethod(appId.body);
      chai.expect(BaseTest.doesListContain(prebuiltIntents, "customPrebuiltDomainName", "Communication")).to.be.true;
    });
  });

  it('should add custom prebuilt intent', async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const appId = await client.apps.add({
        name: "Existing LUIS App",
        description: "New LUIS App",
        culture: "en-us",
        domain: "Comics",
        usageScenario: "IoT"
      });
      let versionsApp = await client.versions.list(appId.body);
      let version = versionsApp[0].version;
      let guidModel = await client.model.addCustomPrebuiltIntent(appId.body, version, { domainName: "Communication", modelName: "AddContact" });
      let prebuiltIntents = await client.model.listCustomPrebuiltIntents(appId.body, version);
      await client.model.deleteIntent(appId.body, version, guidModel.body);
      await client.apps.deleteMethod(appId.body);
      chai.expect(BaseTest.doesListContain(prebuiltIntents, "id", guidModel.body)).to.be.true;
    });
  });

  it('should list custom prebuilt models', async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const appId = await client.apps.add({
        name: "Existing LUIS App",
        description: "New LUIS App",
        culture: "en-us",
        domain: "Comics",
        usageScenario: "IoT"
      });
      let versionsApp = await client.versions.list(appId.body);
      let version = versionsApp[0].version;
      let results = await client.model.addCustomPrebuiltDomain(appId.body, version, { domainName: "Communication" });
      let prebuiltModels = await client.model.listCustomPrebuiltModels(appId.body, version);
      await client.model.deleteCustomPrebuiltDomain(appId.body, version, "Communication")
      await client.apps.deleteMethod(appId.body);
      let found: boolean = false;
      for (let model of prebuiltModels) {
        if (model.readableType == "Intent Classifier" || model.readableType == "Entity Extractor")
          found = true;
      }
      chai.expect(found).to.be.true;
    });
  });
});
