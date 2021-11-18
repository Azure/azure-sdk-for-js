let nock = require('nock');

module.exports.hash = "4bb0c54363466bf4ac07bece7a8646a6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"MySql","dataFeedName":"js-test-mySqlFeed-163702279906507194","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-mysql","query":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/52d1a05d-994b-4b91-b8fa-5a1b66082a00',
  'x-request-id',
  '4462722b-27ed-4763-b7fc-c77ab69b4ef7',
  'x-envoy-upstream-service-time',
  '544',
  'apim-request-id',
  '4462722b-27ed-4763-b7fc-c77ab69b4ef7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/52d1a05d-994b-4b91-b8fa-5a1b66082a00')
  .reply(200, {"dataFeedId":"52d1a05d-994b-4b91-b8fa-5a1b66082a00","dataFeedName":"js-test-mySqlFeed-163702279906507194","metrics":[{"metricId":"2e94295f-c4e8-4fb9-b35c-3ea40d7130f8","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"ed5808f4-ba69-4de6-84d6-0cf51d09082a","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MySql","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-16T00:33:31Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1259',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'dcb27e09-221c-4f98-b1e3-b479748b3bf3',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  'dcb27e09-221c-4f98-b1e3-b479748b3bf3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:30 GMT'
]);
