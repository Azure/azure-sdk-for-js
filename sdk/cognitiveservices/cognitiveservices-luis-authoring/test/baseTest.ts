/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";
import { LUISAuthoringClient } from "../src/lUISAuthoringClient";

export class BaseTest {
  static GlobalAppId = process.env['global_app_id'];
  static GlobalVersionId = "0.1";
  static GlobalAppIdError = process.env['global_app_id_error'];
  static GlobalNoneId = process.env['global_none_id'];
  static AuthoringKey = process.env['authoring_key'];
  static EmptyId = "00000000-0000-0000-0000-000000000000";
  static OwnerEmail = process.env['owner_email'];

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
