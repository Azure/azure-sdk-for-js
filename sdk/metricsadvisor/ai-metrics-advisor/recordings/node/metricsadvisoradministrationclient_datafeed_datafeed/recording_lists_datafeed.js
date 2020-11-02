let nock = require('nock');

module.exports.hash = "bf3e6400d9140c49d16b9bcf07d4b060";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"d3cc7368-a46c-4486-bcb8-b8f352262b77","dataFeedName":"js-test-sqlServerFeed-160323420510602272","metrics":[{"metricId":"10fd6b20-c610-4fbb-91b0-014548a58f55","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"ff480f35-59a3-4f48-92c5-394d20624a41","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"SqlServer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-10-20T22:50:36Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"sqlServer_connection_string","query":"select * from blob_container2 where Timestamp = @StartTime"}},{"dataFeedId":"f6b33ecd-2bb4-4ab2-8a4c-e9327bd9ad22","dataFeedName":"js-test-appInsightsFeed-160323420510606467","metrics":[{"metricId":"fc0423e9-07f6-4103-b607-0c6629292f24","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"1c08a9bb-6d9a-49df-8a37-e7cc805061ab","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-10-20T22:50:35Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"apiKey":"appInsights_app_key","query":"appInsights_query","azureCloud":"Azure","applicationId":"appInsights_application"}}],"@nextLink":null}, [
  'Content-Length',
  '3260',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9626d2c6-0504-45b6-99c9-1d409de7b652',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  '9626d2c6-0504-45b6-99c9-1d409de7b652',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:36 GMT',
  'Connection',
  'close'
]);
