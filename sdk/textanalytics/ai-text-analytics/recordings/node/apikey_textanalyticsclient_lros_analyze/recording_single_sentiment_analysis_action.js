let nock = require('nock');

module.exports.hash = "bec5840cf2c9dabcf50655ab317beba1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"The food was unacceptable","language":"en"},{"id":"1","text":"The rooms were beautiful. The AC was good and quiet.","language":"en"},{"id":"2","text":"The breakfast was good, but the toilet was smelly.","language":"en"},{"id":"3","text":"Loved this hotel - good breakfast - nice shuttle service - clean rooms.","language":"en"},{"id":"4","text":"I had a great unobstructed view of the Microsoft campus.","language":"en"},{"id":"5","text":"Nice rooms but bathrooms were old and the toilet was dirty when we arrived.","language":"en"},{"id":"6","text":"The toilet smelled.","language":"en"}]},"tasks":{"sentimentAnalysisTasks":[{"parameters":{"opinionMining":true,"stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79',
  'x-envoy-upstream-service-time',
  '443',
  'apim-request-id',
  '1577f96e-75ab-4c87-897f-d7b0e30fd848',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:02:42Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '500c8e2a-0393-417f-bf6c-3c88dfa73454',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:02:42Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '7fceefbf-7546-4650-b387-dabc54d89718',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:02:43Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '59acebf6-98e8-41e1-9f0f-f6f1930842f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:02:43Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'c87bdbbc-ba6a-4a65-aa91-676518c8c4d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:02:43Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a54f2bcf-e7f2-4e64-812e-98f7e86b4a26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:02:43Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'bd962baa-124a-41ad-97f2-10499f5d35d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:02:43Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '6b8bfe3b-85f7-4cc9-a33e-d4f94dc8374d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:02:43Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ebee6546-2e61-4445-aa60-6cace950ad01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:02:43Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '664a11d5-4a90-4d97-b566-3c70ec732a4c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:02:43Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '8e9b8aec-334b-46a6-be82-2788f2c93bc5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:02:43Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '801401f7-452d-4e88-9814-4c7f4e54338b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:03:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:02:43Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'e01b264a-c34a-4f10-b736-af4de2dc154e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:03:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:02:43Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '4c8b7eab-7ccc-4204-a10e-97530e33e729',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:03:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:02:43Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '3c9127b1-8cbd-46d3-9ab8-b6cf77f697c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:03:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:02:43Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '025a7eb2-396c-4ca1-a517-4c2f550a47d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:03:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:02:43Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '026630ed-a219-4c59-9e38-ed55c9ee5127',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:03:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:03:12Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"sentimentAnalysisTasks":[{"lastUpdateDateTime":"2021-06-25T05:03:12.2298751Z","taskName":"SentimentAnalysis_latest","state":"succeeded","results":{"documents":[{"id":"0","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":25,"text":"The food was unacceptable","targets":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":4,"length":4,"text":"food","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":13,"length":12,"text":"unacceptable","isNegated":false}]}],"warnings":[]},{"id":"1","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":25,"text":"The rooms were beautiful.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":15,"length":9,"text":"beautiful","isNegated":false}]},{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":26,"length":26,"text":"The AC was good and quiet.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":30,"length":2,"text":"AC","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/1/assessments/0"},{"relationType":"assessment","ref":"#/documents/1/sentences/1/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":37,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":46,"length":5,"text":"quiet","isNegated":false}]}],"warnings":[]},{"id":"2","sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"offset":0,"length":50,"text":"The breakfast was good, but the toilet was smelly.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":9,"text":"breakfast","relations":[{"relationType":"assessment","ref":"#/documents/2/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":32,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/2/sentences/0/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":18,"length":4,"text":"good","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":43,"length":6,"text":"smelly","isNegated":false}]}],"warnings":[]},{"id":"3","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":71,"text":"Loved this hotel - good breakfast - nice shuttle service - clean rooms.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":11,"length":5,"text":"hotel","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/0"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":24,"length":9,"text":"breakfast","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/1"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":41,"length":15,"text":"shuttle service","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/2"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":65,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/0"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/1"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/3"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/2"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":19,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":36,"length":4,"text":"nice","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":5,"text":"loved","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":59,"length":5,"text":"clean","isNegated":false}]}],"warnings":[]},{"id":"4","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":56,"text":"I had a great unobstructed view of the Microsoft campus.","targets":[{"sentiment":"positive","confidenceScores":{"positive":0.97,"negative":0.03},"offset":27,"length":4,"text":"view","relations":[{"relationType":"assessment","ref":"#/documents/4/sentences/0/assessments/0"},{"relationType":"assessment","ref":"#/documents/4/sentences/0/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":8,"length":5,"text":"great","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":0.93,"negative":0.07},"offset":14,"length":12,"text":"unobstructed","isNegated":false}]}],"warnings":[]},{"id":"5","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":75,"text":"Nice rooms but bathrooms were old and the toilet was dirty when we arrived.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":5,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":15,"length":9,"text":"bathrooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/1"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":42,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/2"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":4,"text":"nice","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":30,"length":3,"text":"old","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":53,"length":5,"text":"dirty","isNegated":false}]}],"warnings":[]},{"id":"6","sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"sentences":[{"sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"offset":0,"length":19,"text":"The toilet smelled.","targets":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":4,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":11,"length":7,"text":"smelled","isNegated":false}]}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  '7d30b197-9431-4917-bd32-9c75c58e6c7f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:03:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/dde6e723-6ee1-430e-ba54-c7fa6cf9dc79')
  .query(true)
  .reply(200, {"jobId":"dde6e723-6ee1-430e-ba54-c7fa6cf9dc79","lastUpdateDateTime":"2021-06-25T05:03:12Z","createdDateTime":"2021-06-25T05:02:41Z","expirationDateTime":"2021-06-26T05:02:41Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"sentimentAnalysisTasks":[{"lastUpdateDateTime":"2021-06-25T05:03:12.2298751Z","taskName":"SentimentAnalysis_latest","state":"succeeded","results":{"documents":[{"id":"0","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":25,"text":"The food was unacceptable","targets":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":4,"length":4,"text":"food","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":13,"length":12,"text":"unacceptable","isNegated":false}]}],"warnings":[]},{"id":"1","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":25,"text":"The rooms were beautiful.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":15,"length":9,"text":"beautiful","isNegated":false}]},{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":26,"length":26,"text":"The AC was good and quiet.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":30,"length":2,"text":"AC","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/1/assessments/0"},{"relationType":"assessment","ref":"#/documents/1/sentences/1/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":37,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":46,"length":5,"text":"quiet","isNegated":false}]}],"warnings":[]},{"id":"2","sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"offset":0,"length":50,"text":"The breakfast was good, but the toilet was smelly.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":9,"text":"breakfast","relations":[{"relationType":"assessment","ref":"#/documents/2/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":32,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/2/sentences/0/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":18,"length":4,"text":"good","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":43,"length":6,"text":"smelly","isNegated":false}]}],"warnings":[]},{"id":"3","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":71,"text":"Loved this hotel - good breakfast - nice shuttle service - clean rooms.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":11,"length":5,"text":"hotel","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/0"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":24,"length":9,"text":"breakfast","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/1"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":41,"length":15,"text":"shuttle service","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/2"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":65,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/0"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/1"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/3"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/2"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":19,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":36,"length":4,"text":"nice","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":5,"text":"loved","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":59,"length":5,"text":"clean","isNegated":false}]}],"warnings":[]},{"id":"4","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":56,"text":"I had a great unobstructed view of the Microsoft campus.","targets":[{"sentiment":"positive","confidenceScores":{"positive":0.97,"negative":0.03},"offset":27,"length":4,"text":"view","relations":[{"relationType":"assessment","ref":"#/documents/4/sentences/0/assessments/0"},{"relationType":"assessment","ref":"#/documents/4/sentences/0/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":8,"length":5,"text":"great","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":0.93,"negative":0.07},"offset":14,"length":12,"text":"unobstructed","isNegated":false}]}],"warnings":[]},{"id":"5","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":75,"text":"Nice rooms but bathrooms were old and the toilet was dirty when we arrived.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":5,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":15,"length":9,"text":"bathrooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/1"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":42,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/2"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":4,"text":"nice","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":30,"length":3,"text":"old","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":53,"length":5,"text":"dirty","isNegated":false}]}],"warnings":[]},{"id":"6","sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"sentences":[{"sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"offset":0,"length":19,"text":"The toilet smelled.","targets":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":4,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":11,"length":7,"text":"smelled","isNegated":false}]}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '177',
  'apim-request-id',
  'f9e106cd-8c57-4d3e-85b4-77213de0f89e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:03:13 GMT'
]);
