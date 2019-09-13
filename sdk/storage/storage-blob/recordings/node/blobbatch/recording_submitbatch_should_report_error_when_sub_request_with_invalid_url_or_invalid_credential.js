let nock = require('nock');

module.exports.testInfo = {"container":"container156776185555300435"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776185555300435')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:24:15 GMT',
  'ETag',
  '"0x8D732ABFCCFDD81"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a0a498ee-a01e-0033-4c94-64a828000000',
  'x-ms-client-request-id',
  'e6c4fbea-3c6f-42ff-9fa4-471efd76b1b2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:24:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776185555300435')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cbadc875-401e-0076-2c94-647dcb000000',
  'x-ms-client-request-id',
  '1a464eb1-ea55-48f6-9b50-3c0652ac6c83',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:24:16 GMT',
  'Connection',
  'close' ]);

