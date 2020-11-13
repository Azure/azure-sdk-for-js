let nock = require('nock');

module.exports.hash = "f80a2b0069bf69631c63e8bc389746e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"HttpRequest","dataFeedName":"js-test-httpRequestFeed-160529679231905989","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"url":"HttpsUrl","httpHeader":"header","httpMethod":"POST","payload":"{start-time: @start-time}"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/23c4e292-50b1-4c80-a507-c056b791311b',
  'x-request-id',
  '066f6962-3ee2-47cc-acc2-2c08ba083d3b',
  'x-envoy-upstream-service-time',
  '519',
  'apim-request-id',
  '066f6962-3ee2-47cc-acc2-2c08ba083d3b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/23c4e292-50b1-4c80-a507-c056b791311b')
  .reply(200, {"dataFeedId":"23c4e292-50b1-4c80-a507-c056b791311b","dataFeedName":"js-test-httpRequestFeed-160529679231905989","metrics":[{"metricId":"f040e4be-1c4a-4940-8275-653961a5bc24","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"c74c3c88-0ae9-4d85-91ad-7d23f99bc539","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"HttpRequest","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T19:46:43Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"httpHeader":"header","payload":"{start-time: @start-time}","httpMethod":"POST","url":"HttpsUrl"}}, [
  'Content-Length',
  '1315',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '78577f3c-51eb-4aba-b5b6-6db20f05daad',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  '78577f3c-51eb-4aba-b5b6-6db20f05daad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:43 GMT'
]);
