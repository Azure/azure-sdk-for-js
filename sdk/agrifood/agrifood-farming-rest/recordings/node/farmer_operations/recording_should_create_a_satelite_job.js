let nock = require('nock');

module.exports.hash = "ef90c96725e8c95905086af9bf6b09e1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  '3cfbaaa6-4e1b-4920-bc95-a98c139fc700',
  'x-ms-ests-server',
  '2.1.11829.8 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AuprCnhyY41DlXA04J6n6rR4ycTJBAAAAGkJZNgOAAAA; expires=Thu, 22-Jul-2021 16:40:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Jun 2021 16:40:12 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/scenes/satellite/ingest-data/jhjob103node', {"farmerId":"tst103node","boundaryId":"jhboundary103node","startDateTime":"2020-02-01T08:00:00.000Z","endDateTime":"2020-03-02T08:00:00.000Z","data":{"imageNames":["LAI"]}})
  .query(true)
  .reply(202, {"farmerId":"tst103node","boundaryId":"jhboundary103node","startDateTime":"2020-02-01T08:00:00Z","endDateTime":"2020-03-02T08:00:00Z","provider":"Microsoft","source":"Sentinel_2_L2A","data":{"imageNames":["LAI"],"imageFormats":["TIF"],"imageResolutions":[10]},"id":"jhjob103node","status":"Waiting","message":"Created job 'jhjob103node' to fetch satellite data for boundary 'jhboundary103node' from startDate '02/01/2020' to endDate '03/02/2020' (both inclusive).","createdDateTime":"2021-06-22T16:40:13Z","lastActionDateTime":"2021-06-22T16:40:13Z","startTime":"2021-06-22T16:40:13Z"}, [
  'Date',
  'Tue, 22 Jun 2021 16:40:13 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '587',
  'Connection',
  'keep-alive',
  'location',
  'https://endpoint/scenes/satellite/ingest-data/jhjob103node?api-version=2021-03-31-preview',
  'x-ms-request-id',
  '0HM9KPK8BCNOU:00000001',
  'operation-location',
  'https://endpoint/scenes/satellite/ingest-data/jhjob103node?api-version=2021-03-31-preview',
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
  .get('/scenes/satellite/ingest-data/jhjob103node')
  .query(true)
  .reply(200, ["1f8b08000000000004038451cb6ac33010fc15a18b5b8813592ea1f8165a0281b487d650680941b1d6b1826d15691d2821ffde95f36ac8a1a083343b33bb3bdaf152b906dc4cf38ca3c744a4add5c0077c65bb562bf7d35736d5e9792178540e9f15426e1a20b51452c442c622c9c56326049d4ff28156df9052e25d91be9ddd1a0d8e6c5e4ce1acb72592d6dbce15c1fb1d5a342dd44bb99ccb0955b442c5b31d378d5ac3ab6ac0f3ec8bcf2733be181cc0a9758dc21ece67d333fc06ded61d1adb8652228662b12745587f536decea6a3fec88c43f94a1e66bea4a6d3cf523ecc9016dae192958f4571831b4ac042c2ae68951d70681856959691d3ba51834a7fbb163c44a671b764e9545428e44320ab1f6a6c720094f47543ae0772b8b15336d5177de6ce17e48531687d9ae534f62318ea5cc9371f620b2240d5f532b8f932264f13fb79febf2d3b776fb5f000000ffff","0300e7d121b44b020000"], [
  'Date',
  'Tue, 22 Jun 2021 16:40:14 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HM9KPK871A32:00000001',
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
