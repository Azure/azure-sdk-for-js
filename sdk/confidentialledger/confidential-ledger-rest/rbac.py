from azure.confidentialledger import LedgerUserRole
from azure.identity import DefaultAzureCredential
from azure.confidentialledger import ConfidentialLedgerClient
from azure.confidentialledger.identity_service import ConfidentialLedgerIdentityServiceClient

# replace with the name of the ledger you want to test
identity_client = ConfidentialLedgerIdentityServiceClient(
    "https://identity.confidential-ledger.core.azure.com")
network_identity = identity_client.get_ledger_identity(
    ledger_id="typescript-sdk-generation")

# write identity to certificate
ledger_tls_cert_file_name = "ledger_certificate.pem"
with open(ledger_tls_cert_file_name, "w") as cert_file:
    cert_file.write(network_identity.ledger_tls_certificate)

# uses the permissions of your azure user
credential = DefaultAzureCredential()
ledger_client = ConfidentialLedgerClient(
    endpoint="https://typescript-sdk-generation.confidential-ledger.azure.com",
    credential=credential,
    ledger_certificate_path=ledger_tls_cert_file_name
)

# perform the update you want to allow the app
# in this case, user_id is the object_id of the app
user_id = "eab1a5ce-82b1-4318-a1c1-196937026389"
user = ledger_client.create_or_update_user(
    user_id, LedgerUserRole.CONTRIBUTOR
)
