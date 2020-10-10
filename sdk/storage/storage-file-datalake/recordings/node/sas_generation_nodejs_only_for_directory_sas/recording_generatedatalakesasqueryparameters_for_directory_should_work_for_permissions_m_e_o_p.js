let nock = require('nock');

module.exports.hash = "d63dd630beb0486fd25c48dc18b61be9";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160119085691006060","directory":"directory160119085896407057","file":"file160119086034900504"},"newDate":{"now":"2020-09-27T07:14:20.727Z","tmr":"2020-09-27T07:14:20.729Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119085691006060')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 07:14:18 GMT',
  'ETag',
  '"0x8D862B4F30F7910"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3950febe-a01e-001f-369d-94fea4000000',
  'x-ms-client-request-id',
  '60045a93-3c91-4eca-954b-0128d8c130e2',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 07:14:18 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119085691006060/directory160119085896407057')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 07:14:20 GMT',
  'ETag',
  '"0x8D862B4F41BA203"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '73d0580c-e01f-0043-5c9d-94abfc000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '2ff267b5-f5a7-44c6-b69c-cdae4e496db1',
  'Date',
  'Sun, 27 Sep 2020 07:14:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119085691006060/directory160119085896407057/file160119086034900504')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 07:14:20 GMT',
  'ETag',
  '"0x8D862B4F454A259"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '73d0580d-e01f-0043-5d9d-94abfc000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'cb719bb9-762e-4bd6-aaed-b504714d9214',
  'Date',
  'Sun, 27 Sep 2020 07:14:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160119085691006060/directory160119085896407057')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 07:14:20 GMT',
  'ETag',
  '"0x8D862B4F41BA203"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x---',
  'x-ms-acl',
  'user::rwx,group::r-x,other::---',
  'x-ms-request-id',
  '73d0580e-e01f-0043-5e9d-94abfc000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'f56a21b5-94c5-42a0-bcf4-17145b4ce706',
  'Date',
  'Sun, 27 Sep 2020 07:14:20 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160119085691006060/directory160119085896407057')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 07:14:20 GMT',
  'ETag',
  '"0x8D862B4F41BA203"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'd79f91d8-401f-005a-6c9d-942b47000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '6f3969ba-0dfd-4376-b42f-51c5dba576cd',
  'Date',
  'Sun, 27 Sep 2020 07:14:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160119085691006060')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3951014c-a01e-001f-3a9d-94fea4000000',
  'x-ms-client-request-id',
  'c894f05d-5ed9-4657-8957-5ab62459e5cd',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 07:14:21 GMT'
]);
