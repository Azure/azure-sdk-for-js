let nock = require('nock');

module.exports.hash = "be1081083d135fb29143ad3313c47ea7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureApplicationInsights","dataFeedName":"js-test-appInsightsFeed-160072575346103597","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"azureCloud":"Azure","applicationId":"appInsights_application","apiKey":"appInsights_app_key","query":"appInsights_query"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/6b02a5d4-b86d-4222-a219-ff02d38bd01c',
  'x-request-id',
  'acf3bf45-b3aa-4c90-aba8-d457799dbbeb',
  'x-envoy-upstream-service-time',
  '384',
  'apim-request-id',
  'acf3bf45-b3aa-4c90-aba8-d457799dbbeb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6b02a5d4-b86d-4222-a219-ff02d38bd01c')
  .reply(200, {"dataFeedId":"6b02a5d4-b86d-4222-a219-ff02d38bd01c","dataFeedName":"js-test-appInsightsFeed-160072575346103597","metrics":[{"metricId":"e447213c-35cf-4ba3-90c4-3607c8cbc077","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"8c302e85-380f-4e20-8f38-c7138773f542","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-09-21T22:02:38Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"apiKey":"appInsights_app_key","query":"appInsights_query","azureCloud":"Azure","applicationId":"appInsights_application"}}, [
  'Content-Length',
  '1689',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9d5b58a1-556e-41b1-8b92-dcb56ae4b2bc',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  '9d5b58a1-556e-41b1-8b92-dcb56ae4b2bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:38 GMT'
]);
