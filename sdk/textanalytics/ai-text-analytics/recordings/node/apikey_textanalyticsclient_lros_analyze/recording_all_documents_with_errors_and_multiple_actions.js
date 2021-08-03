let nock = require('nock');

module.exports.hash = "a6eeb30ce858c0616fccfba21ba6fb97";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"","language":""},{"id":"2","text":"I did not like the hotel we stayed at. It was too expensive.","language":"english"},{"id":"3","text":"","language":"en"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/ddf4573d-e42e-46f0-9009-27e8853099d9',
  'x-envoy-upstream-service-time',
  '257',
  'apim-request-id',
  'aae361e6-75a3-480c-b366-9bdaeb1d9baa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:53 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ddf4573d-e42e-46f0-9009-27e8853099d9')
  .query(true)
  .reply(200, {"jobId":"ddf4573d-e42e-46f0-9009-27e8853099d9","lastUpdateDateTime":"2021-08-03T03:11:53Z","createdDateTime":"2021-08-03T03:11:53Z","expirationDateTime":"2021-08-04T03:11:53Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'fca9a952-527b-4a16-8781-9c258da21e02',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:53 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ddf4573d-e42e-46f0-9009-27e8853099d9')
  .query(true)
  .reply(200, {"jobId":"ddf4573d-e42e-46f0-9009-27e8853099d9","lastUpdateDateTime":"2021-08-03T03:11:53Z","createdDateTime":"2021-08-03T03:11:53Z","expirationDateTime":"2021-08-04T03:11:53Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'e6bfc13d-2432-4191-a2cc-7696433fac46',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:53 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ddf4573d-e42e-46f0-9009-27e8853099d9')
  .query(true)
  .reply(200, {"jobId":"ddf4573d-e42e-46f0-9009-27e8853099d9","lastUpdateDateTime":"2021-08-03T03:11:53Z","createdDateTime":"2021-08-03T03:11:53Z","expirationDateTime":"2021-08-04T03:11:53Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '5dc05754-a14d-4940-a6b5-ec4cf31e0a71',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:55 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ddf4573d-e42e-46f0-9009-27e8853099d9')
  .query(true)
  .reply(200, {"jobId":"ddf4573d-e42e-46f0-9009-27e8853099d9","lastUpdateDateTime":"2021-08-03T03:11:56Z","createdDateTime":"2021-08-03T03:11:53Z","expirationDateTime":"2021-08-04T03:11:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '2a0e96dd-2d88-4cb0-a7f0-5e522fac9dd5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:57 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ddf4573d-e42e-46f0-9009-27e8853099d9')
  .query(true)
  .reply(200, {"jobId":"ddf4573d-e42e-46f0-9009-27e8853099d9","lastUpdateDateTime":"2021-08-03T03:11:56Z","createdDateTime":"2021-08-03T03:11:53Z","expirationDateTime":"2021-08-04T03:11:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'dcd6fe38-3f66-48a4-b8ad-401d20ba4f66',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:59 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ddf4573d-e42e-46f0-9009-27e8853099d9')
  .query(true)
  .reply(200, {"jobId":"ddf4573d-e42e-46f0-9009-27e8853099d9","lastUpdateDateTime":"2021-08-03T03:12:01Z","createdDateTime":"2021-08-03T03:11:53Z","expirationDateTime":"2021-08-04T03:11:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:01.8450945Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,da,fi,nl,pl,ru,sv,de,en,es,fr,it,pt-BR,pt-PT,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=key-phrase-extraction"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  '20b837f0-c193-4fc4-a9ca-0a0ee7e4a8c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:01 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ddf4573d-e42e-46f0-9009-27e8853099d9')
  .query(true)
  .reply(200, {"jobId":"ddf4573d-e42e-46f0-9009-27e8853099d9","lastUpdateDateTime":"2021-08-03T03:12:02Z","createdDateTime":"2021-08-03T03:11:53Z","expirationDateTime":"2021-08-04T03:11:53Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:02.3762015Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:02.6100847Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:01.8450945Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,da,fi,nl,pl,ru,sv,de,en,es,fr,it,pt-BR,pt-PT,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=key-phrase-extraction"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '282',
  'apim-request-id',
  'be6a4f45-c8ee-41d4-8e43-df6d3f93d0d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:03 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ddf4573d-e42e-46f0-9009-27e8853099d9')
  .query(true)
  .reply(200, {"jobId":"ddf4573d-e42e-46f0-9009-27e8853099d9","lastUpdateDateTime":"2021-08-03T03:12:02Z","createdDateTime":"2021-08-03T03:11:53Z","expirationDateTime":"2021-08-04T03:11:53Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:02.3762015Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:02.6100847Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:01.8450945Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,da,fi,nl,pl,ru,sv,de,en,es,fr,it,pt-BR,pt-PT,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=key-phrase-extraction"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  'da610877-6657-4a89-b496-40605d458212',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:04 GMT'
]);
