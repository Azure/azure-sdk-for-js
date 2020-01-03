let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370434072507448","blob":"blob157370434106609804"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370434072507448')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:41 GMT',
  'ETag',
  '"0x8D768B7E9FAC603"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e61f57dd-301e-005c-6fa0-9a9705000000',
  'x-ms-client-request-id',
  '1edd898e-7c12-4a2b-8d66-8aba053325d3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:40 GMT' ]);
