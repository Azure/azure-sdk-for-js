let nock = require('nock');

module.exports.hash = "20f35647f7107896febde59011d90dab";

module.exports.testInfo = {"uniqueName":{"Updated-Azure-Blob-data-feed-":"Updated-Azure-Blob-data-feed-160323422859605514"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/78e1c1f1-64ee-472c-9090-50a1070590d6', {"dataSourceType":"AzureBlob","dataFeedName":"Updated-Azure-Blob-data-feed-160323422859605514","dataFeedDescription":"Updated Azure Blob description","timestampColumn":"UpdatedTimestampeColumn","dataStartFrom":"2020-08-01T00:00:00.000Z","startOffsetInSeconds":2,"maxConcurrency":3,"minRetryIntervalInSeconds":4,"stopRetryAfterInSeconds":5,"needRollup":"AlreadyRollup","allUpIdentification":"__Existing__","fillMissingPointType":"PreviousValue","viewMode":"Public","viewers":["viewer1@example.com"],"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"connectionString":"Updated Azure Blob connection string","container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b0618dd9-be93-4e4c-a6c9-996546cc181c',
  'x-envoy-upstream-service-time',
  '966',
  'apim-request-id',
  'b0618dd9-be93-4e4c-a6c9-996546cc181c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:29 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/78e1c1f1-64ee-472c-9090-50a1070590d6')
  .reply(200, {"dataFeedId":"78e1c1f1-64ee-472c-9090-50a1070590d6","dataFeedName":"Updated-Azure-Blob-data-feed-160323422859605514","metrics":[{"metricId":"a8e3b41e-d538-42fa-ac4d-77c21b512c89","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"1e49b4f2-5dd6-4a03-9d3e-9b3a0fbdb431","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-01T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":5,"minRetryIntervalInSeconds":4,"maxConcurrency":3,"viewMode":"Public","admins":["yumeng@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-10-20T22:50:21Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","connectionString":"Updated Azure Blob connection string","blobTemplate":"Updated Azure Blob template"}}, [
  'Content-Length',
  '1470',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cd1bcf35-f695-422b-985b-f6924c1aa688',
  'x-envoy-upstream-service-time',
  '5565',
  'apim-request-id',
  'cd1bcf35-f695-422b-985b-f6924c1aa688',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:34 GMT',
  'Connection',
  'close'
]);
