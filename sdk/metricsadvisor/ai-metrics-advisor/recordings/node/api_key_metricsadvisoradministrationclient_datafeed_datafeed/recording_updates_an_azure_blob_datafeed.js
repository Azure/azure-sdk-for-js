let nock = require('nock');

module.exports.hash = "7190eeaa9f46404c9b69998c2d76c741";

module.exports.testInfo = {"uniqueName":{"Updated-Azure-Blob-data-feed-":"Updated-Azure-Blob-data-feed-162260136404104028"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/667c1f71-6f1c-453c-b647-7afbb0ae3820', {"dataSourceType":"AzureBlob","dataFeedName":"Updated-Azure-Blob-data-feed-162260136404104028","dataFeedDescription":"Updated Azure Blob description","timestampColumn":"UpdatedTimestampeColumn","dataStartFrom":"2020-08-01T00:00:00.000Z","startOffsetInSeconds":2,"maxConcurrency":3,"minRetryIntervalInSeconds":4,"stopRetryAfterInSeconds":5,"needRollup":"AlreadyRollup","allUpIdentification":"__Existing__","fillMissingPointType":"PreviousValue","viewMode":"Public","viewers":["viewer1@example.com"],"actionLinkTemplate":"Updated Azure Blob action link template","authenticationType":"ManagedIdentity","dataSourceParameter":{"connectionString":"Updated Azure Blob connection string","container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"}})
  .reply(200, {"dataFeedId":"667c1f71-6f1c-453c-b647-7afbb0ae3820","dataFeedName":"Updated-Azure-Blob-data-feed-162260136404104028","metrics":[{"metricId":"29d0fc23-9eb6-4dcc-bdd0-e856f72657ec","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"85e85e8c-9801-4bb8-ae98-88aa6f7ebdf7","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-01T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":5,"minRetryIntervalInSeconds":4,"maxConcurrency":3,"viewMode":"Public","admins":["kaghiya@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-02T02:36:03Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1395',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '48cf6ad9-c4d5-47c3-94ef-bd4a3ce73f03',
  'x-envoy-upstream-service-time',
  '1072',
  'apim-request-id',
  '48cf6ad9-c4d5-47c3-94ef-bd4a3ce73f03',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/667c1f71-6f1c-453c-b647-7afbb0ae3820')
  .reply(200, {"dataFeedId":"667c1f71-6f1c-453c-b647-7afbb0ae3820","dataFeedName":"Updated-Azure-Blob-data-feed-162260136404104028","metrics":[{"metricId":"29d0fc23-9eb6-4dcc-bdd0-e856f72657ec","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"85e85e8c-9801-4bb8-ae98-88aa6f7ebdf7","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-01T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":5,"minRetryIntervalInSeconds":4,"maxConcurrency":3,"viewMode":"Public","admins":["kaghiya@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-02T02:36:03Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1395',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1973a2f6-e0e9-4bf3-aabd-a14d252d00eb',
  'x-envoy-upstream-service-time',
  '243',
  'apim-request-id',
  '1973a2f6-e0e9-4bf3-aabd-a14d252d00eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:05 GMT'
]);
