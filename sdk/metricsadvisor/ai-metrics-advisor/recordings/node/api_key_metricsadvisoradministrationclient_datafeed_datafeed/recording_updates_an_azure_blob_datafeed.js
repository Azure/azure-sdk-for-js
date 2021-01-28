let nock = require('nock');

module.exports.hash = "921e7e6bd47cb8827743cb148a6f47a3";

module.exports.testInfo = {"uniqueName":{"Updated-Azure-Blob-data-feed-":"Updated-Azure-Blob-data-feed-161070014231909377"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/6214e294-ecab-47b3-8494-ebce69e03dd6', {"dataSourceType":"AzureBlob","dataFeedName":"Updated-Azure-Blob-data-feed-161070014231909377","dataFeedDescription":"Updated Azure Blob description","timestampColumn":"UpdatedTimestampeColumn","dataStartFrom":"2020-08-01T00:00:00.000Z","startOffsetInSeconds":2,"maxConcurrency":3,"minRetryIntervalInSeconds":4,"stopRetryAfterInSeconds":5,"needRollup":"AlreadyRollup","allUpIdentification":"__Existing__","fillMissingPointType":"PreviousValue","viewMode":"Public","viewers":["viewer1@example.com"],"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"connectionString":"Updated Azure Blob connection string","container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '71a1a222-bf71-4ea4-9db9-72eb7346e7b2',
  'x-envoy-upstream-service-time',
  '511',
  'apim-request-id',
  '71a1a222-bf71-4ea4-9db9-72eb7346e7b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:22 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6214e294-ecab-47b3-8494-ebce69e03dd6')
  .reply(200, {"dataFeedId":"6214e294-ecab-47b3-8494-ebce69e03dd6","dataFeedName":"Updated-Azure-Blob-data-feed-161070014231909377","metrics":[{"metricId":"f4089130-5b99-4185-b9f6-2358e6b64b6b","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"1f72e871-1fe2-48a8-acce-e3a936d27289","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-01T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":5,"minRetryIntervalInSeconds":4,"maxConcurrency":3,"viewMode":"Public","admins":["kaghiya@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-01-15T08:42:20Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","connectionString":"Updated Azure Blob connection string","blobTemplate":"Updated Azure Blob template"}}, [
  'Content-Length',
  '1458',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '50b1c5b1-1ec1-4c23-84f4-e666d0fcc9e1',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  '50b1c5b1-1ec1-4c23-84f4-e666d0fcc9e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:22 GMT'
]);
