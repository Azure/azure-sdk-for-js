let nock = require('nock');

module.exports.hash = "cf0ded1eb9c5115c57168d4b7890c27f";

module.exports.testInfo = {"uniqueName":{"Updated-Azure-Blob-data-feed-":"Updated-Azure-Blob-data-feed-160530908070307003"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/f516e8ad-c70f-4471-962f-a6e77637f5d1', {"dataSourceType":"AzureBlob","dataFeedName":"Updated-Azure-Blob-data-feed-160530908070307003","dataFeedDescription":"Updated Azure Blob description","timestampColumn":"UpdatedTimestampeColumn","dataStartFrom":"2020-08-01T00:00:00.000Z","startOffsetInSeconds":2,"maxConcurrency":3,"minRetryIntervalInSeconds":4,"stopRetryAfterInSeconds":5,"needRollup":"AlreadyRollup","allUpIdentification":"__Existing__","fillMissingPointType":"PreviousValue","viewMode":"Public","viewers":["viewer1@example.com"],"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"connectionString":"Updated Azure Blob connection string","container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'c9c12cc1-3d24-47ae-af6d-eeaac80ac47b',
  'x-envoy-upstream-service-time',
  '601',
  'apim-request-id',
  'c9c12cc1-3d24-47ae-af6d-eeaac80ac47b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f516e8ad-c70f-4471-962f-a6e77637f5d1')
  .reply(200, {"dataFeedId":"f516e8ad-c70f-4471-962f-a6e77637f5d1","dataFeedName":"Updated-Azure-Blob-data-feed-160530908070307003","metrics":[{"metricId":"9347b82d-4eea-4bbb-9957-c51d5c960136","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"ba95d4b6-dddd-484b-aa93-689e6ae29d5f","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-01T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":5,"minRetryIntervalInSeconds":4,"maxConcurrency":3,"viewMode":"Public","admins":["kaghiya@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T23:11:14Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","connectionString":"Updated Azure Blob connection string","blobTemplate":"Updated Azure Blob template"}}, [
  'Content-Length',
  '1458',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bd7fedca-b99d-4473-a752-2715dc720748',
  'x-envoy-upstream-service-time',
  '278',
  'apim-request-id',
  'bd7fedca-b99d-4473-a752-2715dc720748',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:21 GMT'
]);
