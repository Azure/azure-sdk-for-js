// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationQueryParameter } from "@azure/core-http";
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

  public static getStringToSignHeader(
    stringToSign: string
  ): OperationQueryParameter
  {
    return {
      parameterPath: "UriToSignWith",
      mapper: {
        defaultValue: stringToSign,
        isConstant: true,
        serializedName: "UriToSignWith",
        type: {
          name: "String"
        }
      }
    };
  }
}
