let nock = require('nock');

module.exports.hash = "413113d9b30eef2f13c2941fcef17d32";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-163636431278602069","js-test-appInsightsFeed-":"js-test-appInsightsFeed-163636431278601193","js-test-sqlServerFeed-":"js-test-sqlServerFeed-163636431278608087","js-test-cosmosFeed-":"js-test-cosmosFeed-163636431278608959","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-163636431278703777","js-test-tableFeed-":"js-test-tableFeed-163636431278708726","js-test-eventhubRequestFeed-":"js-test-eventhubRequestFeed-163636431278703857","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-163636431278706624","js-test-influxdbFeed-":"js-test-influxdbFeed-163636431278700473","js-test-mongoDbFeed-":"js-test-mongoDbFeed-163636431278706662","js-test-mySqlFeed-":"js-test-mySqlFeed-163636431278708832","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-163636431278704764","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-163636431278703651"},"newDate":{}}

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
  'b2a01c86-1f7c-49a8-bfe3-f1bcb75c9c00',
  'x-ms-ests-server',
  '2.1.12197.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AmiHWK21zGVIvBGEQkD2pT0; expires=Wed, 08-Dec-2021 09:38:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:38:32 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-163636431278602069","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/6323a90c-9d0e-4c5a-a72f-5cf592ebbd3a',
  'x-request-id',
  'c3ff763c-2f1c-4516-aa63-a0e23034a9f4',
  'x-envoy-upstream-service-time',
  '556',
  'apim-request-id',
  'c3ff763c-2f1c-4516-aa63-a0e23034a9f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6323a90c-9d0e-4c5a-a72f-5cf592ebbd3a')
  .reply(200, {"dataFeedId":"6323a90c-9d0e-4c5a-a72f-5cf592ebbd3a","dataFeedName":"js-test-datafeed-163636431278602069","metrics":[{"metricId":"12365a4a-b5fb-4e19-8aae-7bac00a7254d","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"20122872-0652-4324-8687-4042105b16e0","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-11-08T09:38:33Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1278',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '002b5cf4-a31e-4377-b499-7c813af4e4a2',
  'x-envoy-upstream-service-time',
  '108',
  'apim-request-id',
  '002b5cf4-a31e-4377-b499-7c813af4e4a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:33 GMT'
]);
