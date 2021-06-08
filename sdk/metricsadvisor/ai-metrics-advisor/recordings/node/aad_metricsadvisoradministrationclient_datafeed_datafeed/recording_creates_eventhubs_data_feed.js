let nock = require('nock');

module.exports.hash = "20a42b7c23b773a1da152bf8cfd1872b";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162286538972802836","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162286538972803864","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162286538972807760","js-test-cosmosFeed-":"js-test-cosmosFeed-162286538972800952","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162286538972805442","js-test-tableFeed-":"js-test-tableFeed-162286538972800856","js-test-httpRequestFeed-":"js-test-httpRequestFeed-162286538972809899","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-162286538972803497","js-test-influxdbFeed-":"js-test-influxdbFeed-162286538972805329","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162286538972808553","js-test-mySqlFeed-":"js-test-mySqlFeed-162286538972808287","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162286538972809007","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-162286538972803708"},"newDate":{}}

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
  '8555f162-6194-490d-98e9-74574bef5400',
  'x-ms-ests-server',
  '2.1.11787.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AmLQSFzZ3NtIncXgUaZsx9HGLH8mAQAAAO3sTNgOAAAA; expires=Mon, 05-Jul-2021 03:56:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 05 Jun 2021 03:56:30 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureEventHubs","dataFeedName":"js-test-httpRequestFeed-162286538972809899","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"eventhub-connection-string","consumerGroup":"consumer-group"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/d14eb6dc-6761-491d-bf79-d3279080f70d',
  'x-request-id',
  '5720d423-b94c-4644-a50a-cf33d5498f8f',
  'x-envoy-upstream-service-time',
  '6108',
  'apim-request-id',
  '5720d423-b94c-4644-a50a-cf33d5498f8f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 03:56:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/d14eb6dc-6761-491d-bf79-d3279080f70d')
  .reply(200, {"dataFeedId":"d14eb6dc-6761-491d-bf79-d3279080f70d","dataFeedName":"js-test-httpRequestFeed-162286538972809899","metrics":[{"metricId":"da49548d-fb10-44ef-8f9f-472b7e257bbe","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"cbea5d2b-c4af-4d97-bae0-6b21d92dfb67","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2021-06-05T00:00:00Z","dataSourceType":"AzureEventHubs","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-06-05T03:56:36Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"consumerGroup":"consumer-group"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1263',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd55c046c-e32c-43ea-a89e-77cf47bb875e',
  'x-envoy-upstream-service-time',
  '183',
  'apim-request-id',
  'd55c046c-e32c-43ea-a89e-77cf47bb875e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 03:56:36 GMT'
]);
