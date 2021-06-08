let nock = require('nock');

module.exports.hash = "3b43656b23c81d34408ecfdba58d6778";

module.exports.testInfo = {"uniqueName":{"Updated-Azure-Blob-data-feed-":"Updated-Azure-Blob-data-feed-162267887515409627"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'b097fef5-cee0-4912-9ee1-f45c15e40900',
  'x-ms-ests-server',
  '2.1.11787.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ao3LGmWoTnxIo4o1diRecJfGLH8mAgAAAFgUStgOAAAA; expires=Sat, 03-Jul-2021 00:07:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 03 Jun 2021 00:07:55 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/78dc9b2a-0579-4986-a76b-0a71017bad86', {"dataSourceType":"AzureBlob","dataFeedName":"Updated-Azure-Blob-data-feed-162267887515409627","dataFeedDescription":"Updated Azure Blob description","timestampColumn":"UpdatedTimestampeColumn","dataStartFrom":"2020-08-01T00:00:00.000Z","startOffsetInSeconds":2,"maxConcurrency":3,"minRetryIntervalInSeconds":4,"stopRetryAfterInSeconds":5,"needRollup":"AlreadyRollup","allUpIdentification":"__Existing__","fillMissingPointType":"PreviousValue","viewMode":"Public","viewers":["viewer1@example.com"],"actionLinkTemplate":"Updated Azure Blob action link template","authenticationType":"ManagedIdentity","dataSourceParameter":{"connectionString":"Updated Azure Blob connection string","container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"}})
  .reply(200, {"dataFeedId":"78dc9b2a-0579-4986-a76b-0a71017bad86","dataFeedName":"Updated-Azure-Blob-data-feed-162267887515409627","metrics":[{"metricId":"1fc1391d-dcdd-4e16-a4ab-727d475c1b0a","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"93fc338b-1d61-447c-835d-4cb96d61db09","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-01T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":5,"minRetryIntervalInSeconds":4,"maxConcurrency":3,"viewMode":"Public","admins":["azure_client_id"],"viewers":["viewer1@example.com"],"creator":"azure_client_id","status":"Active","createdTime":"2021-06-03T00:07:54Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1425',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fa3c2979-2eca-4bca-a636-b7ea58b100c1',
  'x-envoy-upstream-service-time',
  '765',
  'apim-request-id',
  'fa3c2979-2eca-4bca-a636-b7ea58b100c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:07:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/78dc9b2a-0579-4986-a76b-0a71017bad86')
  .reply(200, {"dataFeedId":"78dc9b2a-0579-4986-a76b-0a71017bad86","dataFeedName":"Updated-Azure-Blob-data-feed-162267887515409627","metrics":[{"metricId":"1fc1391d-dcdd-4e16-a4ab-727d475c1b0a","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"93fc338b-1d61-447c-835d-4cb96d61db09","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-01T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":5,"minRetryIntervalInSeconds":4,"maxConcurrency":3,"viewMode":"Public","admins":["azure_client_id"],"viewers":["viewer1@example.com"],"creator":"azure_client_id","status":"Active","createdTime":"2021-06-03T00:07:54Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1425',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c4c0b66a-26ba-42bd-8b1e-6e4f8abcb210',
  'x-envoy-upstream-service-time',
  '5138',
  'apim-request-id',
  'c4c0b66a-26ba-42bd-8b1e-6e4f8abcb210',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:08:01 GMT'
]);
