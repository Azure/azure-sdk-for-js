let nock = require('nock');

module.exports.hash = "a61e087df1db4c0fda448bb6a3aa80bf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('//metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"MongoDB","dataFeedName":"js-test-mongoDbFeed-163978429259803733","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-mongodb","database":"data-feed-mongodb","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/b8959ab1-6408-4db8-b777-2c951201fa4e',
  'x-request-id',
  '4abd338a-18cd-407c-96dc-588aa3339449',
  'x-envoy-upstream-service-time',
  '493',
  'apim-request-id',
  '4abd338a-18cd-407c-96dc-588aa3339449',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/b8959ab1-6408-4db8-b777-2c951201fa4e')
  .reply(200, {"dataFeedId":"b8959ab1-6408-4db8-b777-2c951201fa4e","dataFeedName":"js-test-mongoDbFeed-163978429259803733","metrics":[{"metricId":"f6865d86-5748-4805-a9f6-fac2f77c323e","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"fee98132-88f8-4e1a-9f2e-8c21dbd7d5d7","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-12-17T23:38:23Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"database":"data-feed-mongodb","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1296',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f335078b-5a0d-410d-8591-0bba2eaec38a',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  'f335078b-5a0d-410d-8591-0bba2eaec38a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:23 GMT'
]);
