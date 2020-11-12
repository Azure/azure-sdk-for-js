let nock = require('nock');

module.exports.hash = "f80a2b0069bf69631c63e8bc389746e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"HttpRequest","dataFeedName":"js-test-httpRequestFeed-160522265192803703","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"url":"HttpsUrl","httpHeader":"header","httpMethod":"POST","payload":"{start-time: @start-time}"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/3d7b2247-ce07-49b2-ab00-57dee48b4fb4',
  'x-request-id',
  '051f047e-56b3-4178-964f-b6b8c20e7a77',
  'x-envoy-upstream-service-time',
  '405',
  'apim-request-id',
  '051f047e-56b3-4178-964f-b6b8c20e7a77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/3d7b2247-ce07-49b2-ab00-57dee48b4fb4')
  .reply(200, {"dataFeedId":"3d7b2247-ce07-49b2-ab00-57dee48b4fb4","dataFeedName":"js-test-httpRequestFeed-160522265192803703","metrics":[{"metricId":"9168af28-187d-4880-9827-a523af6bd5a2","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"239421c9-3a92-4529-9812-5b3440129b0e","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"HttpRequest","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-12T23:11:09Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"httpHeader":"header","payload":"{start-time: @start-time}","httpMethod":"POST","url":"HttpsUrl"}}, [
  'Content-Length',
  '1329',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c7d1971e-050b-43f6-8610-e96425659c74',
  'x-envoy-upstream-service-time',
  '303',
  'apim-request-id',
  'c7d1971e-050b-43f6-8610-e96425659c74',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:09 GMT'
]);
