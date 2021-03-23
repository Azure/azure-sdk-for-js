let nock = require('nock');

module.exports.hash = "26a208f5545b8ca2bcc2549cd5b45fef";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-161652987914603808","js-test-appInsightsFeed-":"js-test-appInsightsFeed-161652987914607171","js-test-sqlServerFeed-":"js-test-sqlServerFeed-161652987914608715","js-test-cosmosFeed-":"js-test-cosmosFeed-161652987914607643","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-161652987914605693","js-test-tableFeed-":"js-test-tableFeed-161652987914607942","js-test-httpRequestFeed-":"js-test-httpRequestFeed-161652987914604817","js-test-influxdbFeed-":"js-test-influxdbFeed-161652987914605773","js-test-mongoDbFeed-":"js-test-mongoDbFeed-161652987914603593","js-test-mySqlFeed-":"js-test-mySqlFeed-161652987914608961","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-161652987914605525"},"newDate":{}}

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
  '3286e4a7-850f-48b0-abfc-ab36e6001401',
  'x-ms-ests-server',
  '2.1.11562.10 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ajc0yKqtnDxCsplV2CeRpEnGLH8mAQAAANZA7NcOAAAA; expires=Thu, 22-Apr-2021 20:04:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Mar 2021 20:04:39 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureApplicationInsights","dataFeedName":"js-test-appInsightsFeed-161652987914607171","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"azureCloud":"Azure","applicationId":"appInsights_application","apiKey":"appInsights_app_key","query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/7f7a8000-df45-41ab-aaea-c79b871738fa',
  'x-request-id',
  'd6ca0802-6854-43fa-9248-fdc5bdef0c37',
  'x-envoy-upstream-service-time',
  '5923',
  'apim-request-id',
  'd6ca0802-6854-43fa-9248-fdc5bdef0c37',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Mar 2021 20:04:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/7f7a8000-df45-41ab-aaea-c79b871738fa')
  .reply(200, {"dataFeedId":"7f7a8000-df45-41ab-aaea-c79b871738fa","dataFeedName":"js-test-appInsightsFeed-161652987914607171","metrics":[{"metricId":"62972801-2a50-4b12-8f83-8b20eee39821","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"a4ca2f6b-129b-468b-91ea-fa37b8e5ad12","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-03-23T20:04:45Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"apiKey":"appInsights_app_key","query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode","azureCloud":"Azure","applicationId":"appInsights_application"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1708',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cdfd1eaf-89cd-46e9-a598-6b3052ee2e37',
  'x-envoy-upstream-service-time',
  '213',
  'apim-request-id',
  'cdfd1eaf-89cd-46e9-a598-6b3052ee2e37',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Mar 2021 20:04:46 GMT'
]);
