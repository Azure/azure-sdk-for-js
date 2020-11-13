let nock = require('nock');

module.exports.hash = "cf0ded1eb9c5115c57168d4b7890c27f";

module.exports.testInfo = {"uniqueName":{"Updated-Azure-Blob-data-feed-":"Updated-Azure-Blob-data-feed-160523008349600490"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/223c7496-4dda-4c68-a210-3a93b92e514b', {"dataSourceType":"AzureBlob","dataFeedName":"Updated-Azure-Blob-data-feed-160523008349600490","dataFeedDescription":"Updated Azure Blob description","timestampColumn":"UpdatedTimestampeColumn","dataStartFrom":"2020-08-01T00:00:00.000Z","startOffsetInSeconds":2,"maxConcurrency":3,"minRetryIntervalInSeconds":4,"stopRetryAfterInSeconds":5,"needRollup":"AlreadyRollup","allUpIdentification":"__Existing__","fillMissingPointType":"PreviousValue","viewMode":"Public","viewers":["viewer1@example.com"],"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"connectionString":"Updated Azure Blob connection string","container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'bde73f39-cded-42f3-b49b-9878504ae97b',
  'x-envoy-upstream-service-time',
  '934',
  'apim-request-id',
  'bde73f39-cded-42f3-b49b-9878504ae97b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/223c7496-4dda-4c68-a210-3a93b92e514b')
  .reply(200, {"dataFeedId":"223c7496-4dda-4c68-a210-3a93b92e514b","dataFeedName":"Updated-Azure-Blob-data-feed-160523008349600490","metrics":[{"metricId":"b1e9bef7-b076-4611-8205-b460b551c51c","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"19e9ce7f-453d-4622-9091-5e3c51d259d0","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-01T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":5,"minRetryIntervalInSeconds":4,"maxConcurrency":3,"viewMode":"Public","admins":["kaghiya@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T01:14:42Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","connectionString":"Updated Azure Blob connection string","blobTemplate":"Updated Azure Blob template"}}, [
  'Content-Length',
  '1472',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ef9bdf9c-8726-4c7e-aa5a-dd62e68dc06a',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  'ef9bdf9c-8726-4c7e-aa5a-dd62e68dc06a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:43 GMT'
]);
