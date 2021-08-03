let nock = require('nock');

module.exports.hash = "051f7c6fa65acbdc299984d4559919c1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"The food was unacceptable","language":"en"},{"id":"1","text":"The rooms were beautiful. The AC was good and quiet.","language":"en"},{"id":"2","text":"The breakfast was good, but the toilet was smelly.","language":"en"},{"id":"3","text":"Loved this hotel - good breakfast - nice shuttle service - clean rooms.","language":"en"},{"id":"4","text":"I had a great unobstructed view of the Microsoft campus.","language":"en"},{"id":"5","text":"Nice rooms but bathrooms were old and the toilet was dirty when we arrived.","language":"en"},{"id":"6","text":"The toilet smelled.","language":"en"}]},"tasks":{"sentimentAnalysisTasks":[{"parameters":{"opinionMining":true,"stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/analyze/jobs/1ce4b59f-e4d6-4464-b213-1d9b25cbfed6',
  'x-envoy-upstream-service-time',
  '270',
  'apim-request-id',
  'a4311cc0-0c1d-40c0-977d-b48985c0f2aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1ce4b59f-e4d6-4464-b213-1d9b25cbfed6')
  .query(true)
  .reply(200, {"jobId":"1ce4b59f-e4d6-4464-b213-1d9b25cbfed6","lastUpdateDateTime":"2021-08-03T22:38:27Z","createdDateTime":"2021-08-03T22:38:27Z","expirationDateTime":"2021-08-04T22:38:27Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'fd612f2a-25d7-4449-ab69-d68ccbc00959',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1ce4b59f-e4d6-4464-b213-1d9b25cbfed6')
  .query(true)
  .reply(200, {"jobId":"1ce4b59f-e4d6-4464-b213-1d9b25cbfed6","lastUpdateDateTime":"2021-08-03T22:38:27Z","createdDateTime":"2021-08-03T22:38:27Z","expirationDateTime":"2021-08-04T22:38:27Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '16d05508-3783-4de1-bc36-6690b270ec51',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1ce4b59f-e4d6-4464-b213-1d9b25cbfed6')
  .query(true)
  .reply(200, {"jobId":"1ce4b59f-e4d6-4464-b213-1d9b25cbfed6","lastUpdateDateTime":"2021-08-03T22:38:27Z","createdDateTime":"2021-08-03T22:38:27Z","expirationDateTime":"2021-08-04T22:38:27Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '8ba973c2-eea4-4017-963d-80f00c3f0b0f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1ce4b59f-e4d6-4464-b213-1d9b25cbfed6')
  .query(true)
  .reply(200, {"jobId":"1ce4b59f-e4d6-4464-b213-1d9b25cbfed6","lastUpdateDateTime":"2021-08-03T22:38:27Z","createdDateTime":"2021-08-03T22:38:27Z","expirationDateTime":"2021-08-04T22:38:27Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '85d76c82-a625-4098-82cf-4e8fe07a5215',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1ce4b59f-e4d6-4464-b213-1d9b25cbfed6')
  .query(true)
  .reply(200, {"jobId":"1ce4b59f-e4d6-4464-b213-1d9b25cbfed6","lastUpdateDateTime":"2021-08-03T22:38:27Z","createdDateTime":"2021-08-03T22:38:27Z","expirationDateTime":"2021-08-04T22:38:27Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'e6949b5b-0c65-4563-b782-4344c7c173d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1ce4b59f-e4d6-4464-b213-1d9b25cbfed6')
  .query(true)
  .reply(200, {"jobId":"1ce4b59f-e4d6-4464-b213-1d9b25cbfed6","lastUpdateDateTime":"2021-08-03T22:38:27Z","createdDateTime":"2021-08-03T22:38:27Z","expirationDateTime":"2021-08-04T22:38:27Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '2ddc711d-9c40-4dad-8af5-de97ba360995',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1ce4b59f-e4d6-4464-b213-1d9b25cbfed6')
  .query(true)
  .reply(200, {"jobId":"1ce4b59f-e4d6-4464-b213-1d9b25cbfed6","lastUpdateDateTime":"2021-08-03T22:38:27Z","createdDateTime":"2021-08-03T22:38:27Z","expirationDateTime":"2021-08-04T22:38:27Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '23305cbd-a6e6-478f-94f3-1ee3173d3a2b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1ce4b59f-e4d6-4464-b213-1d9b25cbfed6')
  .query(true)
  .reply(200, {"jobId":"1ce4b59f-e4d6-4464-b213-1d9b25cbfed6","lastUpdateDateTime":"2021-08-03T22:38:27Z","createdDateTime":"2021-08-03T22:38:27Z","expirationDateTime":"2021-08-04T22:38:27Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '2a3ec641-22a7-40d6-8915-2cb6866dc51d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1ce4b59f-e4d6-4464-b213-1d9b25cbfed6')
  .query(true)
  .reply(200, {"jobId":"1ce4b59f-e4d6-4464-b213-1d9b25cbfed6","lastUpdateDateTime":"2021-08-03T22:38:27Z","createdDateTime":"2021-08-03T22:38:27Z","expirationDateTime":"2021-08-04T22:38:27Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'ce8ac2ca-1136-4ad3-aeba-99aab6dbfccf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1ce4b59f-e4d6-4464-b213-1d9b25cbfed6')
  .query(true)
  .reply(200, {"jobId":"1ce4b59f-e4d6-4464-b213-1d9b25cbfed6","lastUpdateDateTime":"2021-08-03T22:38:27Z","createdDateTime":"2021-08-03T22:38:27Z","expirationDateTime":"2021-08-04T22:38:27Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '989612fd-b893-411b-80bb-9487d91430b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1ce4b59f-e4d6-4464-b213-1d9b25cbfed6')
  .query(true)
  .reply(200, {"jobId":"1ce4b59f-e4d6-4464-b213-1d9b25cbfed6","lastUpdateDateTime":"2021-08-03T22:38:27Z","createdDateTime":"2021-08-03T22:38:27Z","expirationDateTime":"2021-08-04T22:38:27Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '9117f43c-c43e-423b-bafa-995b93bc7f2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1ce4b59f-e4d6-4464-b213-1d9b25cbfed6')
  .query(true)
  .reply(200, {"jobId":"1ce4b59f-e4d6-4464-b213-1d9b25cbfed6","lastUpdateDateTime":"2021-08-03T22:38:47Z","createdDateTime":"2021-08-03T22:38:27Z","expirationDateTime":"2021-08-04T22:38:27Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"sentimentAnalysisTasks":[{"lastUpdateDateTime":"2021-08-03T22:38:47.2226523Z","taskName":"SentimentAnalysis_latest","state":"succeeded","results":{"documents":[{"id":"0","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":25,"text":"The food was unacceptable","targets":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":4,"length":4,"text":"food","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":13,"length":12,"text":"unacceptable","isNegated":false}]}],"warnings":[]},{"id":"1","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":25,"text":"The rooms were beautiful.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":15,"length":9,"text":"beautiful","isNegated":false}]},{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":26,"length":26,"text":"The AC was good and quiet.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":30,"length":2,"text":"AC","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/1/assessments/0"},{"relationType":"assessment","ref":"#/documents/1/sentences/1/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":37,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":46,"length":5,"text":"quiet","isNegated":false}]}],"warnings":[]},{"id":"2","sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"offset":0,"length":50,"text":"The breakfast was good, but the toilet was smelly.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":9,"text":"breakfast","relations":[{"relationType":"assessment","ref":"#/documents/2/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":32,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/2/sentences/0/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":18,"length":4,"text":"good","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":43,"length":6,"text":"smelly","isNegated":false}]}],"warnings":[]},{"id":"3","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":71,"text":"Loved this hotel - good breakfast - nice shuttle service - clean rooms.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":11,"length":5,"text":"hotel","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/0"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":24,"length":9,"text":"breakfast","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/1"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":41,"length":15,"text":"shuttle service","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/2"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":65,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/0"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/1"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/3"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/2"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":19,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":36,"length":4,"text":"nice","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":5,"text":"loved","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":59,"length":5,"text":"clean","isNegated":false}]}],"warnings":[]},{"id":"4","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":56,"text":"I had a great unobstructed view of the Microsoft campus.","targets":[{"sentiment":"positive","confidenceScores":{"positive":0.97,"negative":0.03},"offset":27,"length":4,"text":"view","relations":[{"relationType":"assessment","ref":"#/documents/4/sentences/0/assessments/0"},{"relationType":"assessment","ref":"#/documents/4/sentences/0/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":8,"length":5,"text":"great","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":0.93,"negative":0.07},"offset":14,"length":12,"text":"unobstructed","isNegated":false}]}],"warnings":[]},{"id":"5","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":75,"text":"Nice rooms but bathrooms were old and the toilet was dirty when we arrived.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":5,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":15,"length":9,"text":"bathrooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/1"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":42,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/2"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":4,"text":"nice","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":30,"length":3,"text":"old","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":53,"length":5,"text":"dirty","isNegated":false}]}],"warnings":[]},{"id":"6","sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"sentences":[{"sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"offset":0,"length":19,"text":"The toilet smelled.","targets":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":4,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":11,"length":7,"text":"smelled","isNegated":false}]}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  'd5146166-73e3-4f1f-9bf4-9473cb97b954',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1ce4b59f-e4d6-4464-b213-1d9b25cbfed6')
  .query(true)
  .reply(200, {"jobId":"1ce4b59f-e4d6-4464-b213-1d9b25cbfed6","lastUpdateDateTime":"2021-08-03T22:38:47Z","createdDateTime":"2021-08-03T22:38:27Z","expirationDateTime":"2021-08-04T22:38:27Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"sentimentAnalysisTasks":[{"lastUpdateDateTime":"2021-08-03T22:38:47.2226523Z","taskName":"SentimentAnalysis_latest","state":"succeeded","results":{"documents":[{"id":"0","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":25,"text":"The food was unacceptable","targets":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":4,"length":4,"text":"food","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":13,"length":12,"text":"unacceptable","isNegated":false}]}],"warnings":[]},{"id":"1","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":25,"text":"The rooms were beautiful.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":15,"length":9,"text":"beautiful","isNegated":false}]},{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":26,"length":26,"text":"The AC was good and quiet.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":30,"length":2,"text":"AC","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/1/assessments/0"},{"relationType":"assessment","ref":"#/documents/1/sentences/1/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":37,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":46,"length":5,"text":"quiet","isNegated":false}]}],"warnings":[]},{"id":"2","sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"offset":0,"length":50,"text":"The breakfast was good, but the toilet was smelly.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":9,"text":"breakfast","relations":[{"relationType":"assessment","ref":"#/documents/2/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":32,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/2/sentences/0/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":18,"length":4,"text":"good","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":43,"length":6,"text":"smelly","isNegated":false}]}],"warnings":[]},{"id":"3","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":71,"text":"Loved this hotel - good breakfast - nice shuttle service - clean rooms.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":11,"length":5,"text":"hotel","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/0"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":24,"length":9,"text":"breakfast","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/1"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":41,"length":15,"text":"shuttle service","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/2"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":65,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/0"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/1"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/3"},{"relationType":"assessment","ref":"#/documents/3/sentences/0/assessments/2"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":19,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":36,"length":4,"text":"nice","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":5,"text":"loved","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":59,"length":5,"text":"clean","isNegated":false}]}],"warnings":[]},{"id":"4","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":56,"text":"I had a great unobstructed view of the Microsoft campus.","targets":[{"sentiment":"positive","confidenceScores":{"positive":0.97,"negative":0.03},"offset":27,"length":4,"text":"view","relations":[{"relationType":"assessment","ref":"#/documents/4/sentences/0/assessments/0"},{"relationType":"assessment","ref":"#/documents/4/sentences/0/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":8,"length":5,"text":"great","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":0.93,"negative":0.07},"offset":14,"length":12,"text":"unobstructed","isNegated":false}]}],"warnings":[]},{"id":"5","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":75,"text":"Nice rooms but bathrooms were old and the toilet was dirty when we arrived.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":5,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":15,"length":9,"text":"bathrooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/1"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":42,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/2"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":4,"text":"nice","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":30,"length":3,"text":"old","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":53,"length":5,"text":"dirty","isNegated":false}]}],"warnings":[]},{"id":"6","sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"sentences":[{"sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"offset":0,"length":19,"text":"The toilet smelled.","targets":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":4,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/1/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":11,"length":7,"text":"smelled","isNegated":false}]}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  '4928b28e-e1b4-4213-aba5-ec521431dbbb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:47 GMT'
]);
