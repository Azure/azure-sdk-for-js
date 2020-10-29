// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure/core-http";
import { NotificationHubOperationResponse } from "./interfaces";

export interface RegistrationDescription extends NotificationHubOperationResponse {

}

export interface UpdateRegistrationDescription {
  registrationId: string;
  expirationTime?: Date;
  etag?: string;
}

export interface NativeRegistrationOptions extends OperationOptions {
  tags?: string[];
}

export interface AdmRegistrationRequest {
  admRegistrationId: string;
  platformType: 'adm';
}

export interface AdmUpdateRegistrationRequest extends AdmRegistrationRequest, UpdateRegistrationDescription {

}

export interface AdmTemplateRegistrationRequest {
  admRegistrationId: string;
  templateName?: string;
  bodyTemplate: string;  
  platformType: 'admtemplate';
}

export interface AdmUpdateTemplateRegistrationRequest extends AdmTemplateRegistrationRequest, UpdateRegistrationDescription {

}

export interface AppleRegistrationRequest {
  deviceToken: string;
  platformType: 'apple';
}

export interface AppleUpdateRegistrationRequest extends AppleRegistrationRequest, UpdateRegistrationDescription {

}

export interface AppleTemplateRegistrationRequest {
  deviceToken: string;
  apnsHeaders: { [key: string]: string };
  templateName?: string;
  bodyTemplate: string;
  platformType: 'appletemplate';
}

export interface AppleUpdateTemplateRegistrationRequest extends AppleTemplateRegistrationRequest, UpdateRegistrationDescription {

}

export interface BaiduRegistrationRequest {
  baiduUserId: string;
  baiduChannelId: string;
  platformType: 'baidu';
}

export interface BaiduUpdateRegistrationRequest extends BaiduRegistrationRequest, UpdateRegistrationDescription {

}

export interface BaiduTemplateRegistrationRequest {
  baiduUserId: string;
  baiduChannelId: string;
  bodyTemplate: string;
  templateName?: string;
  messageType?: number;
  platformType: 'baidutemplate';
}

export interface BaiduUpdateTemplateRegistrationRequest extends BaiduTemplateRegistrationRequest, UpdateRegistrationDescription {

}

export interface FcmLegacyRegistrationRequest {
  fcmRegistrationId: string;
  platformType: 'gcm';
}

export interface FcmLegacyUpdateRegistrationRequest extends FcmLegacyRegistrationRequest, UpdateRegistrationDescription {

}

export interface FcmLegacyTemplateRegisrationrequest {
  fcmRegistrationId: string;
  bodyTemplate: string;
  templateName?: string;
  platformType: 'gcmtemplate';
}

export interface FcmLegacyUpdateTemplateRegisrationrequest extends FcmLegacyTemplateRegisrationrequest, UpdateRegistrationDescription {

}

export interface WindowsRegistrationRequest {
  channelUri: string;
  secondaryTileName?: string;
  platformType: 'windows';
}

export interface WindowsUpdateRegistrationRequest extends WindowsRegistrationRequest, UpdateRegistrationDescription {

}

export interface WindowsTemplateRegistrationRequest {
  channelUri: string;
  secondaryTileName?: string;
  wnsHeaders: { [key: string]: string };
  bodyTemplate: string;
  templateName?: string;
  platformType: 'windowstemplate';
}

export interface WindowsTemplateUpdateRegistrationRequest extends WindowsTemplateRegistrationRequest, UpdateRegistrationDescription {

}

export type RegistrationRequest =
  AdmRegistrationRequest |
  AdmTemplateRegistrationRequest |
  AppleRegistrationRequest |
  AppleTemplateRegistrationRequest |
  BaiduRegistrationRequest |
  BaiduTemplateRegistrationRequest |
  FcmLegacyRegistrationRequest |
  FcmLegacyTemplateRegisrationrequest |
  WindowsRegistrationRequest |
  WindowsTemplateRegistrationRequest;

  export type RegistrationUpdateRequest =
    AdmUpdateRegistrationRequest |
    AdmUpdateTemplateRegistrationRequest |
    AppleUpdateRegistrationRequest |
    AppleUpdateTemplateRegistrationRequest |
    BaiduUpdateRegistrationRequest |
    BaiduUpdateTemplateRegistrationRequest |
    FcmLegacyUpdateRegistrationRequest |
    FcmLegacyUpdateTemplateRegisrationrequest |
    WindowsUpdateRegistrationRequest |
    WindowsTemplateUpdateRegistrationRequest;
