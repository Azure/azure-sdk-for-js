let nock = require("nock");

module.exports.hash = "5248ed1f4a9c837cfd493f79ed29e17a";

module.exports.testInfo = { uniqueName: { share: "share159825199096905489" }, newDate: {} };

nock("https://fakestorageaccount.file.core.windows.net:443", { encodedQueryParams: true })
  .put("/share159825199096905489")
  .query(true)
  .reply(201, "", [
    "Content-Length",
    "0",
    "Last-Modified",
    "Mon, 24 Aug 2020 06:53:11 GMT",
    "ETag",
    '"0x8D847FA5DE6DED2"',
    "Server",
    "Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "efb5e4eb-501a-0052-51e3-794b91000000",
    "x-ms-client-request-id",
    "cbcf06d0-b4bb-40d7-a8f6-946eac4cb315",
    "x-ms-version",
    "2019-12-12",
    "Date",
    "Mon, 24 Aug 2020 06:53:11 GMT"
  ]);

nock("https://fakestorageaccount.file.core.windows.net:443", { encodedQueryParams: true })
  .delete("/share159825199096905489")
  .query(true)
  .reply(202, "", [
    "Content-Length",
    "0",
    "Server",
    "Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "efb5e4ee-501a-0052-52e3-794b91000000",
    "x-ms-client-request-id",
    "6f83b0bf-f7cc-42e5-bb93-043fbcd66bc8",
    "x-ms-version",
    "2019-12-12",
    "Date",
    "Mon, 24 Aug 2020 06:53:11 GMT"
  ]);

nock("https://fakestorageaccount.file.core.windows.net:443", { encodedQueryParams: true })
  .get("/")
  .query(true)
  .reply(
    200,
    '﻿<?xml version="1.0" encoding="utf-8"?><EnumerationResults ServiceEndpoint="https://fakestorageaccount.file.core.windows.net/"><Shares><Share><Name>share159825189673103060</Name><Deleted>true</Deleted><Version>01D679E3034BB8D1</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:51:37 GMT</Last-Modified><Etag>"0x8D847FA25C224E5"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:51:37 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:51:37 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share><Share><Name>share159825189828205497</Name><Deleted>true</Deleted><Version>01D679E303D09169</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:51:38 GMT</Last-Modified><Etag>"0x8D847FA2646D62A"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:51:38 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:51:38 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share><Share><Name>share159825199096905489</Name><Deleted>true</Deleted><Version>01D679E33B709913</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:53:11 GMT</Last-Modified><Etag>"0x8D847FA5DE6DED2"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:53:11 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:53:11 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share></Shares><NextMarker /></EnumerationResults>',
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/xml",
      "Server",
      "Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0",
      "x-ms-request-id",
      "efb5e4ef-501a-0052-53e3-794b91000000",
      "x-ms-client-request-id",
      "01e9574b-f546-4647-9c9e-a6f9b45792a2",
      "x-ms-version",
      "2019-12-12",
      "Date",
      "Mon, 24 Aug 2020 06:53:11 GMT"
    ]
  );
