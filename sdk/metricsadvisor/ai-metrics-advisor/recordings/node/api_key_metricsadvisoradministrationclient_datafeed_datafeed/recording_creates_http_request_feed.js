let nock = require('nock');

module.exports.hash = "1bcd951b88f7ce536a7432cd313f7c59";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"HttpRequest","dataFeedName":"js-test-httpRequestFeed-161070014038703210","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"url":"HttpsUrl","httpHeader":"header","httpMethod":"POST","payload":"{start-time: @start-time}"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/895b820a-e812-468d-8c64-d6adec5b93ae',
  'x-request-id',
  'cc8700b7-3ad5-4c46-b976-9b2feab64315',
  'x-envoy-upstream-service-time',
  '548',
  'apim-request-id',
  'cc8700b7-3ad5-4c46-b976-9b2feab64315',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/895b820a-e812-468d-8c64-d6adec5b93ae')
  .reply(200, {"dataFeedId":"895b820a-e812-468d-8c64-d6adec5b93ae","dataFeedName":"js-test-httpRequestFeed-161070014038703210","metrics":[{"metricId":"958aa7f8-44fe-42fc-81d6-b5c9f341df6b","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"387bde86-1b72-4b2a-b7a1-e39a14c59e8e","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"HttpRequest","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-01-15T08:42:39Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"httpHeader":"header","payload":"{start-time: @start-time}","httpMethod":"POST","url":"HttpsUrl"}}, [
  'Content-Length',
  '1315',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8ddbfa58-5fe7-4a36-a539-e18fd48faff2',
  'x-envoy-upstream-service-time',
  '169',
  'apim-request-id',
  '8ddbfa58-5fe7-4a36-a539-e18fd48faff2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:39 GMT'
]);
