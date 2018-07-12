import * as crypto from "crypto";
import { DocumentClientBase } from "./DocumentClientBase";
import { IHeaders } from "./queryExecutionContext";

export interface IRequestInfo {
  [index: string]: any;
  verb: string;
  path: string;
  resourceId: string;
  resourceType: string;
  headers: IHeaders;
}

export interface ITokenProvider {
  getToken: (requestInfo: IRequestInfo, callback?: (err: Error, token: string) => void) => Promise<string>;
}

export class AuthHandler {
  // TODO: documentClient
  public static async getAuthorizationHeader(
    documentClient: DocumentClientBase,
    verb: string,
    path: string,
    resourceId: string,
    resourceType: string,
    headers: IHeaders
  ): Promise<string> {
    if (documentClient.masterKey) {
      return encodeURIComponent(
        AuthHandler.getAuthorizationTokenUsingMasterKey(
          verb,
          resourceId,
          resourceType,
          headers,
          documentClient.masterKey
        )
      );
    } else if (documentClient.resourceTokens) {
      return encodeURIComponent(
        AuthHandler.getAuthorizationTokenUsingResourceTokens(documentClient.resourceTokens, path, resourceId)
      );
    } else if (documentClient.tokenProvider) {
      return encodeURIComponent(
        await AuthHandler.getAuthorizationTokenUsingTokenProvider(documentClient.tokenProvider, {
          verb,
          path,
          resourceId,
          resourceType,
          headers
        })
      );
    }
  }

  private static getAuthorizationTokenUsingMasterKey(
    verb: string,
    resourceId: string,
    resourceType: string,
    headers: IHeaders,
    masterKey: string
  ) {
    const key = new Buffer(masterKey, "base64");

    const text =
      (verb || "").toLowerCase() +
      "\n" +
      (resourceType || "").toLowerCase() +
      "\n" +
      (resourceId || "") +
      "\n" +
      ((headers["x-ms-date"] as string) || "").toLowerCase() +
      "\n" +
      ((headers["date"] as string) || "").toLowerCase() +
      "\n";

    const body = new Buffer(text, "utf8");
    const signature = crypto
      .createHmac("sha256", key)
      .update(body)
      .digest("base64");
    const MasterToken = "master";
    const TokenVersion = "1.0";

    return `type=${MasterToken}&ver=${TokenVersion}&sig=${signature}`;
  }

  // TODO: Resource tokens
  private static getAuthorizationTokenUsingResourceTokens(
    resourceTokens: { [resourceId: string]: string },
    path: string,
    resourceId: string
  ) {
    if (resourceTokens && Object.keys(resourceTokens).length > 0) {
      // For database account access(through getDatabaseAccount API), path and resourceId are "",
      // so in this case we return the first token to be used for creating the auth header as the
      // service will accept any token in this case
      if (!path && !resourceId) {
        return resourceTokens[Object.keys(resourceTokens)[0]];
      }

      if (resourceId && resourceTokens[resourceId]) {
        return resourceTokens[resourceId];
      }

      // minimum valid path /dbs
      if (!path || path.length < 4) {
        return null;
      }

      // remove '/' from left and right of path
      path = path[0] === "/" ? path.substring(1) : path;
      path = path[path.length - 1] === "/" ? path.substring(0, path.length - 1) : path;

      const pathSegments = (path && path.split("/")) || [];

      // if it's an incomplete path like /dbs/db1/colls/, start from the paretn resource
      let index = pathSegments.length % 2 === 0 ? pathSegments.length - 1 : pathSegments.length - 2;
      for (; index > 0; index -= 2) {
        const id = decodeURI(pathSegments[index]);
        if (resourceTokens[id]) {
          return resourceTokens[id];
        }
      }
    }
    return null;
  }

  private static getAuthorizationTokenUsingTokenProvider(
    tokenProvider: ITokenProvider,
    requestInfo: IRequestInfo
  ): Promise<string> {
    requestInfo.getAuthorizationTokenUsingMasterKey = AuthHandler.getAuthorizationTokenUsingMasterKey;
    return new Promise(async (resolve, reject) => {
      const callback = (err: Error, token: string) => {
        if (reject) {
          return reject(err);
        }
        resolve(token);
      };

      const results = tokenProvider.getToken(requestInfo, callback);
      if (results.then && typeof results.then === "function") {
        resolve(await results);
      }
    });
  }
}
