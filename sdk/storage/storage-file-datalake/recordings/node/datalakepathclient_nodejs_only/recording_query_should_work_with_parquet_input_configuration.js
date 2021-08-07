let nock = require('nock');

module.exports.hash = "97b372bb63fb2254888c80e4312ddada";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162633543314809354","file":"file162633543437900728"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162633543314809354')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 15 Jul 2021 07:50:34 GMT',
  'ETag',
  '"0x8D947653A250E50"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc454779-401e-0031-754e-7930c7000000',
  'x-ms-client-request-id',
  'a0976685-8768-4ff5-a9cc-0fdde98bca1c',
  'x-ms-version',
  '2020-08-04',
  'Date',
  'Thu, 15 Jul 2021 07:50:33 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162633543314809354/file162633543437900728')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Thu, 15 Jul 2021 07:50:35 GMT',
  'ETag',
  '"0x8D947653AD797BD"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '095135ef-801f-0019-274e-791abe000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  '25e4110c-1b2b-44e7-a16e-e4acedf57869',
  'Date',
  'Thu, 15 Jul 2021 07:50:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem162633543314809354/file162633543437900728', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '095135f2-801f-0019-284e-791abe000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  'cd45ad49-1e31-4397-904a-3aa3b55b8e6f',
  'Date',
  'Thu, 15 Jul 2021 07:50:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem162633543314809354/file162633543437900728')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Thu, 15 Jul 2021 07:50:35 GMT',
  'ETag',
  '"0x8D947653B2C48DE"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '095135f3-801f-0019-294e-791abe000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  '22a5a7b8-4244-40a3-b7e6-f5ffb37f241c',
  'Date',
  'Thu, 15 Jul 2021 07:50:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162633543314809354')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc455600-401e-0031-594e-7930c7000000',
  'x-ms-client-request-id',
  '1388beca-56b9-4c7a-b19f-e1e8929f6c1b',
  'x-ms-version',
  '2020-08-04',
  'Date',
  'Thu, 15 Jul 2021 07:50:35 GMT'
]);
