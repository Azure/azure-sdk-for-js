let nock = require('nock');

module.exports.hash = "cf0ded1eb9c5115c57168d4b7890c27f";

module.exports.testInfo = {"uniqueName":{"Updated-Azure-Blob-data-feed-":"Updated-Azure-Blob-data-feed-160530447047709433"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/87fa49b3-18fe-43fb-bd41-faf3f64eb951', {"dataSourceType":"AzureBlob","dataFeedName":"Updated-Azure-Blob-data-feed-160530447047709433","dataFeedDescription":"Updated Azure Blob description","timestampColumn":"UpdatedTimestampeColumn","dataStartFrom":"2020-08-01T00:00:00.000Z","startOffsetInSeconds":2,"maxConcurrency":3,"minRetryIntervalInSeconds":4,"stopRetryAfterInSeconds":5,"needRollup":"AlreadyRollup","allUpIdentification":"__Existing__","fillMissingPointType":"PreviousValue","viewMode":"Public","viewers":["viewer1@example.com"],"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"connectionString":"Updated Azure Blob connection string","container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'db966ed8-d770-4ca0-abfa-25342f31c984',
  'x-envoy-upstream-service-time',
  '521',
  'apim-request-id',
  'db966ed8-d770-4ca0-abfa-25342f31c984',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/87fa49b3-18fe-43fb-bd41-faf3f64eb951')
  .reply(200, {"dataFeedId":"87fa49b3-18fe-43fb-bd41-faf3f64eb951","dataFeedName":"Updated-Azure-Blob-data-feed-160530447047709433","metrics":[{"metricId":"2c49c436-25ce-478c-ba72-08fedc3a8f22","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"cb5e2570-3685-4a75-a21b-ee881c7c82d1","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-01T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":5,"minRetryIntervalInSeconds":4,"maxConcurrency":3,"viewMode":"Public","admins":["kaghiya@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T21:54:29Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","connectionString":"Updated Azure Blob connection string","blobTemplate":"Updated Azure Blob template"}}, [
  'Content-Length',
  '1458',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a583a400-243a-441f-b68a-af6b9a37fa3d',
  'x-envoy-upstream-service-time',
  '161',
  'apim-request-id',
  'a583a400-243a-441f-b68a-af6b9a37fa3d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:30 GMT'
]);
