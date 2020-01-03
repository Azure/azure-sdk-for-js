let nock = require('nock');

module.exports.testInfo = {"container":"container156996518953608932","blob":"blob156996518964506118","blobCPK":"blobCPK156996518975103891"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156996518953608932')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 01 Oct 2019 21:26:29 GMT',
  'ETag',
  '"0x8D746B605E6D4DF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b1efcaf6-601e-0087-3b9e-786559000000',
  'x-ms-client-request-id',
  'f40765df-e146-4bf0-a012-9238ade8fe93',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 01 Oct 2019 21:26:29 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156996518953608932/blob156996518964506118', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 01 Oct 2019 21:26:29 GMT',
  'ETag',
  '"0x8D746B605F76851"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31e7ed49-701e-0114-559e-78b547000000',
  'x-ms-client-request-id',
  'bacf323b-25d6-4780-a93a-cc6cabb084e4',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 01 Oct 2019 21:26:29 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156996518953608932/blobCPK156996518975103891', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 01 Oct 2019 21:26:29 GMT',
  'ETag',
  '"0x8D746B606088388"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a1ba7fc9-b01e-00ca-039e-78a3bb000000',
  'x-ms-client-request-id',
  '993c1e20-8b90-4e3f-90c9-3442b2f891a3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Tue, 01 Oct 2019 21:26:28 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156996518953608932/blobCPK156996518975103891')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 01 Oct 2019 21:26:29 GMT',
  'ETag',
  '"0x8D746B6061CACCD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3af77dd7-f01e-00a0-769e-78ff10000000',
  'x-ms-client-request-id',
  '5eb492dd-03e3-4d07-9344-bd5e89e399e3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Tue, 01 Oct 2019 21:26:29 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156996518953608932/blobCPK156996518975103891')
  .reply(409, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f8b4e26c-f01e-0045-3c9e-78ede7000000',
  'x-ms-client-request-id',
  '38073b5a-b4d9-4ef8-b71f-e826abbcdc3b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 01 Oct 2019 21:26:29 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156996518953608932')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b1efcc7f-601e-0087-089e-786559000000',
  'x-ms-client-request-id',
  'f312732a-282c-4b0a-a580-81c836522994',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 01 Oct 2019 21:26:29 GMT' ]);

