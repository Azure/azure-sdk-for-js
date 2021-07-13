# Release History

## 1.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0 (2021-07-06)

The Metrics Advisor library is now in GA with this release.

### Breaking Changes

- `listIncidents()` overloads split into `listInclidentsForAlert()` and `listIncidentsForDetectionConfiguration()`
- `listAnomalies()` overloads split into `listAnomaliesForAlert()` and `listAnomaliesForDetectionConfiguration()`
- Removed support for granularity type `PerSecond`
- Renamed "createFeedback" to "addFeedback"
- `seriesToFilter` parameter renamed to `seriesKey` in methods `getmetricenrichedseriesdata` and `getmetricseriesdata` and ordering updated
- Renamed `adminEmails` to `admins` in `MetricsAdvisorDataFeed` and `NotificationHook` and `viewerEmails` to `viewers` in `MetricsAdvisorDataFeed`
- Renamed type `DetectionConditionsOperator` to `DetectionConditionOperator`
- Renamed property `splitAlertByDimension` to `dimensionsToSplitAlert` in `AnomalyAlertConfiguration`
- Renamed `datasource` to `DataSource`
- Renamed `DatasourceCredential` to `DataSourceCredentialEntity`, `SqlServerConnectionStringDataSourceCredential` to `DataSourceSqlConnectionString`,
  `DataLakeGen2SharedKeyDataSourceCredential` to `DataSourceDataLakeGen2SharedKey`,
  `ServicePrincipalDataSourceCredential` to `DataSourceServicePrincipal`,
  `ServicePrincipalInKeyVaultDataSourceCredential` to `DataSourceServicePrincipalInKeyVault`

### Other Changes

- Update methods now return the updated object

## 1.0.0-beta.4 (2021-06-07)

### New Features

- Added support for `Azure Log Analytics` DataFeed source and `Azure EventHubs` DataFeed source
- Added datasource credential API support to client
- Added authentication type support for data feed
- Added property `splitAlertByDimensions` to `AnomalyAlertConfiguration` model
- Added properties`value` and `expectedValue` to `DataPointAnomaly` and `valueOfRootNode` and `expectedValueOfRootNode` to `AnomalyIncident`

### Breaking Changes

- Updated Patch types for all update methods
- Replaced `updateSubscriptionKey` and `updateApiKey` into one method `updateKey`
- Removed support for `HttpRequestDataFeed` and `ElasticsearchDataFeed` source type
- Removed `DataSourceParameter` property and serialized `DataSourceParameter` properties for all datafeed sources into `DataFeedSource` types
- Renamed `AlertSnoozeCondition` to `MetricAnomalyAlertSnoozeCondition` and `MetricAlertConditions` to `MetricAnomalyAlertConditions`

## 1.0.0-beta.3 (2021-02-09)

- Added AAD authentication support
- Added support for API key and Subscription key rotation
- Added a map property in DataFeed object for mapping of metric name to metric id
- [Breaking] All update methods now return just RestResponse instead of entire objects:
  - `updateAlertConfig()` now returns `RestResponse` instead of `GetAnomalyAlertConfigurationResponse`
  - `updateDatafeed` now returns `RestResponse` instead of `GetDatafeedResponse`
  - `updateHook` now returns `RestResponse` instead of `GetHookResponse`
  - `updateDetectionConfig` now returns `RestResponse` instead of `GetAnomalyDetectionConfigurationResponse`
- [Breaking] Rename function `listDimensionValuesForDetectionConfig()` to `listAnomalyDimensionValues()`

## 1.0.0-beta.2 (2020-11-10)

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
- [Breaking] `*PageResponse` types now extends from `Array<ItemType>` instead of wrapping an array of `ItemType`. Their types names are also shortened.
- [Breaking] Rename method for listing alerts
  - `listAlertsForAlertConfiguration(alertConfigId, startTime, endTime, timemode, options)` to `listAlerts(alertConfigId, startTime, endTime, timemode, options)`
- [Breaking] Rename feedback methods :
  - `listMetricFeedbacks()` to `listFeedback()`
  - `getMetricFeedback()` to `getFeedback()`
  - `createMetricFeedback()` to `createFeedback()`
- [Breaking] Rename detection configuration methods:
  - `createMetricAnomalyDetectionConfiguration(anomalyConfig)` to `createDetectionConfig(anomalyConfig)`
  - `getMetricAnomalyDetectionConfiguration(detectionConfigId)` to `getDetectionConfig(detectionConfigId)`
  - `createMetricAnomalyDetectionConfiguration(config)` to `createDetectionConfig(config)`
  - `updateMetricAnomalyDetectionConfiguration(configId, patch)` to `updateDetectionConfig(configId, patch)`
  - `deleteMetricAnomalyDetectionConfiguration(detectionConfigId)` to `deleteDetectionConfig(detectionConfigId)`
  - `listMetricAnomalyDetectionConfigurations(metricId)` to `listDetectionConfigs(metricId)`
- [Breaking] Rename anomaly alert configuration methods:
  - `createAnomalyAlertConfiguration(anomalyAlertConfig)` to `createAlertConfig(anomalyAlertConfig)`
  - `updateAnomalyAlertConfiguration(alertConfigId, patch)` to `updateAlertConfig(alertConfigId, patch)`
  - `deleteAnomalyAlertConfiguration(alertConfigId)` to `deleteAlertConfig(alertConfigId)`
  - `listAnomalyAlertConfigurations(detectdionConfigId)` to `listAlertConfigs(detectdionConfigId)`
- [Breaking] Data feed ingestion granularity now has `"PerMinute"` and `"PerSecond"` instead of `"Minutely"` and `"Secondly"`.
- [Breaking] Change the type of following timestamp properties from `Date` to `number`
  - `AnomalyAlert.timestamp`
  - `DataPointAnomaly.timestamp`
  - `EnrichmentStatus.timestamp`
  - `IngestionStatus.timestamp`
  - `latestSuccessTimestamp` and `latestActiveTimestamp` in the return type of `getDataFeedIngestionProgress()`.
- [Breaking] property `createdTime` on `DataFeed` and `MetricFeedbackCommon` to `createdOn`.
- [Breaking] Remove the wrapping data feed `options` property from `DataFeed` and `DataFeedPatch` and flatten its child properties.
- Parameters of `Date` type now also accept strings. No validation is done for the strings. The SDK calls `new Date()` to convert them to `Date`.
- Handle potential new data feed source types gracefully

## 1.0.0-beta.1 (2020-10-07)

- This release is a preview of our efforts to create a client library that is user friendly and
  idiomatic to the JavaScript ecosystem. The reasons for most of the changes in this update can be found in the
  [Azure SDK Design Guidelines for TypeScript](https://azure.github.io/azure-sdk/typescript_introduction.html).
