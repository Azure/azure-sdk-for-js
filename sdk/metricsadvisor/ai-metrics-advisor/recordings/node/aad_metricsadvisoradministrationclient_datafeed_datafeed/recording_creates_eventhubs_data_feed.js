let nock = require('nock');

module.exports.hash = "b305b062177574b168150bc47bb53ffe";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162456611703607360","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162456611703602601","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162456611703605931","js-test-cosmosFeed-":"js-test-cosmosFeed-162456611703606158","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162456611703605594","js-test-tableFeed-":"js-test-tableFeed-162456611703601948","js-test-httpRequestFeed-":"js-test-httpRequestFeed-162456611703601598","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-162456611703605729","js-test-influxdbFeed-":"js-test-influxdbFeed-162456611703608797","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162456611703608062","js-test-mySqlFeed-":"js-test-mySqlFeed-162456611703601892","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162456611703605513","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-162456611703602792"},"newDate":{}}

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
  '0825421b-0412-4892-9d10-18085d133a00',
  'x-ms-ests-server',
  '2.1.11829.9 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ap4NeeLKqOpIlcTRHUTrwPfGLH8mAQAAAGXgZtgOAAAA; expires=Sat, 24-Jul-2021 20:21:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 24 Jun 2021 20:21:56 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureEventHubs","dataFeedName":"js-test-httpRequestFeed-162456611703601598","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"eventhub-connection-string","consumerGroup":"consumer-group"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/1409ab03-d455-465e-9df0-ef5db2cdb961',
  'x-request-id',
  'bf8ce3d4-e4ca-4825-9222-40ab47422d30',
  'x-envoy-upstream-service-time',
  '7340',
  'apim-request-id',
  'bf8ce3d4-e4ca-4825-9222-40ab47422d30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 24 Jun 2021 20:22:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/1409ab03-d455-465e-9df0-ef5db2cdb961')
  .reply(200, {"dataFeedId":"1409ab03-d455-465e-9df0-ef5db2cdb961","dataFeedName":"js-test-httpRequestFeed-162456611703601598","metrics":[{"metricId":"5b7c65ed-5f79-4281-a53d-631edc294f9a","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"6e9f6865-afa0-4524-831d-ed620e6fa5a9","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2021-06-24T00:00:00Z","dataSourceType":"AzureEventHubs","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-06-24T20:22:04Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"consumerGroup":"consumer-group"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1263',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9af44072-c58d-46ca-86a7-bab9d1e12f52',
  'x-envoy-upstream-service-time',
  '5334',
  'apim-request-id',
  '9af44072-c58d-46ca-86a7-bab9d1e12f52',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 24 Jun 2021 20:22:10 GMT'
]);
