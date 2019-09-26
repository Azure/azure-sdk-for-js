let nock = require('nock');

module.exports.testInfo = {}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash156776207192807442')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '03f3840e-c01e-00a3-2295-649246000000',
  'x-ms-client-request-id',
  '502ad195-870c-4bba-9d2b-a72e4c57a4c8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:14 GMT',
  'Connection',
  'close' ]);

