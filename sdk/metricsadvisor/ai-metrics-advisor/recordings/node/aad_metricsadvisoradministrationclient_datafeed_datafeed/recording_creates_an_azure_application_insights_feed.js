let nock = require('nock');

module.exports.hash = "ab03802a893e10872e3827ce5d677d8f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  '61f1d5a0-08b7-4c3a-b28a-c7a7267cba00',
  'x-ms-ests-server',
  '2.1.12197.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AqKlTo4-kY5KpdBjvXF4pP7GLH8mAQAAAOqYGtkOAAAA; expires=Wed, 08-Dec-2021 04:04:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 04:04:59 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureApplicationInsights","dataFeedName":"js-test-appInsightsFeed-163634429613204453","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"azureCloud":"Azure","applicationId":"appInsights_application","apiKey":"appInsights_app_key","query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/82f90b23-3bad-4641-9fff-b3e00d74c715',
  'x-request-id',
  '95858bba-725f-42fd-9c1f-31c429967787',
  'x-envoy-upstream-service-time',
  '829',
  'apim-request-id',
  '95858bba-725f-42fd-9c1f-31c429967787',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/82f90b23-3bad-4641-9fff-b3e00d74c715')
  .reply(200, {"dataFeedId":"82f90b23-3bad-4641-9fff-b3e00d74c715","dataFeedName":"js-test-appInsightsFeed-163634429613204453","metrics":[{"metricId":"00da9594-2686-4f2f-af97-dda6fd692f87","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"12bb93ee-41f0-4afe-bde1-0959832185f6","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-11-08T04:05:00Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode","azureCloud":"Azure","applicationId":"appInsights_application"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1624',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'aff6f816-aaca-459b-9b51-21443dd77c0f',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  'aff6f816-aaca-459b-9b51-21443dd77c0f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:00 GMT'
]);
