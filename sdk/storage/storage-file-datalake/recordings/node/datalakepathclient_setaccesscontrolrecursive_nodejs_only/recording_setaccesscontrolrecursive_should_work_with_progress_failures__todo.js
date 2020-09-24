let nock = require('nock');

module.exports.hash = "115f635cbcf9b03a9d6ea136672e81a8";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159298730672405354","file":"file159298730703001527"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298730672405354')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:23 GMT',
  'ETag',
  '"0x8D818188F3930B3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9cc4569-501e-0079-7901-4ab184000000',
  'x-ms-client-request-id',
  '31ba016c-7005-4a6c-9fda-4968ef51bc07',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Wed, 24 Jun 2020 08:28:22 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298730672405354/file159298730703001527')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:23 GMT',
  'ETag',
  '"0x8D818188F69A8C7"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d8600-901f-0014-1b01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '6ff110dd-aee9-440f-8479-5bdf1a7db1a7',
  'Date',
  'Wed, 24 Jun 2020 08:28:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298730672405354/file159298730703001527', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '9b1d8602-901f-0014-1d01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'be7fe2df-f6f7-4a53-af5e-02737082cbbd',
  'Date',
  'Wed, 24 Jun 2020 08:28:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298730672405354/file159298730703001527')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:24 GMT',
  'ETag',
  '"0x8D818188FC8157B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '9b1d8603-901f-0014-1e01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'ee6ac69e-805c-47cd-9b94-9ab835e06860',
  'Date',
  'Wed, 24 Jun 2020 08:28:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159298730672405354')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9cc462c-501e-0079-0101-4ab184000000',
  'x-ms-client-request-id',
  '8a1e9439-2224-4d7f-94b6-3f04b3606a54',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Wed, 24 Jun 2020 08:28:23 GMT'
]);
