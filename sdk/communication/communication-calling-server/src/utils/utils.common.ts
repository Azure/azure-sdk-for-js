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

  public static getStringToSignHeader(stringToSign: string): OperationQueryParameter {
    return {
      parameterPath: "UrlToSignWith",
      mapper: {
        defaultValue: stringToSign,
        isConstant: true,
        serializedName: "UrlToSignWith",
        type: {
          name: "String"
        }
      }
    };
  }

  public static getMsHostHeaders(hostName: string): OperationQueryParameter {
    const q = URLBuilder.parse(hostName!);
    const hostAndPort = q.getHost()! + (q.getPort() !== undefined ? q.getPort() : "");
    return {
      parameterPath: "x-ms-host",
      mapper: {
        defaultValue: hostAndPort,
        isConstant: true,
        serializedName: "x-ms-host",
        type: {
          name: "String"
        }
      }
    };
  }

  public static getStringToSign(resourceEndpoint: string, requestUrl: string): string {
    const q = URLBuilder.parse(requestUrl);
    const formattedUrl = q.getPath()!.startsWith("/") ? q.getPath()!.substr(1) : q.getPath()!;
    return resourceEndpoint + formattedUrl;
  }
}
