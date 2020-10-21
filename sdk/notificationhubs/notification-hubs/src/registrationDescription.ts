// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubOperationResponse } from "./interfaces";

export interface RegistrationDescriptionResponse extends NotificationHubOperationResponse {
  id: string;
  title: string;
  etag: string;
  admRegistration?: AdmRegistrationDescription;
  admTemplateRegistration?: AdmTemplateRegistrationDescription;
}

export interface RegistrationDescriptionResponse {
  tags?: string[];
  readonly registrationId: string;
  readonly etag: string;
  readonly expirationTime: Date;
}

// TODO: Split between registration request and response types
// TODO: Research omit for fields and create type alias with it

export interface TemplateRegistrationDescription extends RegistrationDescription {
  body: string;
}

export interface AdmRegistrationDescription extends RegistrationDescription {
  admRegistrationId: string;
}

export interface AdmTemplateRegistrationDescription
  extends AdmRegistrationDescription,
    TemplateRegistrationDescription {}

export interface AppleRegistrationDescription extends RegistrationDescription {
  deviceToken: string;
}

/**

export interface RegistrationDescription {
  registrationId: string;
  expirationTime?: Date;
  eTag?: string;
  tags?: Set<string>;
  propertyVariables: Map<string, string>;
}

export interface RegistrationDescriptionResponse extends RegistrationDescription, NotificationHubOperationResponse {}

export interface TemplateRegistrationDescription extends RegistrationDescription {
  templateName?: string;
  bodyTemplate: string;
}

export interface TemplateRegistrationDescriptionResponse extends TemplateRegistrationDescription, NotificationHubOperationResponse {}

export interface AdmRegistrationDescription extends RegistrationDescription {
  registrationId: string;
}

export interface AdmRegistrationDescriptionResponse extends AdmRegistrationDescription, NotificationHubOperationResponse {}

export interface AdmTemplateRegistrationDescription
  extends AdmRegistrationDescription,
    TemplateRegistrationDescription {}

export interface AdmTemplateRegistrationDescriptionResponse extends AdmTemplateRegistrationDescription, NotificationHubOperationResponse {}

export interface AppleRegistrationDescription extends RegistrationDescription {
  deviceToken: string;
}

export interface AppleRegistrationDescriptionResponse extends AppleRegistrationDescription, NotificationHubOperationResponse {}

export interface AppleTemplateRegistrationDescription
  extends AppleRegistrationDescription,
    TemplateRegistrationDescription {}

export interface AppleTemplateRegistrationDescriptionResponse extends AppleTemplateRegistrationDescription, NotificationHubOperationResponse {}

export interface BaiduRegistrationDescription extends RegistrationDescription {
  baiduUserId: string;
  baiduChannelId: string;
}

export interface BaiduRegistrationDescriptionResponse extends BaiduRegistrationDescription, NotificationHubOperationResponse {}

export interface BaiduTemplateRegistrationDescription
  extends BaiduRegistrationDescription,
    TemplateRegistrationDescription {}

export interface BaiduTemplateRegistrationDescriptionResponse extends BaiduTemplateRegistrationDescription, NotificationHubOperationResponse {}

export interface FcmLegacyRegistrationDescription extends RegistrationDescription {
  fcmRegistrationId: string;
}

export interface FcmLegacyRegistrationDescriptionResonse extends FcmLegacyRegistrationDescription, NotificationHubOperationResponse {}

export interface FcmLegacyTemplateRegistrationDescription
  extends FcmLegacyRegistrationDescription,
    TemplateRegistrationDescription {}

export interface FcmLegacyTemplateRegistrationDescriptionResponse extends FcmLegacyTemplateRegistrationDescription, NotificationHubOperationResponse {}

export interface WindowsPhoneRegistrationDescription extends RegistrationDescription {}

export interface WindowsPhoneRegistrationDescriptionResponse extends WindowsPhoneRegistrationDescription, NotificationHubOperationResponse {}

export interface WindowsPhoneTemplateRegistrationDescription
  extends WindowsPhoneRegistrationDescription,
    TemplateRegistrationDescription {
  mpnsHeaders?: Map<string, string>;
}

export interface WindowsPhoneTemplateRegistrationDescriptionResponse extends WindowsPhoneTemplateRegistrationDescription, NotificationHubOperationResponse {}

export interface WindowsRegistrationDescription extends RegistrationDescription {
  channelUri: string;
  secondaryTileName?: string;
}

export interface WindowsRegistrationDescriptionResponse extends WindowsRegistrationDescription, NotificationHubOperationResponse {}

export interface WindowsTemplateRegistrationDescription
  extends WindowsRegistrationDescription,
    TemplateRegistrationDescription {
  wnsHeaders?: Map<string, string>;
}

export interface WindowsTemplateRegistrationDescriptionResponse extends WindowsTemplateRegistrationDescription, NotificationHubOperationResponse {}

*/
