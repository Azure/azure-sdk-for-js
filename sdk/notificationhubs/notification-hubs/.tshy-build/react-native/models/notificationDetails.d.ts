/**
 * Represents the notification outcome states.
 */
export type NotificationOutcomeState = "Enqueued" | "DetailedStateAvailable" | "Processing" | "Completed" | "Abandoned" | "Unknown" | "NoTargetFound" | "Cancelled";
/**
 * The per platform count per state.
 */
export interface NotificationOutcome {
    /**
     * The state of the notification.
     */
    state: string;
    /**
     * The count of notifications per state.
     */
    count: number;
}
/**
 * Represents Notification details.
 */
export interface NotificationDetails {
    /**
     * The unique notification identifier.
     */
    notificationId?: string;
    /**
     * The notification location.
     */
    location?: string;
    /**
     * The notification state.
     */
    state?: NotificationOutcomeState;
    /**
     * The enqueue time of the notification.
     */
    enqueueTime?: Date;
    /**
     * The notification send start time.
     */
    startTime?: Date;
    /**
     * The notification send end time.
     */
    endTime?: Date;
    /**
     * The notification body.
     */
    notificationBody?: string;
    /**
     * The notification tags.
     */
    tags?: string;
    /**
     * The notification platforms targeted.
     */
    targetPlatforms?: string;
    /**
     * The URL for the platform notification services errors.
     */
    pnsErrorDetailsUrl?: string;
    /**
     * APNs outcomes counts per state.
     */
    apnsOutcomeCounts?: NotificationOutcome[];
    /**
     * WNS outcomes counts per state.
     */
    wnsOutcomeCounts?: NotificationOutcome[];
    /**
     * FCM outcome counts per state.
     */
    fcmOutcomeCounts?: NotificationOutcome[];
    /**
     * FCM V1 outcome counts per state.
     */
    fcmV1OutcomeCounts?: NotificationOutcome[];
    /**
     * ADM outcome counts per state.
     */
    admOutcomeCounts?: NotificationOutcome[];
    /**
     * Baidu outcome counts per state.
     */
    baiduOutcomeCounts?: NotificationOutcome[];
    /**
     * Web Push outcome counts per state.
     */
    browserOutcomeCounts?: NotificationOutcome[];
    /**
     * Xiaomi outcome counts per state.
     */
    xiaomiOutcomeCounts?: NotificationOutcome[];
}
/**
 * Describes a response from the Notification Hubs which includes a tracking ID, correlation ID and location.
 */
export interface NotificationHubsResponse {
    /**
     * The Tracking ID of the operation.
     */
    trackingId?: string;
    /**
     * The correlation ID of the operation.
     */
    correlationId?: string;
    /**
     * The location of the operation.
     */
    location?: string;
}
/**
 * Represents the result of the registration.
 */
export interface RegistrationResult {
    /**
     * The application platform.
     */
    applicationPlatform: string;
    /**
     * The PNS handle.
     */
    pnsHandle: string;
    /**
     * The registration ID.
     */
    registrationId: string;
    /**
     * The outcome of the registration.
     */
    outcome: string;
}
/**
 * Describes a response from the Notification Hubs service for send operations.
 */
export interface NotificationHubsMessageResponse extends NotificationHubsResponse {
    /**
     * The notification ID from the operation.  Note this is only available in Standard SKU and above.
     */
    notificationId?: string;
    /**
     * The number of devices that successfully received the notification.
     */
    successCount: number;
    /**
     * The number of devices that failed to receive a notification.
     */
    failureCount: number;
    /**
     * The list of notification outcome results for each device registered with the hub, to which this notification was sent.
     */
    results: RegistrationResult[];
    /**
     * The state of this notification outcome.
     */
    state: NotificationOutcomeState;
}
//# sourceMappingURL=notificationDetails.d.ts.map