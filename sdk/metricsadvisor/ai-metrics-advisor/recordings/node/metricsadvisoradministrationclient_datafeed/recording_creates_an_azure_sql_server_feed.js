let nock = require('nock');

module.exports.hash = "b147f26ee72d1a02c90a2e1332a62580";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"SqlServer","dataFeedName":"js-test-sqlServerFeed-160047174147209019","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"Server=ad-sample.database.windows.net,1433;Initial Catalog=ad-sample;Persist Security Info=False;User ID=adreadonly;Password=Readonly@2020;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;","query":"select * from blob_container2 where Timestamp = @StartTime"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/d198fec8-53fe-47ca-93a3-421c8c1adcbc',
  'x-request-id',
  '1d6e78f1-fb05-4396-b5ad-c92a4e074169',
  'x-envoy-upstream-service-time',
  '920',
  'apim-request-id',
  '1d6e78f1-fb05-4396-b5ad-c92a4e074169',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/d198fec8-53fe-47ca-93a3-421c8c1adcbc')
  .reply(200, {"dataFeedId":"d198fec8-53fe-47ca-93a3-421c8c1adcbc","dataFeedName":"js-test-sqlServerFeed-160047174147209019","metrics":[{"metricId":"138415a1-3ee9-4e39-a400-da0529b51fd2","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"38ef8aa3-8ab7-4e76-900c-6bb7ef361fcc","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"SqlServer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-09-18T23:29:20Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"Server=ad-sample.database.windows.net,1433;Initial Catalog=ad-sample;Persist Security Info=False;User ID=adreadonly;Password=Readonly@2020;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;","query":"select * from blob_container2 where Timestamp = @StartTime"}}, [
  'Content-Length',
  '1523',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '26c4dd5e-1e67-4dd9-862e-a12ffa96a46e',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  '26c4dd5e-1e67-4dd9-862e-a12ffa96a46e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:20 GMT'
]);
