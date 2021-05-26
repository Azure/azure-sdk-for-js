let nock = require('nock');

module.exports.hash = "3af293fa60b30249563595a8e28ec829";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Ffarmbeats.azure.net%2F.default")
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
  '9bbba96e-4fb9-4b7c-a468-15e0b86d0100',
  'x-ms-ests-server',
  '2.1.11722.21 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AkU1v9mgOnFBjjaZ6V7PJkx4ycTJBAAAAF-WQNgOAAAA; expires=Fri, 25-Jun-2021 19:20:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 19:20:02 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/scenes/satellite/ingest-data/test-job-id-1622056799927', {"farmerId":"test-farmer-id-1622056799927","boundaryId":"test-boundary-id-1622056799927","startDateTime":"2020-02-01T08:00:00.000Z","endDateTime":"2020-03-02T08:00:00.000Z","data":{"imageNames":["LAI"]}})
  .query(true)
  .reply(202, {"farmerId":"test-farmer-id-1622056799927","boundaryId":"test-boundary-id-1622056799927","startDateTime":"2020-02-01T08:00:00Z","endDateTime":"2020-03-02T08:00:00Z","provider":"Microsoft","source":"Sentinel_2_L2A","data":{"imageNames":["LAI"],"imageFormats":["TIF"],"imageResolutions":[10]},"id":"test-job-id-1622056799927","status":"Waiting","message":"Created job 'test-job-id-1622056799927' to fetch satellite data for boundary 'test-boundary-id-1622056799927' from startDate '02/01/2020' to endDate '03/02/2020' (both inclusive).","createdDateTime":"2021-05-26T19:20:03Z","lastActionDateTime":"2021-05-26T19:20:03Z","startTime":"2021-05-26T19:20:03Z"}, [
  'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 19:20:03 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '657',
  'Connection',
  'keep-alive',
  'location',
  'https://endpoint/scenes/satellite/ingest-data/test-job-id-1622056799927?api-version=2021-03-31-preview',
  'x-ms-request-id',
  '0HM903JASEQ5D:00000001',
  'operation-location',
  'https://endpoint/scenes/satellite/ingest-data/test-job-id-1622056799927?api-version=2021-03-31-preview',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '5',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/scenes/satellite/ingest-data/test-job-id-1622056799927')
  .query(true)
  .reply(200, ["1f8b080000000000000384915d6bc2301486ff4ac84d37309a46d4b577b221086e175b61e01089eda966b4cd484e8521fef79d5a75c8e606b9c97b9ef3f59e1dcfb52bc14d331e73048fa2fd0b938970a8941c0c475114a911eff095adab4cbbcf6ff6a4fc467bd40e1f3442624aa00425951452091926f22e9692de9c30a8b21f509fb80be8c3d9adc9c011f1685267bdcdb169616b9736692f50a1a9a058aae54c8d299269d43cde7153ea353ce9123c8fdff86c3ce58b4e2b4eac2b351ee4643a39cbcfe06d51a3b155130a65572ef6143a6ffc6e575796c59a32f8ab3634c99a24eae9a92069f70e68c38c512e0bae5609185a9603a61be6092f0a83c09a3d586e1d3b397d2c70d5f880e5ce96ec6c3e0ba4eac9b0d7187be870f49bf47e8f42ad7eb3b2b861a64a8bda9b2ddc7669feb49dfaf238a19003a1864918c58a8ed36f8e53688fe3b4b1ec7ff630d75fc8fe0b0000ffff","0300847ee7ef91020000"], [
  'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 19:20:03 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HM903J177QF1:00000002',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '1',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/scenes/satellite/ingest-data/test-job-id-1622056799927')
  .query(true)
  .reply(200, ["1f8b08000000000000037c92516bc23010c7bf4ac84b37b09a46d4b56fb221086e0fae4f0e91d85e35a34d46721586f8dd77b5ea904d212ff9dfefee72ffcb9e17ca55e0a6394f3882c7b0bd873a0fa3a19462301cc5712c47bcc3d7b636b972dfbfec59f98ff6a81cbe2884545740095248110a198a28154f891074168481c9ff407de2aea02f67773a0747c4abce9cf5b6c0a685ad5dd6a4bd83416da05cc9d54c8e29922b543cd9735da90dbca90a3c4f3ef86c3ce5cb4e2b4eacab141ee5743ab9c873f0b6ac515bd38422d115cb03852e137fdaf58d61b1a60c3eaf8dd1664312f5f45490b467073461ce28970537ab040c2d2b00b32df38497a54660cd1cacb08e9d9d3e15b8697cc00a672b76319f0542f644d46b8c3d7638f94d7abf47a1567f585bdc326db2b2f67a078f5d7a7fd6befa7a39512806a11ca6519c485a4ebf594ea93c8eb3c6b2bbec6871fe14f7ca1d7e000000ffff","0300f391c22391020000"], [
  'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 19:20:09 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HM903J1GUND3:00000002',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '1',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/scenes/satellite/ingest-data/test-job-id-1622056799927')
  .query(true)
  .reply(200, ["1f8b08000000000000037c92516bc23010c7bf4ac84b37b09a46d4b56fb221086e0fae4f0e91d85e35a34d46721586f8dd77b5ea904d212ff9dfefee72ffcb9e17ca55e0a6394f3882c7b0bd873a0fa3a19462301cc5712c47bcc3d7b636b972dfbfec59f98ff6a81cbe2884545740095248110a198a28154f891074168481c9ff407de2aea02f67773a0747c4abce9cf5b6c0a685ad5dd6a4bd83416da05cc9d54c8e29922b543cd9735da90dbca90a3c4f3ef86c3ce5cb4e2b4eacab141ee5743ab9c873f0b6ac515bd38422d115cb03852e137fdaf58d61b1a60c3eaf8dd1664312f5f45490b467073461ce28970537ab040c2d2b00b32df38497a54660cd1cacb08e9d9d3e15b8697cc00a672b76319f0542f644d46b8c3d7638f94d7abf47a1567f585bdc326db2b2f67a078f5d7a7fd6befa7a39512806a11ca6519c485a4ebf594ea93c8eb3c6b2bbec6871fe14f7ca1d7e000000ffff","0300f391c22391020000"], [
  'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 19:20:14 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HM903JA9C7E5:00000001',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '1',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/scenes/satellite/ingest-data/test-job-id-1622056799927')
  .query(true)
  .reply(200, ["1f8b08000000000000037c514d6b023110fd2b216757926cd78fbd094558b03d544f16297133ab29d9a44db28288ffbd1345fb2de49279efcdbc9977a08df42df84ad1924608313bff33ad323e10821583e1783c1643daa36bd75925fdfe937ba9fcc50e51fa782f232c740b28104cb08c898cf1051b958ce15b220dacfa45ca91f78df4e6dd4e2bf0c878d0b577c135318d709daf936c0e366a0be645bcccc4041125a3a4e581ea566ee051b61068f94c67938aae7ae7e2d4f956c65379514dafe52708ce74513b9b20cefa6c7544e8baf1ab5bffb36cec4272d2d5358002954c745ea64e959d43edac429c8bfe5dc147793eec513415706212e1018cd11148f24d74207227b5916b03a4719e7081c03e90c6bb965c6e41b425710bc4c37b87ce4025317ea5dd409f9c7c84d074c6ec4903b1de9e09f26bc33e9aac3da0ec47063c634526060b3e2e056690a70c8c0c7152a77d6e7179b1bc647fbb1de67eabc7f1030000ffff","03005579bfb899020000"], [
  'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 19:20:19 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HM903JCGNAKD:00000002',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '1',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip'
]);
