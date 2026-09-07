// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedHatOpenShiftClient } = require("@azure/arm-redhatopenshifthcp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to request a temporary admin kubeconfig for the cluster
 *
 * @summary request a temporary admin kubeconfig for the cluster
 * x-ms-original-file: 2026-09-01-preview/HcpOpenShiftClusters_RequestAdminCredential_MaximumSet_Gen.json
 */
async function hcpOpenShiftClustersRequestAdminCredentialMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.hcpOpenShiftClusters.requestAdminCredential(
    "rgopenapi",
    "hcpCluster-name",
    {
      certificateSigningRequest:
        "-----BEGIN CERTIFICATE REQUEST-----\nMIIBhTCB7wIBADBFMQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExDjAMBgNVBAoM\nBVRlc3QxGTAXBgNVBAMMEHRlc3QuZXhhbXBsZS5jb20wdjAQBgcqhkjOPQIBBgUr\ngQQAIgNiAARIm+7hphQ7m8kzCB5keJ3lPVQvsEH6ABXz0kIvxkNF7+OBFCdPJIBT\nksaGJnJFfPUROYGJIo7FMOO/vEqE9gHqRCVao0RPDaZLtceCYqbeI0vFhW7qTmYL\nNp/RTer7C0+gITAfBgkqhkiG9w0BCQ4xEjAQMA4GA1UdEQQHMAWCA2FiYzAKBggq\nhkjOPQQDAgNoADBlAjBLQDR3K8k1XPFH3Y0oEFYrBi3L4FOX0kz0aK/JuFJN/kBP\nA2ViVNHl+5iVxvpJE5sCMQCF+nPr18qRaib09BHSBKl+ZVpXC1K3PN/VGjYv+Zjl\nK8eCiPwwRBpRMbqMSXxlS3Q=\n-----END CERTIFICATE REQUEST-----\n",
    },
  );
  console.log(result);
}

async function main() {
  await hcpOpenShiftClustersRequestAdminCredentialMaximumSet();
}

main().catch(console.error);
