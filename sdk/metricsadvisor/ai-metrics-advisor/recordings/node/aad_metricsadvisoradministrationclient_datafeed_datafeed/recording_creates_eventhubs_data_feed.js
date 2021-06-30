let nock = require('nock');

module.exports.hash = "b305b062177574b168150bc47bb53ffe";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162508838933800060","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162508838933908238","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162508838933903707","js-test-cosmosFeed-":"js-test-cosmosFeed-162508838933908815","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162508838933908042","js-test-tableFeed-":"js-test-tableFeed-162508838933902172","js-test-httpRequestFeed-":"js-test-httpRequestFeed-162508838933908981","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-162508838933908089","js-test-influxdbFeed-":"js-test-influxdbFeed-162508838933907561","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162508838933905214","js-test-mySqlFeed-":"js-test-mySqlFeed-162508838933906304","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162508838933904856","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-162508838933903815"},"newDate":{}}

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
  '58d66bda-883d-47ec-9017-50fb908e0a00',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Al9eBBCAAEpMvjijgnepfunGLH8mAQAAAIXYbtgOAAAA; expires=Fri, 30-Jul-2021 21:26:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 21:26:29 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureEventHubs","dataFeedName":"js-test-httpRequestFeed-162508838933908981","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"eventhub-connection-string","consumerGroup":"consumer-group"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/f1002588-ce6b-4c63-ae1f-8bbb6410d555',
  'x-request-id',
  'd98712d7-3ea5-481d-83ad-865f91231269',
  'x-envoy-upstream-service-time',
  '7046',
  'apim-request-id',
  'd98712d7-3ea5-481d-83ad-865f91231269',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 21:26:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f1002588-ce6b-4c63-ae1f-8bbb6410d555')
  .reply(200, {"dataFeedId":"f1002588-ce6b-4c63-ae1f-8bbb6410d555","dataFeedName":"js-test-httpRequestFeed-162508838933908981","metrics":[{"metricId":"69f836a5-71a0-4754-af2a-0ded4b02a105","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"be80e07b-92b5-4ebc-a635-cc37298ef4bf","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2021-06-30T00:00:00Z","dataSourceType":"AzureEventHubs","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-06-30T21:26:37Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"consumerGroup":"consumer-group"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1263',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '90d3d83c-6d3a-4375-8591-fb665caad37a',
  'x-envoy-upstream-service-time',
  '5293',
  'apim-request-id',
  '90d3d83c-6d3a-4375-8591-fb665caad37a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 21:26:42 GMT'
]);
