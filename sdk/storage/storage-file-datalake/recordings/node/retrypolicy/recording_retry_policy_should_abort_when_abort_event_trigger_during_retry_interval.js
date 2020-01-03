let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157534389328406331"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157534389328406331')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:25:35 GMT',
  'ETag',
  '"0x8D777A0764C35CE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f056d76-601e-0097-0c89-a92657000000',
  'x-ms-client-request-id',
  '91445aca-df15-47d3-a172-82155aa619fa',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:35 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157534389328406331')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f05737a-601e-0097-4789-a92657000000',
  'x-ms-client-request-id',
  'bbe588e1-a8eb-4e7e-ad49-63cf4c2d0b5f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:37 GMT' ]);
