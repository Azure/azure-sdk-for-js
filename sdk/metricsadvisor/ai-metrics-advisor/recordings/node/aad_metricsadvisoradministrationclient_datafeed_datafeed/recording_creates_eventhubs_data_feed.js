let nock = require('nock');

module.exports.hash = "b305b062177574b168150bc47bb53ffe";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162508945389805775","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162508945389806976","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162508945389809283","js-test-cosmosFeed-":"js-test-cosmosFeed-162508945389809964","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162508945389807094","js-test-tableFeed-":"js-test-tableFeed-162508945389801971","js-test-eventhubRequestFeed-":"js-test-eventhubRequestFeed-162508945389801568","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-162508945389801183","js-test-influxdbFeed-":"js-test-influxdbFeed-162508945389805084","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162508945389802321","js-test-mySqlFeed-":"js-test-mySqlFeed-162508945389801631","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162508945389801565","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-162508945389806343"},"newDate":{}}

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
  '35a4e11e-7b49-477f-aac7-54dcf59e5101',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AuPC8Nzi4XdHkDTt8UivHEvGLH8mAQAAAK7cbtgOAAAA; expires=Fri, 30-Jul-2021 21:44:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 21:44:14 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureEventHubs","dataFeedName":"js-test-eventhubRequestFeed-162508945389801568","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"eventhub-connection-string","consumerGroup":"consumer-group"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/8bd9f7eb-802b-48f9-9723-8ce1115f1d60',
  'x-request-id',
  '823bc3a2-6a02-44e1-8591-ede18f061887',
  'x-envoy-upstream-service-time',
  '1993',
  'apim-request-id',
  '823bc3a2-6a02-44e1-8591-ede18f061887',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 21:44:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/8bd9f7eb-802b-48f9-9723-8ce1115f1d60')
  .reply(200, {"dataFeedId":"8bd9f7eb-802b-48f9-9723-8ce1115f1d60","dataFeedName":"js-test-eventhubRequestFeed-162508945389801568","metrics":[{"metricId":"a6961297-3dfe-4f26-967e-25372e154106","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"b9aff9bc-fc7e-472e-abbc-6ff6c21d26dc","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2021-06-30T00:00:00Z","dataSourceType":"AzureEventHubs","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-06-30T21:44:16Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"consumerGroup":"consumer-group"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1267',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8f07fd80-c779-4770-a713-754902c8ecc6',
  'x-envoy-upstream-service-time',
  '352',
  'apim-request-id',
  '8f07fd80-c779-4770-a713-754902c8ecc6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 21:44:17 GMT'
]);
