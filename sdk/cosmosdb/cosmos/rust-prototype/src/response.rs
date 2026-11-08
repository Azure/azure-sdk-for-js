// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

use crate::profiling::NativeReadProfile;
use azure_data_cosmos_driver::{
    diagnostics::DiagnosticsContext,
    error::CosmosError,
    models::{CosmosResponse, CosmosStatus, ResponseBody},
};
use napi::{
    bindgen_prelude::{Buffer, JsObjectValue, ToNapiValue},
    Env, Error, Result, Status,
};
use napi_derive::napi;

#[napi(object)]
pub struct NativeReadResponse {
    pub status_code: u32,
    pub sub_status_code: Option<u32>,
    pub body: Option<Buffer>,
    pub request_charge: Option<f64>,
    pub activity_id: Option<String>,
    pub etag: Option<String>,
    pub session_token: Option<String>,
    pub retry_after_ms: Option<String>,
    pub diagnostics: NativeReadDiagnostics,
    pub profile: Option<NativeReadProfile>,
}

#[napi(object)]
pub struct NativeReadDiagnostics {
    pub request_count: u32,
    pub retained_request_count: u32,
    pub requests: Vec<NativeRequestDiagnostics>,
}

#[napi(object)]
pub struct NativeRequestDiagnostics {
    pub pipeline: String,
    pub transport: String,
    pub status_code: u32,
    pub sub_status_code: Option<u32>,
}

impl NativeReadResponse {
    pub fn from_read(response: &CosmosResponse) -> Result<Self> {
        if !matches!(response.body(), ResponseBody::Bytes(body) if !body.is_empty()) {
            return Err(Error::new(
                Status::GenericFailure,
                "The Rust driver returned a point-read response without a single non-empty body.",
            ));
        }
        Self::from_response(response)
    }

    fn from_response(response: &CosmosResponse) -> Result<Self> {
        let body = match response.body() {
            ResponseBody::NoPayload => None,
            ResponseBody::Bytes(body) => Some(Buffer::from(body.to_vec())),
            ResponseBody::Items(_) => {
                return Err(Error::new(
                    Status::GenericFailure,
                    "The Rust driver returned a feed body for a point read.",
                ));
            }
        };
        let headers = response.headers();
        Ok(Self {
            status_code: status_code(response.status()),
            sub_status_code: response
                .status()
                .sub_status()
                .map(|value| u32::from(value.value())),
            body,
            request_charge: headers.request_charge.map(|value| value.value()),
            activity_id: headers
                .activity_id
                .as_ref()
                .map(|value| value.as_str().to_owned()),
            etag: headers.etag.as_ref().map(ToString::to_string),
            session_token: headers
                .session_token
                .as_ref()
                .map(|value| value.as_str().to_owned()),
            retry_after_ms: headers.retry_after_ms.map(|value| value.to_string()),
            diagnostics: NativeReadDiagnostics::from_driver(response.diagnostics_ref())?,
            profile: None,
        })
    }
}

impl NativeReadDiagnostics {
    fn from_driver(diagnostics: &DiagnosticsContext) -> Result<Self> {
        let count = |value| {
            u32::try_from(value).map_err(|_| {
                Error::new(
                    Status::GenericFailure,
                    "Native diagnostic request count exceeds u32.",
                )
            })
        };
        Ok(Self {
            request_count: count(diagnostics.request_count())?,
            retained_request_count: count(diagnostics.retained_request_count())?,
            requests: diagnostics
                .requests()
                .iter()
                .map(|request| NativeRequestDiagnostics {
                    pipeline: request.pipeline_type().as_str().to_owned(),
                    transport: request.transport_kind().as_str().to_owned(),
                    status_code: status_code(*request.status()),
                    sub_status_code: request
                        .status()
                        .sub_status()
                        .map(|value| u32::from(value.value())),
                })
                .collect(),
        })
    }
}

pub struct ReadFailure {
    stage: &'static str,
    error: CosmosError,
}

impl ReadFailure {
    pub fn new(stage: &'static str, error: CosmosError) -> Self {
        Self { stage, error }
    }

    pub fn into_napi_error(self, env: &Env) -> Result<Error> {
        // JS error objects must be created in the completion callback, not on Tokio.
        let mut error = env.create_error(Error::new(
            Status::GenericFailure,
            format!("Rust {} failed: {}", self.stage, self.error),
        ))?;
        error.set_named_property("stage", self.stage)?;
        error.set_named_property("statusCode", status_code(self.error.status()))?;
        error.set_named_property(
            "subStatusCode",
            self.error
                .status()
                .sub_status()
                .map(|value| u32::from(value.value())),
        )?;
        error.set_named_property("fromWire", self.error.is_from_wire())?;
        error.set_named_property(
            "response",
            self.error
                .response()
                .map(NativeReadResponse::from_response)
                .transpose()?,
        )?;
        error.set_named_property(
            "diagnostics",
            self.error
                .diagnostics()
                .map(|diagnostics| NativeReadDiagnostics::from_driver(&diagnostics))
                .transpose()?,
        )?;
        Ok(Error::from((&error).into_unknown(env)?))
    }
}

fn status_code(status: CosmosStatus) -> u32 {
    u32::from(u16::from(status))
}
