let nock = require('nock');

module.exports.hash = "e63471a38236c5985bbc85fedfb02984";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-161070010542107518","js-test-appInsightsFeed-":"js-test-appInsightsFeed-161070010542102492","js-test-sqlServerFeed-":"js-test-sqlServerFeed-161070010542102400","js-test-cosmosFeed-":"js-test-cosmosFeed-161070010542200153","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-161070010542200658","js-test-tableFeed-":"js-test-tableFeed-161070010542200056","js-test-httpRequestFeed-":"js-test-httpRequestFeed-161070010542207035","js-test-influxdbFeed-":"js-test-influxdbFeed-161070010542202167","js-test-mongoDbFeed-":"js-test-mongoDbFeed-161070010542202854","js-test-mySqlFeed-":"js-test-mySqlFeed-161070010542206773","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-161070010542201274"},"newDate":{}}

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
  'a3158d21-7b21-43a3-a545-c6600fd84100',
  'x-ms-ests-server',
  '2.1.11397.13 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AsoDeAShyiJLlORVED-UD3HGLH8mEQAAAGdLk9cOAAAA; expires=Sun, 14-Feb-2021 08:41:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Jan 2021 08:41:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-161070010542107518","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/0f9c2a89-52f7-4e1c-b808-b42c973be64c',
  'x-request-id',
  '77c611e5-7c83-4fd3-82fa-922476324800',
  'x-envoy-upstream-service-time',
  '854',
  'apim-request-id',
  '77c611e5-7c83-4fd3-82fa-922476324800',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/0f9c2a89-52f7-4e1c-b808-b42c973be64c')
  .reply(200, {"dataFeedId":"0f9c2a89-52f7-4e1c-b808-b42c973be64c","dataFeedName":"js-test-datafeed-161070010542107518","metrics":[{"metricId":"5428e673-1300-47e2-8a21-f3e12403f588","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"1549fbd3-d2cd-4d6b-8182-4fa63434be03","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-01-15T08:41:46Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1717',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '31470000-6831-42b2-af49-ad8bf0b4376d',
  'x-envoy-upstream-service-time',
  '183',
  'apim-request-id',
  '31470000-6831-42b2-af49-ad8bf0b4376d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:46 GMT'
]);