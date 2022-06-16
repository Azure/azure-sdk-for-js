let nock = require('nock');

module.exports.hash = "2125cb007bf4f6d6dd9b01b6807ac33c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383028908304766","file":"file165383028935405587","testdir":"testdir165383029087305459"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028908304766')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:18:09 GMT',
  'ETag',
  '"0x8DA4175AD03F228"',
  'x-ms-request-id',
  '84b4a817-a01e-0003-745e-731608000000',
  'x-ms-client-request-id',
  '884186b0-1e9b-4292-8fe6-93024656bd39',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:18:09 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028908304766/file165383028935405587')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:10 GMT',
  'ETag',
  '"0x8DA4175AD9D518A"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91df6cf-a01f-0003-025e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'e247defd-45fc-40ad-b742-cd41a7c28509',
  'Date',
  'Sun, 29 May 2022 13:18:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383028908304766/file165383028935405587', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91df6d0-a01f-0003-035e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'f22f74ec-5856-4653-9a1d-62373776c2ff',
  'Date',
  'Sun, 29 May 2022 13:18:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383028908304766/file165383028935405587')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:11 GMT',
  'ETag',
  '"0x8DA4175ADEF3659"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'd91df6d1-a01f-0003-045e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '1330bb8c-e864-4fac-9cb6-757016491fa7',
  'Date',
  'Sun, 29 May 2022 13:18:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383028908304766/testdir165383029087305459')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:11 GMT',
  'ETag',
  '"0x8DA4175AE158065"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91df6d2-a01f-0003-055e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'c0847b3b-b5ac-4e4e-88c9-1853866e2806',
  'Date',
  'Sun, 29 May 2022 13:18:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383028908304766/testdir165383029087305459')
  .reply(200, [], [
  'Cache-Control',
  'control',
  'Content-Length',
  '0',
  'Content-Type',
  'type/subtype',
  'Content-Encoding',
  'encoding',
  'Content-Language',
  'language',
  'Last-Modified',
  'Sun, 29 May 2022 13:18:11 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA4175AE158065"',
  'x-ms-request-id',
  '84b4a819-a01e-0003-755e-731608000000',
  'x-ms-client-request-id',
  '9b9e9fe5-5e06-4859-b65e-6f6fc16b7156',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:18:11 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'disposition',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x---',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-hdi_isfolder,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:18:11 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383028908304766')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a81a-a01e-0003-765e-731608000000',
  'x-ms-client-request-id',
  'fc54b53f-666b-49f4-953a-806af99abcd7',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:18:11 GMT'
]);
