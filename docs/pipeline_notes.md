This workflow runs on issue, comment, and pull request target events.
It processes GitHub events and applies automation using Azure services.
The main job event-handler-with-azure manages authentication and event handling.
Azure CLI login and Key Vault secret retrieval can fail due to permission issues.
These steps are essential because the workflow depends on secure Azure access.
