/**
 * Represents an alert reported by Metrics Advisor service.
 */
export interface AnomalyAlert {
  /**
   * alert id
   */
  id: string;
  /**
   * id of the alert configuration that triggered this alert
   */
  alertConfigId: string;
  /**
   * anomaly time
   */
  timestamp?: number; // TODO: why optional?
  /**
   * created time
   */
  createdOn?: Date; // TODO: why optional?
  /**
   * modified time
   */
  modifiedOn?: Date; // TODO: why optional?
}

/**
 * Mode to use when querying alerts by time.
 */
export type AlertQueryTimeMode = "AnomalyTime" | "CreatedTime" | "ModifiedTime";

/**
 * Contains response data for the listAlertsForAlertConfiguration operation.
 */
export interface AlertsPageResponse extends Array<AnomalyAlert> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
}
