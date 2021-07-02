let nock = require('nock');

module.exports.hash = "eaed6985137e04614de2332c909af32f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb',
  'x-envoy-upstream-service-time',
  '302',
  'apim-request-id',
  'f0cb266b-24b4-4b33-9291-5a92dcfbfe1a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:51:52Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '6214ef2b-3ef8-4981-89f7-9b86b729d437',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:51:52Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'dd4d6dc7-1409-495c-a102-f880380af7ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:51:53Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '900343e0-5b6f-41ab-a91e-7da087747611',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:51:53Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'bb5cf691-24fa-4152-99a5-e84b1e26fb7c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:51:53Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'a95f80b2-a3ee-4159-a026-1f74787187f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  '567b7b24-8959-4f3b-9bab-b0d265c0ab58',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  '467f19b1-970d-4474-9a62-be8b0e4e2b6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '5664c387-e7be-42ce-8d97-9186793e0b80',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  '6f94ddcd-d1f8-47e5-8d26-334752a73530',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  '1d19ee8d-f9b8-48b3-bb91-30417dd81926',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  'af2ea1a5-5e7b-4313-977b-32a39dd65d57',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  '1e768319-7b30-4487-a7cf-e0ee7bb8930b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  'ffd42650-13f3-4e6b-b070-e8974c6398bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '217',
  'apim-request-id',
  '6ec86317-1d0b-409d-a157-c8212a294e83',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '200',
  'apim-request-id',
  '4b17c543-0715-4093-a399-39ccbc16131c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '145',
  'apim-request-id',
  '6737ad49-f715-4395-bd0f-7fba05b02e52',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  '17867ddb-6f22-4c19-b617-ddfc2b93bb58',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  'e42d1514-9124-4d39-8bf3-ef2fe55bf320',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '147',
  'apim-request-id',
  '3b500d12-621a-4d4c-9092-5137e67a6d61',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '444',
  'apim-request-id',
  '54aa4a73-1280-464e-9dbb-3dc95a323c9d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  '644ee69f-9b6b-44e6-a0b2-3c48ae1a699f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  '24d51bef-5b36-4bab-a641-70dea3f7a471',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  '258a7492-e80b-4adb-8b61-8d2b2b26bb6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  'de5893b6-ec34-4af2-9db5-8cb62714b94e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '147',
  'apim-request-id',
  '75e082a5-fefc-4998-8299-19f10579cafd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  'ec9088d9-9b05-443e-9f11-3ae3173025a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  'c60bd722-e9a6-4f81-8170-9bdc6b92fd09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '147',
  'apim-request-id',
  '9835094f-73fe-454a-9daa-c90624bea19d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:00Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '145',
  'apim-request-id',
  'ebe34b7e-6331-41fb-9cbc-4fde5546d790',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:53Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '28061262-fa93-4e4e-96a8-ce58a71956b8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:53Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '128',
  'apim-request-id',
  '78e8623d-1aa9-4b80-8803-7b21e2570f5b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:53Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  '800a99ab-00d4-44cf-8616-ffc428955dc5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:52:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:53Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '121',
  'apim-request-id',
  '6ab90042-a204-4f64-b8a4-2efaa0693dd3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:53Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '200',
  'apim-request-id',
  '6fa648a7-3466-4d67-a9af-650f6a462a9d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:53Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  '66cbe6d8-3e56-481f-ac2a-64e1e562887b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:53Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  'c7973a97-5b55-46aa-bc7d-df526a086060',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:53Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  'ab178947-d031-4843-90a2-9f63616164f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:52:53Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  '9109c566-d9f9-462b-a3b6-e37ea6195d34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:53:12Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:12.875933Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  'ff716811-7811-4643-aadf-ecef919794f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8c8c6b63-2ce2-4f19-9437-336829efb2eb')
  .query(true)
  .reply(200, {"jobId":"8c8c6b63-2ce2-4f19-9437-336829efb2eb","lastUpdateDateTime":"2021-06-25T19:53:12Z","createdDateTime":"2021-06-25T19:51:52Z","expirationDateTime":"2021-06-26T19:51:52Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:12.875933Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.9000206Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:52:00.1482753Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '188',
  'apim-request-id',
  '16cf89de-51b3-4925-a7d2-b10e0a88f59e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:13 GMT'
]);
