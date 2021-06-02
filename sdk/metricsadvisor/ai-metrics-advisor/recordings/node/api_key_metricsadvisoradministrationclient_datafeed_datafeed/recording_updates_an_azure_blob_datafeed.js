let nock = require('nock');

module.exports.hash = "3b43656b23c81d34408ecfdba58d6778";

module.exports.testInfo = {"uniqueName":{"Updated-Azure-Blob-data-feed-":"Updated-Azure-Blob-data-feed-162260297678503462"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/036f0f01-e1c9-4ff5-aefd-f044ec23f355', {"dataSourceType":"AzureBlob","dataFeedName":"Updated-Azure-Blob-data-feed-162260297678503462","dataFeedDescription":"Updated Azure Blob description","timestampColumn":"UpdatedTimestampeColumn","dataStartFrom":"2020-08-01T00:00:00.000Z","startOffsetInSeconds":2,"maxConcurrency":3,"minRetryIntervalInSeconds":4,"stopRetryAfterInSeconds":5,"needRollup":"AlreadyRollup","allUpIdentification":"__Existing__","fillMissingPointType":"PreviousValue","viewMode":"Public","viewers":["viewer1@example.com"],"actionLinkTemplate":"Updated Azure Blob action link template","authenticationType":"ManagedIdentity","dataSourceParameter":{"connectionString":"Updated Azure Blob connection string","container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"}})
  .reply(200, {"dataFeedId":"036f0f01-e1c9-4ff5-aefd-f044ec23f355","dataFeedName":"Updated-Azure-Blob-data-feed-162260297678503462","metrics":[{"metricId":"921ba8e2-75ff-4386-a025-0c957c7b1860","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"d9ab794f-04ad-4997-927f-5acea130e53a","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-01T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":5,"minRetryIntervalInSeconds":4,"maxConcurrency":3,"viewMode":"Public","admins":["kaghiya@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-02T03:02:55Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1395',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '09bc29db-c7fa-4b03-8a85-b669c48bb22c',
  'x-envoy-upstream-service-time',
  '1075',
  'apim-request-id',
  '09bc29db-c7fa-4b03-8a85-b669c48bb22c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:02:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/036f0f01-e1c9-4ff5-aefd-f044ec23f355')
  .reply(200, {"dataFeedId":"036f0f01-e1c9-4ff5-aefd-f044ec23f355","dataFeedName":"Updated-Azure-Blob-data-feed-162260297678503462","metrics":[{"metricId":"921ba8e2-75ff-4386-a025-0c957c7b1860","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"d9ab794f-04ad-4997-927f-5acea130e53a","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-01T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":5,"minRetryIntervalInSeconds":4,"maxConcurrency":3,"viewMode":"Public","admins":["kaghiya@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-02T03:02:55Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1395',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7143bd85-fefa-4595-ad8a-9529a3df5886',
  'x-envoy-upstream-service-time',
  '5240',
  'apim-request-id',
  '7143bd85-fefa-4595-ad8a-9529a3df5886',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:02 GMT'
]);
