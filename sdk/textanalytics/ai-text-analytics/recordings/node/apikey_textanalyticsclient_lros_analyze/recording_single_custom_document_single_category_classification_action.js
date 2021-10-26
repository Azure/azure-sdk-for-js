let nock = require('nock');

module.exports.hash = "20e51d103d3129d724daa3fee868df01";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"A recent report by the Government Accountability Office (GAO) found that the dramatic increase in oil and natural gas development on federal lands over the past six years has stretched the staff of the BLM to a point that it has been unable to meet its environmental protection responsibilities.","language":"en"}]},"tasks":{"customSingleClassificationTasks":[{"parameters":{"project-name":"project_name","deployment-name":"deployment_name"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/5a8ee9a0-4896-43a8-996a-afba5f73f440',
  'x-envoy-upstream-service-time',
  '547',
  'apim-request-id',
  'eca94f99-a546-4614-9bb4-fe13b960f76a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/5a8ee9a0-4896-43a8-996a-afba5f73f440')
  .query(true)
  .reply(200, {"jobId":"5a8ee9a0-4896-43a8-996a-afba5f73f440","lastUpdateDateTime":"2021-10-23T00:36:47Z","createdDateTime":"2021-10-23T00:36:47Z","expirationDateTime":"2021-10-24T00:36:47Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '6cb72423-02eb-4635-8e56-44595428a4ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/5a8ee9a0-4896-43a8-996a-afba5f73f440')
  .query(true)
  .reply(200, {"jobId":"5a8ee9a0-4896-43a8-996a-afba5f73f440","lastUpdateDateTime":"2021-10-23T00:36:47Z","createdDateTime":"2021-10-23T00:36:47Z","expirationDateTime":"2021-10-24T00:36:47Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '8072d42e-14cc-407a-9854-261c9c881525',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/5a8ee9a0-4896-43a8-996a-afba5f73f440')
  .query(true)
  .reply(200, {"jobId":"5a8ee9a0-4896-43a8-996a-afba5f73f440","lastUpdateDateTime":"2021-10-23T00:36:48Z","createdDateTime":"2021-10-23T00:36:47Z","expirationDateTime":"2021-10-24T00:36:47Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"customSingleClassificationTasks":[{"lastUpdateDateTime":"2021-10-23T00:36:48.8121263Z","state":"succeeded","results":{"documents":[{"id":"1","classification":{"category":"RateBook","confidenceScore":0.76},"warnings":[]}],"errors":[],"projectName":"project_name","deploymentName":"deployment_name"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '6b2983c0-92a2-41a8-b3fe-653a72b5af1c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/5a8ee9a0-4896-43a8-996a-afba5f73f440')
  .query(true)
  .reply(200, {"jobId":"5a8ee9a0-4896-43a8-996a-afba5f73f440","lastUpdateDateTime":"2021-10-23T00:36:48Z","createdDateTime":"2021-10-23T00:36:47Z","expirationDateTime":"2021-10-24T00:36:47Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"customSingleClassificationTasks":[{"lastUpdateDateTime":"2021-10-23T00:36:48.8121263Z","state":"succeeded","results":{"documents":[{"id":"1","classification":{"category":"RateBook","confidenceScore":0.76},"warnings":[]}],"errors":[],"projectName":"project_name","deploymentName":"deployment_name"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  '3087ae25-6909-4f59-801c-458d387e6adf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:50 GMT'
]);
