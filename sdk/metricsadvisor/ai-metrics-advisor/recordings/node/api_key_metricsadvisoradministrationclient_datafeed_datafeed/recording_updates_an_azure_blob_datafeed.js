let nock = require('nock');

module.exports.hash = "c606fc545df3ea7d2093f4675aa59f87";

module.exports.testInfo = {"uniqueName":{"Updated-Azure-Blob-data-feed-":"Updated-Azure-Blob-data-feed-163978429387808183"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('//metricsadvisor/v1.0/dataFeeds/c0b17aba-de6c-489d-b1df-2d97e405eca2', {"dataSourceType":"AzureBlob","dataFeedName":"Updated-Azure-Blob-data-feed-163978429387808183","dataFeedDescription":"Updated Azure Blob description","timestampColumn":"UpdatedTimestampeColumn","dataStartFrom":"2020-10-30T00:00:00.000Z","startOffsetInSeconds":2,"maxConcurrency":3,"minRetryIntervalInSeconds":64,"stopRetryAfterInSeconds":65,"needRollup":"AlreadyRollup","allUpIdentification":"__Existing__","fillMissingPointType":"PreviousValue","viewMode":"Public","viewers":["viewer1@example.com"],"actionLinkTemplate":"Updated Azure Blob action link template","authenticationType":"ManagedIdentity","dataSourceParameter":{"connectionString":"Updated Azure Blob connection string","container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"}})
  .reply(200, {"dataFeedId":"c0b17aba-de6c-489d-b1df-2d97e405eca2","dataFeedName":"Updated-Azure-Blob-data-feed-163978429387808183","metrics":[{"metricId":"6277f269-394e-4e10-af5f-9f63084f2710","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"e75f5854-075b-42ca-bc50-8402612207a0","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-10-30T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":65,"minRetryIntervalInSeconds":64,"maxConcurrency":3,"viewMode":"Public","admins":["kaghiya@microsoft.com"],"viewers":["viewer1@example.com"],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-12-17T23:38:12Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1397',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7166cc21-47b6-41bd-9b24-079ba4e45868',
  'x-envoy-upstream-service-time',
  '890',
  'apim-request-id',
  '7166cc21-47b6-41bd-9b24-079ba4e45868',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:14 GMT'
]);
