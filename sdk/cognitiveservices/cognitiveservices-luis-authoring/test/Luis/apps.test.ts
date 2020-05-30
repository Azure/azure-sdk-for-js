/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as chai from "chai";
import { BaseTest } from "../baseTest";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { AppsAddResponse } from "../../src/models";

const trainedAppID = BaseTest.GlobalAppId;
let testingApp: AppsAddResponse; 

describe("Apps Module Functionality Tests", () => {

  before('add new app to test on', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
    testingApp = await client.apps.add({
        name: "Existing LUIS App",
        description: "New LUIS App",
        culture: "en-us",
        domain: "Comics",
        usageScenario: "IoT"
      });
    });
  });

  after('delete testing app', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      await client.apps.deleteMethod(testingApp.body);
    });
  });

  it('should list all luis applications', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
     
      const list = await client.apps.list();
      
      chai.expect(list).not.to.be.null;
      chai.expect(list.length).not.eql(0);
      chai.expect(BaseTest.doesListContain(list, 'id', testingApp.body)).to.be.true;
    });
  });

  it("should add application", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const appId = await client.apps.add({
        name: "New LUIS App",
        description: "New LUIS App",
        culture: "en-us",
        domain: "Comics",
        usageScenario: "IoT"
      });
      let saved_app = await client.apps.get(appId.body);
      
      await client.apps.deleteMethod(appId.body);
      
      const list = await client.apps.list();
      const checkIdExistence = idParam => list.some( ({id}) => id == idParam)
      chai.assert.isFalse(checkIdExistence(appId.body));

      chai.expect(saved_app).not.to.be.null;
      chai.expect(saved_app.name).to.eql("New LUIS App");
      chai.expect(saved_app.description).to.eql("New LUIS App");
      chai.expect(saved_app.culture).to.eql("en-us");
      chai.expect(saved_app.domain).to.eql("Comics");
      chai.expect(saved_app.usageScenario).to.eql("IoT");
    });

    it("should get application", async () => {
      await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      
        let result = await client.apps.get(testingApp.body);
      
        chai.expect(result).not.to.be.null;
        chai.expect(result.id).to.eql(testingApp.body);
        chai.expect(result.culture).to.eql("en-us");
        chai.expect(result.domain).to.eql("Comics");
        chai.expect(result.usageScenario).to.eql("IoT");
      });
    });
  });

  it("should update application", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
     
      await client.apps.update(testingApp.body, { name: "LUIS App name updated", description: "LUIS App description updated" });
      let app = await client.apps.get(testingApp.body);

      chai.expect(app).not.to.be.null;
      chai.expect(app.name).to.eql("LUIS App name updated");
      chai.expect(app.description).to.eql("LUIS App description updated");
    });
  });

  it("should delete application", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {

      const appId = await client.apps.add({
        name: "LUIS App to be deleted",
        description: "New LUIS App",
        culture: "en-us",
        domain: "Comics",
        usageScenario: "IoT"
      });
      await client.apps.deleteMethod(appId.body);

      const list = await client.apps.list();
      
      const checkIdExistence = idParam => list.some( ({id}) => id == idParam)
      chai.assert.isFalse(checkIdExistence(appId.body));

      chai.expect(BaseTest.doesListContain(list, "name", "LUIS App to be deleted")).to.be.false;
    });
  });

  it("should list all endpoints", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const result = await client.apps.listEndpoints(testingApp.body);

      chai.expect(result["westus"]).to.eql("https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/" + testingApp.body);
      chai.expect(result["eastus2"]).to.eql("https://eastus2.api.cognitive.microsoft.com/luis/v2.0/apps/" + testingApp.body);
      chai.expect(result["westcentralus"]).to.eql("https://westcentralus.api.cognitive.microsoft.com/luis/v2.0/apps/" + testingApp.body);
      chai.expect(result["southeastasia"]).to.eql("https://southeastasia.api.cognitive.microsoft.com/luis/v2.0/apps/" + testingApp.body);

    });
  });

  it("should publish application", async () => {

    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const result = await client.apps.publish(trainedAppID, {
        isStaging: false,
        versionId: "0.1"
      });
      chai.expect(result["endpointUrl"]).to.eql("https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/" + trainedAppID);
      chai.expect(result["endpointRegion"]).to.eql("westus");
      chai.expect(result["isStaging"]).to.be.false;
    });
  });

  it("download query logs", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
     
      const stream = await client.apps.downloadQueryLogs(testingApp.body);
      const csv = stream.readableStreamBody.read().toString();
      chai.expect(csv).to.be.exist;
     
    });
  });

  it("should get settings", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      

      const settings = await client.apps.getSettings(testingApp.body);

      chai.expect(settings.isPublic).to.be.false;
      chai.expect(settings.id).to.eql(testingApp.body);
    });
  });

  it("should update settings", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      
      await client.apps.updateSettings(testingApp.body, {
        isPublic: true
      });
      const settings = await client.apps.getSettings(testingApp.body);
     
      chai.expect(settings.isPublic).to.be.true;
    });

  });

  it("should get publish settings", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      
      const settings = await client.apps.getPublishSettings(testingApp.body);

      chai.expect(settings.id).to.eql(testingApp.body);
      chai.expect(settings.isSentimentAnalysisEnabled).to.be.false;
      chai.expect(settings.isSpeechEnabled).to.be.false;
      chai.expect(settings.isSpellCheckerEnabled).to.be.false;
    });
  });

  it("should update publish settings", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      
      await client.apps.updatePublishSettings(testingApp.body, {
        sentimentAnalysis: true,
        speech: true,
        spellChecker: true
      });
      const settings = await client.apps.getPublishSettings(testingApp.body);

      chai.expect(settings.isSentimentAnalysisEnabled).to.be.true;
      chai.expect(settings.isSpeechEnabled).to.be.true;
      chai.expect(settings.isSpellCheckerEnabled).to.be.true;
    });
  });


  it("should list domains", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const result = await client.apps.listDomains();
      for (let domain of result) {
        chai.expect(domain).to.exist;
      }
    });
  });

  it("should list supported cultures", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let cultures_map = {
        'en-us': 'English',
        'zh-cn': 'Chinese',
        'fr-fr': 'French',
        'fr-ca': 'French Canadian',
        'es-es': 'Spanish',
        'es-mx': 'Spanish Mexican',
        'it-it': 'Italian',
        'de-de': 'German',
        'ja-jp': 'Japanese',
        'pt-br': 'Brazilian Portuguese',
        'ko-kr': 'Korean',
        'nl-nl': 'Dutch',
        'tr-tr': 'Turkish',
		    'hi-in': 'Hindi Indian',
		    'ar-ar': 'Arabic',
		    'gu-in': 'Gujarati Indian',
        'te-in': 'Telugu Indian',
        'ta-in': 'Tamil Indian',
        'mr-in': 'Marathi Indian'
      };

      const result = await client.apps.listSupportedCultures();

      for (let culture of result) {
        const culture_name: string = cultures_map[culture.code];
        chai.expect(culture_name).to.eql(culture.name);
      }
    });
  });

  it("should list usage scenarios", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {

      const result = await client.apps.listUsageScenarios();
      for (let scenario of result) {
        chai.expect(scenario).to.exist;
      }
    });
  });

  it("should list available custom prebuild domains", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {

      const result = await client.apps.listAvailableCustomPrebuiltDomains();
      for (let prebuilt of result) {
        chai.expect(prebuilt).not.to.be.null;
        chai.expect(prebuilt.description).to.exist;
        chai.expect(prebuilt["intents"]).not.to.be.null;
        chai.expect(prebuilt["entities"]).not.to.be.null;
      }
    });
  });

  it.skip("should list available custom prebuilt domains for culture", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let resultsUS = await client.apps.listAvailableCustomPrebuiltDomainsForCulture("en-us");
      let resultsCN = await client.apps.listAvailableCustomPrebuiltDomainsForCulture("zh-cn");
      
      for (let resultUS of resultsUS) {
        chai.expect(BaseTest.doesListContain(resultsCN, "description", resultUS.description)).to.be.false;
      }
      for (let resultCN of resultsCN) {
        chai.expect(BaseTest.doesListContain(resultsUS, "description", resultCN.description)).to.be.false;
      }
    });
  });


  it("should add custom prebuilt application", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const appId = await client.apps.addCustomPrebuiltDomain({
        culture: "en-us",
        domainName: "Communication"
      });
      await client.apps.deleteMethod(appId.body);
      chai.expect(appId.body).not.to.eql(BaseTest.EmptyId);
    });
  });

});
