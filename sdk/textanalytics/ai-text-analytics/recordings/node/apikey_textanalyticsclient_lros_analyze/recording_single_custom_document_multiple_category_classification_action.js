let nock = require('nock');

module.exports.hash = "e625fabec349c46bd68f70745afca86b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"A recent report by the Government Accountability Office (GAO) found that the dramatic increase in oil and natural gas development on federal lands over the past six years has stretched the staff of the BLM to a point that it has been unable to meet its environmental protection responsibilities.","language":"en"}]},"tasks":{"customMultiClassificationTasks":[{"parameters":{"project-name":"project_name","deployment-name":"deployment_name"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/d2b3ff34-6d74-441e-8e1e-c9c295e388aa',
  'x-envoy-upstream-service-time',
  '420',
  'apim-request-id',
  '4f84b569-7f07-4085-ba6c-8082fb7822fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/d2b3ff34-6d74-441e-8e1e-c9c295e388aa')
  .query(true)
  .reply(200, {"jobId":"d2b3ff34-6d74-441e-8e1e-c9c295e388aa","lastUpdateDateTime":"2021-10-23T00:36:50Z","createdDateTime":"2021-10-23T00:36:50Z","expirationDateTime":"2021-10-24T00:36:50Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '00db0829-22b5-46f3-8616-f7c29960fd72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/d2b3ff34-6d74-441e-8e1e-c9c295e388aa')
  .query(true)
  .reply(200, {"jobId":"d2b3ff34-6d74-441e-8e1e-c9c295e388aa","lastUpdateDateTime":"2021-10-23T00:36:50Z","createdDateTime":"2021-10-23T00:36:50Z","expirationDateTime":"2021-10-24T00:36:50Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '4539cc13-bb67-4319-a08a-126cc7d1283c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/d2b3ff34-6d74-441e-8e1e-c9c295e388aa')
  .query(true)
  .reply(200, {"jobId":"d2b3ff34-6d74-441e-8e1e-c9c295e388aa","lastUpdateDateTime":"2021-10-23T00:36:51Z","createdDateTime":"2021-10-23T00:36:50Z","expirationDateTime":"2021-10-24T00:36:50Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"customMultiClassificationTasks":[{"lastUpdateDateTime":"2021-10-23T00:36:51.4254923Z","state":"succeeded","results":{"documents":[{"id":"1","classifications":[],"warnings":[]}],"errors":[],"projectName":"project_name","deploymentName":"deployment_name"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '168',
  'apim-request-id',
  '7425470d-4764-4782-be72-9decb418d7ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/d2b3ff34-6d74-441e-8e1e-c9c295e388aa')
  .query(true)
  .reply(200, {"jobId":"d2b3ff34-6d74-441e-8e1e-c9c295e388aa","lastUpdateDateTime":"2021-10-23T00:36:51Z","createdDateTime":"2021-10-23T00:36:50Z","expirationDateTime":"2021-10-24T00:36:50Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"customMultiClassificationTasks":[{"lastUpdateDateTime":"2021-10-23T00:36:51.4254923Z","state":"succeeded","results":{"documents":[{"id":"1","classifications":[],"warnings":[]}],"errors":[],"projectName":"project_name","deploymentName":"deployment_name"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  '428d31e8-f59e-4410-aa38-55cab6ff0068',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:52 GMT'
]);
