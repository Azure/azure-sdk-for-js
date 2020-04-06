/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";
import { LUISAuthoringClient } from "../src/lUISAuthoringClient";

export class BaseTest {
  static GlobalAppId = "4a696805-d784-4040-a0ba-043cc831b779";
  static GlobalVersionId = "0.1";
  static GlobalAppIdError = "86226c53-b7a6-416f-876b-226b2b5ab07d";
  static GlobalNoneId = "731e7ac1-b1d4-4e4e-bc1b-d79f67e2b890";
  static AuthoringKey = "3fc290e189af4d33a677dfa763782b26";
  static EmptyId = "00000000-0000-0000-0000-000000000000";
  static OwnerEmail = "a-nofari@microsoft.com";

  static async useClientFor(test) {
    let client = new LUISAuthoringClient(
      new CognitiveServicesCredentials(this.AuthoringKey),
      "https://westus.api.cognitive.microsoft.com"
    );
    await test(client);
  }

  static doesListContain(list: any[], key: string, value: any) {
    let found = false;
    for (var item of list) {
      if (item[key] == value) {
        found = true;
      }
    }
    return found;
  }
}
