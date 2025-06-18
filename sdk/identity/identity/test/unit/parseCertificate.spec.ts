// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Simple test file for the parseCertificate functionality
import { parseCertificate } from '../../src/credentials/clientCertificateCredential.js';
import { describe, it, assert } from "vitest";

describe("parseCertificate - Private Key Support", function () {
  // This is a test private key (from the existing fake-cert.pem file)
  const privateKeyOnly = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5CSXUbIXh6UuU
NksDELjHXBxldJq4+2wELAK9LtGjAX/VTrKj5j1bSGL4cK21wOHRhYVwHDNozlox
uhq8j+pbpPplqv/dBdo2V/AcScgjHiNpjyjxeJ7L2raqqM7tBnWk1Kn64MrpFBSS
EhZPOPv4YYlqVSVhZx5SAnbeCLtsveR1IHZmGj5Oa0tZkNo80Zg0hnx3ZWe0tg2j
3XiWHrqb7kWxtNS4QKDrKPp1Pb9QlFedOwho6MWQgktZ5LJ3VCqozD56bhKZR3cz
cGlz7l3xOzKlD0eEq1aoTj+I6AM5sdENAbo33jostSjtF1NB+DfoiSdacTZMvOH4
p27gspblAgMBAAECggEAHXKlQJ9c101Hp/jUC1LX9XJlWogqL5Jj6G4QqYcP+f89
FveFWqxDy4lDpwJXwvtFdRDo4aS7Ucy1cgCKTMQiqh8hcpi6S7Sou8lW/0mGvoAH
Zr9P5s4ph4vxUku3UuWaR3dI7hJkeJ+nfm++eTE6eJcdRXzzjALbQnX98Ow21+FD
dLmwTzM20aTh8wROH+AVB3+v1b+iJlz43Szgg34i0F+eS1vAjUOnRrNhxFcOyEOq
opB2qzjG65lA6sDA+zmbCaPadsfuAPpwMzZXo82u3/cwYB+8ifjnrH2ElmpBo/2h
2r2qDTpOL7P1lH+nNywqS0EznkXpC6anxqo5eEteqQKBgQDfABx+E0NK4XQzN05Y
88wZnafzUcvFM3daCc5Sr3aFobk1HI0nL/coNZV2Wb/MzBABmQ2uE10gqkINfN8k
fte4nsm07Dm2XrQcvWCg5YZ+CZpsBmogFBBXiuRjh0EwEWG+uzGPw7oQSXNYIF+d
Pa0o65VpeLqmhYxut6ZR0S+OcwKBgQDUatNxzCaSsuyyhY+YmSFBuqNAm2DKwhBt
8M5bpQJHLUxqMgr2gMV1HfkFXbFqEP/F7xdIFKnICbz27eqcc9UxNfjQq4zZSSTs
Q7tg08kN9YTJYrRa/ZpqiW302OMOTckhFhVcsvd1MLdaSYVm0NBZRjSdvb4KN5xc
vRoMKUNXRwKBgAaZ5j4FK/THf70UYglYDi6j8BjPzwxjXaEYsTbZYtTJ2MWttq/2
R4a1L1t1hKv3TnH9qd4BTLxuzc3AaIqYBqK8cJQeegbf/szq/jVFFhodBqkz92hD
r8gnoGMh2dgma5JN0EXFMXjR88wkCTCKZtnTP3UD0eKkCWgtn4rEenfpAoGACdZE
ooF8y9Bja8UJqFx3EM8u3kAT1G/2SNEdDVtv5pHvdv+ISHAgNNNFg/0ZyTquTaFL
57elQTFKQfk0ozguCFBijG9VX36mqhZc6BgGuJHFK3pZtdkGvKZOpEcjBLePd+vI
43kaQqAV7aV3+xHyhB/fMermkRyQLi9HtIZ4quMCgYEAinV4zdB7DiTVv1H5cVfx
EbwvKIABmjusiKHQOoZgk+anvzf5D9qJbws1I46CnwVrkMyHWshDC0iMSO0Md9ZM
4rp0UIiLhj2F+eWKi6I6NJeW5zcZypdS9hFNwzb1bsSAwOFuFwbNfDmCGsepZgsv
c9CAuS643vXTLX81ko/jTJs=
-----END PRIVATE KEY-----`;

  it("supports private key only PEM content", async function () {
    const result = await parseCertificate(
      {
        certificate: privateKeyOnly,
      },
      false,
    );

    // Should successfully parse and generate thumbprints
    assert.isString(result.thumbprint);
    assert.isString(result.thumbprintSha256);
    assert.isNotEmpty(result.thumbprint);
    assert.isNotEmpty(result.thumbprintSha256);
    assert.strictEqual(result.certificateContents, privateKeyOnly);
    assert.isUndefined(result.x5c);
  });

  it("throws error for invalid PEM content", async function () {
    let error: Error | undefined;
    try {
      await parseCertificate(
        {
          certificate: "not-a-valid-pem-content",
        },
        false,
      );
    } catch (_error: any) {
      error = _error;
    }

    assert.ok(error);
    assert.strictEqual(
      error?.message,
      "The file at the specified path does not contain a valid PEM-encoded certificate or private key.",
    );
  });
});
