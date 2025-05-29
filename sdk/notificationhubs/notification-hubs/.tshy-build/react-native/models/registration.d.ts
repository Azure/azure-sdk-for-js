/**
 * Represents the types of registration descriptions.
 */
export type RegistrationType = "Adm" | "AdmTemplate" | "Apple" | "AppleTemplate" | "Baidu" | "BaiduTemplate" | "Browser" | "BrowserTemplate" | "Gcm" | "GcmTemplate" | "FcmV1" | "FcmV1Template" | "Mpns" | "MpnsTemplate" | "Xiaomi" | "XiaomiTemplate" | "Windows" | "WindowsTemplate";
/**
 * Represents a registration description.
 */
export interface RegistrationDescriptionCommon {
    /**
     * The registration ID.
     */
    registrationId?: string;
    /**
     * The expiration time of the registration.
     */
    expirationTime?: Date;
    /**
     * The ETag associated with this description.
     */
    etag?: string;
    /**
     * The tags associated with the registration.
     */
    tags?: string[];
    /**
     * A dictionary of push variables associated with property bag.
     */
    pushVariables?: Record<string, string>;
}
/**
 * Represents the description of a template registration.
 */
export interface TemplateRegistrationDescription {
    /**
     * The body template.
     */
    bodyTemplate: string;
    /**
     * The name of the template.
     */
    templateName?: string;
}
export interface AdmRegistrationDescriptionCommon extends RegistrationDescriptionCommon {
    /**
     * The Amazon Device Messaging registration identifier.
     */
    admRegistrationId: string;
}
/**
 * Represents the description of the Amazon Device Messaging (ADM) registration.
 */
export interface AdmRegistrationDescription extends AdmRegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "Adm";
}
/**
 * Creates an ADM registration description.
 * @param description - A partial ADM registration description.
 * @returns A created ADM registration description.
 */
export declare function createAdmRegistrationDescription(description: AdmRegistrationDescriptionCommon): AdmRegistrationDescription;
/**
 * Represents the description of the Amazon Device Messaging (ADM) template registration.
 */
export interface AdmTemplateRegistrationDescriptionCommon extends AdmRegistrationDescriptionCommon, TemplateRegistrationDescription {
}
/**
 * Represents the description of the Amazon Device Messaging (ADM) template registration.
 */
export interface AdmTemplateRegistrationDescription extends AdmTemplateRegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "AdmTemplate";
}
/**
 * Creates an ADM template registration description.
 * @param description - A partial ADM template registration description.
 * @returns A created ADM template registration description.
 */
export declare function createAdmTemplateRegistrationDescription(description: AdmTemplateRegistrationDescriptionCommon): AdmTemplateRegistrationDescription;
/**
 * Represents the description of apple registration.
 */
export interface AppleRegistrationDescriptionCommon extends RegistrationDescriptionCommon {
    /**
     * The APNs device token.
     */
    deviceToken: string;
}
/**
 * Represents the description of apple registration.
 */
export interface AppleRegistrationDescription extends AppleRegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "Apple";
}
/**
 * Creates an Apple registration description.
 * @param description - A partial Apple registration description.
 * @returns A created Apple registration description.
 */
export declare function createAppleRegistrationDescription(description: AppleRegistrationDescriptionCommon): AppleRegistrationDescription;
/**
 * Represents the description of the Apple template registration.
 */
export interface AppleTemplateRegistrationDescriptionCommon extends AppleRegistrationDescriptionCommon, TemplateRegistrationDescription {
    /**
     * The expiry date.
     */
    expiry?: Date;
    /**
     * The notification priority.
     */
    priority?: "10" | "5";
    /**
     * The APNS headers.
     */
    apnsHeaders?: Record<string, string>;
}
/**
 * Represents the description of the Apple template registration.
 */
export interface AppleTemplateRegistrationDescription extends AppleTemplateRegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "AppleTemplate";
}
/**
 * Creates an Apple template registration description.
 * @param description - A partial Apple template registration description.
 * @returns A created Apple template registration description.
 */
export declare function createAppleTemplateRegistrationDescription(description: AppleTemplateRegistrationDescriptionCommon): AppleTemplateRegistrationDescription;
export interface BaiduRegistrationDescriptionCommon extends RegistrationDescriptionCommon {
    /**
     * The Baidu user identifier.
     */
    baiduUserId: string;
    /**
     * The Baidu channel identifier.
     */
    baiduChannelId: string;
}
/**
 * Represents a Baidu registration description.
 */
export interface BaiduRegistrationDescription extends BaiduRegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "Baidu";
}
/**
 * Creates a Baidu registration description.
 * @param description - A partial Baidu registration description.
 * @returns A created Baidu registration description.
 */
export declare function createBaiduRegistrationDescription(description: BaiduRegistrationDescriptionCommon): BaiduRegistrationDescription;
/**
 * Represents a Baidu template registration description.
 */
export interface BaiduTemplateRegistrationDescriptionCommon extends BaiduRegistrationDescriptionCommon, TemplateRegistrationDescription {
}
/**
 * Represents a Baidu template registration description.
 */
export interface BaiduTemplateRegistrationDescription extends BaiduTemplateRegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "BaiduTemplate";
}
/**
 * Creates a Baidu template registration description.
 * @param description - A partial Baidu template registration description.
 * @returns A created Baidu template registration description.
 */
export declare function createBaiduTemplateRegistrationDescription(description: BaiduTemplateRegistrationDescriptionCommon): BaiduTemplateRegistrationDescription;
/**
 * Represents a Browser Push registration description.
 */
export interface BrowserRegistrationDescriptionCommon extends RegistrationDescriptionCommon {
    /**
     * The Browser push endpoint.
     */
    endpoint: string;
    /**
     * The Browser push P256DH.
     */
    p256dh: string;
    /**
     * The Browser push auth secret.
     */
    auth: string;
}
/**
 * Represents a Browser Push registration description.
 */
export interface BrowserRegistrationDescription extends BrowserRegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "Browser";
}
/**
 * Creates a Web Push registration description.
 * @param description - A partial Web Push registration description.
 * @returns A created Web Push registration description.
 */
export declare function createBrowserRegistrationDescription(description: BrowserRegistrationDescriptionCommon): BrowserRegistrationDescription;
/**
 * Represents a Browser Push remplate registration description.
 */
export interface BrowserTemplateRegistrationDescriptionCommon extends BrowserRegistrationDescriptionCommon, TemplateRegistrationDescription {
}
/**
 * Represents a Browser Push remplate registration description.
 */
export interface BrowserTemplateRegistrationDescription extends BrowserTemplateRegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "BrowserTemplate";
}
/**
 * Creates a Web Push registration description.
 * @param description - A partial Web Push template registration description.
 * @returns A created Web Push template registration description.
 */
export declare function createBrowserTemplateRegistrationDescription(description: BrowserTemplateRegistrationDescriptionCommon): BrowserTemplateRegistrationDescription;
/**
 * Represents Notification Hub registration description for Google Cloud Messaging.
 */
export interface GcmRegistrationDescriptionCommon extends RegistrationDescriptionCommon {
    /**
     * Registration id obtained from the Google Cloud Messaging service.
     */
    gcmRegistrationId: string;
}
/**
 * Represents Notification Hub registration description for Google Cloud Messaging.
 */
export interface GcmRegistrationDescription extends GcmRegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "Gcm";
}
/**
 * Creates a Firebase Legacy registration description.
 * @param description - A partial GCM registration description.
 * @returns A created GCM registration description.
 */
export declare function createFcmLegacyRegistrationDescription(description: GcmRegistrationDescriptionCommon): GcmRegistrationDescription;
/**
 * Represents Notification Hub template registration description for Firebase Legacy Cloud Messaging.
 */
export interface GcmTemplateRegistrationDescriptionCommon extends GcmRegistrationDescriptionCommon, TemplateRegistrationDescription {
}
/**
 * Represents Notification Hub template registration description for Firebase Legacy Cloud Messaging.
 */
export interface GcmTemplateRegistrationDescription extends GcmTemplateRegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "GcmTemplate";
}
/**
 * Creates a GCM template registration description.
 * @param description - A partial GCM template registration description.
 * @returns A created GCM template registration description.
 */
export declare function createFcmLegacyTemplateRegistrationDescription(description: GcmTemplateRegistrationDescriptionCommon): GcmTemplateRegistrationDescription;
/**
 * Represents Notification Hub registration description for Google Cloud Messaging.
 */
export interface FcmV1RegistrationDescriptionCommon extends RegistrationDescriptionCommon {
    /**
     * Registration id obtained from the Firebase Cloud Messaging service.
     */
    fcmV1RegistrationId: string;
}
/**
 * Represents Notification Hub registration description for Google Cloud Messaging.
 */
export interface FcmV1RegistrationDescription extends FcmV1RegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "FcmV1";
}
/**
 * Creates a Firebase V1 registration description.
 * @param description - A partial FCM V1 registration description.
 * @returns A created FCM V1 registration description.
 */
export declare function createFcmV1RegistrationDescription(description: FcmV1RegistrationDescriptionCommon): FcmV1RegistrationDescription;
/**
 * Represents Notification Hub template registration description for Firebase V1 Cloud Messaging.
 */
export interface FcmV1TemplateRegistrationDescriptionCommon extends FcmV1RegistrationDescriptionCommon, TemplateRegistrationDescription {
}
/**
 * Represents Notification Hub template registration description for Firebase V1 Cloud Messaging.
 */
export interface FcmV1TemplateRegistrationDescription extends FcmV1TemplateRegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "FcmV1Template";
}
/**
 * Creates a FCM V1 template registration description.
 * @param description - A partial FCM V1 template registration description.
 * @returns A created FCM V1 template registration description.
 */
export declare function createFcmV1TemplateRegistrationDescription(description: FcmV1TemplateRegistrationDescriptionCommon): FcmV1TemplateRegistrationDescription;
/**
 * Represents a Windows Phone Notification Services registration description.
 * @deprecated Windows Phone is no longer supported.
 */
export interface MpnsRegistrationDescriptionCommon extends RegistrationDescriptionCommon {
    /**
     * The channel URI.
     */
    channelUri: string;
}
/**
 * Represents a Windows Phone Notification Services registration description.
 * @deprecated Windows Phone is no longer supported.
 */
export interface MpnsRegistrationDescription extends MpnsRegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "Mpns";
}
/**
 * Represents a Windows Phone Notification Services template registration.
 * @deprecated Windows Phone is no longer supported.
 */
export interface MpnsTemplateRegistrationDescription extends MpnsRegistrationDescriptionCommon, TemplateRegistrationDescription {
    /**
     * The WNS headers.
     */
    mpnsHeaders?: Record<string, string>;
    /**
     * The kind of the registration.
     */
    kind: "MpnsTemplate";
}
/**
 * Represents a Windows Phone Notification Services template registration.
 * @deprecated Windows Phone is no longer supported.
 */
export interface MpnsTemplateRegistrationDescriptionCommon extends MpnsRegistrationDescriptionCommon, TemplateRegistrationDescription {
    /**
     * The WNS headers.
     */
    mpnsHeaders?: Record<string, string>;
}
/**
 * Represents a Windows Phone Notification Services template registration.
 * @deprecated Windows Phone is no longer supported.
 */
export interface MpnsTemplateRegistrationDescription extends MpnsTemplateRegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "MpnsTemplate";
}
/**
 * Represents a Windows Notification Services (WNS) registration description.
 */
export interface WindowsRegistrationDescriptionCommon extends RegistrationDescriptionCommon {
    /**
     * The channel URI.
     */
    channelUri: string;
}
/**
 * Represents a Windows Notification Services (WNS) registration description.
 */
export interface WindowsRegistrationDescription extends WindowsRegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "Windows";
}
/**
 * Creates a Windows registration description.
 * @param description - A partial Windows registration description.
 * @returns A created Windows registration description.
 */
export declare function createWindowsRegistrationDescription(description: WindowsRegistrationDescriptionCommon): WindowsRegistrationDescription;
/**
 * Represents a Windows Notification Services (WNS) template registration.
 */
export interface WindowsTemplateRegistrationDescriptionCommon extends WindowsRegistrationDescriptionCommon, TemplateRegistrationDescription {
    /**
     * The WNS headers.
     */
    wnsHeaders?: Record<string, string>;
}
/**
 * Represents a Windows Notification Services (WNS) template registration.
 */
export interface WindowsTemplateRegistrationDescription extends WindowsTemplateRegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "WindowsTemplate";
}
/**
 * Creates a Windows template registration description.
 * @param description - A partial Windows template registration description.
 * @returns A created Windows template registration description.
 */
export declare function createWindowsTemplateRegistrationDescription(description: WindowsTemplateRegistrationDescriptionCommon): WindowsTemplateRegistrationDescription;
/**
 * Represents a Xiaomi registration description.
 */
export interface XiaomiRegistrationDescriptionCommon extends RegistrationDescriptionCommon {
    /**
     * The Xiaomi registration ID.
     */
    xiaomiRegistrationId: string;
}
/**
 * Represents a Xiaomi registration description.
 */
export interface XiaomiRegistrationDescription extends XiaomiRegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "Xiaomi";
}
/**
 * Creates a Xiaomi registration description.
 * @param description - A partial Xiaomi registration description.
 * @returns A created Xiaomi registration description.
 */
export declare function createXiaomiRegistrationDescription(description: XiaomiRegistrationDescriptionCommon): XiaomiRegistrationDescription;
/**
 * Represents a Xiaomi template registration.
 */
export interface XiaomiTemplateRegistrationDescriptionCommon extends XiaomiRegistrationDescriptionCommon, TemplateRegistrationDescription {
}
/**
 * Represents a Windows Notification Services (WNS) template registration.
 */
export interface XiaomiTemplateRegistrationDescription extends XiaomiTemplateRegistrationDescriptionCommon {
    /**
     * The kind of the registration.
     */
    kind: "XiaomiTemplate";
}
/**
 * Creates a Xiaomi template registration description.
 * @param description - A partial Xiaomi template registration description.
 * @returns A created Xiaomi template registration description.
 */
export declare function createXiaomiTemplateRegistrationDescription(description: XiaomiTemplateRegistrationDescriptionCommon): XiaomiTemplateRegistrationDescription;
/**
 * Describes the types of registration descriptions.
 */
export type RegistrationDescription = AdmRegistrationDescription | AdmTemplateRegistrationDescription | AppleRegistrationDescription | AppleTemplateRegistrationDescription | BaiduRegistrationDescription | BaiduTemplateRegistrationDescription | BrowserRegistrationDescription | BrowserTemplateRegistrationDescription | GcmRegistrationDescription | GcmTemplateRegistrationDescription | FcmV1RegistrationDescription | FcmV1TemplateRegistrationDescription | MpnsRegistrationDescription | MpnsTemplateRegistrationDescription | XiaomiRegistrationDescription | XiaomiTemplateRegistrationDescription | WindowsRegistrationDescription | WindowsTemplateRegistrationDescription;
/**
 * Describes an ADM Registration channel query.
 */
export interface AdmRegistrationChannel {
    /**
     * The ADM Registration ID.
     */
    admRegistrationId: string;
    /**
     * The kind of the registration channel.
     */
    kind: "adm";
}
/**
 * Describes an Apple Registration channel query.
 */
export interface AppleRegistrationChannel {
    /**
     * The APNs device token.
     */
    deviceToken: string;
    /**
     * The kind of the registration channel.
     */
    kind: "apple";
}
/**
 * Describes an Baidu Registration channel query.
 */
export interface BaiduRegistrationChannel {
    /**
     * The Baidu Channel ID.
     */
    baiduChannelId: string;
    /**
     * The Baidu User ID.
     */
    baiduUserId: string;
    /**
     * The kind of the registration channel.
     */
    kind: "baidu";
}
/**
 * Describes an Browser Registration channel query.
 */
export interface BrowserRegistrationChannel {
    /**
     * The Web Push endpoint URL.
     */
    endpoint: string;
    /**
     * The Web Push subscription P256DH.
     */
    p256dh: string;
    /**
     * The Web Push subscription auth secret.
     */
    auth: string;
    /**
     * The kind of the registration channel.
     */
    kind: "browser";
}
/**
 * Describes an Firebase Legacy Registration channel query.
 */
export interface FirebaseLegacyRegistrationChannel {
    /**
     * The FCM Legacy registration ID.
     */
    gcmRegistrationId: string;
    /**
     * The kind of the registration channel.
     */
    kind: "gcm";
}
/**
 * Describes an Firebase Legacy Registration channel query.
 */
export interface FirebaseV1RegistrationChannel {
    /**
     * The FCM V1 registration ID.
     */
    fcmV1RegistrationId: string;
    /**
     * The kind of the registration channel.
     */
    kind: "fcmv1";
}
/**
 * Describes an Windows Notification Services Registration channel query.
 */
export interface WindowsRegistrationChannel {
    /**
     * The WNS Channel URI.
     */
    channelUri: string;
    /**
     * The kind of the registration channel.
     */
    kind: "windows";
}
/**
 * Describes an Xiaomi Registration channel query.
 */
export interface XiaomiRegistrationChannel {
    /**
     * The Xiaomi registration ID.
     */
    xiaomiRegistrationId: string;
    /**
     * The kind of the registration channel.
     */
    kind: "xiaomi";
}
/**
 * Describes a Registration query.
 */
export type RegistrationChannel = AdmRegistrationChannel | AppleRegistrationChannel | BaiduRegistrationChannel | BrowserRegistrationChannel | FirebaseLegacyRegistrationChannel | FirebaseV1RegistrationChannel | XiaomiRegistrationChannel | WindowsRegistrationChannel;
//# sourceMappingURL=registration.d.ts.map