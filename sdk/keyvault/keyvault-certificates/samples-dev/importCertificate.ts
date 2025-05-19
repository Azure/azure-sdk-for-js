// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Imports a PFX and PEM certificate and then deletes them.
 */

import {
  CertificateClient,
  WellKnownIssuer,
} from "@azure/keyvault-certificates";
import { DefaultAzureCredential } from "@azure/identity";
// Load the .env file if it exists
import "dotenv/config";

// For convenience in this sample we'll use some self-signed test certificates
// that were generated using openssl
const samplePfxBase64 =
  "MIIJfwIBAzCCCTUGCSqGSIb3DQEHAaCCCSYEgg" +
  "kiMIIJHjCCA5IGCSqGSIb3DQEHBqCCA4MwggN/" +
  "AgEAMIIDeAYJKoZIhvcNAQcBMFcGCSqGSIb3DQ" +
  "EFDTBKMCkGCSqGSIb3DQEFDDAcBAiWfDdHoa0o" +
  "DQICCAAwDAYIKoZIhvcNAgkFADAdBglghkgBZQ" +
  "MEASoEEKW4FiXxSBlDOeAmuCAjKhGAggMQcay0" +
  "zqgo77DLbqbnIT4lnT91VIXqbh8tXo70V+JDJ5" +
  "xyGxoW8XudDJ4D38vQ/tiVDeN3HZkIx4N/+DJc" +
  "C7la9eSHa4S4v5hDVArltYETEY2X3hVrtDybTk" +
  "6YheclI1aexbEoFHx3oXXRLe7tYT/0SUaRth0P" +
  "j8nzomdQaA/ok0lJOCEcUl8HPfeYnJxxzTgAYt" +
  "qzaSdKFDt6AZ77f/LjB0YhRUp//oSVQbvFAmX1" +
  "JwR9mlK8eVTfkrRhBIzXUoBRk5fFgRv3svVo41" +
  "8ZHJgfaqNdwIHzIux3rAY1ze6Fdpx1q7Lx5793" +
  "Hy9uYeIjA/gU4H/0g3glTCGjQhoeQHbF2q9FnM" +
  "es9fPb4NN6jofdWXlIxT7b8SwC9v3v3MUoMZNs" +
  "8llswqQw7+g68yF3rXqowQgWHRcB/ISmqsSkJN" +
  "2FFg/sXLouuRpLctd5pRg6rdJQn7725OSM0GBt" +
  "SfsD89kilVr84u6jFo3Si2tb99wVAZFsiima3h" +
  "mrH9AO2uEcKM/+c3Ek7UaFKUEDi7MQzsbRdzdN" +
  "7eh9RJv4zkQNpYowep32Qgdyk/wnrHP+hLBo04" +
  "qzQX+ix59QwXKK3OC1nEq9vHFn2JUQtQL/9ouB" +
  "00P//h6C33I/8h6788D3gI1SZ3m7PfU0ofiWuC" +
  "6tg4oBlgwNWipn9YEkfJlUIfagM13aX9I+kFuR" +
  "wkUegxPyy+X5xOKh3MzMgpm6PQX7LUSQZVdTNS" +
  "Opt6uy5Oov7iONl9SRiuJGUNWDv/1FbE/p3RNy" +
  "qF6QtRfodfK6mNGLOwNlFffvQRC2+h8fdKraAE" +
  "bX+GwfD2mjcllS32Gq6JPFOpgDPLXviwG6zVMv" +
  "qtppPnyce9030u+DyuPoAe5l24MkQDVTM1ot/4" +
  "Er+KcElxYfCgOu1/leGeI4yGfiTRa1swu1FxUk" +
  "z+Kw8t9RpGdIiBrVVNWmzokK8VBaWoBenvAr7s" +
  "b3NjoiZ+XHaXjAn+yj6x32eQfC5BGVjq5UNM0s" +
  "Lxdlb1esBzX56fzOcP1sxYWLR1ybBBV/LuAuiw" +
  "1qV1vsWbn/nVOmFTCCBYQGCSqGSIb3DQEHAaCC" +
  "BXUEggVxMIIFbTCCBWkGCyqGSIb3DQEMCgECoI" +
  "IFMTCCBS0wVwYJKoZIhvcNAQUNMEowKQYJKoZI" +
  "hvcNAQUMMBwECM2joCWIyun9AgIIADAMBggqhk" +
  "iG9w0CCQUAMB0GCWCGSAFlAwQBKgQQv/5zx/8y" +
  "YxLc9DwTznCMTgSCBNBjsrPWznMkToZ5gFB2Im" +
  "75307iQqalzACMCALCK1UNfWUOcemK5gUE5ImG" +
  "eBAfBOhu67foRsx0GFgfsmVylZoxUYiEjec+i5" +
  "ACClzyruCOJpFGClQZWUuu17C/IW/sb9ZKkGFY" +
  "Xg+s3dp+U8vKPh3UV07gTH7EWDiaDOcBf3+T47" +
  "kl7/yO+hGiINtO0fhjZEe1WdWvyw6LAzuujA9A" +
  "3Sux1LCdxY2WMGo/QmIXuztxX8l/2w8jd+My6C" +
  "bif6oIs3cQGAg7mvtXNEXtm0h6Qj0wOJV/ONXd" +
  "e45Y0ra7U8P69KyNjL1f3EKeA7PGDcUu+kXLCM" +
  "lU4jXyFEVLFFumj+mEa/MhJKr2o1HIo4teIPvw" +
  "N6NbwUdh2xL2V5JhOdnGeZ2IvvywvJ0UV8xrk+" +
  "jDTYid8Gox52HyBIpdnucnznxUJIZhg/IZmhP4" +
  "4iFu261aBN7Uots+myJ8QkkBR2/EJ3Z+q4I7oI" +
  "ypVM6y5GYnDfgeeN/gXMLkupSDf/HHGbdIFyfn" +
  "uuSBraFSTKObxmSrSuKRg9l38wNEtCTrz2mRSq" +
  "LXPu+rAtD5R7OTBQNMkkdIfhThkupeNWq4sJUX" +
  "zsKiFLmuXwsjJcMFWX5Khzo5GR9TMN9arVguC7" +
  "dQCdBAc4xpQlP077yCMAtNb/vAjRrIqoy9uNfq" +
  "FNRZG5ILLn7w407uMwHLEJFIkEEzx7EdoVorbV" +
  "xOhGjVqrJ7OXgxE6HrzWn92/OhBqnWiIeW16dj" +
  "boCPrdI3BCqWpXFHYvhDuTrqFXPpIZhqc145U2" +
  "CQ4Un54MOr8NcqlooWsWlJf2MDrqtcETCPF4N4" +
  "/k2c6SYA1F5dVqXt1R+BnTSGx1PzxlLyTuusWB" +
  "p3DxzbklXt0iOsdDcM30TrLY3r/unLpVrN1ikM" +
  "7qaaEV/YGj6dklc/uSsTq+Es6Re62wGs5JjRTv" +
  "qCksmvRIO92a2h4wiKbE9A4R5QqYxbbyfqIDD/" +
  "sJ1LfwXb0Xge3h/qBUXC/5fDWZS35snhKaWwMv" +
  "bvuup02URR0pzwVGjQSWCv1xPESwbB1YSU37q+" +
  "eHVXzWh+ca9Kwiig2ECrXFapVfzG9SpIOpIygj" +
  "CiBMroKIVASKD6ZWKoaRayoNStyU2Kdg1EKA9X" +
  "3h8a1uSNtMS+M8F8Dc7g0UApnWw30+NwuuRMO0" +
  "YyPxQQrCwSMVSQMSLuUw2R3Gtu7/c4wf31q1h1" +
  "wnB6KgvsbQ2E7DXQIJMJAY33hoWrkYBPi0m3py" +
  "mDnzCQ1stY+mFi+yAo1O8SBlLcGEujUvdmMzQo" +
  "4jmE13A7KAcK7LC56OBggDwYJ26l5tes+rD6N6" +
  "rgYYgNFUTKbEXkQmbvzL/YYKIExHlBNuEQi4oq" +
  "oibbA3GRxA7XxhIEKWy3A8Ezm6IM4R0ekuBzmM" +
  "lY4wqL9uhCizGfd59DrL6sumklHyZ3kZkfkXBk" +
  "do0/Tz9ewaQeV3lR7++z3ZEhmbs5C6C6Wcby8s" +
  "uW5ZwTda2yPltSrxNBteLP6/vyC79WQ2k6zHkP" +
  "UsNtgsKP22X88Yyyji3b52t1FmjdSqEWlz9EcJ" +
  "dq35lGgZsxF5YN/Y4bqtefF64ffabLT6NO0dzc" +
  "w71asp7eUp7vSRKHBCHzto1bACsO79Txk6VkaO" +
  "hPU8EIGkEolsa+QYy3KyxP4VOy1jElMCMGCSqG" +
  "SIb3DQEJFTEWBBS9XpVGDMi4RZRP8NZXo7nqjF" +
  "uPATBBMDEwDQYJYIZIAWUDBAIBBQAEIGZwpWCT" +
  "N/OovIIcmEiZtYENZTMo06RgmdupJd68SozSBA" +
  "h3Zu0xIAU8TgICCAA=";

const samplePem =
  "-----BEGIN CERTIFICATE-----\n" +
  "MIICszCCAZsCFBtIuxS0jWci0Rcrd71HE" +
  "2lPEZ5jMA0GCSqGSIb3DQEBCwUAMBYx\n" +
  "FDASBgNVBAMMC2NvbnRvc28uY29tMB4XD" +
  "TI1MDMxNzIyNTk1N1oXDTI2MDMxNzIy\n" +
  "NTk1N1owFjEUMBIGA1UEAwwLY29udG9zb" +
  "y5jb20wggEiMA0GCSqGSIb3DQEBAQUA\n" +
  "A4IBDwAwggEKAoIBAQDqkWxlgehRB//K5" +
  "8DlTflgYNyUa7lCCuSqYmpV5tcVONZp\n" +
  "+VLgiaVe5YrdF0WHz8pPI7nXfmIykvpBE" +
  "iOcqjGxMtciwzrDX4pfuv5Z7db91GRw\n" +
  "P5iILIcZJ35nHlcI8p9O0VQFGLj06E1SY" +
  "NcnzYviPPjL5m8TYQ9zkH7g0quSWAEL\n" +
  "9EEvZeTcmXchIf0zdIMSeiR9ibrQ72L7i" +
  "UAsOz7IKrbFo/lsLgVw5tm8YepaP8EN\n" +
  "KBqFEooVY7rBXB3Ml1mWq7m50k96yr3Pk" +
  "FItZmcXeB99TDmMCQIrwgytduErsQiO\n" +
  "HxuZl15M0j/EH+KP8NkWpOMqMZwxMaeOQ" +
  "qDNJD4RAgMBAAEwDQYJKoZIhvcNAQEL\n" +
  "BQADggEBABxHrRTamiO3jpW9WKcMJed8z" +
  "X/6qsZvXdGSjO2+rT5ePw1rbtCsQsk1\n" +
  "pBLSEEP/FKVTf+LXgkoC2JnAFuQgwu1cg" +
  "AzyeAE/eUPmSgIHcJGqD9FS1vyiK5Sw\n" +
  "+StoVm8+kyGsUmU7vpyDGT4k6l2kECp/U" +
  "xQmiHHcqUh+IuX2B58tU2nVKdcekWZk\n" +
  "GF8NugG8PeplqXRKDg7Q+SWbXA3mpv3CR" +
  "B8DB0SJttY33n0X3osLBjn9ffzOCTv0\n" +
  "m/AQpuIMqf2rh48rR2IMyM01NhRWBPkoe" +
  "g7Z1xkjfqFM3yUB4EcY+za5esbEDV2X\n" +
  "9S/ZjMbA8ZqHhqqZEOhAFFInUa4a74c=\n" +
  "-----END CERTIFICATE-----\n" +
  "-----BEGIN PRIVATE KEY-----\n" +
  "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCB" +
  "KcwggSjAgEAAoIBAQDqkWxlgehRB//K\n" +
  "58DlTflgYNyUa7lCCuSqYmpV5tcVONZp+" +
  "VLgiaVe5YrdF0WHz8pPI7nXfmIykvpB\n" +
  "EiOcqjGxMtciwzrDX4pfuv5Z7db91GRwP" +
  "5iILIcZJ35nHlcI8p9O0VQFGLj06E1S\n" +
  "YNcnzYviPPjL5m8TYQ9zkH7g0quSWAEL9" +
  "EEvZeTcmXchIf0zdIMSeiR9ibrQ72L7\n" +
  "iUAsOz7IKrbFo/lsLgVw5tm8YepaP8ENK" +
  "BqFEooVY7rBXB3Ml1mWq7m50k96yr3P\n" +
  "kFItZmcXeB99TDmMCQIrwgytduErsQiOH" +
  "xuZl15M0j/EH+KP8NkWpOMqMZwxMaeO\n" +
  "QqDNJD4RAgMBAAECggEAB9cVfu0RJUg1q" +
  "gQGBAQPrkN+i+1v0z/G9dT1RerBzKFK\n" +
  "NV+SgBPJtbrJYetptQjic7O3ffbo9FTKT" +
  "Yt8KjvcDlarLyvEVoxmdR2sa7gR5AkJ\n" +
  "1GCjygVm/JW/2VV/xjpJzdocS1FQuUrcb" +
  "sDy4A80Ojsce8A3fTfUyuGNBBm2h10e\n" +
  "RStZNMJrhStsWAxgR6ZgL7+5s6vjt8R5A" +
  "YDqKlWXJnqJvdld+6JJco1awPSaJRZi\n" +
  "/+8DEwfoQAzn51isEBoTC0BrCr2J9fJc3" +
  "f0l0KENlzQdFunwsDrXi5fWRKpw3Y3V\n" +
  "NadOID03i5C9QU3IcuqPUSe24nt96aXjS" +
  "DS0l5YtcwKBgQDvmNwFbFnmwRs3NRS5\n" +
  "1Cfd11Kqzc4cAvXzxap/+UwsgwkHRSD8T" +
  "cOT9jvyi7GBJIw+pRaZzA5K3P8YXCyU\n" +
  "DnYfji0EFZvKy+3EPujqA57aD7V81C6Yv" +
  "Q+kgeXCgOKxR/fT6ODSRkD4O3DDuiL9\n" +
  "ntCQaCXBlwLk75IDoAcvqJybswKBgQD6o" +
  "Gz6Pp7OEGW0rUSP3AnB6F0Bu7OCy9k0\n" +
  "i5owEj1CD6RveKs2CJacJ6fjHzvwo1HqC" +
  "ABSfw1Ub9QwxRE4qZp149x2R8K8mzEG\n" +
  "YSUuGxHLhlz78dzfBV9rDXIwhW7JGr7I1" +
  "gi6Y/N+sbDb7KZD7rqytuhO1qFCUDJv\n" +
  "YykPDloNKwKBgFNjNwgoKq3V/XvcXIdEY" +
  "E+kNiA+GoLDQQiDfhCmGi3PuR+vnohR\n" +
  "JEVlyH1kwvV4W9sdp90FGOBTQ/Ede2JYG" +
  "iJnYCFwx9Tv3qOTZYq0kd/A4eA9FK6R\n" +
  "9lTB5M4p/zvGGWnGPiDQ1KHQRjHIoY71b" +
  "A8mQCW9QgOdoYrjcjzTCRZjAoGANpUz\n" +
  "xrhWm6hEjjniIbaZRWrWvqbjbIv6zQ/OT" +
  "8PZJYcEl+Ze21C5hF66mKNXyYu4LlD5\n" +
  "yP20qHwGaWyx2HZPlnc+r1/nkG34GlyT3" +
  "Vu1325u18wP/15LLqRqBxk4TIIPpOvA\n" +
  "UN+tyxzl2K/MciUO8hcVtv3VdvzCTzH4Y" +
  "jgM8qsCgYEApPueucMuQT2t6iPkwDrS\n" +
  "x6FkLJ42fSflU8goacI6HXGAkmim3oQ7S" +
  "J29ympMSb4ukIOI/NpUPc5ttYtCDqAa\n" +
  "YYuSQ6RmxoA8pTax5IyoZjoXtr21G3r6v" +
  "XTaP+3v/w8IFTC+1Jn2GqSd1g3T88H7\n" +
  "6FkJCaotmw64669WNDzhTv0=\n" +
  "-----END PRIVATE KEY-----";

// This sample demonstrates how to import both PKCS#12 (PFX) and PEM-formatted certificates
// into Azure Key Vault.
export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  // If you're using MSI, DefaultAzureCredential should "just work".
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential);

  // When importing a PFX containing your key pair, the policy is needed if you want the
  // private key to be exportable or to configure actions when a certificate is close to expiration.
  let importedCertificate = await client.importCertificate(
    `import-${Date.now()}`,
    Buffer.from(samplePfxBase64, "base64"),
    {
      policy: {
        contentType: "application/x-pkcs12",
        issuerName: WellKnownIssuer.Self,
        subject: "CN=contoso.com",
      },
    }
  );

  console.log("importedCertificate", importedCertificate);

  let deletePoller = await client.beginDeleteCertificate(
    importedCertificate.name
  );
  let deletedCertificate = await deletePoller.pollUntilDone();
  console.log("Recovery Id: ", deletedCertificate.recoveryId);
  console.log("Deleted Date: ", deletedCertificate.deletedOn);
  console.log("Scheduled Purge Date: ", deletedCertificate.scheduledPurgeDate);

  // PEM-formatted certificates are more common when using tools like openssl. To import a
  // PEM-formatted certificate, you must set a CertificatePolicy that sets the ContentType
  // to Pem or the certificate will fail to import
  importedCertificate = await client.importCertificate(
    `cert${Date.now()}`,
    Buffer.from(samplePem),
    {
      policy: {
        contentType: "application/x-pem-file",
        issuerName: WellKnownIssuer.Self,
        subject: "CN=contoso.com",
      },
    }
  );

  console.log("importedCertificate", importedCertificate);

  deletePoller = await client.beginDeleteCertificate(importedCertificate.name);
  deletedCertificate = await deletePoller.pollUntilDone();
  console.log("Recovery Id: ", deletedCertificate.recoveryId);
  console.log("Deleted Date: ", deletedCertificate.deletedOn);
  console.log("Scheduled Purge Date: ", deletedCertificate.scheduledPurgeDate);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
