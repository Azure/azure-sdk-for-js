/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as chai from "chai";
import { BaseTest } from "../baseTest";
import { TrainGetStatusResponse } from "../../src/models";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { delay } from "@azure/ms-rest-js";



function checkStatus(statusArr: TrainGetStatusResponse) {
  for (let s of statusArr) {
    if (s.details.status != "Success" && s.details.status != "UpToDate")
      return true;
  }
  return false;
}


describe("Train Module Functionality", () => {

  it('should get status', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let versionId = "0.1";
      await client.train.trainVersion(BaseTest.GlobalAppId, versionId);
      let result = await client.train.getStatus(BaseTest.GlobalAppId, versionId);

      while (checkStatus(result)) {
          result = await client.train.getStatus(BaseTest.GlobalAppId, versionId);
          await delay(1000);
      }

      for (let trainResult of result) {
        switch (trainResult.details.status) {
          case "Success":
          case "UpToDate":
            chai.expect(trainResult.details.failureReason).not.to.be.exist;
            break;
          case "Fail":
          case "InProgress":
          default:
            chai.expect(true).to.be.false;
            break;
        }
      }
    });
  });

  it('should train version', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let versionId = "0.1";
      await client.train.trainVersion(BaseTest.GlobalAppId, versionId);
      let result = await client.train.getStatus(BaseTest.GlobalAppId, versionId);
      
      while (checkStatus(result)) {
        result = await client.train.getStatus(BaseTest.GlobalAppId, versionId);
        await delay(1000);
      }

      let secondTrainResult = await client.train.trainVersion(BaseTest.GlobalAppId, versionId);
      chai.expect(secondTrainResult.status).to.eql("UpToDate");
    });
  });
});
