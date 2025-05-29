import type { AdmRegistrationDescription, AdmTemplateRegistrationDescription, AppleRegistrationDescription, AppleTemplateRegistrationDescription, BaiduRegistrationDescription, BaiduTemplateRegistrationDescription, BrowserRegistrationDescription, BrowserTemplateRegistrationDescription, GcmRegistrationDescription, GcmTemplateRegistrationDescription, FcmV1RegistrationDescription, FcmV1TemplateRegistrationDescription, MpnsRegistrationDescription, MpnsTemplateRegistrationDescription, RegistrationDescription, XiaomiRegistrationDescription, XiaomiTemplateRegistrationDescription, WindowsRegistrationDescription, WindowsTemplateRegistrationDescription } from "../models/registration.js";
/**
 * Represents a registration description parser from the incoming XML.
 */
export interface RegistrationDescriptionParser {
    /**
     * @internal
     * Creates a registration type from the incoming entry.
     */
    parseRegistrationEntry: (bodyText: string) => Promise<RegistrationDescription>;
    /**
     * @internal
     * Creates a list of registrations from an incoming ATOM XML Feed.
     */
    parseRegistrationFeed: (bodyText: string) => Promise<RegistrationDescription[]>;
    /**
     * @internal
     * Creates an Amazon Device Messaging (ADM) registration description from the incoming parsed XML.
     */
    createAdmRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => AdmRegistrationDescription;
    /**
     * @internal
     * Creates an Amazon Device Messaging (ADM) template registration description from the incoming parsed XML.
     */
    createAdmTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => AdmTemplateRegistrationDescription;
    /**
     * @internal
     * Creates an Apple Platform Notification Services (APNs) registration description from the incoming parsed XML.
     */
    createAppleRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => AppleRegistrationDescription;
    /**
     * @internal
     * Creates an Apple Platform Notification Services (APNs) template registration description from the incoming parsed XML.
     */
    createAppleTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => AppleTemplateRegistrationDescription;
    /**
     * @internal
     * Creates a Baidu registration description from the incoming parsed XML.
     */
    createBaiduRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => BaiduRegistrationDescription;
    /**
     * @internal
     * Creates a Baidu template registration description from the incoming parsed XML.
     */
    createBaiduTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => BaiduTemplateRegistrationDescription;
    /**
     * @internal
     * Creates a Web Push registration description from the incoming parsed XML.
     */
    createBrowserRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => BrowserRegistrationDescription;
    /**
     * @internal
     * Creates a Web Push template registration description from the incoming parsed XML.
     */
    createBrowserTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => BrowserTemplateRegistrationDescription;
    /**
     * @internal
     * Creates a Firebase V1 Cloud Messaging (FCM) registration description from the incoming parsed XML.
     */
    createFcmV1RegistrationDescription: (rawRegistrationDescription: Record<string, any>) => FcmV1RegistrationDescription;
    /**
     * @internal
     * Creates a Firebase V1 Cloud Messaging (FCM) template registration description from the incoming parsed XML.
     */
    createFcmV1TemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => FcmV1TemplateRegistrationDescription;
    /**
     * @internal
     * Creates a Google Cloud Messaging (GCM) registration description from the incoming parsed XML.
     */
    createGcmRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => GcmRegistrationDescription;
    /**
     * @internal
     * Creates a Google Cloud Messaging (GCM) template registration description from the incoming parsed XML.
     */
    createGcmTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => GcmTemplateRegistrationDescription;
    /**
     * @internal
     * Creates a Microsoft Phone Notification Services (MPNS) registration description from the incoming parsed XML.
     */
    createMpnsRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => MpnsRegistrationDescription;
    /**
     * @internal
     * Creates a Microsoft Phone Notification Services (MPNS) template registration description from the incoming parsed XML.
     */
    createMpnsTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => MpnsTemplateRegistrationDescription;
    /**
     * @internal
     * Creates a Xiaomi registration description from the incoming parsed XML.
     */
    createXiaomiRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => XiaomiRegistrationDescription;
    /**
     * @internal
     * Creates a Xiaomi template registration description from the incoming parsed XML.
     */
    createXiaomiTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => XiaomiTemplateRegistrationDescription;
    /**
     * @internal
     * Creates a Windows Notification Services (WNS) registration description from the incoming parsed XML.
     */
    createWindowsRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => WindowsRegistrationDescription;
    /**
     * @internal
     * Creates a Windows Notification Services (WNS) template registration description from the incoming parsed XML.
     */
    createWindowsTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => WindowsTemplateRegistrationDescription;
}
export declare const registrationDescriptionParser: RegistrationDescriptionParser;
/**
 * @internal
 * Represents a serializer for all registration descriptions.
 */
export interface RegistrationDescriptionSerializer {
    /**
     * @internal
     * Serializes a registration description into an ATOM XML string.
     */
    serializeRegistrationDescription(description: RegistrationDescription): string;
    /**
     * @internal
     * Serializes an Amazon Device Messaging (ADM) registration description into an XML object for serialization.
     */
    serializeAdmRegistrationDescription(description: Omit<AdmRegistrationDescription, "kind">): Record<string, any>;
    /**
     * @internal
     * Serializes an Amazon Device Messaging (ADM) template registration description into an XML object for serialization.
     */
    serializeAdmTemplateRegistrationDescription(description: Omit<AdmTemplateRegistrationDescription, "kind">): Record<string, any>;
    /**
     * @internal
     * Serializes an Apple registration description into an XML object for serialization.
     */
    serializeAppleRegistrationDescription(description: Omit<AppleRegistrationDescription, "kind">): Record<string, any>;
    /**
     * @internal
     * Serializes an Apple template registration description into an XML object for serialization.
     */
    serializeAppleTemplateRegistrationDescription(description: Omit<AppleRegistrationDescription, "kind">): Record<string, any>;
    /**
     * @internal
     * Serializes a Baidu registration description into an XML object for serialization.
     */
    serializeBaiduRegistrationDescription(description: Omit<BaiduRegistrationDescription, "kind">): Record<string, any>;
    /**
     * @internal
     * Serializes a Baidu template registration description into an XML object for serialization.
     */
    serializeBaiduTemplateRegistrationDescription(description: Omit<BaiduTemplateRegistrationDescription, "kind">): Record<string, any>;
    /**
     * @internal
     * Serializes a Web Push registration description into an XML object for serialization.
     */
    serializeBrowserRegistrationDescription(description: Omit<BrowserRegistrationDescription, "kind">): Record<string, any>;
    /**
     * @internal
     * Serializes a Web Push template registration description into an XML object for serialization.
     */
    serializeBrowserTemplateRegistrationDescription(description: Omit<BrowserTemplateRegistrationDescription, "kind">): Record<string, any>;
    /**
     * @internal
     * Serializes a Google Cloud Messaging (GCM) registration description into an XML object for serialization.
     */
    serializeFcmV1RegistrationDescription(description: Omit<FcmV1RegistrationDescription, "kind">): Record<string, any>;
    /**
     * @internal
     * Serializes a Google Cloud Messaging (GCM) template registration description into an XML object for serialization.
     */
    serializeFcmV1TemplateRegistrationDescription(description: Omit<FcmV1TemplateRegistrationDescription, "kind">): Record<string, any>;
    /**
     * @internal
     * Serializes a Google Cloud Messaging (GCM) registration description into an XML object for serialization.
     */
    serializeGcmRegistrationDescription(description: Omit<GcmRegistrationDescription, "kind">): Record<string, any>;
    /**
     * @internal
     * Serializes a Google Cloud Messaging (GCM) template registration description into an XML object for serialization.
     */
    serializeGcmTemplateRegistrationDescription(description: Omit<GcmTemplateRegistrationDescription, "kind">): Record<string, any>;
    /**
     * @internal
     * Serializes a Windows Phone registration description into an XML object for serialization.
     */
    serializeMpnsRegistrationDescription(description: Omit<MpnsRegistrationDescription, "kind">): Record<string, any>;
    /**
     * @internal
     * Serializes a Windows Phone template registration description into an XML object for serialization.
     */
    serializeMpnsTemplateRegistrationDescription(description: Omit<MpnsTemplateRegistrationDescription, "kind">): Record<string, any>;
    /**
     * @internal
     * Serializes a Xiaomi registration description into an XML object for serialization.
     */
    serializeXiaomiRegistrationDescription(description: Omit<XiaomiRegistrationDescription, "kind">): Record<string, any>;
    /**
     * @internal
     * Serializes a Xiaomi template registration description into an XML object for serialization.
     */
    serializeXiaomiTemplateRegistrationDescription(description: Omit<XiaomiTemplateRegistrationDescription, "kind">): Record<string, any>;
    /**
     * @internal
     * Serializes a Windows Notification Services (WNS) registration description into an XML object for serialization.
     */
    serializeWindowsRegistrationDescription(description: Omit<WindowsRegistrationDescription, "kind">): Record<string, any>;
    /**
     * @internal
     * Serializes a Windows Notification Services (WNS) template registration description into an XML object for serialization.
     */
    serializeWindowsTemplateRegistrationDescription(description: Omit<WindowsTemplateRegistrationDescription, "kind">): Record<string, any>;
}
/**
 * Represents a RegistrationDescription serializer.
 */
export declare const registrationDescriptionSerializer: RegistrationDescriptionSerializer;
//# sourceMappingURL=registrationSerializer.d.ts.map