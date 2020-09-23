let nock = require('nock');

module.exports.hash = "eb5c28f68ec1b06f5b0af59f04f201a8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><StorageServiceProperties><ProtocolSettings><SMB><Multichannel><Enabled>true</Enabled></Multichannel></SMB></ProtocolSettings></StorageServiceProperties>")
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>FeatureNotSupportedOnStorageAccount</Code><Message>Feature cannot be enabled on this storage account.\nRequestId:5e6a9f92-601a-000e-355f-911ffc000000\nTime:2020-09-23T04:11:54.0486223Z</Message></Error>", [
  'Content-Length',
  '254',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5e6a9f92-601a-000e-355f-911ffc000000',
  'x-ms-client-request-id',
  '103ea686-cedd-49f9-8146-c0acc382f9dc',
  'x-ms-version',
  '2020-02-10',
  'x-ms-error-code',
  'FeatureNotSupportedOnStorageAccount',
  'Date',
  'Wed, 23 Sep 2020 04:11:53 GMT'
]);
