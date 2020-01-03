let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-11T02:25:36.321Z","tmr":"2019-09-11T02:25:36.321Z"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8fec175d-b01e-0009-7748-687c72000000',
  'x-ms-client-request-id',
  '4e3a6849-7d25-47fc-aca0-afa318ae4f1f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-sku-name',
  'Standard_RAGRS',
  'x-ms-account-kind',
  'StorageV2',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-sku-name,x-ms-account-kind,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:25:35 GMT' ]);

