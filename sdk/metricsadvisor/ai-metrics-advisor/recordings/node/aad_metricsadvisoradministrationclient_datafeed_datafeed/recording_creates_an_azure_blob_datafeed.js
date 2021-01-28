let nock = require('nock');

module.exports.hash = "6ab5a3c990cb6149a7f1ea548b51fce0";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-161185891922601309","js-test-appInsightsFeed-":"js-test-appInsightsFeed-161185891922600692","js-test-sqlServerFeed-":"js-test-sqlServerFeed-161185891922602298","js-test-cosmosFeed-":"js-test-cosmosFeed-161185891922604141","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-161185891922608535","js-test-tableFeed-":"js-test-tableFeed-161185891922600262","js-test-httpRequestFeed-":"js-test-httpRequestFeed-161185891922606118","js-test-influxdbFeed-":"js-test-influxdbFeed-161185891922607037","js-test-mongoDbFeed-":"js-test-mongoDbFeed-161185891922606010","js-test-mySqlFeed-":"js-test-mySqlFeed-161185891922602642","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-161185891922602728"},"newDate":{}}

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
  '60848192-f311-43fb-b23f-3668e5832a01',
  'x-ms-ests-server',
  '2.1.11444.8 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ApfWhSXccCtPucduKrcPhWnGLH8mAQAAAOf6pNcOAAAA; expires=Sat, 27-Feb-2021 18:35:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Jan 2021 18:35:19 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-161185891922601309","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/6f5bff45-43ec-41a9-a0e3-6660c1d9b492',
  'x-request-id',
  '494fbf37-7a79-4197-9498-8653f1fb0c91',
  'x-envoy-upstream-service-time',
  '1450',
  'apim-request-id',
  '494fbf37-7a79-4197-9498-8653f1fb0c91',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Jan 2021 18:35:22 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6f5bff45-43ec-41a9-a0e3-6660c1d9b492')
  .reply(200, {"dataFeedId":"6f5bff45-43ec-41a9-a0e3-6660c1d9b492","dataFeedName":"js-test-datafeed-161185891922601309","metrics":[{"metricId":"4658f647-2f0c-44a2-8479-2ba4c0aa1fd1","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"ad6c909e-bc9d-47ec-b9e4-069333e05161","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-01-28T18:35:22Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1717',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b922d7f7-d9aa-46d0-abab-95f02a5b5f26',
  'x-envoy-upstream-service-time',
  '1097',
  'apim-request-id',
  'b922d7f7-d9aa-46d0-abab-95f02a5b5f26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Jan 2021 18:35:23 GMT'
]);
