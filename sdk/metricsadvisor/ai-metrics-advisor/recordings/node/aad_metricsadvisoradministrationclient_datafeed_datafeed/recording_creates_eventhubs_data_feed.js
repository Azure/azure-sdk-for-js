let nock = require('nock');

module.exports.hash = "b305b062177574b168150bc47bb53ffe";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162501549374303385","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162501549374407055","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162501549374409372","js-test-cosmosFeed-":"js-test-cosmosFeed-162501549374404583","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162501549374402830","js-test-tableFeed-":"js-test-tableFeed-162501549374403013","js-test-httpRequestFeed-":"js-test-httpRequestFeed-162501549374403874","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-162501549374401328","js-test-influxdbFeed-":"js-test-influxdbFeed-162501549374405767","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162501549374400492","js-test-mySqlFeed-":"js-test-mySqlFeed-162501549374400512","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162501549374405259","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-162501549374404453"},"newDate":{}}

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
  '6b9f087b-20b0-4ee8-94bc-bb82a26afd00',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AmwyupDbd-tMrRR11faNSarGLH8mAQAAAMa7bdgOAAAA; expires=Fri, 30-Jul-2021 01:11:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 01:11:34 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureEventHubs","dataFeedName":"js-test-httpRequestFeed-162501549374403874","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"eventhub-connection-string","consumerGroup":"consumer-group"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/c10dc263-1583-45f7-826c-84fcb87261db',
  'x-request-id',
  '6b6026e1-388f-4ea2-9b45-422623e55dce',
  'x-envoy-upstream-service-time',
  '7082',
  'apim-request-id',
  '6b6026e1-388f-4ea2-9b45-422623e55dce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 01:11:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/c10dc263-1583-45f7-826c-84fcb87261db')
  .reply(200, {"dataFeedId":"c10dc263-1583-45f7-826c-84fcb87261db","dataFeedName":"js-test-httpRequestFeed-162501549374403874","metrics":[{"metricId":"cc2d8af3-00d5-4099-a845-8b0061d4190a","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"dda000dc-2f75-422d-9a93-3064d0fcdac9","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2021-06-30T00:00:00Z","dataSourceType":"AzureEventHubs","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-06-30T01:11:42Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"consumerGroup":"consumer-group"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1263',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '96fce0e9-d1a3-451f-80dc-9ee81042275e',
  'x-envoy-upstream-service-time',
  '400',
  'apim-request-id',
  '96fce0e9-d1a3-451f-80dc-9ee81042275e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 01:11:43 GMT'
]);
