let nock = require('nock');

module.exports.hash = "b5fdbbe44c2762c8a087a2b955380ccc";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164895900708307550","file":"file164895900736008727"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164895900708307550')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 03 Apr 2022 04:10:07 GMT',
  'ETag',
  '"0x8DA1527D693B0F2"',
  'x-ms-request-id',
  '793bf722-201e-0000-4610-47e568000000',
  'x-ms-client-request-id',
  '703ec0a6-342f-40e4-a4c7-84e31b6a5124',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Sun, 03 Apr 2022 04:10:07 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164895900708307550/file164895900736008727')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 03 Apr 2022 04:10:07 GMT',
  'ETag',
  '"0x8DA1527D6C39B88"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '810cb762-e01f-0001-6010-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '4ae4d4c7-0589-4f9a-930c-0200f06c8477',
  'Date',
  'Sun, 03 Apr 2022 04:10:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164895900708307550/file164895900736008727', "Hello, World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '810cb763-e01f-0001-6110-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '716065d2-2b3d-4dab-8d43-6dc838e9f534',
  'Date',
  'Sun, 03 Apr 2022 04:10:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164895900708307550/file164895900736008727')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 03 Apr 2022 04:10:08 GMT',
  'ETag',
  '"0x8DA1527D711A11B"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '810cb765-e01f-0001-6210-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '850fc6e3-7cfb-42d7-a992-34e6d2eacaf4',
  'Date',
  'Sun, 03 Apr 2022 04:10:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164895900708307550/file164895900736008727')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 03 Apr 2022 04:10:08 GMT',
  'ETag',
  '"0x8DA1527D711A11B"',
  'x-ms-request-id',
  '793bf724-201e-0000-4710-47e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'bc74f673-59a7-4b96-b866-43e3f63f3aa9',
  'Date',
  'Sun, 03 Apr 2022 04:10:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem164895900708307550')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"12","creationTime":"132934326077397896","etag":"0x8DA1527D711A11B","expiryTime":"132934362077397896","group":"$superuser","lastModified":"Sun, 03 Apr 2022 04:10:08 GMT","name":"file164895900736008727","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'x-ms-request-id',
  '810cb766-e01f-0001-6310-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'b66bcfd1-1bb0-4db8-8b80-b9ff5e57a26a',
  'Date',
  'Sun, 03 Apr 2022 04:10:08 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164895900708307550/file164895900736008727')
  .reply(200, "", [
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  '810cb767-e01f-0001-6410-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '7a86b7b4-9866-4928-86de-e2407633a1c0',
  'Date',
  'Sun, 03 Apr 2022 04:10:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164895900708307550')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '793bf726-201e-0000-4810-47e568000000',
  'x-ms-client-request-id',
  '8512015f-628f-46bf-b22b-5067a490fe1d',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Sun, 03 Apr 2022 04:10:08 GMT'
]);
