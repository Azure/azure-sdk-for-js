let nock = require('nock');

module.exports.hash = "54e0f75c85f3b4f3e8c663437b5cc74e";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162285906995400385","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162285906995407018","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162285906995401073","js-test-cosmosFeed-":"js-test-cosmosFeed-162285906995408667","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162285906995405054","js-test-tableFeed-":"js-test-tableFeed-162285906995405392","js-test-httpRequestFeed-":"js-test-httpRequestFeed-162285906995401146","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-162285906995406934","js-test-influxdbFeed-":"js-test-influxdbFeed-162285906995409038","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162285906995403897","js-test-mySqlFeed-":"js-test-mySqlFeed-162285906995403569","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162285906995407238","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-162285906995402241"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
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
  'bf1360bb-4d4e-47d7-bc5e-91a9c2286400',
  'x-ms-ests-server',
  '2.1.11787.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhSHmgvHuqBPqIdBU-v27oLGLH8mAQAAAD3UTNgOAAAA; expires=Mon, 05-Jul-2021 02:11:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 05 Jun 2021 02:11:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureDataLakeStorageGen2","dataFeedName":"js-test-dataLakeGenFeed-162285906995402241","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"accountName":"account-name","accountKey":"account-key","fileSystemName":"file-system-name","directoryTemplate":"directory-template","fileTemplate":"file-template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/b206e895-80f1-4fbf-8f77-3dd2213629a8',
  'x-request-id',
  '41a13509-0e97-4442-b289-304a8c1a7521',
  'x-envoy-upstream-service-time',
  '1408',
  'apim-request-id',
  '41a13509-0e97-4442-b289-304a8c1a7521',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 02:11:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/b206e895-80f1-4fbf-8f77-3dd2213629a8')
  .reply(200, {"dataFeedId":"b206e895-80f1-4fbf-8f77-3dd2213629a8","dataFeedName":"js-test-dataLakeGenFeed-162285906995402241","metrics":[{"metricId":"43aac5f5-12b8-4f25-bd6d-cb4929aaf49f","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"c07b59c4-9cdb-44d3-8d1d-f0043c7a61d6","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureDataLakeStorageGen2","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-06-05T02:11:11Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"fileTemplate":"file-template","accountName":"account-name","directoryTemplate":"directory-template","fileSystemName":"file-system-name"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1383',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f6910bc1-8001-4be8-9b48-498e976b6cbc',
  'x-envoy-upstream-service-time',
  '181',
  'apim-request-id',
  'f6910bc1-8001-4be8-9b48-498e976b6cbc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 02:11:11 GMT'
]);
