let nock = require('nock');

module.exports.hash = "7912107dd789728b7425c517733f2253";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"A recent report by the Government Accountability Office (GAO) found that the dramatic increase in oil and natural gas development on federal lands over the past six years has stretched the staff of the BLM to a point that it has been unable to meet its environmental protection responsibilities.","language":"en"}]},"tasks":{"customEntityRecognitionTasks":[{"parameters":{"project-name":"project_name","deployment-name":"deployment_name","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/ca3959d5-6d61-49aa-b53c-cd3ec8b89da7',
  'x-envoy-upstream-service-time',
  '506',
  'apim-request-id',
  'd13a3e6a-32e0-4d47-9199-83217c73fd07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/ca3959d5-6d61-49aa-b53c-cd3ec8b89da7')
  .query(true)
  .reply(200, {"jobId":"ca3959d5-6d61-49aa-b53c-cd3ec8b89da7","lastUpdateDateTime":"2021-10-23T00:36:44Z","createdDateTime":"2021-10-23T00:36:44Z","expirationDateTime":"2021-10-24T00:36:44Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  '96daf8d7-5702-486d-a80d-25b69450e288',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/ca3959d5-6d61-49aa-b53c-cd3ec8b89da7')
  .query(true)
  .reply(200, {"jobId":"ca3959d5-6d61-49aa-b53c-cd3ec8b89da7","lastUpdateDateTime":"2021-10-23T00:36:44Z","createdDateTime":"2021-10-23T00:36:44Z","expirationDateTime":"2021-10-24T00:36:44Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'a62802c6-bbda-4be2-84b3-d6e27a79bcd4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/ca3959d5-6d61-49aa-b53c-cd3ec8b89da7')
  .query(true)
  .reply(200, {"jobId":"ca3959d5-6d61-49aa-b53c-cd3ec8b89da7","lastUpdateDateTime":"2021-10-23T00:36:45Z","createdDateTime":"2021-10-23T00:36:44Z","expirationDateTime":"2021-10-24T00:36:44Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"customEntityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:36:45.9554221Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"98-0987","category":"timeRange","offset":4,"length":7,"confidenceScore":0.55},{"text":"$100","category":"timeRange","offset":27,"length":4,"confidenceScore":0.15},{"text":"John owes","category":"artist","offset":12,"length":9,"confidenceScore":0.18},{"text":"Mike","category":"artist","offset":22,"length":4,"confidenceScore":0.35}],"warnings":[]}],"errors":[],"projectName":"project_name","deploymentName":"deployment_name"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '247',
  'apim-request-id',
  '2a02b948-2c8b-49cc-9433-b1057b80ae8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/ca3959d5-6d61-49aa-b53c-cd3ec8b89da7')
  .query(true)
  .reply(200, {"jobId":"ca3959d5-6d61-49aa-b53c-cd3ec8b89da7","lastUpdateDateTime":"2021-10-23T00:36:45Z","createdDateTime":"2021-10-23T00:36:44Z","expirationDateTime":"2021-10-24T00:36:44Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"customEntityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:36:45.9554221Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"98-0987","category":"timeRange","offset":4,"length":7,"confidenceScore":0.55},{"text":"$100","category":"timeRange","offset":27,"length":4,"confidenceScore":0.15},{"text":"John owes","category":"artist","offset":12,"length":9,"confidenceScore":0.18},{"text":"Mike","category":"artist","offset":22,"length":4,"confidenceScore":0.35}],"warnings":[]}],"errors":[],"projectName":"project_name","deploymentName":"deployment_name"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  '1ead05f6-be9f-46ae-9a0f-082cd5684d6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:46 GMT'
]);
