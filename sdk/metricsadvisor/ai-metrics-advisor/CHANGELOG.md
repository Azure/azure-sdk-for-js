# Release History

## 1.0.0-beta.2 (Unreleased)

- [Breaking] Combine `listAnomaliesForDetectionConfiguration()` and `listAnomaliesForAlert()` into overloads of `listAnomalies()`
- [Breaking] Combine `listIncidentsForDetectionConfiguration()` and `listIncidentsForAlert()` into overloads of `listIncidents()`
- `listAnomalies()` and `listIncidents()` on detection configures now also take strings of date formats for `startTime` and `endTime` parameters.
- [Breaking] Fix typo: `lastOccuredTime` is now `lastOccurredTime`.
- [Breaking] Feedback property `dimensionFilter` is renamed to `dimensionKey`.
- [Breaking] `DataFeed.metricIds` array is removed as GUIDs alone are not very useful.
- [Breaking] `DataFeedOptions` property `dataFeedDescription` is renamed to `description`.
- [Breaking] rename types whose name are too generic:
  - `Alert` is renamed to `AnomalyAlert`.
  - `Anomaly` is renamed to `DataPointAnomaly`
  - `Incident` is renamed to `AnomalyIncident`.
  - `Metric` is renamed to `DataFeedMetric`.
  - `Dimension` is renamed to `DataFeedDimension`.
  - `*Hook*` is renamed to `*NotificationHook*`.
- [Breaking] `DataFeed` properties `admins` is renamed to `adminEmails` and `viewers` is renamed to `viewerEmails`.
- [Breaking] `IncidentRootCause` property `dimensionKey` is renamed to `seriesKey`. `AnomalyIncident.dimensionKey` is renamed to `rootDimensionKey`
- [Breaking] The `-List` suffix is removed from Array properties in `MetricSeriesData` and `MetricsEnrichedSeriesData`. Plural form is used instead.
- Parameters of `Date` type now also accept strings. No validation is done for the strings. The SDK calls `new Date()` to convert them to `Date`.

## 1.0.0-beta.1 (2020-10-07)

- This release is a preview of our efforts to create a client library that is user friendly and
  idiomatic to the JavaScript ecosystem. The reasons for most of the changes in this update can be found in the
  [Azure SDK Design Guidelines for TypeScript](https://azure.github.io/azure-sdk/typescript_introduction.html).
