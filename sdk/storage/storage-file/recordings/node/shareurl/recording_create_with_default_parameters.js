let nock = require('nock');

module.exports.testInfo = {"share":"share156775326204106074"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775326204106074')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:01:02 GMT',
  'ETag',
  '"0x8D73297FAC31CF1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '30c41282-d01a-0090-0f80-64cded000000',
  'x-ms-client-request-id',
  'f77e05aa-8331-430f-87a4-7ad841b6ebbb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:01:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775326204106074')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b1ddc5e7-201a-0070-4980-644e74000000',
  'x-ms-client-request-id',
  '9e917e63-835d-4a3d-aed5-8cd8d92d9cdd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:01:02 GMT',
  'Connection',
  'close' ]);

