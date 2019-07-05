let nock = require('nock');

module.exports.testInfo = {}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash156231868169701661')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8446b4c5-401e-012f-0a13-33f9f9000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:37 GMT',
  'Connection',
  'close' ]);

