// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as url from "url";
import { ServiceClientCredentials, ServiceCallback, WebResource, Constants } from "ms-rest-js";
import { Authenticator } from "ms-rest-azure-js"

export type PipelineFunction = (webResource: WebResource, next: PipelineFunction, callback: ServiceCallback<any>) => any;

const AuthorizationHeaderName = Constants.HeaderConstants.AUTHORIZATION;

/**
 * An object that performs authentication for Key Vault.
 * @class
 * @param {KeyVaultCredentials~authRequest} authenticator  A callback that receives a challenge and returns an authentication token.
 * @param {object} challengeCache A object used to store a previous challenge
 * @param {credentials} credentials - Credentials needed for the client to connect to Azure.
 */
export class KeyVaultCredentials implements ServiceClientCredentials {
  challengeCache: Map<string, string>;
  signingFilter: PipelineFunction;

  constructor(
    private authenticator: Authenticator) {
    if (!authenticator) {
      throw new Error("Authenticator callback must be provided.");
    }

    this.challengeCache = new Map();
    this.authenticator = authenticator;

    this.signingFilter = this.createSigningFilter();
  }

  signRequest(webResource: WebResource): Promise<WebResource> {
    throw new Error();
    // const cachedChallenge = this._getCachedChallenge(webResource);
    // if (!cachedChallenge) {
    //   // Resume without any challenge. The service may return a 401-unauthorized that will be handled afterwards.
    //   return Promise.resolve(webResource);
    // }

    // // authentication is provided by the createSigningFilter method.
    // return Promise.resolve(undefined);
  }

  createSigningFilter(): PipelineFunction {
    return (resource: WebResource, next: Function, callback: ServiceCallback<any>) => {
      const nextHandler = (err: Error, response: any, body: any) => {
        // If this is not a 401 result, just resume.
        if (!response || response.statusCode !== 401 || !response.headers) {
          return callback!(err, response, body);
        }
        // Otherwise we must handle the 401.
        return this._handleUnauthorized(resource, next, err, response, body, callback);
      };

      // Check if we have a cached challenge for this resource.
      const cachedChallenge = this._getCachedChallenge(resource);
      if (!cachedChallenge) {
        // Resume without any challenge. The service may return a 401-unauthorized that will be handled afterwards.
        return next(resource, nextHandler);
      }

      // Calls the authenticator to retrieve an authorization value.
      // Since the authenticator doesn't return a stream, we need to use the interimStream.
      this.authenticator(cachedChallenge, function (err: Error, authorizationValue: string) {
        if (err) {
          return callback(err);
        }
        if (authorizationValue) {
          // If we have credentials, set in the header.
          resource.headers.set(AuthorizationHeaderName, authorizationValue);
        }
      });
    };
  }

  private _getCachedChallenge(webResource: WebResource): any {
    const authority = this._getAuthority(webResource.url);
    return this.challengeCache.get(authority);
  }

  private _addChallengeToCache(webResource: WebResource, challenge: string): void {
    const authority = this._getAuthority(webResource.url);
    this.challengeCache.set(authority, challenge);
  }

  private _handleUnauthorized(webResource: WebResource, next: Function, err: Error, response: any, body: any, callback: ServiceCallback<any>): any {
    // If the www-authenticate header is not as expected, just resume.
    const wwwAuthenticate = response.headers["www-authenticate"];
    const challenge = wwwAuthenticate ? this._parseAuthorizationHeader(wwwAuthenticate) : undefined;
    if (!challenge || !challenge.authorization || !challenge.resource) {
      return callback(err, response, body);
    }

    this._addChallengeToCache(webResource, challenge);
    const authenticate = function (err: Error, authorizationValue: string) {
      if (err) {
        return callback(err);
      }
      if (authorizationValue) {
        // If we have credentials, set in the header.
        webResource.headers.set(AuthorizationHeaderName, authorizationValue);
      }

      // Resume the call.
      return next(webResource, callback);
    };

    return this.authenticator(challenge, authenticate);
  }

  private _parseAuthorizationHeader(header: string): any {
    if (!header) {
      return undefined;
    }
    const headerParts = header.match(/^(\w+)(?:\s+(.*))?$/); // Header: scheme[ something]
    if (!headerParts) {
      return undefined;
    }
    const scheme = headerParts[1];
    if (scheme.toLowerCase() !== "bearer") {
      return undefined;
    }
    const attributesString = headerParts[2];
    if (!attributesString) {
      return undefined;
    } undefined;
    const attributes: any = {};
    const attrStrings = attributesString.split(",");
    for (let i = 0; i < attrStrings.length; ++i) {
      const attrString = attrStrings[i];
      const j = attrString.indexOf("=");
      const name = attrString.substring(0, j).trim();
      const value = attrString.substring(j + 1).trim();
      attributes[name] = JSON.parse('{"value":' + value + "}").value;
    }
    return attributes;
  }

  private _getAuthority(uri: string): string {
    const v = url.parse(uri, true, true);
    const protocol = v.protocol ? v.protocol : ":";
    const host = v.host;
    let result = protocol;
    if (v.slashes) {
      result += "//";
    }
    result += host;
    return result;
  }
}
