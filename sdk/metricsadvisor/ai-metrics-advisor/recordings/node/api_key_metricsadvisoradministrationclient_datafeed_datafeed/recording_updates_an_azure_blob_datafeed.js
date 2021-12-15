let nock = require('nock');

module.exports.hash = "c606fc545df3ea7d2093f4675aa59f87";

module.exports.testInfo = {"uniqueName":{"Updated-Azure-Blob-data-feed-":"Updated-Azure-Blob-data-feed-163702280007502678"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/8f8dcdc1-1c2a-478d-ad8e-bde4d4317721', {"dataSourceType":"AzureBlob","dataFeedName":"Updated-Azure-Blob-data-feed-163702280007502678","dataFeedDescription":"Updated Azure Blob description","timestampColumn":"UpdatedTimestampeColumn","dataStartFrom":"2020-10-30T00:00:00.000Z","startOffsetInSeconds":2,"maxConcurrency":3,"minRetryIntervalInSeconds":64,"stopRetryAfterInSeconds":65,"needRollup":"AlreadyRollup","allUpIdentification":"__Existing__","fillMissingPointType":"PreviousValue","viewMode":"Public","viewers":["viewer1@example.com"],"actionLinkTemplate":"Updated Azure Blob action link template","authenticationType":"ManagedIdentity","dataSourceParameter":{"connectionString":"Updated Azure Blob connection string","container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"}})
  .reply(200, {"dataFeedId":"8f8dcdc1-1c2a-478d-ad8e-bde4d4317721","dataFeedName":"Updated-Azure-Blob-data-feed-163702280007502678","metrics":[{"metricId":"325d3468-1f2d-4dca-88e5-e0a77265e7da","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"da2f9959-613e-4567-ad4f-c5aee79a50ff","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-10-30T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":65,"minRetryIntervalInSeconds":64,"maxConcurrency":3,"viewMode":"Public","admins":["kaghiya@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-16T00:33:19Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1397',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e2a61502-4dbd-43a6-8043-c3bdd31d5e64',
  'x-envoy-upstream-service-time',
  '744',
  'apim-request-id',
  'e2a61502-4dbd-43a6-8043-c3bdd31d5e64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:20 GMT'
]);
