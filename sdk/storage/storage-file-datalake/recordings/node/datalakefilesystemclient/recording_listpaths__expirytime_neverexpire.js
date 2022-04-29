let nock = require('nock');

module.exports.hash = "3df8c3f0bf2a256b593916563bb79a02";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164895899849207304","file":"file164895900025507167"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164895899849207304')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 03 Apr 2022 04:10:00 GMT',
  'ETag',
  '"0x8DA1527D2546E91"',
  'x-ms-request-id',
  '793bf712-201e-0000-3c10-47e568000000',
  'x-ms-client-request-id',
  '7ed74dd0-470b-4c7c-b0f3-054ba8fa76f7',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Sun, 03 Apr 2022 04:10:00 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164895899849207304/file164895900025507167')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 03 Apr 2022 04:10:01 GMT',
  'ETag',
  '"0x8DA1527D3320897"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '810cb755-e01f-0001-5310-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '7d7656f9-6247-4ba7-a761-9d112f830a4d',
  'Date',
  'Sun, 03 Apr 2022 04:10:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164895899849207304/file164895900025507167')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 03 Apr 2022 04:10:01 GMT',
  'ETag',
  '"0x8DA1527D3320897"',
  'x-ms-request-id',
  '793bf717-201e-0000-3d10-47e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '7759a9dd-0cb1-49a5-861b-dbed8e2b2124',
  'Date',
  'Sun, 03 Apr 2022 04:10:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem164895899849207304')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"132934326017525911","etag":"0x8DA1527D3320897","expiryTime":"0","group":"$superuser","lastModified":"Sun, 03 Apr 2022 04:10:01 GMT","name":"file164895900025507167","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'x-ms-request-id',
  '810cb756-e01f-0001-5410-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '1c57bf65-42b6-4336-9338-6a5d78ca4930',
  'Date',
  'Sun, 03 Apr 2022 04:10:01 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164895899849207304/file164895900025507167')
  .reply(200, "", [
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  '810cb757-e01f-0001-5510-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '4afeaa9b-6135-4715-9640-bad63c65af5f',
  'Date',
  'Sun, 03 Apr 2022 04:10:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164895899849207304')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '793bf718-201e-0000-3e10-47e568000000',
  'x-ms-client-request-id',
  'a48ec239-a903-4b17-8d34-2fe7ea12a0ef',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Sun, 03 Apr 2022 04:10:02 GMT'
]);
