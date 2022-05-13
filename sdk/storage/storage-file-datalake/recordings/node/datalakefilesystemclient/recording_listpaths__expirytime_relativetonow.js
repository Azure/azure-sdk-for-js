let nock = require('nock');

module.exports.hash = "21abec70d9f4b7adf94bc16b5a9985fb";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164895900491301879","file":"file164895900521502471"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164895900491301879')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 03 Apr 2022 04:10:05 GMT',
  'ETag',
  '"0x8DA1527D5488DC8"',
  'x-ms-request-id',
  '793bf71e-201e-0000-4310-47e568000000',
  'x-ms-client-request-id',
  '27c35b22-7274-4f66-b978-a72e6717fdea',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Sun, 03 Apr 2022 04:10:05 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164895900491301879/file164895900521502471')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 03 Apr 2022 04:10:05 GMT',
  'ETag',
  '"0x8DA1527D57B404E"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '810cb75d-e01f-0001-5b10-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '60606003-bd1a-4ba3-8cc1-5867f4ae954d',
  'Date',
  'Sun, 03 Apr 2022 04:10:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164895900491301879/file164895900521502471', "Hello, World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '810cb75e-e01f-0001-5c10-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '802de54c-1fdf-4d2d-9126-dfd2a29bfc34',
  'Date',
  'Sun, 03 Apr 2022 04:10:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164895900491301879/file164895900521502471')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 03 Apr 2022 04:10:06 GMT',
  'ETag',
  '"0x8DA1527D5CA5465"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '810cb75f-e01f-0001-5d10-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'b0bcd62d-125d-4de5-952d-58cf7e0d9f59',
  'Date',
  'Sun, 03 Apr 2022 04:10:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164895900491301879/file164895900521502471')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 03 Apr 2022 04:10:06 GMT',
  'ETag',
  '"0x8DA1527D5CA5465"',
  'x-ms-request-id',
  '793bf720-201e-0000-4410-47e568000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'f9678b6c-4f2d-40c7-b244-931aff176061',
  'Date',
  'Sun, 03 Apr 2022 04:10:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem164895900491301879')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"12","creationTime":"132934326055878734","etag":"0x8DA1527D5CA5465","expiryTime":"132934326363590000","group":"$superuser","lastModified":"Sun, 03 Apr 2022 04:10:06 GMT","name":"file164895900521502471","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'x-ms-request-id',
  '810cb760-e01f-0001-5e10-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'b7101e9a-b9d2-4a65-a8ed-92c1778cd716',
  'Date',
  'Sun, 03 Apr 2022 04:10:06 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164895900491301879/file164895900521502471')
  .reply(200, "", [
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  '810cb761-e01f-0001-5f10-471b65000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '42116a4c-ea9c-4fa5-9120-43dba6ee271c',
  'Date',
  'Sun, 03 Apr 2022 04:10:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164895900491301879')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '793bf721-201e-0000-4510-47e568000000',
  'x-ms-client-request-id',
  '4877ae69-a156-477c-8524-a19679d98e3b',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Sun, 03 Apr 2022 04:10:06 GMT'
]);
