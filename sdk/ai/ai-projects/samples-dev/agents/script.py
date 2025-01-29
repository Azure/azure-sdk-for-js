from azure.identity import DefaultAzureCredential
from azure.ai.ml import MLClient
from azure.ai.ml.entities import CapabilityHost
from azure.ai.ml.constants._workspace import CapabilityHostKind
from azure.ai.ml.entities import AzureAISearchConnection

credential = DefaultAzureCredential()
ml_client = MLClient(
    credential=credential,
    subscription_id="xxxxxxx",
    resource_group_name="xxxxxxxxxxxxxx_rg",
    workspace_name="xxxxxxxxxx_hub"
)

capability_host_hub = CapabilityHost(
   name="test-capability-host",
   description="Hub workspace capability",
   capability_host_kind=CapabilityHostKind.AGENTS,
)

ml_client.capability_hosts.begin_create_or_update(capability_host_hub).wait()


ml_client = MLClient(
    credential=credential,
    subscription_id="xxxxxxx",
    resource_group_name="xxxxxxxxxxxxxx_rg",
    workspace_name="xxxxxxxxxx_project"
)

chost = CapabilityHost(
    name="caphost1",
    capability_host_kind=CapabilityHostKind.AGENTS,
    ai_services_connections=["xxxxxxxxxxx_aoai"],
    storage_connections=["xxxxxxxxxx_project"/workspaceblobstore"],
    vector_store_connections=["xxxxxxx_vector"], # The connection is added in the "All hubs + projects" section in "Connections".
)
# The vector store part is not needed for functions.

ml_client.capability_hosts.begin_create_or_update(chost).wait()
