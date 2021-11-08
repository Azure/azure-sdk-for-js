let nock = require('nock');

module.exports.hash = "c606fc545df3ea7d2093f4675aa59f87";

module.exports.testInfo = {"uniqueName":{"Updated-Azure-Blob-data-feed-":"Updated-Azure-Blob-data-feed-163636433095509076"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/c9673522-01d6-4068-b7f9-845ea1c46f4b', {"dataSourceType":"AzureBlob","dataFeedName":"Updated-Azure-Blob-data-feed-163636433095509076","dataFeedDescription":"Updated Azure Blob description","timestampColumn":"UpdatedTimestampeColumn","dataStartFrom":"2020-10-30T00:00:00.000Z","startOffsetInSeconds":2,"maxConcurrency":3,"minRetryIntervalInSeconds":64,"stopRetryAfterInSeconds":65,"needRollup":"AlreadyRollup","allUpIdentification":"__Existing__","fillMissingPointType":"PreviousValue","viewMode":"Public","viewers":["viewer1@example.com"],"actionLinkTemplate":"Updated Azure Blob action link template","authenticationType":"ManagedIdentity","dataSourceParameter":{"connectionString":"Updated Azure Blob connection string","container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"}})
  .reply(200, {"dataFeedId":"c9673522-01d6-4068-b7f9-845ea1c46f4b","dataFeedName":"Updated-Azure-Blob-data-feed-163636433095509076","metrics":[{"metricId":"f27b8776-ecaf-4de2-ac62-9db4f09a2dcb","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"b90b6ea5-7c38-4a60-a312-04122cb11ca9","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-10-30T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":65,"minRetryIntervalInSeconds":64,"maxConcurrency":3,"viewMode":"Public","admins":["kaghiya@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T09:38:50Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1397',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '11b3417a-40e5-4606-9595-6ee2e8024535',
  'x-envoy-upstream-service-time',
  '684',
  'apim-request-id',
  '11b3417a-40e5-4606-9595-6ee2e8024535',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:51 GMT'
]);
