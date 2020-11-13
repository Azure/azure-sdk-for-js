let nock = require('nock');

module.exports.hash = "cf0ded1eb9c5115c57168d4b7890c27f";

module.exports.testInfo = {"uniqueName":{"Updated-Azure-Blob-data-feed-":"Updated-Azure-Blob-data-feed-160530498149604639"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/d586b64e-ef6f-4a24-9d37-97c72d04836e', {"dataSourceType":"AzureBlob","dataFeedName":"Updated-Azure-Blob-data-feed-160530498149604639","dataFeedDescription":"Updated Azure Blob description","timestampColumn":"UpdatedTimestampeColumn","dataStartFrom":"2020-08-01T00:00:00.000Z","startOffsetInSeconds":2,"maxConcurrency":3,"minRetryIntervalInSeconds":4,"stopRetryAfterInSeconds":5,"needRollup":"AlreadyRollup","allUpIdentification":"__Existing__","fillMissingPointType":"PreviousValue","viewMode":"Public","viewers":["viewer1@example.com"],"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"connectionString":"Updated Azure Blob connection string","container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '8959b587-6b2e-4262-ab6e-af109696ef9b',
  'x-envoy-upstream-service-time',
  '518',
  'apim-request-id',
  '8959b587-6b2e-4262-ab6e-af109696ef9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/d586b64e-ef6f-4a24-9d37-97c72d04836e')
  .reply(200, {"dataFeedId":"d586b64e-ef6f-4a24-9d37-97c72d04836e","dataFeedName":"Updated-Azure-Blob-data-feed-160530498149604639","metrics":[{"metricId":"e0edc70e-b73e-4dde-8434-ca18cfd6f0f1","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"dc00c494-c245-423e-9c08-d75518b88398","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-01T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":5,"minRetryIntervalInSeconds":4,"maxConcurrency":3,"viewMode":"Public","admins":["kaghiya@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T22:03:00Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","connectionString":"Updated Azure Blob connection string","blobTemplate":"Updated Azure Blob template"}}, [
  'Content-Length',
  '1458',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a892a033-d45d-4caf-992a-c8907fadc91b',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  'a892a033-d45d-4caf-992a-c8907fadc91b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:01 GMT'
]);
