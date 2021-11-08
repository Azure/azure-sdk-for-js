let nock = require('nock');

module.exports.hash = "793b87e3aaf5e6051ade04eb4ff45668";

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
  '14bb1346-2bd7-4453-a371-22397037c000',
  'x-ms-ests-server',
  '2.1.12197.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AmLtxoK0gRFDsnvwVNLWt-Q; expires=Wed, 08-Dec-2021 04:05:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 04:05:02 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"216f6248-626b-4b5a-8057-d7db4887c1ec","dataFeedName":"js-test-sqlServerFeed-163634429613202132","metrics":[{"metricId":"194236af-c413-4a4f-904a-754a41fe665b","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"597820de-5c28-4d8b-945a-99fa37dc9e3f","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"SqlServer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-11-08T04:05:01Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"select * from adsample2 where Timestamp = @StartTime"},"authenticationType":"Basic"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds?dataFeedName=js-test-&$maxpagesize=1&$skip=1"}, [
  'Content-Length',
  '1452',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1da2b0d1-7a62-4c80-a67c-9ca113d039ee',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  '1da2b0d1-7a62-4c80-a67c-9ca113d039ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"82f90b23-3bad-4641-9fff-b3e00d74c715","dataFeedName":"js-test-appInsightsFeed-163634429613204453","metrics":[{"metricId":"00da9594-2686-4f2f-af97-dda6fd692f87","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"12bb93ee-41f0-4afe-bde1-0959832185f6","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-11-08T04:05:00Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode","azureCloud":"Azure","applicationId":"appInsights_application"},"authenticationType":"Basic"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds?dataFeedName=js-test-&$maxpagesize=1&$skip=2"}, [
  'Content-Length',
  '1784',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '770a476f-cb7f-4549-8154-a3b229299f2e',
  'x-envoy-upstream-service-time',
  '147',
  'apim-request-id',
  '770a476f-cb7f-4549-8154-a3b229299f2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:02 GMT'
]);
