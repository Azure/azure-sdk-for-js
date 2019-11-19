let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370309480005886"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370309480005886')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 03:44:55 GMT',
  'ETag',
  '"0x8D768B5035AFB28"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '65fb2fab-401e-0035-809d-9ac8a9000000',
  'x-ms-client-request-id',
  '0dcc98e6-9d5a-4127-b50f-324ac8390fec',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 03:44:54 GMT' ]);
