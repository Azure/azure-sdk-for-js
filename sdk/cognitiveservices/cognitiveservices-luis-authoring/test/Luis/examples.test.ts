/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { BaseTest } from "../baseTest";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import * as chai from "chai";


describe("Example Module Functionality Tests", () => {
  it("should list all examples", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const examples = await client.examples.list(BaseTest.GlobalAppId, "0.1");
      chai.expect(examples.length).not.to.eql(0);
    });
  });

  it("should list all examples in empty application returning empty", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const appId = await client.apps.add({
        name: "Examples Test App",
        description: "New LUIS App",
        culture: "en-us",
        domain: "Comics",
        usageScenario: "IoT"
      });
      const examples = await client.examples.list(appId.body, "0.1");
      await client.apps.deleteMethod(appId.body);
      chai.expect(examples.length).to.eql(0);
    });
  });


  it("should add example", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const appId = await client.apps.add({
        name: "Examples Test App",
        description: "New LUIS App",
        culture: "en-us",
        domain: "Comics",
        usageScenario: "IoT"
      });
      await client.model.addIntent(appId.body, "0.1", { name: "WeatherInPlace" });
      await client.model.addEntity(appId.body, "0.1", { name: "Place" });
      let example = {
        text: "whats the weather in buenos aires?",
        intentName: "WeatherInPlace",
        entityLabels: [{
          entityName: "Place",
          startCharIndex: 21,
          endCharIndex: 34
        }]
      };
      const result = await client.examples.add(appId.body, "0.1", example);
      await client.apps.deleteMethod(appId.body);
      chai.expect(result.utteranceText).to.eql(example.text)
    });
  });

  it("should add example with nested children", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const appId = await client.apps.add({
        name: "Examples Test App",
        description: "New LUIS App",
        culture: "en-us",
        domain: "Comics",
        usageScenario: "IoT"
      });
      await client.model.addIntent(appId.body, "0.1", { name: "WeatherInPlace" });
      await client.model.addEntity(appId.body, "0.1", { 
        name: "Place",
        children:[{
            name: "City"
          },
          {
            name: "Country"
          }
        ]});
      let example = {
        text: "whats the weather in buenos aires, argentina?",
        intentName: "WeatherInPlace",
        entityLabels: [{
          entityName: "Place",
          startCharIndex: 21,
          endCharIndex: 43,
          children: [{
            entityName: "City",
            startCharIndex: 21,
            endCharIndex: 32
          },
          {
            entityName: "Country",
            startCharIndex: 35,
            endCharIndex: 43
          }]
        }]
      };
      const result = await client.examples.add(appId.body, "0.1", example, {enableNestedChildren: true});
      await client.apps.deleteMethod(appId.body);
      chai.expect(result.utteranceText).to.eql(example.text)
    });
  });

  it("should add examples in batch", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const appId = await client.apps.add({
        name: "Examples Test App",
        description: "New LUIS App",
        culture: "en-us",
        domain: "Comics",
        usageScenario: "IoT"
      });
      await client.model.addIntent(appId.body, "0.1", { name: "WeatherInPlace" });
      await client.model.addEntity(appId.body, "0.1", { name: "Place" });
      let examples = [{
        text: "whats the weather in seattle?",
        intentName: "WeatherInPlace",
        entityLabels: [{
          entityName: "Place",
          startCharIndex: 21,
          endCharIndex: 34
        }]
      }, {
        text: "whats the weather in buenos aires?",
        intentName: "WeatherInPlace",
        entityLabels: [{
          entityName: "Place",
          startCharIndex: 21,
          endCharIndex: 29
        }]
      }];
      const result = await client.examples.batch(appId.body, "0.1", examples);
      await client.apps.deleteMethod(appId.body);
      chai.expect(examples.length).to.eql(result.length);
      let pass = true;
      for (let r of result) {
        if (r.hasError)
          pass = false;

        let found = false;
        for (let e of examples)
          if (e.text.toLowerCase() == r.value.utteranceText.toLowerCase())
            found = true;

        pass = (pass && found);
      }
      chai.expect(pass).to.be.true;
    });
  });


  it("should add examples in batch with some invalid examples returning some errors", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const appId = await client.apps.add({
        name: "Examples Test App",
        description: "New LUIS App",
        culture: "en-us",
        domain: "Comics",
        usageScenario: "IoT"
      });
      await client.model.addIntent(appId.body, "0.1", { name: "WeatherInPlace" });
      await client.model.addEntity(appId.body, "0.1", { name: "Place" });
      let examples = [{
        text: "whats the weather in seattle?",
        intentName: "InvalidIntent",
        entityLabels: [{
          entityName: "Place",
          startCharIndex: 21,
          endCharIndex: 29
        }]
      }, {
        text: "whats the weather in buenos aires?",
        intentName: "IntentDoesNotExist",
        entityLabels: [{
          entityName: "Place",
          startCharIndex: 21,
          endCharIndex: 34
        }]
      }];
      const result = await client.examples.batch(appId.body, "0.1", examples);
      await client.apps.deleteMethod(appId.body);
      chai.expect(examples.length).to.eql(result.length);
      let pass = true;
      for (let r of result) {
        if (r.hasError)
          pass = false;
      }
      chai.expect(pass).to.be.false;
    });
  });


  it("should delete example", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const appId = await client.apps.add({
        name: "Examples Test App",
        description: "New LUIS App",
        culture: "en-us",
        domain: "Comics",
        usageScenario: "IoT"
      });
      let example = {
        text: "Abuamra is awesome",
        intentName: "None",
        entityLabels: []
      };
      const result = await client.examples.add(appId.body, "0.1", example);
      let exampleId = result.exampleId;
      await client.examples.deleteMethod(appId.body, "0.1", exampleId);
      const examples = await client.examples.list(appId.body, "0.1");
      await client.apps.deleteMethod(appId.body);
      chai.expect(BaseTest.doesListContain(examples, "id", exampleId)).to.be.false;
    });
  });
});
