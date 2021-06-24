let nock = require('nock');

module.exports.hash = "3b43656b23c81d34408ecfdba58d6778";

module.exports.testInfo = {"uniqueName":{"Updated-Azure-Blob-data-feed-":"Updated-Azure-Blob-data-feed-162267904219108315"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/47336207-4e5e-4fd3-997b-20d5428537d5', {"dataSourceType":"AzureBlob","dataFeedName":"Updated-Azure-Blob-data-feed-162267904219108315","dataFeedDescription":"Updated Azure Blob description","timestampColumn":"UpdatedTimestampeColumn","dataStartFrom":"2020-08-01T00:00:00.000Z","startOffsetInSeconds":2,"maxConcurrency":3,"minRetryIntervalInSeconds":4,"stopRetryAfterInSeconds":5,"needRollup":"AlreadyRollup","allUpIdentification":"__Existing__","fillMissingPointType":"PreviousValue","viewMode":"Public","viewers":["viewer1@example.com"],"actionLinkTemplate":"Updated Azure Blob action link template","authenticationType":"ManagedIdentity","dataSourceParameter":{"connectionString":"Updated Azure Blob connection string","container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"}})
  .reply(200, {"dataFeedId":"47336207-4e5e-4fd3-997b-20d5428537d5","dataFeedName":"Updated-Azure-Blob-data-feed-162267904219108315","metrics":[{"metricId":"ac5e5f13-0b75-43b3-86bb-83bb43705a01","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"5a47719f-18f0-45d8-a56b-b4f492b1692d","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-01T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":5,"minRetryIntervalInSeconds":4,"maxConcurrency":3,"viewMode":"Public","admins":["kaghiya@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-03T00:10:41Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1395',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5f9e2ecd-65cc-480e-a001-cb3994d60f56',
  'x-envoy-upstream-service-time',
  '6028',
  'apim-request-id',
  '5f9e2ecd-65cc-480e-a001-cb3994d60f56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/47336207-4e5e-4fd3-997b-20d5428537d5')
  .reply(200, {"dataFeedId":"47336207-4e5e-4fd3-997b-20d5428537d5","dataFeedName":"Updated-Azure-Blob-data-feed-162267904219108315","metrics":[{"metricId":"ac5e5f13-0b75-43b3-86bb-83bb43705a01","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"5a47719f-18f0-45d8-a56b-b4f492b1692d","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-01T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":5,"minRetryIntervalInSeconds":4,"maxConcurrency":3,"viewMode":"Public","admins":["kaghiya@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-03T00:10:41Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1395',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ed5c528f-e080-4b97-a530-f855f84169fe',
  'x-envoy-upstream-service-time',
  '201',
  'apim-request-id',
  'ed5c528f-e080-4b97-a530-f855f84169fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:47 GMT'
]);
