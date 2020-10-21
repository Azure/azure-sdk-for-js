let nock = require('nock');

module.exports.hash = "ad3fde7f6fc6306775870996003056f0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"HttpRequest","dataFeedName":"js-test-httpRequestFeed-160072575346106798","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"url":"HttpsUrl","httpHeader":"header","httpMethod":"POST","payload":"{start-time: @start-time}"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/043dcc0c-4a74-45a5-9d60-6e9546d025d3',
  'x-request-id',
  '655fb9b0-8492-4c78-bc4d-cb0a3b6acb9c',
  'x-envoy-upstream-service-time',
  '397',
  'apim-request-id',
  '655fb9b0-8492-4c78-bc4d-cb0a3b6acb9c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/043dcc0c-4a74-45a5-9d60-6e9546d025d3')
  .reply(200, {"dataFeedId":"043dcc0c-4a74-45a5-9d60-6e9546d025d3","dataFeedName":"js-test-httpRequestFeed-160072575346106798","metrics":[{"metricId":"b7df2f3c-71b3-4dc6-9719-4cf314ff2516","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"a0958600-db81-4da0-92b4-b23928ad6a76","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"HttpRequest","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-09-21T22:02:52Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"httpHeader":"header","payload":"{start-time: @start-time}","httpMethod":"POST","url":"HttpsUrl"}}, [
  'Content-Length',
  '1306',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'eb7c66c8-5920-4327-b816-89fde9b07f5b',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  'eb7c66c8-5920-4327-b816-89fde9b07f5b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:52 GMT'
]);
