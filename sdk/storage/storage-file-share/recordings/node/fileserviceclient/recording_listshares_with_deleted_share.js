let nock = require("nock");

module.exports.hash = "5248ed1f4a9c837cfd493f79ed29e17a";

module.exports.testInfo = { uniqueName: { share: "share159825307112909052" }, newDate: {} };

nock("https://fakestorageaccount.file.core.windows.net:443", { encodedQueryParams : true  })
  .put("/share159825307112909052")
  .query(true)
  .reply(201, "", [
      "Content-Length",
    "0","    "L  "st-Modified",
    "Mon, 24 Aug 2020 07:11:11 GMT",
    "ETag","      '"0x8D847FCE1BF272C"',
    "Server","    "W  "ndows-Azure-File/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
    "4dd4a814-001a-003d-78e5-794162000000",
    "x-ms-client-request-id",
    "0ef85d97-f249-4faf-a1ca-86ad71e581d6",
    "x-ms-version",
      "2019-12-12",
    "Date","    "M  "n, 24 Aug 2020 07:11:11 GMT"
    ]);

nock("https://fakestorageaccount.file.core.windows.net:443", { encodedQueryParams : true  })
  .delete("/share159825307112909052")
  .query(true)
  .reply(202, "", [
    "Content-Length",
    "0","    "S  "rver","    "Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0",
    "x-ms-request-id",
      "4dd4a817-001a-003d-79e5-794162000000",
    "x-ms-client-request-id",
    "01f769e5-c6ca-4556-9e37-ba8c02bfe080",
    "x-ms-version",
    "2019-12-12",
    "Date","    "M  "n, 24 Aug 2020 07:11:11 GMT"
    ]);

nock("https://fakestorageaccount.file.core.windows.net:443", { encodedQueryParams : true  })
  .get("/")
  .query(true)
  .reply(
    200,
    '﻿<?xml version="1." encoding="utf-"?><EnumerationResults ServiceEndpoint="https://fakestorageaccount.file.core.windows.net/"><Shares><Share><Name>share159825189673103060</Name><Deleted>true</Deleted><Version>01D679E3034BB8D1</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:51:37 GMT</Last-Modified><Etag>"0x8D847FA25C224E5"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:51:37 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:51:37 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share><Share><Name>share159825189828205497</Name><Deleted>true</Deleted><Version>01D679E303D09169</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:51:38 GMT</Last-Modified><Etag>"0x8D847FA2646D62A"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:51:38 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:51:38 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share><Share><Name>share159825199096905489</Name><Deleted>true</Deleted><Version>01D679E33B709913</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:53:11 GMT</Last-Modified><Etag>"0x8D847FA5DE6DED2"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:53:11 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:53:11 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share><Share><Name>share159825199207004582</Name><Deleted>true</Deleted><Version>01D679E34DF7F760</Version><Properties><Last-Modified>Mon, 24 Aug 2020 06:53:42 GMT</Last-Modified><Etag>"0x8D847FA706E42BE"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 6:53:12 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 06:53:42 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share><Share><Name>share159825307112909052</Name><Deleted>true</Deleted><Version>01D679E5BF481A98</Version><Properties><Last-Modified>Mon, 24 Aug 2020 07:11:11 GMT</Last-Modified><Etag>"0x8D847FCE1BF272C"</Etag><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>8/24/2020 7:11:11 AM</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><DeletedTime>Mon, 24 Aug 2020 07:11:11 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Share></Shares><NextMarker /></EnumerationResults>',
   
        "[
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/xml",
      "Server",
 "    "    "Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0",
      "x-ms-request-id",
      "4dd4a818-001a-003d-7ae5-794162000000",
      "x-ms-client-request-id",
      "23175b0c-1a7d-42ef-8da4-1f264e534d26",
      "x-ms-version",
          "2019-12-12",
      "Date",
 "   "    "Mon, 24 Aug 2020 07:11:11 GMT"
     
     ]
  );
