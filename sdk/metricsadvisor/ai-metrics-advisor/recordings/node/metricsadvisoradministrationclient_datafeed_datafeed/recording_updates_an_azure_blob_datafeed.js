let nock = require('nock');

module.exports.hash = "f84ad66142ca85579371763264e21ed9";

module.exports.testInfo = {"uniqueName":{"Updated-Azure-Blob-data-feed-":"Updated-Azure-Blob-data-feed-160133130641308131"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/a5c71d07-59c8-4407-9c33-3ed4d6823f13', {"dataSourceType":"AzureBlob","dataFeedName":"Updated-Azure-Blob-data-feed-160133130641308131","dataFeedDescription":"Updated Azure Blob description","timestampColumn":"UpdatedTimestampeColumn","dataStartFrom":"2020-08-01T00:00:00.000Z","startOffsetInSeconds":2,"maxConcurrency":3,"minRetryIntervalInSeconds":4,"stopRetryAfterInSeconds":5,"needRollup":"AlreadyRollup","allUpIdentification":"__Existing__","fillMissingPointType":"PreviousValue","viewMode":"Public","viewers":["viewer1@example.com"],"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"connectionString":"Updated Azure Blob connection string","container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'ad86851c-ea4c-45dd-9ee6-b0bc493de1a9',
  'x-envoy-upstream-service-time',
  '585',
  'apim-request-id',
  'ad86851c-ea4c-45dd-9ee6-b0bc493de1a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 28 Sep 2020 22:15:01 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/a5c71d07-59c8-4407-9c33-3ed4d6823f13')
  .reply(200, {"dataFeedId":"a5c71d07-59c8-4407-9c33-3ed4d6823f13","dataFeedName":"Updated-Azure-Blob-data-feed-160133130641308131","metrics":[{"metricId":"b6edd9e7-3aaa-4aab-bba0-709ae6adc553","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"3806a64c-168e-4483-b90c-25a061c4090b","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-01T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":5,"minRetryIntervalInSeconds":4,"maxConcurrency":3,"viewMode":"Public","admins":["yumeng@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-09-28T22:15:00Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","connectionString":"Updated Azure Blob connection string","blobTemplate":"Updated Azure Blob template"}}, [
  'Content-Length',
  '1470',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '082b0e0f-8f18-4ba2-a52b-a71c93723ad6',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  '082b0e0f-8f18-4ba2-a52b-a71c93723ad6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 28 Sep 2020 22:15:02 GMT',
  'Connection',
  'close'
]);
