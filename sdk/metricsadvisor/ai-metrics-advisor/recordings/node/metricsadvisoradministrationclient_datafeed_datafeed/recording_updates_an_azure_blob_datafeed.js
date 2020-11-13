let nock = require('nock');

module.exports.hash = "cf0ded1eb9c5115c57168d4b7890c27f";

module.exports.testInfo = {"uniqueName":{"Updated-Azure-Blob-data-feed-":"Updated-Azure-Blob-data-feed-160529679355904190"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/9e35715d-720b-4147-82fe-f79f3c56dc61', {"dataSourceType":"AzureBlob","dataFeedName":"Updated-Azure-Blob-data-feed-160529679355904190","dataFeedDescription":"Updated Azure Blob description","timestampColumn":"UpdatedTimestampeColumn","dataStartFrom":"2020-08-01T00:00:00.000Z","startOffsetInSeconds":2,"maxConcurrency":3,"minRetryIntervalInSeconds":4,"stopRetryAfterInSeconds":5,"needRollup":"AlreadyRollup","allUpIdentification":"__Existing__","fillMissingPointType":"PreviousValue","viewMode":"Public","viewers":["viewer1@example.com"],"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"connectionString":"Updated Azure Blob connection string","container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '806d1120-5007-4098-97a6-b1aa252f68db',
  'x-envoy-upstream-service-time',
  '487',
  'apim-request-id',
  '806d1120-5007-4098-97a6-b1aa252f68db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/9e35715d-720b-4147-82fe-f79f3c56dc61')
  .reply(200, {"dataFeedId":"9e35715d-720b-4147-82fe-f79f3c56dc61","dataFeedName":"Updated-Azure-Blob-data-feed-160529679355904190","metrics":[{"metricId":"81a4fe34-cc1c-4859-9944-f5bcc12367d2","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"9fefb598-e0d2-4284-9b7e-6fd2aeed08ea","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-01T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":5,"minRetryIntervalInSeconds":4,"maxConcurrency":3,"viewMode":"Public","admins":["kaghiya@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T19:46:32Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","connectionString":"Updated Azure Blob connection string","blobTemplate":"Updated Azure Blob template"}}, [
  'Content-Length',
  '1458',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3ead5ea4-56ab-4199-8df6-3667073c3adc',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  '3ead5ea4-56ab-4199-8df6-3667073c3adc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:34 GMT'
]);
