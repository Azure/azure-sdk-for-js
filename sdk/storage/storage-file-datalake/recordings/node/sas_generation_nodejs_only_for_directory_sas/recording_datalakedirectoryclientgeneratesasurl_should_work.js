let nock = require('nock');

module.exports.hash = "50d2b978b4a7c6fcc10c5d887d9106ee";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160715103935605477","directory":"directory160715104078305954","file":"file160715104214803702"},"newDate":{"now":"2020-12-05T06:50:42.454Z","tmr":"2020-12-05T06:50:42.457Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160715103935605477')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 05 Dec 2020 06:50:40 GMT',
  'ETag',
  '"0x8D898EA1478D8CF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8d70ff2-e01e-008d-57d2-ca0938000000',
  'x-ms-client-request-id',
  '661f5114-df24-45ce-bb4e-35e3ac533a37',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 05 Dec 2020 06:50:40 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160715103935605477/directory160715104078305954')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sat, 05 Dec 2020 06:50:42 GMT',
  'ETag',
  '"0x8D898EA154D85A3"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a55d059a-a01f-002b-3ed2-ca3126000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'a20afc5f-aca4-4a16-807c-83eb0e8e2481',
  'Date',
  'Sat, 05 Dec 2020 06:50:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160715103935605477/directory160715104078305954/file160715104214803702')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sat, 05 Dec 2020 06:50:42 GMT',
  'ETag',
  '"0x8D898EA157C118A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a55d05bd-a01f-002b-60d2-ca3126000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '0bc294b5-0f88-4be0-9970-fc42bbaf9c08',
  'Date',
  'Sat, 05 Dec 2020 06:50:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160715103935605477/directory160715104078305954')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sat, 05 Dec 2020 06:50:42 GMT',
  'ETag',
  '"0x8D898EA154D85A3"',
  'Vary',
  'Origin',
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
  'a55d05d5-a01f-002b-76d2-ca3126000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'f2e8b8d5-b4e4-483f-8f61-a6ea241ff0f7',
  'Date',
  'Sat, 05 Dec 2020 06:50:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160715103935605477')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8d71aca-e01e-008d-2fd2-ca0938000000',
  'x-ms-client-request-id',
  'bd24eaea-cf2e-4516-803e-30a6263b791d',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 05 Dec 2020 06:50:43 GMT'
]);
