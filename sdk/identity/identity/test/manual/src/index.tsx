// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as React from "react";
import * as ReactDOM from "react-dom";

import { InteractiveBrowserCredential, BrowserLoginStyle } from "@azure/identity";
import { KeyClient, Key } from "@azure/keyvault-keys";

interface ClientDetails {
  tenantId: string,
  clientId: string,
  loginStyle: BrowserLoginStyle
}

interface ClientDetailsEditorProps {
  clientDetails: ClientDetails,
  onSetClientDetails: React.Dispatch<React.SetStateAction<ClientDetails>>
}

function storeClientDetails(clientDetails: ClientDetails) {
  localStorage.setItem('clientDetails', JSON.stringify(clientDetails));
}

function readClientDetails(): ClientDetails {
  const detailsJson = localStorage.getItem('clientDetails')
  if (detailsJson) {
    const details = JSON.parse(detailsJson)
    details.credential = undefined;
    return details;
  }

  return undefined;
}

function getCredential(clientDetails: ClientDetails): InteractiveBrowserCredential | undefined {
  return clientDetails.tenantId.length > 0 && clientDetails.clientId.length > 0
    ? new InteractiveBrowserCredential(clientDetails.tenantId, clientDetails.clientId, { loginStyle: clientDetails.loginStyle })
    : undefined
}

function ClientDetailsEditor({ clientDetails , onSetClientDetails }: ClientDetailsEditorProps) {
  const handleDetailsChange = (newDetails: ClientDetails) => {
    storeClientDetails(newDetails)
    onSetClientDetails(newDetails)
  };

  const setLoginStyle = (loginStyle: BrowserLoginStyle) => {
    handleDetailsChange({
      ...clientDetails,
      loginStyle
    });
  }

  return (
    <div>
      <h3>Enter the details of your Azure AD App Registration:</h3>
      <form>
        <label>
          Tenant Id:
          <input type="text" value={clientDetails.tenantId} onChange={({target}) => handleDetailsChange({ ...clientDetails, tenantId: target.value})} />
        </label>
        <br />
        <label>
          Client Id:
          <input type="text" value={clientDetails.clientId} onChange={({target}) => handleDetailsChange({ ...clientDetails, clientId: target.value})} />
        </label>
        <h4>Login Flow Style</h4>
        <div>
          <label>
            <input type="radio" value="popup" checked={clientDetails.loginStyle ==="popup" } onChange={({target}) => setLoginStyle(target.value as BrowserLoginStyle)} />
            Popup
          </label>
        </div>
        <div>
          <label>
            <input type="radio" value="redirect" checked={clientDetails.loginStyle === "redirect"} onChange={({target}) => setLoginStyle(target.value as BrowserLoginStyle)} />
            Redirect
          </label>
        </div>
      </form>
    </div>
  );
}

function useKeyVaultKeys(vaultName: string, clientDetails: ClientDetails) {
  const [running, setRunning] = React.useState(false)
  const [keys, setKeys] = React.useState<Key[]>(undefined)
  const [error, setErrorInner] = React.useState(undefined);
  const url = `https://${vaultName}.vault.azure.net`;

  const setError = (err) => {
    setRunning(false)
    setErrorInner(err)
  }

  React.useEffect(() => {
    const credential = getCredential(clientDetails);
    if (vaultName.trim().length === 0) {
      setError("You must enter a vault name to fetch keys.")
    } else if (credential === undefined) {
      setError("You must enter client details to fetch keys.")
    } else if (running) {
      // Kick off the request asynchronously.  The setKeys call will
      // propagate the key list back to the UI state.
      const keyClient = new KeyClient(url, credential);
      (async () => {
        const keyResult = [];
        setKeys(keyResult);

        for await (const keyAttributes of keyClient.listKeys()) {
          keyResult.push(await keyClient.getKey(keyAttributes.name))
        }

        setKeys(keyResult);
        setRunning(false)
      })().catch(err => setError(err.toString()));
    } else {
      setError("")
    }
  }, [vaultName, clientDetails, running])

  return { keys, fetchKeys: () => setRunning(true), error }
}

interface KeyVaultTestProps {
  storedVaultName?: string,
  clientDetails: ClientDetails
}

const KeyVaultTest = ({ storedVaultName, clientDetails }: KeyVaultTestProps) => {
  const [vaultName, setVaultName] = React.useState(storedVaultName || "");
  const { keys, fetchKeys, error } = useKeyVaultKeys(vaultName, clientDetails);

  const handleVaultNameChange = (newVaultName) => {
    localStorage.setItem('keyVaultName', newVaultName);
    setVaultName(newVaultName);
  };

  return (
    <div>
      <h3>List Key Vault Keys</h3>
      <form onSubmit={e => { fetchKeys(); e.preventDefault(); }}>
        <label>
          Vault Name:
          <input type="text" value={vaultName} onChange={({target}) => handleVaultNameChange(target.value)} />
        </label>
        <input type="submit" value="Get Keys" />
      </form>
      {!error ? null : <h3 style={{color: "red"}}>{error}</h3> }
      {!keys ? null :
       (
         <table>
           <thead>
             <tr>
               <th>Key Name</th>
               <th>Enabled</th>
               <th>Expires</th>
             </tr>
           </thead>
           <tbody>
             {keys.map(key => <tr key={key.name}><td>{key.name}</td><td>{key.enabled.toString()}</td><td>{key.expires && key.expires.toDateString()}</td></tr>)}
           </tbody>
        </table>
       )
      }
    </div>
  );
}

function TestPage() {
  const storedVaultName = localStorage.getItem('keyVaultName');
  const [clientDetails, setClientDetails] = React.useState<ClientDetails>(readClientDetails() || { tenantId: "", clientId: "", loginStyle: "popup"})
  return (
    <div>
      <h1>Azure SDK Browser Manual Tests</h1>
      <hr />
      <ClientDetailsEditor clientDetails={clientDetails} onSetClientDetails={setClientDetails} />
      <KeyVaultTest storedVaultName={storedVaultName} clientDetails={clientDetails} />
    </div>
  );
}

ReactDOM.render(
    <TestPage />,
    document.getElementById("app")
);
