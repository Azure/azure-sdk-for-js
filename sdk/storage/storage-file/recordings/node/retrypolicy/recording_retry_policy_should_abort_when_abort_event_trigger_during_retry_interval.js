let nock = require('nock');

module.exports.testInfo = {"share":"share156758480828309923"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758480828309923')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:28 GMT',
  'ETag',
  '"0x8D7310FC4601868"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '84cb791b-501a-008e-7ff8-622135000000',
  'x-ms-client-request-id',
  'dea7889b-bff3-4ddc-93d0-ae990db12bbe',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:28 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758480828309923')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd1cdc65b-a01a-0023-2ef8-626d40000000',
  'x-ms-client-request-id',
  '41b42a02-8299-4465-aeaa-0b6c4c49da87',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:30 GMT',
  'Connection',
  'close' ]);

