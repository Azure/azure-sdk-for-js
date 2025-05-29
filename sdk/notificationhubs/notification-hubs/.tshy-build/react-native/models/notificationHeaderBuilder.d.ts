/**
 * Describes the types of APNs pushes.
 */
export type ApnsPushTypes = "alert" | "background" | "voip" | "complication" | "fileprovider" | "mdm" | "location" | "liveactivity" | "pushtotalk";
/**
 * The list of APNs specific headers.
 */
export interface AppleHeaders extends Record<string, unknown> {
    /**
     * The value of this header must accurately reflect the contents of your notification’s payload.
     */
    "apns-push-type"?: ApnsPushTypes;
    /**
     * A canonical UUID that’s the unique ID for the notification.
     */
    "apns-id"?: string;
    /**
     * The date at which the notification is no longer valid. This value is a UNIX epoch expressed in seconds (UTC).
     */
    "apns-expiration"?: string;
    /**
     * The priority of the notification. If you omit this header, APNs sets the notification priority to 10.
     */
    "apns-priority"?: "5" | "10";
    /**
     * The topic for the notification. In general, the topic is your app’s bundle ID/app ID.
     */
    "apns-topic"?: string;
    /**
     * An identifier you use to merge multiple notifications into a single notification for the user.
     */
    "apns-collapse-id"?: string;
}
/**
 * The list of WNS specific types.
 */
export type WnsTypes = "wns/toast" | "wns/badge" | "wns/tile" | "wns/raw";
/**
 * List of WNS specific headers.
 */
export interface WindowsHeaders extends Record<string, unknown> {
    /**
     * The header specifies whether this is a tile, toast, badge, or raw notification.
     */
    "X-WNS-Type"?: WnsTypes;
}
//# sourceMappingURL=notificationHeaderBuilder.d.ts.map