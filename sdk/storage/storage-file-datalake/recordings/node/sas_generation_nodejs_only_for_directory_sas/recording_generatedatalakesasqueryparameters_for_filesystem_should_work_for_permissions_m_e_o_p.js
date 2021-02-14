let nock = require('nock');

module.exports.hash = "b38b2cb51a8273c8fbf7c281a4514192";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160119086619304249","directory":"directory160119086654005398","file":"file160119086686203124"},"newDate":{"now":"2020-09-27T07:14:27.215Z","tmr":"2020-09-27T07:14:27.215Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119086619304249')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 07:14:26 GMT',
  'ETag',
  '"0x8D862B4F7CA5BF6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '395102c5-a01e-001f-5d9d-94fea4000000',
  'x-ms-client-request-id',
  '0a372421-a47f-49fa-9b6c-a17cf51ab37f',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 07:14:25 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119086619304249/directory160119086654005398')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 07:14:26 GMT',
  'ETag',
  '"0x8D862B4F7FE0B9B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0453a43d-301f-007f-3b9d-94823b000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '67f96a25-8d78-469a-87f9-6147181d946a',
  'Date',
  'Sun, 27 Sep 2020 07:14:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119086619304249/directory160119086654005398/file160119086686203124')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 07:14:27 GMT',
  'ETag',
  '"0x8D862B4F83324D1"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0453a43e-301f-007f-3c9d-94823b000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'a09969f8-9da0-4d70-bcb7-bbc1a51716f2',
  'Date',
  'Sun, 27 Sep 2020 07:14:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160119086619304249/directory160119086654005398')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 07:14:26 GMT',
  'ETag',
  '"0x8D862B4F7FE0B9B"',
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
  '0453a43f-301f-007f-3d9d-94823b000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '40936cc9-fcf3-49ae-aee3-79380df3249f',
  'Date',
  'Sun, 27 Sep 2020 07:14:26 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160119086619304249/directory160119086654005398')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 07:14:26 GMT',
  'ETag',
  '"0x8D862B4F7FE0B9B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '8545d695-c01f-008f-809d-94c4ca000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'd22fbe54-4abf-4a01-83bd-3464357fbc97',
  'Date',
  'Sun, 27 Sep 2020 07:14:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160119086619304249')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '39510413-a01e-001f-699d-94fea4000000',
  'x-ms-client-request-id',
  '1dfe0bb7-613d-419b-924c-a76c8b0d9d97',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 07:14:28 GMT'
]);
