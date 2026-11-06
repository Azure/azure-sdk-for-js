// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

use azure_data_cosmos_driver::{
    models::{AccountReference, CosmosOperation, ItemReference, PartitionKey},
    options::{BinaryEncodingOptions, OperationOptions, OperationOptionsBuilder},
    CosmosDriver, CosmosDriverRuntime, DriverOptions,
};
use napi::{
    bindgen_prelude::{AsyncBlock, AsyncBlockBuilder},
    Env, Error, Result, Status,
};
use napi_derive::napi;
use std::sync::{Arc, Mutex, MutexGuard};
use url::Url;

use crate::response::{NativeReadResponse, ReadFailure};

#[napi]
pub struct NativeReadClient {
    driver: Mutex<Option<Arc<CosmosDriver>>>,
}

#[napi]
impl NativeReadClient {
    #[napi(factory)]
    pub async fn create(endpoint: String, account_key: String) -> Result<Self> {
        let endpoint = Url::parse(&endpoint)
            .map_err(|_| Error::new(Status::InvalidArg, "Invalid account endpoint URL."))?;
        if endpoint.scheme() != "https"
            || endpoint.host_str().is_none()
            || !endpoint.username().is_empty()
            || endpoint.password().is_some()
            || endpoint.query().is_some()
            || endpoint.fragment().is_some()
            || endpoint.path() != "/"
        {
            return Err(Error::new(
                Status::InvalidArg,
                "The prototype requires an HTTPS account endpoint without credentials, path, query, or fragment.",
            ));
        }
        if account_key.trim().is_empty() {
            return Err(Error::new(
                Status::InvalidArg,
                "An account key is required.",
            ));
        }

        let runtime = CosmosDriverRuntime::builder()
            .build()
            .await
            .map_err(|error| {
                Error::new(
                    Status::GenericFailure,
                    format!("Rust driver runtime initialization failed: {error}"),
                )
            })?;
        let account = AccountReference::with_account_key(endpoint, account_key);
        let driver = runtime
            .create_driver(DriverOptions::builder(account).build())
            .await
            .map_err(|error| {
                Error::new(
                    Status::GenericFailure,
                    format!("Rust account initialization failed: {error}"),
                )
            })?;
        Ok(Self {
            driver: Mutex::new(Some(driver)),
        })
    }

    #[napi(getter)]
    pub fn account_endpoint(&self) -> Result<String> {
        let driver = self.lock_driver()?;
        let driver = driver.as_ref().ok_or_else(|| {
            Error::new(Status::GenericFailure, "The native read client is closed.")
        })?;
        Ok(driver.account().endpoint().as_str().to_owned())
    }

    #[napi]
    pub fn read_item(
        &self,
        env: &Env,
        database: String,
        container: String,
        item_id: String,
        partition_key: String,
    ) -> Result<AsyncBlock<NativeReadResponse>> {
        // Acquire ownership on the JS thread, before close() can release the client.
        let driver = self.lock_driver().and_then(|driver| {
            driver.as_ref().map(Arc::clone).ok_or_else(|| {
                Error::new(Status::GenericFailure, "The native read client is closed.")
            })
        });
        AsyncBlockBuilder::build_with_map(
            env,
            async move {
                let driver = driver?;
                for (name, value) in [
                    ("database", &database),
                    ("container", &container),
                    ("item ID", &item_id),
                ] {
                    if value.is_empty() {
                        return Err(Error::new(
                            Status::InvalidArg,
                            format!("A non-empty {name} is required."),
                        ));
                    }
                }
                // An empty string is a valid supplied partition-key value.
                let result = async {
                    let container = driver
                        .resolve_container(&database, &container, OperationOptions::default())
                        .await
                        .map_err(|error| ReadFailure::new("resolveContainer", error))?;
                    let item = ItemReference::from_name(
                        &container,
                        PartitionKey::from(partition_key),
                        item_id,
                    );
                    let options = OperationOptionsBuilder::new()
                        .with_binary_encoding(
                            BinaryEncodingOptions::new().with_request_text_response(true),
                        )
                        .build();
                    driver
                        .execute_operation(CosmosOperation::read_item(item), options)
                        .await
                        .map_err(|error| ReadFailure::new("readItem", error))
                }
                .await;
                Ok(result)
            },
            |env, result| match result {
                Ok(Some(response)) => NativeReadResponse::from_read(&response),
                Ok(None) => Err(Error::new(
                    Status::GenericFailure,
                    "The Rust driver returned no response for a point read.",
                )),
                Err(failure) => Err(failure.into_napi_error(&env)?),
            },
        )
    }

    #[napi]
    pub fn close(&self) -> Result<()> {
        // Release the binding's ownership without holding the lock during driver destruction.
        let driver = self.lock_driver()?.take();
        drop(driver);
        Ok(())
    }
}

impl NativeReadClient {
    fn lock_driver(&self) -> Result<MutexGuard<'_, Option<Arc<CosmosDriver>>>> {
        self.driver.lock().map_err(|_| {
            Error::new(
                Status::GenericFailure,
                "The native read client lock is poisoned.",
            )
        })
    }
}
