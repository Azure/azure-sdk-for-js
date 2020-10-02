let nock = require('nock');

module.exports.hash = "ec92d199c4ade7f8e92f843f29fca396";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureApplicationInsights","dataFeedName":"js-test-appInsightsFeed-160047174147206584","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"azureCloud":"Azure","applicationId":"3706fe8b-98f1-47c7-bf69-b73b6e53274d","apiKey":"fqyh4t71ahmxccoupn2e2bpimgvfyslqgdzcaly0","query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/ed87fb04-2511-47e1-a55a-41e392a38ce0',
  'x-request-id',
  '7cdc4fe9-98f0-43c1-a4f0-eba382629081',
  'x-envoy-upstream-service-time',
  '395',
  'apim-request-id',
  '7cdc4fe9-98f0-43c1-a4f0-eba382629081',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/ed87fb04-2511-47e1-a55a-41e392a38ce0')
  .reply(200, {"dataFeedId":"ed87fb04-2511-47e1-a55a-41e392a38ce0","dataFeedName":"js-test-appInsightsFeed-160047174147206584","metrics":[{"metricId":"7828f8b2-09a0-487b-808b-aeaf4ba0fd42","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"1f844f36-96a9-4078-be60-37e31413408f","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-09-18T23:29:16Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"apiKey":"fqyh4t71ahmxccoupn2e2bpimgvfyslqgdzcaly0","query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode","azureCloud":"Azure","applicationId":"3706fe8b-98f1-47c7-bf69-b73b6e53274d"}}, [
  'Content-Length',
  '1689',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '916548ac-9cff-44ca-ac79-af1acf29a964',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  '916548ac-9cff-44ca-ac79-af1acf29a964',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:16 GMT'
]);
