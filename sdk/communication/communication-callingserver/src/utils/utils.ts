// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { URLBuilder } from "@azure/core-http";

export class CallingServerUtils {
  public static isValidUrl(urlToVerify: string): boolean {
    let url;
    try {
      url = URLBuilder.parse(urlToVerify);
    } catch (_) {
      return false;
    }
    return url.getScheme() === "http" || url.getScheme() === "https";
  }
}
