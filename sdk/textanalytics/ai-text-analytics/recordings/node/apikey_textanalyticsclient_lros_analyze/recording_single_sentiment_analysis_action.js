let nock = require('nock');

module.exports.hash = "bec5840cf2c9dabcf50655ab317beba1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"The food was unacceptable","language":"en"},{"id":"1","text":"The rooms were beautiful. The AC was good and quiet.","language":"en"},{"id":"2","text":"The breakfast was good, but the toilet was smelly.","language":"en"},{"id":"3","text":"Loved this hotel - good breakfast - nice shuttle service - clean rooms.","language":"en"},{"id":"4","text":"I had a great unobstructed view of the Microsoft campus.","language":"en"},{"id":"5","text":"Nice rooms but bathrooms were old and the toilet was dirty when we arrived.","language":"en"},{"id":"6","text":"The toilet smelled.","language":"en"}]},"tasks":{"sentimentAnalysisTasks":[{"parameters":{"opinionMining":true,"stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346',
  'x-envoy-upstream-service-time',
  '319',
  'apim-request-id',
  'ceaf0ef0-a001-49f0-a95e-df15c0f86a16',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:23Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'bbabe9a7-d263-4e35-8089-6cc6db6d72c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:23Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '8c87efbc-91a8-47c2-ad5e-749d3ac01564',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  '6d44930e-e318-4051-83e6-096290c350f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '4e695e57-48cf-48c6-8b7c-6060d2b52a35',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'ceea1b31-a5de-4ac8-9e82-420d5689aad4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '5c6e8816-9e71-4f47-a0c0-27d68023114b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '5a827910-5a8e-4102-88d8-e8151c30de5f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'c8e080f7-ed94-4e25-bb0f-1dd3cb580e95',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '38eee1f7-64cf-4132-a056-aa2e3575242b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'b60f77a3-6ce4-44b9-986a-7a03cacd06c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '95d2eb07-bea8-4ecc-bdf3-783a77837495',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '825c7f8a-6f61-428d-8d51-38ba68aa39c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'cc525a7c-4753-48fe-b764-0e18e1510e56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '553f7373-3b60-4d6a-9ef2-257ba683c0ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '074e04cd-ac4f-42eb-b2de-12d25fe53ed3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '9416065d-7fff-4129-81e6-555d8a2764b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '711b6c7c-8e75-4fe7-952b-21118036015e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '4832d24e-71c4-483b-851c-00b58a2a8958',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '62e7511c-206d-4824-b23d-5e984e9cb701',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '52cad5ce-8489-4de9-87d4-db91ddf6c43c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:50:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '3565d48a-c0a1-44bf-8f5c-f697c77d2082',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:50:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:49:24Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '43275ce0-7295-4796-aaa9-37575ed0bc9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:50:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:50:07Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"sentimentAnalysisTasks":[{"lastUpdateDateTime":"2021-06-25T19:50:07.6334061Z","taskName":"SentimentAnalysis_latest","state":"succeeded","results":{"documents":[{"id":"0","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":25,"text":"The food was unacceptable","targets":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":4,"length":4,"text":"food","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":13,"length":12,"text":"unacceptable","isNegated":false}]}],"warnings":[]},{"id":"1","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":25,"text":"The rooms were beautiful.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":15,"length":9,"text":"beautiful","isNegated":false}]},{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":26,"length":26,"text":"The AC was good and quiet.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":30,"length":2,"text":"AC","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/1/assessments/0"},{"relationType":"assessment","ref":"#/documents/1/sentences/1/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":37,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":46,"length":5,"text":"quiet","isNegated":false}]}],"warnings":[]},{"id":"2","sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"offset":0,"length":50,"text":"The breakfast was good, but the toilet was smelly.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":9,"text":"breakfast","relations":[{"relationType":"assessment","ref":"#/documents/2/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":32,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/2/sentences/0/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":18,"length":4,"text":"good","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":43,"length":6,"text":"smelly","isNegated":false}]}],"warnings":[]},{"id":"3","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":71,"text":"Loved this hotel - good breakfast - nice shuttle service - clean rooms.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":11,"length":5,"text":"hotel","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/0"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":24,"length":9,"text":"breakfast","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/1"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":41,"length":15,"text":"shuttle service","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/2"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":65,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/0"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/1"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/3"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/2"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":19,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":36,"length":4,"text":"nice","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":5,"text":"loved","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":59,"length":5,"text":"clean","isNegated":false}]}],"warnings":[]},{"id":"4","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":56,"text":"I had a great unobstructed view of the Microsoft campus.","targets":[{"sentiment":"positive","confidenceScores":{"positive":0.97,"negative":0.03},"offset":27,"length":4,"text":"view","relations":[{"relationType":"assessment","ref":"#/documents/4/sentences/0/assessments/0"},{"relationType":"assessment","ref":"#/documents/4/sentences/0/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":8,"length":5,"text":"great","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":0.93,"negative":0.07},"offset":14,"length":12,"text":"unobstructed","isNegated":false}]}],"warnings":[]},{"id":"5","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":75,"text":"Nice rooms but bathrooms were old and the toilet was dirty when we arrived.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":5,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":15,"length":9,"text":"bathrooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/1"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":42,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/2"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":4,"text":"nice","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":30,"length":3,"text":"old","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":53,"length":5,"text":"dirty","isNegated":false}]}],"warnings":[]},{"id":"6","sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"sentences":[{"sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"offset":0,"length":19,"text":"The toilet smelled.","targets":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":4,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":11,"length":7,"text":"smelled","isNegated":false}]}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '164',
  'apim-request-id',
  '0643025e-d44b-4393-9cff-8fabc6e7b546',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:50:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/34427250-608e-4192-9f6d-760c2905a346')
  .query(true)
  .reply(200, {"jobId":"34427250-608e-4192-9f6d-760c2905a346","lastUpdateDateTime":"2021-06-25T19:50:07Z","createdDateTime":"2021-06-25T19:49:23Z","expirationDateTime":"2021-06-26T19:49:23Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"sentimentAnalysisTasks":[{"lastUpdateDateTime":"2021-06-25T19:50:07.6334061Z","taskName":"SentimentAnalysis_latest","state":"succeeded","results":{"documents":[{"id":"0","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":25,"text":"The food was unacceptable","targets":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":4,"length":4,"text":"food","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":13,"length":12,"text":"unacceptable","isNegated":false}]}],"warnings":[]},{"id":"1","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":25,"text":"The rooms were beautiful.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":15,"length":9,"text":"beautiful","isNegated":false}]},{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":26,"length":26,"text":"The AC was good and quiet.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":30,"length":2,"text":"AC","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/1/assessments/0"},{"relationType":"assessment","ref":"#/documents/1/sentences/1/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":37,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":46,"length":5,"text":"quiet","isNegated":false}]}],"warnings":[]},{"id":"2","sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"offset":0,"length":50,"text":"The breakfast was good, but the toilet was smelly.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":9,"text":"breakfast","relations":[{"relationType":"assessment","ref":"#/documents/2/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":32,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/2/sentences/0/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":18,"length":4,"text":"good","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":43,"length":6,"text":"smelly","isNegated":false}]}],"warnings":[]},{"id":"3","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":71,"text":"Loved this hotel - good breakfast - nice shuttle service - clean rooms.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":11,"length":5,"text":"hotel","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/0"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":24,"length":9,"text":"breakfast","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/1"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":41,"length":15,"text":"shuttle service","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/2"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":65,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/0"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/1"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/3"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/2"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":19,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":36,"length":4,"text":"nice","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":5,"text":"loved","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":59,"length":5,"text":"clean","isNegated":false}]}],"warnings":[]},{"id":"4","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":56,"text":"I had a great unobstructed view of the Microsoft campus.","targets":[{"sentiment":"positive","confidenceScores":{"positive":0.97,"negative":0.03},"offset":27,"length":4,"text":"view","relations":[{"relationType":"assessment","ref":"#/documents/4/sentences/0/assessments/0"},{"relationType":"assessment","ref":"#/documents/4/sentences/0/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":8,"length":5,"text":"great","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":0.93,"negative":0.07},"offset":14,"length":12,"text":"unobstructed","isNegated":false}]}],"warnings":[]},{"id":"5","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":75,"text":"Nice rooms but bathrooms were old and the toilet was dirty when we arrived.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":5,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":15,"length":9,"text":"bathrooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/1"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":42,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/2"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":4,"text":"nice","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":30,"length":3,"text":"old","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":53,"length":5,"text":"dirty","isNegated":false}]}],"warnings":[]},{"id":"6","sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"sentences":[{"sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"offset":0,"length":19,"text":"The toilet smelled.","targets":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":4,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":11,"length":7,"text":"smelled","isNegated":false}]}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '128',
  'apim-request-id',
  'e138f04e-c8b8-4a6b-9d52-900f84ee1b51',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:50:07 GMT'
]);
