```mermaid
%% STEPS TO GENERATE IMAGE
%% =======================
%% 1. Install mermaid CLI (see https://github.com/mermaid-js/mermaid-cli/blob/master/README.md)
%% 2. Run command: mmdc -i DefaultAzureCredentialAuthFlow.md -o DefaultAzureCredentialAuthFlow.svg

flowchart LR;
    A(Environment):::deployed ==> B(Managed Identity):::deployed ==> C(VS Code):::developer ==> D(Azure CLI):::developer ==> E(Azure PowerShell):::developer;

    subgraph CREDENTIAL TYPES;
        direction LR;
        Deployed(Deployed service):::deployed ==> Developer(Developer):::developer;

        %% Hide links between boxes in the legend by setting width to 0. The integers after "linkStyle" represent link indices.
        linkStyle 4 stroke-width:0px;
    end;

    %% Define styles for credential type boxes
    classDef deployed fill:#95C37E, stroke:#71AD4C;
    classDef developer fill:#F5AF6F, stroke:#EB7C39;

    %% Add API ref links to credential type boxes
    click A "https://docs.microsoft.com/javascript/api/@azure/identity/environmentcredential?view=azure-node-latest" _blank;
    click B "https://docs.microsoft.com/javascript/api/@azure/identity/managedidentitycredential?view=azure-node-latest" _blank;
    click C "https://docs.microsoft.com/javascript/api/@azure/identity/visualstudiocodecredential?view=azure-node-latest" _blank;
    click D "https://docs.microsoft.com/javascript/api/@azure/identity/azureclicredential?view=azure-node-latest" _blank;
    click E "https://docs.microsoft.com/javascript/api/@azure/identity/azurepowershellcredential?view=azure-node-latest" _blank;
```
