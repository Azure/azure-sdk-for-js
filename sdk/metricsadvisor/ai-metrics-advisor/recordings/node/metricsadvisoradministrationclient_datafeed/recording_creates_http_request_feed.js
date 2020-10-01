let nock = require('nock');

module.exports.hash = "ad3fde7f6fc6306775870996003056f0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"HttpRequest","dataFeedName":"js-test-httpRequestFeed-160047174147207115","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"url":"HttpsUrl","httpHeader":"header","httpMethod":"POST","payload":"{start-time: @start-time}"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/3921e1b1-1269-49e5-904b-7d525e380d3c',
  'x-request-id',
  'c7d1e522-debe-493d-8513-27aac45a8920',
  'x-envoy-upstream-service-time',
  '418',
  'apim-request-id',
  'c7d1e522-debe-493d-8513-27aac45a8920',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/3921e1b1-1269-49e5-904b-7d525e380d3c')
  .reply(200, {"dataFeedId":"3921e1b1-1269-49e5-904b-7d525e380d3c","dataFeedName":"js-test-httpRequestFeed-160047174147207115","metrics":[{"metricId":"fd7ac5f5-e24b-4830-a4b3-92b1afc5745b","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"8b88d212-d558-4eab-a6b1-5a4505d463f7","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"HttpRequest","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-09-18T23:29:30Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"httpHeader":"header","payload":"{start-time: @start-time}","httpMethod":"POST","url":"HttpsUrl"}}, [
  'Content-Length',
  '1306',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '37454761-410a-4c85-914e-d38190e7a3ca',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  '37454761-410a-4c85-914e-d38190e7a3ca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:31 GMT'
]);
