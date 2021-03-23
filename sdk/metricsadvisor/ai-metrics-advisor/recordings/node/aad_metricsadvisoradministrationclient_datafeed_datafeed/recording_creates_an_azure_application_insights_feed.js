let nock = require('nock');

module.exports.hash = "26a208f5545b8ca2bcc2549cd5b45fef";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-161647972092802246","js-test-appInsightsFeed-":"js-test-appInsightsFeed-161647972092808149","js-test-sqlServerFeed-":"js-test-sqlServerFeed-161647972092805696","js-test-cosmosFeed-":"js-test-cosmosFeed-161647972092802316","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-161647972092804454","js-test-tableFeed-":"js-test-tableFeed-161647972092803763","js-test-httpRequestFeed-":"js-test-httpRequestFeed-161647972092802839","js-test-influxdbFeed-":"js-test-influxdbFeed-161647972092805808","js-test-mongoDbFeed-":"js-test-mongoDbFeed-161647972092804355","js-test-mySqlFeed-":"js-test-mySqlFeed-161647972092800614","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-161647972092809298"},"newDate":{}}

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
  'a430970d-6a1e-4e4c-a45a-42134f390d00',
  'x-ms-ests-server',
  '2.1.11562.10 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=ArscqB8WuHlOgeln3BrGz4rGLH8mAQAAAOh869cOAAAA; expires=Thu, 22-Apr-2021 06:08:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Mar 2021 06:08:40 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureApplicationInsights","dataFeedName":"js-test-appInsightsFeed-161647972092808149","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"azureCloud":"Azure","applicationId":"appInsights_application","apiKey":"appInsights_app_key","query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/471b2b46-34b1-4bca-94bf-9c93fa637ab8',
  'x-request-id',
  'da6bb188-79e4-4225-9c99-7b2ee4a45cb9',
  'x-envoy-upstream-service-time',
  '1818',
  'apim-request-id',
  'da6bb188-79e4-4225-9c99-7b2ee4a45cb9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Mar 2021 06:08:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/471b2b46-34b1-4bca-94bf-9c93fa637ab8')
  .reply(200, {"dataFeedId":"471b2b46-34b1-4bca-94bf-9c93fa637ab8","dataFeedName":"js-test-appInsightsFeed-161647972092808149","metrics":[{"metricId":"a2359ecb-8b53-4dac-a5d6-fbc6f34e4622","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"d6517e09-168c-4165-a3cf-081690ff14fc","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-03-23T06:08:42Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"apiKey":"appInsights_app_key","query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode","azureCloud":"Azure","applicationId":"appInsights_application"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1708',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6a92d05c-65d8-4239-bc74-b7fb8fd868ce',
  'x-envoy-upstream-service-time',
  '175',
  'apim-request-id',
  '6a92d05c-65d8-4239-bc74-b7fb8fd868ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Mar 2021 06:08:43 GMT'
]);
