let nock = require('nock');

module.exports.hash = "1726a7540765c876dd1afbc19513886e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165391576927505090","file":"file165391576953900150","testdir":"testdir165391577108903974"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165391576927505090')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 30 May 2022 13:02:49 GMT',
  'ETag',
  '"0x8DA423CB3342EB3"',
  'x-ms-request-id',
  '38730bb0-201e-0006-4925-7403a9000000',
  'x-ms-client-request-id',
  '708a07dc-4fd5-4b20-be38-9f2c8c7005e0',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 30 May 2022 13:02:49 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165391576927505090/file165391576953900150')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 30 May 2022 13:02:50 GMT',
  'ETag',
  '"0x8DA423CB3CFEE43"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1553ac30-e01f-0007-6725-74fda4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '554ac5b0-96b9-428e-be7a-f5eb5cb11399',
  'Date',
  'Mon, 30 May 2022 13:02:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165391576927505090/file165391576953900150', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1553ac31-e01f-0007-6825-74fda4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '70c1d783-003f-477d-849a-72d199b45ed8',
  'Date',
  'Mon, 30 May 2022 13:02:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165391576927505090/file165391576953900150')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 30 May 2022 13:02:51 GMT',
  'ETag',
  '"0x8DA423CB423EDCA"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '1553ac32-e01f-0007-6925-74fda4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'e3d20c5e-8838-4956-9c02-7552d6a5cd61',
  'Date',
  'Mon, 30 May 2022 13:02:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165391576927505090/testdir165391577108903974')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 30 May 2022 13:02:51 GMT',
  'ETag',
  '"0x8DA423CB44A0923"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1553ac33-e01f-0007-6a25-74fda4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '0a0efd25-32d5-4652-bc6f-70fa71182ef9',
  'Date',
  'Mon, 30 May 2022 13:02:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165391576927505090/testdir165391577108903974')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 30 May 2022 13:02:51 GMT',
  'ETag',
  '"0x8DA423CB44A0923"',
  'Vary',
  'Origin',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x-w-',
  'x-ms-acl',
  'user::rwx,group::r-x,other::-w-',
  'x-ms-request-id',
  '1553ac34-e01f-0007-6b25-74fda4000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '3880e10c-37a8-45e0-93ae-d02b7d81ad9c',
  'Date',
  'Mon, 30 May 2022 13:02:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165391576927505090')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '38730bb2-201e-0006-4a25-7403a9000000',
  'x-ms-client-request-id',
  '89a01a3a-6ed5-4a72-aba3-3e8f2139d2ae',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 30 May 2022 13:02:52 GMT'
]);
