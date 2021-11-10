let nock = require('nock');

module.exports.hash = "08381dcda5cf9628f8e8572591a59161";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72698866-8641-4147-9144-24744011447/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  '91d5a887-b9c4-4618-9a67-2c4c64a6b900',
  'x-ms-ests-server',
  '2.1.12197.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AmryKxPZ7MFBkfkzJLZqkyo; expires=Wed, 08-Dec-2021 09:38:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:38:45 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureDataLakeStorageGen2","dataFeedName":"js-test-dataLakeGenFeed-163636431278703651","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"accountName":"account-name","accountKey":"account-key","fileSystemName":"file-system-name","directoryTemplate":"directory-template","fileTemplate":"file-template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/ce7bba4a-daa3-475e-b9c4-64e29d7c3c53',
  'x-request-id',
  '81343c3e-a86c-4868-b811-7df8a489d3c4',
  'x-envoy-upstream-service-time',
  '479',
  'apim-request-id',
  '81343c3e-a86c-4868-b811-7df8a489d3c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/ce7bba4a-daa3-475e-b9c4-64e29d7c3c53')
  .reply(200, {"dataFeedId":"ce7bba4a-daa3-475e-b9c4-64e29d7c3c53","dataFeedName":"js-test-dataLakeGenFeed-163636431278703651","metrics":[{"metricId":"23584200-467e-4e64-97c5-2cb45c9343e7","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"72a0bddc-ed4b-4dc2-b97d-87e3a85e0892","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureDataLakeStorageGen2","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-11-08T09:38:45Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"fileTemplate":"file-template","accountName":"account-name","directoryTemplate":"directory-template","fileSystemName":"file-system-name"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1383',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c7b39bf1-da75-466e-8eac-313891d743d0',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  'c7b39bf1-da75-466e-8eac-313891d743d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:46 GMT'
]);
