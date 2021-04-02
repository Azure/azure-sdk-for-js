let nock = require('nock');

module.exports.hash = "31eeae4fca4abd5b6dcfca410ba2930a";

module.exports.testInfo = {"uniqueName":{"container":"container160680700590904902"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160680700590904902')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 01 Dec 2020 07:16:56 GMT',
  'ETag',
  '"0x8D895C91668933D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a01d356a-101e-002f-52b1-c75836000000',
  'x-ms-client-request-id',
  '9bf2f0e8-515d-4549-b646-dbd4f817af66',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 01 Dec 2020 07:16:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160680700590904902')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a01d3701-101e-002f-29b1-c75836000000',
  'x-ms-client-request-id',
  '6ea90287-63ad-414f-921f-ccb1bfa201dd',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 01 Dec 2020 07:16:58 GMT'
]);
