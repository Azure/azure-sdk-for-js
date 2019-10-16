let nock = require('nock');

module.exports.testInfo = {"container":"container157113267746602042","directory":"directory157113267887802770"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113267746602042')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:39:44 GMT',
  'ETag',
  '"0x8D751539C305B3F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '62fd29c5-301e-0061-563c-830141000000',
  'x-ms-client-request-id',
  '835ee3ae-5215-4820-b254-287d79c86ce7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:39:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113267746602042/directory157113267887802770')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:39:45 GMT',
  'ETag',
  '"0x8D751539D02EB27"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b476a2a-d01f-0006-053c-83b2e6000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'b140552a-09b8-4bcd-851d-eaa9749b48a8',
  'Date',
  'Tue, 15 Oct 2019 09:39:44 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113267746602042')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5a593b70-401e-0003-723c-834699000000',
  'x-ms-client-request-id',
  'c5667e15-42ec-483f-9359-75a8cf3bec4a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:39:46 GMT',
  'Connection',
  'close' ]);

