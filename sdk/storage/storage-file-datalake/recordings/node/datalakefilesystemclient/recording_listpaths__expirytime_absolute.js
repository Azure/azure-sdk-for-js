let nock = require('nock');

module.exports.hash = "c64799872481f148782acae6cc75871a";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164895900277802971","file":"file164895900305202978"},"newDate":{"now":"2022-04-03T04:10:03.052Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164895900277802971')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 03 Apr 2022 04:10:03 GMT',
  'ETag',
  '"0x8DA1527D402C1D1"',
  'x-ms-request-id',
  '793bf719-201e-0000-3f10-47e568000000',
  'x-ms-client-request-id',
  '035e501f-d0ca-472b-9be5-22e420ccdd6b',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Sun, 03 Apr 2022 04:10:02 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164895900277802971/file164895900305202978')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 03 Apr 2022 04:10:03 GMT',
  'ETag',
  '"0x8DA1527D430D120"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '810cb758-e01f-0001-5610-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'b299fbe1-50a7-4612-9ed8-9be57720ef04',
  'Date',
  'Sun, 03 Apr 2022 04:10:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164895900277802971/file164895900305202978', "Hello, World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '810cb759-e01f-0001-5710-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'c56dbda1-82d5-4e7d-9a7d-60037db1334e',
  'Date',
  'Sun, 03 Apr 2022 04:10:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164895900277802971/file164895900305202978')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 03 Apr 2022 04:10:03 GMT',
  'ETag',
  '"0x8DA1527D47EDF93"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '810cb75a-e01f-0001-5810-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '3cb57193-8b80-4cd8-ba8b-928c5e6bb2d8',
  'Date',
  'Sun, 03 Apr 2022 04:10:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164895900277802971/file164895900305202978')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 03 Apr 2022 04:10:03 GMT',
  'ETag',
  '"0x8DA1527D47EDF93"',
  'x-ms-request-id',
  '793bf71b-201e-0000-4010-47e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '23c89930-63ea-49f7-99a2-29406dab1b46',
  'Date',
  'Sun, 03 Apr 2022 04:10:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem164895900277802971')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"12","creationTime":"132934326034223392","etag":"0x8DA1527D47EDF93","expiryTime":"132934326330000000","group":"$superuser","lastModified":"Sun, 03 Apr 2022 04:10:03 GMT","name":"file164895900305202978","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'x-ms-request-id',
  '810cb75b-e01f-0001-5910-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'b7dc1762-be26-4cea-9e35-ae5504ef10cb',
  'Date',
  'Sun, 03 Apr 2022 04:10:03 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164895900277802971/file164895900305202978')
  .reply(200, "", [
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  '810cb75c-e01f-0001-5a10-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'acd7a884-3674-41ce-ac7e-7593c6a76dad',
  'Date',
  'Sun, 03 Apr 2022 04:10:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164895900277802971')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '793bf71d-201e-0000-4210-47e568000000',
  'x-ms-client-request-id',
  'e0ef219f-234b-4464-9439-3773a647d65e',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Sun, 03 Apr 2022 04:10:04 GMT'
]);
