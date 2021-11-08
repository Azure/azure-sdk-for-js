let nock = require('nock');

module.exports.hash = "4bb0c54363466bf4ac07bece7a8646a6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"MySql","dataFeedName":"js-test-mySqlFeed-163634432099909086","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-mysql","query":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/ba116d00-65f2-4a1b-9e7e-bc065f145658',
  'x-request-id',
  '33eb31fa-9ebc-4951-a43c-dd25fc52a268',
  'x-envoy-upstream-service-time',
  '620',
  'apim-request-id',
  '33eb31fa-9ebc-4951-a43c-dd25fc52a268',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/ba116d00-65f2-4a1b-9e7e-bc065f145658')
  .reply(200, {"dataFeedId":"ba116d00-65f2-4a1b-9e7e-bc065f145658","dataFeedName":"js-test-mySqlFeed-163634432099909086","metrics":[{"metricId":"ea24d975-ce2c-42cd-b4c0-1761731e1ca2","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"46359859-0d97-4637-bcaa-231427def49c","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MySql","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T04:05:34Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1259',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd01e08c8-43aa-485e-a05f-df50ca961966',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  'd01e08c8-43aa-485e-a05f-df50ca961966',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:34 GMT'
]);
