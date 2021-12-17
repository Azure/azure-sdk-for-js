let nock = require('nock');

module.exports.hash = "032a09938d4f27dfae54c12cebe5fff2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('//metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"InfluxDB","dataFeedName":"js-test-influxdbFeed-163978429259804465","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-influxdb","database":"data-feed-database","userName":"user","password":"SecretPlaceholder","query":"partition-key eq @start-time"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/6310155b-fea4-4f11-8ead-a7ad0be3599c',
  'x-request-id',
  '4db0a034-c699-45ba-a8fd-1bad56f9a60e',
  'x-envoy-upstream-service-time',
  '443',
  'apim-request-id',
  '4db0a034-c699-45ba-a8fd-1bad56f9a60e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:22 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/6310155b-fea4-4f11-8ead-a7ad0be3599c')
  .reply(200, {"dataFeedId":"6310155b-fea4-4f11-8ead-a7ad0be3599c","dataFeedName":"js-test-influxdbFeed-163978429259804465","metrics":[{"metricId":"5afde356-fabd-4c97-8c9a-3b3925f7a157","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"4f2ade1e-0cfe-4e21-8428-bd4384d26e01","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"InfluxDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-12-17T23:38:22Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-influxdb","database":"data-feed-database","query":"partition-key eq @start-time","userName":"user"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '08834d85-ec5a-45a7-be0d-24b261b372e7',
  'x-envoy-upstream-service-time',
  '170',
  'apim-request-id',
  '08834d85-ec5a-45a7-be0d-24b261b372e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:22 GMT'
]);
