let nock = require('nock');

module.exports.hash = "591834e6675a5b43c0afc6d05c52fc67";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"53a7b635-d73f-4ef1-a857-19578ef03188","dataFeedName":"js-test-sqlServerFeed-160530446860000366","metrics":[{"metricId":"ec62e2e5-3e62-48bd-acc9-72499a0b27b3","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"47a440be-eda8-41ef-a6e0-abb089c1e478","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"SqlServer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T21:54:41Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"sqlServer_connection_string","query":"select * from blob_container2 where Timestamp = @StartTime"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds?dataFeedName=js-test-&$top=1&$skip=1"}, [
  'Content-Length',
  '1684',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '31d15606-0fea-4c54-bd62-b8bf218c12b0',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  '31d15606-0fea-4c54-bd62-b8bf218c12b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"db409864-b6df-4e10-8f0d-015674aed125","dataFeedName":"js-test-appInsightsFeed-160530446860005245","metrics":[{"metricId":"45e6afde-672d-445a-8363-bb6ad2ae3faa","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"135ccb80-2884-40c9-a655-9177f4158991","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T21:54:40Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"apiKey":"appInsights_app_key","query":"appInsights_query","azureCloud":"Azure","applicationId":"appInsights_application"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds?dataFeedName=js-test-&$top=1&$skip=2"}, [
  'Content-Length',
  '1850',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3a7d30b7-d501-426e-8bde-21a36ec55f71',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  '3a7d30b7-d501-426e-8bde-21a36ec55f71',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:41 GMT'
]);
