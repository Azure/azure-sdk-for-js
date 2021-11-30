let nock = require('nock');

module.exports.hash = "cf05cd6195df256b68dcce03bde8be18";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '20626f7f-ef32-444f-98e8-8b770ff71b01',
  'x-ms-ests-server',
  '2.1.12158.6 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Arg6GEYZ9bRFiOADowVtMq8; expires=Mon, 22-Nov-2021 00:45:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr754RBZQCxp4sT1iLrNADlFkqq_6X5bPj7QenYTdl9CFNwCkq4lpZioQ5RYMrlW-_jynZRrURE2QeKgFSQLd1TRv0H1ToBVsoHJXisB7FpP8vo5l6D8PC7FJ4iZpx8G6XM_y_pDxNIYhGm3LJez20lLRJKwSv2LDsIjtgh9OshDUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:45:50 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '079ace24-2c80-48f3-8fab-553a97f90300',
  'x-ms-ests-server',
  '2.1.12171.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkqYr_JYH2JMk9Iy7nLYltg; expires=Mon, 22-Nov-2021 00:45:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrVkz2hN0yyNXd2Jt7sSwAW5jqKW9lzTMGuGxEeNWZXBxgdFN2OXDKNZmoNDtiVSymWP2TcsEtv08h9oAiylhjUACjd-WF8JIf_IW7Hv2D4QH2WpDwf-RbJt9AMLSC5mD1gMXCFFMLcqJiOrJR7MhHuQXHNssNukc7gVkCujPBWfkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:45:50 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=7c778c8f-fa8f-4be8-84f2-6478bc6a274d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'e5140e22-87e2-4251-afae-48f2e5e40400',
  'x-ms-ests-server',
  '2.1.12171.14 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ai2CeEXjVS9DhPZWGsnH1hg; expires=Mon, 22-Nov-2021 00:45:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:45:50 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"","language":""},{"id":"2","text":"I did not like the hotel we stayed at. It was too expensive.","language":"english"},{"id":"3","text":"","language":"en"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/1395b3f7-2ab5-4b16-9440-07e5093ec061',
  'x-envoy-upstream-service-time',
  '357',
  'apim-request-id',
  '822bfdba-30eb-4b18-8f7e-c5613d37eb9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:45:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/1395b3f7-2ab5-4b16-9440-07e5093ec061')
  .query(true)
  .reply(200, {"jobId":"1395b3f7-2ab5-4b16-9440-07e5093ec061","lastUpdateDateTime":"2021-10-23T00:45:51Z","createdDateTime":"2021-10-23T00:45:51Z","expirationDateTime":"2021-10-24T00:45:51Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'b3682554-ed47-4b99-8a18-49ba5511496b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:45:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/1395b3f7-2ab5-4b16-9440-07e5093ec061')
  .query(true)
  .reply(200, {"jobId":"1395b3f7-2ab5-4b16-9440-07e5093ec061","lastUpdateDateTime":"2021-10-23T00:45:51Z","createdDateTime":"2021-10-23T00:45:51Z","expirationDateTime":"2021-10-24T00:45:51Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'db9ed657-3521-4960-9e03-d8c5e672707a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:45:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/1395b3f7-2ab5-4b16-9440-07e5093ec061')
  .query(true)
  .reply(200, {"jobId":"1395b3f7-2ab5-4b16-9440-07e5093ec061","lastUpdateDateTime":"2021-10-23T00:45:53Z","createdDateTime":"2021-10-23T00:45:51Z","expirationDateTime":"2021-10-24T00:45:51Z","status":"running","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:45:53.2490915Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '62440935-ad43-4e9e-b2d1-c6bd35b1f1a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:45:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/1395b3f7-2ab5-4b16-9440-07e5093ec061')
  .query(true)
  .reply(200, {"jobId":"1395b3f7-2ab5-4b16-9440-07e5093ec061","lastUpdateDateTime":"2021-10-23T00:45:54Z","createdDateTime":"2021-10-23T00:45:51Z","expirationDateTime":"2021-10-24T00:45:51Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:45:53.2490915Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:45:54.5392001Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '295',
  'apim-request-id',
  '82712bce-398e-4e3c-8118-d66fcca72fed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:45:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/1395b3f7-2ab5-4b16-9440-07e5093ec061')
  .query(true)
  .reply(200, {"jobId":"1395b3f7-2ab5-4b16-9440-07e5093ec061","lastUpdateDateTime":"2021-10-23T00:45:57Z","createdDateTime":"2021-10-23T00:45:51Z","expirationDateTime":"2021-10-24T00:45:51Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:45:53.2490915Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:45:54.5392001Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '145',
  'apim-request-id',
  '4bf1ad94-eb3b-4bd2-b8c2-e62dd97ab78c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:45:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/1395b3f7-2ab5-4b16-9440-07e5093ec061')
  .query(true)
  .reply(200, {"jobId":"1395b3f7-2ab5-4b16-9440-07e5093ec061","lastUpdateDateTime":"2021-10-23T00:45:57Z","createdDateTime":"2021-10-23T00:45:51Z","expirationDateTime":"2021-10-24T00:45:51Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:45:53.2490915Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:45:54.5392001Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  'e98db0e2-40b1-4ce1-9feb-6d6b432aa8c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:45:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/1395b3f7-2ab5-4b16-9440-07e5093ec061')
  .query(true)
  .reply(200, {"jobId":"1395b3f7-2ab5-4b16-9440-07e5093ec061","lastUpdateDateTime":"2021-10-23T00:45:57Z","createdDateTime":"2021-10-23T00:45:51Z","expirationDateTime":"2021-10-24T00:45:51Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:45:53.2490915Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:45:54.5392001Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  '9b59a1cc-1088-4d51-821d-e2686aea3230',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/1395b3f7-2ab5-4b16-9440-07e5093ec061')
  .query(true)
  .reply(200, {"jobId":"1395b3f7-2ab5-4b16-9440-07e5093ec061","lastUpdateDateTime":"2021-10-23T00:45:57Z","createdDateTime":"2021-10-23T00:45:51Z","expirationDateTime":"2021-10-24T00:45:51Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:45:53.2490915Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:45:54.5392001Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  'b9356843-57ac-42cd-b306-dd937a61ab9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/1395b3f7-2ab5-4b16-9440-07e5093ec061')
  .query(true)
  .reply(200, {"jobId":"1395b3f7-2ab5-4b16-9440-07e5093ec061","lastUpdateDateTime":"2021-10-23T00:46:06Z","createdDateTime":"2021-10-23T00:45:51Z","expirationDateTime":"2021-10-24T00:45:51Z","status":"succeeded","errors":[],"tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:45:53.2490915Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:45:54.5392001Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:06.8839853Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,da,fi,nl,pl,ru,sv,de,en,es,fr,it,pt-BR,pt-PT,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=key-phrase-extraction"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '283',
  'apim-request-id',
  '27e90303-725f-4ed1-ad0a-c672b84bc154',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/1395b3f7-2ab5-4b16-9440-07e5093ec061')
  .query(true)
  .reply(200, {"jobId":"1395b3f7-2ab5-4b16-9440-07e5093ec061","lastUpdateDateTime":"2021-10-23T00:46:06Z","createdDateTime":"2021-10-23T00:45:51Z","expirationDateTime":"2021-10-24T00:45:51Z","status":"succeeded","errors":[],"tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:45:53.2490915Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:45:54.5392001Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:46:06.8839853Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,da,fi,nl,pl,ru,sv,de,en,es,fr,it,pt-BR,pt-PT,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=key-phrase-extraction"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '394',
  'apim-request-id',
  '9ff0f03b-4d4c-4017-8ec2-b503475cd876',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:46:07 GMT'
]);
