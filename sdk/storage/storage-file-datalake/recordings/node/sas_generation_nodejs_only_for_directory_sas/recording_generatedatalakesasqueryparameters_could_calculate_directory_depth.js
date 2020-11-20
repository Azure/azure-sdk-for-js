let nock = require('nock');

module.exports.hash = "f5618eb4b00f99d8fbe537045b47c869";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160119778328205800","directory":"directory160119778601405130","file":"file160119778728208354"},"newDate":{"now":"2020-09-27T09:09:47.683Z","tmr":"2020-09-27T09:09:47.686Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119778328205800')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 09:09:44 GMT',
  'ETag',
  '"0x8D862C51351C59F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775dc43f-001e-0090-22ad-9477ce000000',
  'x-ms-client-request-id',
  '88f199dc-4197-4239-acd4-3077c0bb23ac',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 09:09:44 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119778328205800/directory160119778601405130')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 09:09:47 GMT',
  'ETag',
  '"0x8D862C514DB4881"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '595272f6-901f-0049-09ad-940f4b000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '81d7508e-5e3a-4e29-814b-43ac0e185692',
  'Date',
  'Sun, 27 Sep 2020 09:09:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119778328205800/directory160119778601405130/file160119778728208354')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 09:09:47 GMT',
  'ETag',
  '"0x8D862C51518BDA4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '595272f7-901f-0049-0aad-940f4b000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '5aa3b393-c51d-46ea-a66c-6479eaecd67d',
  'Date',
  'Sun, 27 Sep 2020 09:09:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160119778328205800/directory160119778601405130')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 09:09:47 GMT',
  'ETag',
  '"0x8D862C514DB4881"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '595272fb-901f-0049-0ead-940f4b000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'bb4eee24-07df-44b9-b8bf-952c6f662436',
  'Date',
  'Sun, 27 Sep 2020 09:09:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160119778328205800/directory160119778601405130')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 09:09:47 GMT',
  'ETag',
  '"0x8D862C514DB4881"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '595272fd-901f-0049-10ad-940f4b000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '10b5e382-4343-40e1-a2de-e8759b15b9df',
  'Date',
  'Sun, 27 Sep 2020 09:09:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160119778328205800')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775dc555-001e-0090-7aad-9477ce000000',
  'x-ms-client-request-id',
  'e3082b9f-9edc-482a-bb90-feeeeb405588',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 09:09:47 GMT'
]);
