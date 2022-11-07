// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import axios from "axios";

export type CloudInfo = {
  LoginEndpoint: string;
  LoginMfaRequired: boolean;
  KustoClientAppId: string;
  KustoClientRedirectUri: string;
  KustoServiceResourceId: string;
  FirstPartyAuthorityUrl: string;
};

/**
 * This class holds data for all cloud instances, and returns the specific data instance by parsing the dns suffix from a URL
 */
export class CloudSettings {
  private static instance: CloudSettings;
  METADATA_ENDPOINT = "/v1/rest/auth/metadata";
  defaultCloudInfo: CloudInfo = {
    LoginEndpoint: process.env.AadAuthorityUri || "https://login.microsoftonline.com",
    LoginMfaRequired: false,
    KustoClientAppId: "db662dc1-0cfe-4e1c-a843-19a68e65be58",
    KustoClientRedirectUri: "https://microsoft/kustoclient",
    KustoServiceResourceId: "https://kusto.kusto.windows.net",
    FirstPartyAuthorityUrl:
      "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a",
  };
  cloudCache: { [kustoUri: string]: CloudInfo } = {};

  private constructor() {}

  static getInstance(): CloudSettings {
    if (!CloudSettings.instance) {
      CloudSettings.instance = new CloudSettings();
    }

    return CloudSettings.instance;
  }

  async getCloudInfoForCluster(kustoUri: string): Promise<CloudInfo> {
    if (kustoUri in this.cloudCache) {
      return this.cloudCache[kustoUri];
    }

    try {
      const response = await axios.get<{ AzureAD: CloudInfo | undefined }>(
        kustoUri + this.METADATA_ENDPOINT
      );
      if (response.status === 200) {
        this.cloudCache[kustoUri] = response.data.AzureAD || this.defaultCloudInfo;
      } else {
        throw new Error(`Kusto returned an invalid cloud metadata response - ${response}`);
      }
    } catch (ex) {
      if (axios.isAxiosError(ex) && ex.response?.status === 404) {
        // For now as long not all proxies implement the metadata endpoint, if no endpoint exists return public cloud data
        this.cloudCache[kustoUri] = this.defaultCloudInfo;
      } else {
        throw new Error(`Failed to get cloud info for cluster ${kustoUri} - ${ex}`);
      }
    }
    return this.cloudCache[kustoUri];
  }

  static getAuthorityUri(cloudInfo: CloudInfo, authorityId?: string): string {
    return cloudInfo.LoginEndpoint + "/" + (authorityId || "organizations");
  }
}
