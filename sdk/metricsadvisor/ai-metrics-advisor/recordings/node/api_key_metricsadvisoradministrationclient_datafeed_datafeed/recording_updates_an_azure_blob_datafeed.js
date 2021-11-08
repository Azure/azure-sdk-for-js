let nock = require('nock');

module.exports.hash = "c606fc545df3ea7d2093f4675aa59f87";

module.exports.testInfo = {"uniqueName":{"Updated-Azure-Blob-data-feed-":"Updated-Azure-Blob-data-feed-163634432215002327"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/0992b58a-87f5-498b-8909-081a9fe869bb', {"dataSourceType":"AzureBlob","dataFeedName":"Updated-Azure-Blob-data-feed-163634432215002327","dataFeedDescription":"Updated Azure Blob description","timestampColumn":"UpdatedTimestampeColumn","dataStartFrom":"2020-10-30T00:00:00.000Z","startOffsetInSeconds":2,"maxConcurrency":3,"minRetryIntervalInSeconds":64,"stopRetryAfterInSeconds":65,"needRollup":"AlreadyRollup","allUpIdentification":"__Existing__","fillMissingPointType":"PreviousValue","viewMode":"Public","viewers":["viewer1@example.com"],"actionLinkTemplate":"Updated Azure Blob action link template","authenticationType":"ManagedIdentity","dataSourceParameter":{"connectionString":"Updated Azure Blob connection string","container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"}})
  .reply(200, {"dataFeedId":"0992b58a-87f5-498b-8909-081a9fe869bb","dataFeedName":"Updated-Azure-Blob-data-feed-163634432215002327","metrics":[{"metricId":"93c9504e-a2f0-4be8-aed5-4f2933d487b1","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"1638e0e5-c0be-4dca-a1cd-207eb6ece0de","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-10-30T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":65,"minRetryIntervalInSeconds":64,"maxConcurrency":3,"viewMode":"Public","admins":["kaghiya@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T04:05:21Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1397',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8dd82853-b2b6-4e27-9b32-e9a491f168fb',
  'x-envoy-upstream-service-time',
  '755',
  'apim-request-id',
  '8dd82853-b2b6-4e27-9b32-e9a491f168fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:22 GMT'
]);
