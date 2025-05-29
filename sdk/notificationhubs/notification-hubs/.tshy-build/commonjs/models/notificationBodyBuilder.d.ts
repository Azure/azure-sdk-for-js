/**
 * Represents what is in the APNs alert body.
 */
export interface AppleAlert {
    /**
     * The title of the notification. Apple Watch displays this string in the short look notification
     * interface. Specify a string that’s quickly understood by the user.
     */
    title?: string;
    /**
     * Additional information that explains the purpose of the notification.
     */
    subtitle?: string;
    /**
     * The content of the alert message.
     */
    body?: string;
    /**
     * The name of the launch image file to display. If the user chooses to launch your app,
     * the contents of the specified image or storyboard file are displayed instead of your app’s normal launch image.
     */
    "launch-image"?: string;
    /**
     * The key for a localized title string. Specify this key instead of the title key to retrieve
     * the title from your app’s Localizable.strings files. The value must contain the name of a key in your strings file.
     */
    "title-loc-key"?: string;
    /**
     * An array of strings containing replacement values for variables in your title string.
     * Each %\@ character in the string specified by the title-loc-key is replaced by a value
     * from this array. The first item in the array replaces the first instance
     * of the %\@ character in the string, the second item replaces the second instance, and so on.
     */
    "title-loc-args"?: string[];
    /**
     * The key for a localized subtitle string. Use this key, instead of the subtitle key, to
     * retrieve the subtitle from your app’s Localizable.strings file.
     * The value must contain the name of a key in your strings file.
     */
    "subtitle-loc-key"?: string;
    /**
     * An array of strings containing replacement values for variables in your title string.
     * Each %\@ character in the string specified by subtitle-loc-key is replaced by a value
     * from this array. The first item in the array replaces the first instance of the
     * %\@ character in the string, the second item replaces the second instance, and so on.
     */
    "subtitle-loc-args"?: string[];
    /**
     * The key for a localized message string. Use this key, instead of the body key, to
     * retrieve the message text from your app’s Localizable.strings file. The value must contain
     * the name of a key in your strings file.
     */
    "loc-key"?: string;
    /**
     * An array of strings containing replacement values for variables in your message text.
     * Each %\@ character in the string specified by loc-key is replaced by a value from
     * this array. The first item in the array replaces the first instance of the %\@ character
     * in the string, the second item replaces the second instance, and so on.
     */
    "loc-args"?: string[];
}
/**
 * Represents an APNs critical sound
 */
export interface AppleCriticalSound {
    /**
     * The critical alert flag. Set to 1 to enable the critical alert.
     */
    critical: number;
    /**
     * The name of a sound file in your app’s main bundle or in the Library/Sounds folder
     * of your app’s container directory. Specify the string “default” to play the system sound.
     */
    name: string;
    /**
     * The volume for the critical alert’s sound. Set this to a value between 0 (silent) and 1 (full volume).
     */
    volume: number;
}
/**
 * Represents a native APNs message.
 */
export interface AppleNativeMessage extends Record<string, any> {
    /**
     * The Apple specific push notification information.
     */
    aps?: AppleApsNativeMessage;
}
/**
 * Represents a native APNs APS message.
 */
export interface AppleApsNativeMessage extends Record<string, any> {
    /**
     * The information for displaying an alert.
     */
    alert?: string | AppleAlert;
    /**
     * The number to display in a badge on your app’s icon.
     */
    badge?: number;
    /**
     * The name of a sound file in your app’s main bundle or in the Library/Sounds
     * folder of your app’s container directory. Specify the string “default” to
     * play the system sound. Use this key for regular notifications.
     * For critical alerts, use the sound dictionary instead.
     */
    sound?: string | AppleCriticalSound;
    /**
     * An app-specific identifier for grouping related notifications.
     */
    "thread-id"?: string;
    /**
     * The notification’s type.
     */
    category?: string;
    /**
     * The background notification flag. To perform a silent background update,
     * specify the value 1 and don’t include the alert, badge, or sound keys in your payload.
     */
    "content-available"?: number;
    /**
     * The notification service app extension flag. If the value is 1, the system passes
     * the notification to your notification service app extension before delivery.
     */
    "mutable-content"?: number;
    /**
     * The identifier of the window brought forward.
     */
    "target-content-id"?: string;
    /**
     * The importance and delivery timing of a notification.
     */
    "interruption-level"?: "passive" | "active" | "time-sensitive" | "critical";
    /**
     * The relevance score, a number between 0 and 1, that the system uses to sort the
     * notifications from your app. The highest score gets featured in the notification summary.
     */
    "relevance-score"?: number;
    /**
     * The criteria the system evaluates to determine if it displays the notification in the current Focus.
     */
    "filter-criteria"?: string;
    /**
     * The UNIX timestamp that represents the date at which a Live Activity becomes stale, or out of date.
     */
    "stale-date"?: number;
    /**
     * The updated or final content for a Live Activity.
     */
    "content-state"?: Record<string, any>;
    /**
     * The UNIX timestamp that marks the time when you send the remote notification that updates or ends a Live Activity.
     */
    timestamp?: number;
    /**
     * The string that describes whether you update or end an ongoing Live Activity with the remote push notification. To update the Live Activity, use update. To end the Live Activity, use end.
     */
    events?: string;
    /**
     * The UNIX timestamp that represents the date at which the system ends a Live Activity and removes it from the Dynamic Island and the Lock Screen.
     */
    "dismissal-date"?: number;
}
/**
 * Creates an APNs native message to send to Notification Hubs.
 * @param nativeMessage - The Apple native message properties to set.
 * @param additionalProperties - Additional properties for Apple messages.
 * @returns An AppleNotification to send to Notification Hubs.
 */
export declare function createAppleNotificationBody(nativeMessage: AppleNativeMessage): string;
/**
 * Represents the targets, options, and payload for HTTP JSON messages for the Firebase Legacy HTTP interface.
 */
export interface FirebaseLegacyNativeMessage {
    /**
     * The recipient of a message.
     */
    to?: string;
    /**
     * The recipient of a multicast message, a message sent to more than one registration token.
     */
    registration_ids?: string[];
    /**
     * A logical expression of conditions that determine the message target.
     */
    condition?: string;
    /**
     * Used to identify a group of messages.
     */
    collapse_key?: string;
    /**
     * The priority of the message.
     */
    priority?: "normal" | "high";
    /**
     * The background notification flag. To perform a silent background update,
     * specify the value 1 and don’t include the alert, badge, or sound keys in your payload.
     */
    content_available?: boolean;
    /**
     * The notification service app extension flag. If the value is 1, the system passes
     * the notification to your notification service app extension before delivery.
     */
    mutable_content?: number;
    /**
     * Specifies how long (in seconds) the message should be kept in FCM storage if the device is offline
     */
    time_to_live?: number;
    /**
     * The package name of the application where the registration tokens must match in order to receive the message.
     */
    restricted_package_name?: string;
    /**
     * When set to true, allows developers to test a request without actually sending a message.
     */
    dry_run?: boolean;
    /**
     * Custom key-value pairs of the message's payload.
     */
    data?: Record<string, any>;
    /**
     * The predefined, user-visible key-value pairs of the notification payload.
     */
    notification?: FirebaseLegacyAppleNativePayload | FirebaseLegacyAndroidNativePayload | FirebaseLegacyWebNativePayload;
}
/**
 * Represents an APNs native payload for the Firebase Legacy HTTP interface.
 */
export interface FirebaseLegacyAppleNativePayload {
    /**
     * The notification's title.
     */
    title?: string;
    /**
     * The notification's body text.
     */
    body?: string;
    /**
     * The sound to play when the device receives the notification.
     */
    sound?: string;
    /**
     * The value of the badge on the home screen app icon.
     */
    badge?: string;
    /**
     * The action associated with a user click on the notification which corresponds to the APNs category.
     */
    click_action?: string;
    /**
     * The notification's subtitle.
     */
    subtitle?: string;
    /**
     * The key to the body string in the app's string resources to use to localize the body text to the user's current localization.
     */
    body_loc_key?: string;
    /**
     * Variable string values to be used in place of the format specifiers in body_loc_key to use to localize the body text to the user's current localization.
     */
    body_loc_args?: string[];
    /**
     * The key to the title string in the app's string resources to use to localize the title text to the user's current localization.
     */
    title_loc_key?: string;
    /**
     * Variable string values to be used in place of the format specifiers in title_loc_key to use to localize the title text to the user's current localization.
     */
    title_loc_args?: string[];
}
/**
 * Represents an Android native payload for the Firebase Legacy HTTP interface.
 */
export interface FirebaseLegacyAndroidNativePayload {
    /**
     * The notification's title.
     */
    title?: string;
    /**
     * The notification's body text.
     */
    body?: string;
    /**
     * The notification's channel ID.
     */
    android_channel_id?: string;
    /**
     * The notification's icon.
     */
    icon?: string;
    /**
     * The sound to play when the device receives the notification.
     */
    sound?: string;
    /**
     * Identifier used to replace existing notifications in the notification drawer.
     */
    tag?: string;
    /**
     * The notification's icon color, expressed in #rrggbb format.
     */
    color?: string;
    /**
     * The action associated with a user click on the notification.
     */
    click_action?: string;
    /**
     * The key to the body string in the app's string resources to use to localize the body text to the user's current localization.
     */
    body_loc_key?: string;
    /**
     * Variable string values to be used in place of the format specifiers in body_loc_key to use to localize the body text to the user's current localization.
     */
    body_loc_args?: string[];
    /**
     * The key to the title string in the app's string resources to use to localize the title text to the user's current localization.
     */
    title_loc_key?: string;
    /**
     * Variable string values to be used in place of the format specifiers in title_loc_key to use to localize the title text to the user's current localization.
     */
    title_loc_args?: string[];
}
/**
 * Represents an Web Push native payload for the Firebase Legacy HTTP interface.
 */
export interface FirebaseLegacyWebNativePayload {
    /**
     * The notification's title.
     */
    title?: string;
    /**
     * The notification's body text.
     */
    body?: string;
    /**
     * The URL to use for the notification's icon.
     */
    icon?: string;
    /**
     * The action associated with a user click on the notification.
     */
    click_action?: string;
}
/**
 * Creates a FcmLegacyNotification from a native Firebase payload.
 * @param nativeMessage - The native message payload to send to Notification Hubs.
 * @returns The JSON body to send to Notification Hubs.
 */
export declare function createFirebaseLegacyNotificationBody(nativeMessage: FirebaseLegacyNativeMessage): string;
/**
 * Represents the Firebase V1 native message envelope.
 */
export interface FirebaseV1NativeMessageEnvelope {
    /**
     * The Firebase V1 native message.
     */
    message: FirebaseV1NativeMessage;
}
/**
 * Represents the targets, options, and payload for HTTP JSON messages for the Firebase V1 interface.
 */
export interface FirebaseV1NativeMessage {
    /**
     * Custom key-value pairs of the message's payload.
     */
    data?: Record<string, string>;
    /**
     * The predefined, user-visible key-value pairs of the notification payload.
     */
    notification?: FirebaseV1NativeNotification;
    /**
     * Android specific options for messages sent through FCM connection server.
     */
    android?: FirebaseV1AndroidConfig;
    /**
     * Webpush protocol options.
     */
    webpush?: FirebaseV1WebPushConfig;
    /**
     * APNs specific options.
     */
    apns?: FirebaseV1ApnsConfig;
    /**
     * FCM options.
     */
    fcm_options?: FirebaseV1FcmOptions;
    /**
     * Registration token to send a message to.
     */
    token?: string;
    /**
     * Topic name to send a message to, e.g. "weather".
     */
    topic?: string;
    /**
     * Condition to send a message to, e.g. "'foo' in topics && 'bar' in topics".
     */
    condition?: string;
}
/**
 * Represents a native FCM V1 notification message payload.
 */
export interface FirebaseV1NativeNotification {
    /**
     * The notification's title.
     */
    title?: string;
    /**
     * The notification's body text.
     */
    body?: string;
    /**
     * Contains the URL of an image that is going to be downloaded on the device and displayed in a notification.
     */
    image?: string;
}
/**
 * Android specific options for messages sent through FCM connection server.
 */
export interface FirebaseV1AndroidConfig {
    /**
     * An identifier of a group of messages that can be collapsed, so that only the last message gets sent when delivery can be resumed.
     */
    collapse_key?: string;
    /**
     * Message priority. Can take "normal" and "high" values.
     */
    priority?: "normal" | "high";
    /**
     * How long (in seconds) the message should be kept in FCM storage if the device is offline.
     */
    ttl?: string;
    /**
     * Package name of the application where the registration token must match in order to receive the message.
     */
    restricted_package_name?: string;
    /**
     * Custom key-value pairs of the message's payload.
     */
    data?: Record<string, string>;
    /**
     * Notification to send to android devices.
     */
    notification?: FirebaseV1AndroidNotification;
    /**
     * Options for features provided by the FCM SDK for Android.
     */
    fcm_options?: FirebaseV1AndroidFcmOptions;
    /**
     * If set to true, messages will be allowed to be delivered to the app while the device is in direct boot mode.
     */
    direct_boot_ok?: boolean;
}
/**
 * Notification to send to android devices.
 */
export interface FirebaseV1AndroidNotification {
    /**
     * The notification's title.
     */
    title?: string;
    /**
     * The notification's body text.
     */
    body?: string;
    /**
     * The notification's icon.
     */
    icon?: string;
    /**
     * The notification's icon color, expressed in #rrggbb format.
     */
    color?: string;
    /**
     * The sound to play when the device receives the notification.
     */
    sound?: string;
    /**
     * Identifier used to replace existing notifications in the notification drawer.
     */
    tag?: string;
    /**
     * The action associated with a user click on the notification.
     */
    click_action?: string;
    /**
     * The key to the body string in the app's string resources to use to localize the body text to the user's current localization.
     */
    body_loc_key?: string;
    /**
     * Variable string values to be used in place of the format specifiers in body_loc_key to use to localize the body text to the user's current localization.
     */
    body_loc_args?: string[];
    /**
     * The key to the title string in the app's string resources to use to localize the title text to the user's current localization.
     */
    title_loc_key?: string;
    /**
     * Variable string values to be used in place of the format specifiers in title_loc_key to use to localize the title text to the user's current localization.
     */
    title_loc_args?: string[];
    /**
     * The notification's channel id (new in Android O).
     */
    channel_id?: string;
    /**
     * Sets the "ticker" text, which is sent to accessibility services.
     */
    ticker?: string;
    /**
     * When set to false or unset, the notification is automatically dismissed when the user clicks it in the panel.
     */
    sticky?: boolean;
    /**
     * Set the time that the event in the notification occurred.
     */
    event_time?: string;
    /**
     * Set whether or not this notification is relevant only to the current device.
     */
    local_only?: boolean;
    /**
     * Set the relative priority for this notification.
     */
    notification_priority?: number;
    /**
     * If set to true, use the Android framework's default sound for the notification.
     */
    default_sound?: boolean;
    /**
     * If set to true, use the Android framework's default vibrate pattern for the notification.
     */
    default_vibrate_timings?: boolean;
    /**
     * If set to true, use the Android framework's default light settings for the notification.
     */
    default_light_settings?: boolean;
    /**
     * Set the vibration pattern to use.
     */
    vibrate_timings?: string[];
    /**
     * Set the Notification.visibility of the notification.
     */
    visibility?: number;
    /**
     * Sets the number of items this notification represents.
     */
    notification_count?: number;
    /**
     * Settings to control the notification's LED blinking rate and color if LED is available on the device.
     */
    light_settings?: {
        color: {
            red: number;
            green: number;
            blue: number;
            alpha: number;
        };
        light_on_duration: string;
        light_off_duration: string;
    };
    /**
     * Contains the URL of an image that is going to be displayed in a notification.
     */
    image?: string;
}
/**
 * Options for features provided by the FCM SDK for Android.
 */
export interface FirebaseV1AndroidFcmOptions {
    /**
     * The label associated with the message's analytics data.
     */
    analytics_label?: string;
}
export interface FirebaseV1WebPushConfig {
    /**
     * A collection of WebPush protocol options.
     */
    headers?: Record<string, string>;
    /**
     * A collection of WebPush protocol options.
     */
    data?: Record<string, string>;
    /**
     * Web Notification options as a JSON object.
     */
    notification?: FirebaseV1WebPushNotification;
    /**
     * A collection of WebPush protocol options.
     */
    fcm_options?: FirebaseV1WebPushFcmOptions;
}
/**
 * Represents a Web Push notification payload.
 */
export interface FirebaseV1WebPushNotification {
    /**
     * An array of actions to display in the notification.
     */
    actions?: {
        action?: string;
        title?: string;
        icon?: string;
    }[];
    /**
     * Defines a title for the notification.
     */
    title?: string;
    /**
     * The body string of the notification
     */
    body?: string;
    /**
     * A string containing the URL of an icon to be displayed in the notification.
     */
    icon?: string;
    /**
     * A string containing the URL of an image to represent the notification when there is not enough space to display the notification itself such as for example, the Android Notification Bar.
     */
    badge?: string;
    /**
     * The notification's data.
     */
    data?: Record<string, string>;
    /**
     * The direction in which to display the notification.
     */
    dir?: "auto" | "ltr" | "rtl";
    /**
     * A string containing the URL of an image to be displayed in the notification.
     */
    image?: string;
    /**
     * The notification's language.
     */
    lang?: string;
    /**
     * A boolean value specifying whether the user should be notified after a new notification replaces an old one.
     */
    renotify?: boolean;
    /**
     * Indicates that a notification should remain active until the user clicks or dismisses it, rather than closing automatically.
     */
    requireInteraction?: boolean;
    /**
     * A boolean value specifying whether the notification is silent
     */
    silent?: boolean;
    /**
     * A string representing an identifying tag for the notification.
     */
    tag?: string;
    /**
     * A number representing the time at which a notification is created or applicable
     */
    timestamp?: number;
    /**
     * A vibration pattern for the device's vibration hardware to emit with the notification.
     */
    vibrate?: number[];
}
/**
 * Options for features provided by the FCM SDK for Web.
 */
export interface FirebaseV1WebPushFcmOptions {
    /**
     * The link to open when the user clicks on the notification.
     */
    link?: string;
    /**
     * Label associated with the message's analytics data.
     */
    analytics_label?: string;
}
/**
 * Apple Push Notification Service specific options.
 */
export interface FirebaseV1ApnsConfig {
    /**
     * A collection of APNs headers.
     */
    headers?: Record<string, string>;
    /**
     * A collection of APNs headers.
     */
    payload?: AppleNativeMessage;
    /**
     * A collection of APNs headers.
     */
    fcm_options?: FirebaseV1ApnsFcmOptions;
}
/**
 * Options for features provided by the FCM SDK for iOS.
 */
export interface FirebaseV1ApnsFcmOptions {
    /**
     * Label associated with the message's analytics data.
     */
    analytics_label?: string;
    /**
     * Contains the URL of an image that is going to be displayed in a notification.
     */
    image?: string;
}
export interface FirebaseV1FcmOptions {
    /**
     * Label associated with the message's analytics data.
     */
    analytics_label?: string;
}
/**
 * Creates a FcmV1Notification from a native Firebase payload.
 * @param nativeMessage - The native message payload to send to Notification Hubs.
 * @returns The JSON body to send to Notification Hubs.
 */
export declare function createFirebaseV1NotificationBody(nativeMessage: FirebaseV1NativeMessageEnvelope): string;
/**
 * Describes ADM notification messages.
 */
export interface AdmNativeNotification {
    /**
     * The notification's title.
     */
    title?: string;
    /**
     * The notification's body text.
     */
    body?: string;
    /**
     * The notification's icon.
     */
    icon?: string;
    /**
     * The notification's icon color, expressed in #rrggbb format.
     */
    color?: string;
    /**
     * The sound to play when the device receives the notification. Supports "default" or the filename of a sound resource bundled in the app.
     */
    sound?: string;
    /**
     * Identifier used to replace existing notifications in the notification drawer.
     */
    tag?: string;
    /**
     * The action associated with a user click on the notification.
     */
    click_action?: string;
    /**
     * The key to the body string in the app's string resources to use to localize the body text to the user's current localization.
     */
    body_loc_key?: string;
    /**
     * Variable string values to be used in place of the format specifiers in body_loc_key to use to localize the body text to the user's current localization.
     */
    body_loc_args?: string[];
    /**
     * The key to the title string in the app's string resources to use to localize the title text to the user's current localization.
     */
    title_loc_key?: string;
    /**
     * Variable string values to be used in place of the format specifiers in title_loc_key to use to localize the title text to the user's current localization.
     */
    title_loc_args?: string[];
    /**
     * The notification's channel id.
     */
    channel_id?: string;
    /**
     * Sets the "ticker" text, which is sent to accessibility services.
     */
    ticker?: string;
    /**
     * When set to false or unset, the notification is automatically dismissed when the user clicks it in the panel.
     */
    sticky?: boolean;
    /**
     * Set the time that the event in the notification occurred. Must be a timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z".
     */
    event_time?: string;
    /**
     * Set whether or not this notification is relevant only to the current device.
     */
    local_only?: boolean;
    /**
     * Set the relative priority for this notification.
     */
    notification_priority?: number;
    /**
     * If set to true, use the Android framework's default sound for the notification.
     */
    default_sound?: boolean;
    /**
     * Set the Notification.visibility of the notification.
     */
    visibility?: number;
    /**
     * Sets the number of items this notification represents.
     */
    notification_count?: number;
    /**
     * Contains the URL of an image that is going to be displayed in a notification.
     */
    image?: string;
}
/**
 * Represents a native ADM notification message payload.
 */
export interface AdmNativeMessage {
    /**
     * The notification payload to send with the message.
     */
    notification?: AdmNativeNotification;
    /**
     * The payload data to send with the message.
     */
    data?: Record<string, string>;
    /**
     * The priority of the msssage.
     */
    priority?: "normal" | "high";
    /**
     * This is an arbitrary string used to indicate that multiple messages are logically the same
     * and that ADM is allowed to drop previously enqueued messages in favor of this new one.
     */
    consolidationKey?: string;
    /**
     * The number of seconds that ADM should retain the message if the device is offline.
     */
    expiresAfter?: number;
    /**
     * This is a base-64-encoded MD5 checksum of the data parameter.
     */
    md5?: string;
}
/**
 * Creates a AdmNotification from a native ADM payload.
 * @param nativeMessage - The native message payload to send to Notification Hubs.
 * @returns The AdmNotification to send to Notification Hubs.
 */
export declare function createAdmNotificationBody(nativeMessage: AdmNativeMessage): string;
/**
 * Represents the Baidu Apple native payload.
 */
export interface BaiduAppleNativePayload {
    /**
     * The alert string.
     */
    alert?: string;
    /**
     * The APNs sound to play.
     */
    sound?: string;
    /**
     * The APNs badge count.
     */
    badge?: number;
}
/**
 * Baidu Native Format:
 * https://stackoverflow.com/questions/42591815/customize-baidu-push-json-payload
 * http://www.tuicool.com/articles/ZnmANn
 */
export interface BaiduNativeMessage extends Record<string, any> {
    /**
     * Notification title for Android.
     */
    title?: string;
    /**
     * Baidu Notification description for Android.
     */
    description?: string;
    /**
     * Baidu Notification builder ID.
     */
    notification_builder_id?: number;
    /**
     * Baidu Notification Android basic style.
     */
    notification_basic_style?: number;
    /**
     * Baidu Android open type.
     */
    open_type?: number;
    /**
     * Baidu Android net support option.
     */
    net_support?: number;
    /**
     * Baidu Android user confirm.
     */
    user_confirm?: number;
    /**
     * Baidu Android URL.
     */
    url?: string;
    /**
     * Baidu Android package content.
     */
    pkg_content?: string;
    /**
     * Baidu Android package version.
     */
    pkg_version?: string;
    /**
     * Baidu Android custom content dictionary.
     */
    custom_content?: Record<string, any>;
    /**
     * Baidu APNs support.
     */
    aps?: BaiduAppleNativePayload;
}
/**
 * Creates a BaiduNotification from a native Baidu payload.
 * @param nativeMessage - The native message payload to send to Notification Hubs.
 * @returns The JSON body to send to Notification Hubs.
 */
export declare function createBaiduNotificationBody(nativeMessage: BaiduNativeMessage): string;
/**
 * Represents the types of Windows Badge Glyphs
 */
export type WindowsBadgeGlyphType = "none" | "activity" | "alarm" | "alert" | "attention" | "available" | "away" | "busy" | "error" | "newMessage" | "paused" | "playing" | "unavailable";
/**
 * Represents the Windows Badge Message
 */
export interface WindowsBadgeNativeMessage {
    /**
     * Either a numeric value or a string value that specifies a predefined badge glyph.
     */
    value: WindowsBadgeGlyphType | number;
}
/**
 * Builds a WindowsNotification from a Windows Badge.
 * @param nativeMessage - The Windows Badge Message to build.
 * @returns The WNS XML created with the badge information.
 */
export declare function createWindowsBadgeNotificationBody(nativeMessage: WindowsBadgeNativeMessage): string;
//# sourceMappingURL=notificationBodyBuilder.d.ts.map