let nock = require('nock');

module.exports.hash = "8a0dcf1b33255a9480250dc1fdc07bde";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160242186540708367","file":"file160242186570503731"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242186540708367')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:07 GMT',
  'ETag',
  '"0x8D86DE6D60E2C0C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76186a55-601e-006a-44cf-9ffd81000000',
  'x-ms-client-request-id',
  '29634395-a1d6-4c0a-831c-2062f50a837c',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 11 Oct 2020 13:09:06 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242186540708367/file160242186570503731')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:07 GMT',
  'ETag',
  '"0x8D86DE6D63D8B22"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a719-a01f-0017-08cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '8b7047bf-1f18-472e-9297-f960e526284f',
  'Date',
  'Sun, 11 Oct 2020 13:09:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242186540708367/file160242186570503731', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '66c1a71d-a01f-0017-0ccf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '89e3b7a9-b722-4bbf-9a39-88e538777050',
  'Date',
  'Sun, 11 Oct 2020 13:09:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242186540708367/file160242186570503731')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:09:08 GMT',
  'ETag',
  '"0x8D86DE6D697C349"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '66c1a71e-a01f-0017-0dcf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '61c8dcac-ee03-4339-96af-b1e28fa6926c',
  'Date',
  'Sun, 11 Oct 2020 13:09:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160242186540708367')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76186a9e-601e-006a-7ecf-9ffd81000000',
  'x-ms-client-request-id',
  '03b50494-d6e0-44f2-9329-b1903fa0b0f8',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 11 Oct 2020 13:09:08 GMT'
]);
