let nock = require('nock');

module.exports.hash = "37537857c92816f6fd57ab9dc52f864b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureTable","dataFeedName":"js-test-tableFeed-160072575346107258","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"https://table.example.net","table":"table-name","query":"partition-key eq @start-time"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/3c4d0330-14bd-4162-a32e-d55fc3edb1e3',
  'x-request-id',
  '103a7987-c350-4e12-9b42-a37da2ff3d60',
  'x-envoy-upstream-service-time',
  '383',
  'apim-request-id',
  '103a7987-c350-4e12-9b42-a37da2ff3d60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/3c4d0330-14bd-4162-a32e-d55fc3edb1e3')
  .reply(200, {"dataFeedId":"3c4d0330-14bd-4162-a32e-d55fc3edb1e3","dataFeedName":"js-test-tableFeed-160072575346107258","metrics":[{"metricId":"db148ddd-bd3d-47a8-97e8-537db3304292","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"1d787c31-e04f-46fe-89e5-cf9dfae777c7","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureTable","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-09-21T22:02:49Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://table.example.net","query":"partition-key eq @start-time","table":"table-name"}}, [
  'Content-Length',
  '1309',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1aeebb46-597b-4547-ada5-1b849ef69e61',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  '1aeebb46-597b-4547-ada5-1b849ef69e61',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:50 GMT'
]);
