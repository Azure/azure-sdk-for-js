// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * An enum to describe Azure Cloud environments.
 * @enum {string}
 */
export enum AzureClouds {
  /** Azure public cloud, which is the default cloud for Azure SDKs. */
  AZURE_PUBLIC_CLOUD = "AZURE_PUBLIC_CLOUD",
  /** Azure China cloud */
  AZURE_CHINA_CLOUD = "AZURE_CHINA_CLOUD",
  /** Azure US government cloud */
  AZURE_US_GOVERNMENT = "AZURE_US_GOVERNMENT",
}

/** The supported values for cloud setting as a string literal type */
export type AzureSupportedClouds = `${AzureClouds}`;

/**
 * Gets the Azure Resource Manager endpoint URL for the specified cloud setting.
 * @param cloudSetting - The Azure cloud environment setting. Use one of the AzureClouds enum values.
 * @returns The ARM endpoint URL for the specified cloud, or undefined if cloudSetting is undefined.
 * @throws {Error} Throws an error if an unknown cloud setting is provided.
 */
export function getArmEndpoint(cloudSetting?: AzureSupportedClouds): string | undefined {
  if (cloudSetting === undefined) {
    return undefined;
  }
  const cloudEndpoints: Record<keyof typeof AzureClouds, string> = {
    AZURE_CHINA_CLOUD: "https://management.chinacloudapi.cn/",
    AZURE_US_GOVERNMENT: "https://management.usgovcloudapi.net/",
    AZURE_PUBLIC_CLOUD: "https://management.azure.com/",
  };
  if (cloudSetting in cloudEndpoints) {
    return cloudEndpoints[cloudSetting];
  } else {
    throw new Error(
      `Unknown cloud setting: ${cloudSetting}. Please refer to the enum AzureClouds for possible values.`,
    );
  }
}
