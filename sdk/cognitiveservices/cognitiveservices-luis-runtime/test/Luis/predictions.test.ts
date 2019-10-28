/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */


import { LUISRuntimeClient } from "../../src/lUISRuntimeClient";
import { BaseTest } from "../baseTest"
import * as chai from "chai";


describe("Predections Tests", () => {
  var versionId = "0.1";
  var utterance = "today this is a test with post";
  var slotName = "production";
  let externalResolution = { text: "post", external: true };

  it('should test prediction slot', async () => {
    await BaseTest.useClientFor(async (client: LUISRuntimeClient) => {
      let result = await client.prediction.getSlotPrediction(
        BaseTest.GlobalAppId,
        slotName,
        {
          query: utterance,
          options: {
            datetimeReference: new Date("2019-01-01"),
            preferExternalEntities: true
          },
          externalEntities: [{
            entityName: "simple",
            startIndex: 26,
            entityLength: 4,
            score : 0.86,
            resolution: externalResolution
          }],
          dynamicLists: [{
            listEntityName: "list", requestLists: [{
              name: "test",
              canonicalForm: "testing",
              synonyms: ["this"]
            }]
          }],
        }, {
          verbose: true,
          showAllIntents: true
        }
      );
      var prediction = result.prediction;
      chai.expect(utterance).to.eql(result.query);
      chai.expect(prediction.topIntent).to.eql("intent");
      chai.expect(Object.keys(prediction.intents).length).to.eql(2);
      chai.expect(Object.keys(prediction.entities).length).to.eql(4);
      chai.expect(prediction.entities["datetimeV2"]).to.be.exist;
      chai.expect(prediction.entities["simple"]).to.be.exist;
      chai.expect(prediction.entities["list"]).to.be.exist;
      chai.expect(prediction.entities["$instance"]).to.be.exist;

      var actualResolution = prediction.entities["simple"][0];
      chai.expect(externalResolution).to.eql(actualResolution);

      var topIntent = prediction.intents[prediction.topIntent];
      chai.expect(topIntent.score).to.be.above(0.5);
      chai.expect(prediction.sentiment.label).to.eql("positive");
      chai.expect(prediction.sentiment.score).to.be.above(0.5);

      var child = topIntent.childApp;
      chai.expect(child.topIntent).to.eql("None");
      chai.expect(Object.keys(child.intents).length).to.eql(1);
      chai.expect(Object.keys(child.entities).length).to.eql(2);
      chai.expect(child.entities["datetimeV2"]).to.be.exist;
      chai.expect(child.entities["$instance"]).to.be.exist;

      var dispatchTopIntent = child.intents[child.topIntent];
      chai.expect(dispatchTopIntent.score).to.be.above(0.5);
      chai.expect(child.sentiment.label).to.eql("positive")
      chai.expect(child.sentiment.score).to.be.above(0.5);
    })
  });

  it("should test prediction with version", async () => {
    await BaseTest.useClientFor(async (client: LUISRuntimeClient) => {
      let result = await client.prediction.getVersionPrediction(
        BaseTest.GlobalAppId,
        versionId,
        {
          query: utterance,
          options: {
            datetimeReference: new Date("2019-01-01"),
            preferExternalEntities: true
          },
          externalEntities: [{
            entityName: "simple",
            startIndex: 26,
            entityLength: 4,
            resolution: externalResolution
          }],
          dynamicLists: [{
            listEntityName: "list", requestLists: [{
              name: "test",
              canonicalForm: "testing",
              synonyms: ["this"]
            }]
          }],
        },
        {
          verbose: true,
          showAllIntents: true
        }
      )
      let prediction = result.prediction;
      chai.expect(utterance).to.eql(result.query);
      chai.expect(prediction.topIntent).to.eql("intent");
      chai.expect(Object.keys(prediction.intents).length).to.eql(2);
      chai.expect(Object.keys(prediction.entities).length).to.eql(4);
      chai.expect(prediction.entities["datetimeV2"]).to.be.exist;
      chai.expect(prediction.entities["simple"]).to.be.exist;
      chai.expect(prediction.entities["list"]).to.be.exist;
      chai.expect(prediction.entities["$instance"]).to.be.exist;

      var actualResolution = prediction.entities["simple"][0];
      chai.expect(externalResolution).to.eql(actualResolution);

      var topIntent = prediction.intents[prediction.topIntent];
      chai.expect(topIntent.score).to.be.above(0.5);
      chai.expect(prediction.sentiment.label).to.eql("positive");
      chai.expect(prediction.sentiment.score).to.be.above(0.5);

      var child = topIntent.childApp;
      chai.expect(child.topIntent).to.eql("None");
      chai.expect(Object.keys(child.intents).length).to.eql(1);
      chai.expect(Object.keys(child.entities).length).to.eql(2);
      chai.expect(child.entities["datetimeV2"]).to.be.exist;
      chai.expect(child.entities["$instance"]).to.be.exist;

      var dispatchTopIntent = child.intents[child.topIntent];
      chai.expect(dispatchTopIntent.score).to.be.above(0.5);
      chai.expect(child.sentiment.label).to.eql("positive")
      chai.expect(child.sentiment.score).to.be.above(0.5);
    });
  });

  it("should test app not found - throws api error exception", async () => {
    await BaseTest.useClientFor(async (client: LUISRuntimeClient) => {
      return client.prediction.getSlotPrediction(
        "7555b7c1-e69c-4580-9d95-1abd6dfa8291",
        "production",
        { query: "this is a test with post" }).catch(err => {
          chai.expect(err.body.error.code).to.eql("NotFound");
        });
    });
  });

  it("should test empty query throws validation excpetion", async () => {
    await BaseTest.useClientFor(async (client: LUISRuntimeClient) => {
      return client.prediction.getSlotPrediction(BaseTest.GlobalAppId, "production", { query: "" }).catch(err => {
        chai.expect(err.body.error.code).to.eql("BadArgument");
      });
    });
  });
});
