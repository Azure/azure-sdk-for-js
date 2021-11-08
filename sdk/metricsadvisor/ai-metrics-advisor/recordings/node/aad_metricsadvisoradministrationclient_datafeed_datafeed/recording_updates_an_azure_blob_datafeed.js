let nock = require('nock');

module.exports.hash = "c606fc545df3ea7d2093f4675aa59f87";

module.exports.testInfo = {"uniqueName":{"Updated-Azure-Blob-data-feed-":"Updated-Azure-Blob-data-feed-163634429862707594"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  '5109f666-238e-4ec6-90af-389f702fb600',
  'x-ms-ests-server',
  '2.1.12197.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ahz1pyB6AzNFvOUpkpm9LVfGLH8mAQAAAOqYGtkOAAAA; expires=Wed, 08-Dec-2021 04:04:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 04:04:58 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/f6550179-af42-4258-9c51-1681f240b93a', {"dataSourceType":"AzureBlob","dataFeedName":"Updated-Azure-Blob-data-feed-163634429862707594","dataFeedDescription":"Updated Azure Blob description","timestampColumn":"UpdatedTimestampeColumn","dataStartFrom":"2020-10-30T00:00:00.000Z","startOffsetInSeconds":2,"maxConcurrency":3,"minRetryIntervalInSeconds":64,"stopRetryAfterInSeconds":65,"needRollup":"AlreadyRollup","allUpIdentification":"__Existing__","fillMissingPointType":"PreviousValue","viewMode":"Public","viewers":["viewer1@example.com"],"actionLinkTemplate":"Updated Azure Blob action link template","authenticationType":"ManagedIdentity","dataSourceParameter":{"connectionString":"Updated Azure Blob connection string","container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"}})
  .reply(200, {"dataFeedId":"f6550179-af42-4258-9c51-1681f240b93a","dataFeedName":"Updated-Azure-Blob-data-feed-163634429862707594","metrics":[{"metricId":"7c239b0a-6dcc-4c77-8bbb-3ee732e18e5c","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"a722f184-06ad-4896-b2ec-a7093222cceb","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-10-30T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"UpdatedTimestampeColumn","startOffsetInSeconds":2,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__Existing__","needRollup":"AlreadyRollup","fillMissingPointType":"PreviousValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Updated Azure Blob description","stopRetryAfterInSeconds":65,"minRetryIntervalInSeconds":64,"maxConcurrency":3,"viewMode":"Public","admins":["azure_client_id"],"viewers":["viewer1@example.com"],"creator":"azure_client_id","status":"Active","createdTime":"2021-11-08T04:04:57Z","isAdmin":true,"actionLinkTemplate":"Updated Azure Blob action link template","dataSourceParameter":{"container":"Updated Azure Blob container","blobTemplate":"Updated Azure Blob template"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1427',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6792affe-e4ce-40ec-b7a0-ed6376d46c6e',
  'x-envoy-upstream-service-time',
  '831',
  'apim-request-id',
  '6792affe-e4ce-40ec-b7a0-ed6376d46c6e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:04:59 GMT'
]);
