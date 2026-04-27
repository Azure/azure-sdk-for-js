#!/usr/bin/env bash
# Setup script for Azure AI Content Understanding JavaScript SDK users.
# Probes / installs Node.js, installs the SDK package (npm or local tarball
# fallback), collects endpoint + credentials + model deployment names,
# writes .env (preserving any existing keys), copies it into the samples
# folder, and verifies the resulting setup against the live Foundry endpoint
# with 5 checks.
# cspell:ignore esac jq dotenv pnpm tarball turbo

set -euo pipefail

# ─── Resolve paths ────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
REPO_ROOT="$(cd "$PACKAGE_ROOT/../../.." && pwd)"
ENV_FILE="$PACKAGE_ROOT/.env"
SAMPLE_ENV_FILE="$PACKAGE_ROOT/sample.env"
JS_SAMPLES_DIR="$PACKAGE_ROOT/samples/v1/javascript"
SAMPLE_ENV_TARGET="$JS_SAMPLES_DIR/.env"

API_VERSION="2025-11-01"
PACKAGE_NAME="@azure/ai-content-understanding"

# ─── Colors ───────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

# ─── Args ─────────────────────────────────────────────────────────────────────
ENDPOINT_OVERRIDE=""
APIKEY_OVERRIDE=""
NON_INTERACTIVE=0
VERIFY_ONLY=0
VERBOSE=0
FORCE_LOCAL=0
SKIP_INSTALL=0

show_help() {
    cat <<EOF
Azure AI Content Understanding — JavaScript Setup

Usage: $(basename "$0") [options]

Options:
  --endpoint URL        Override endpoint (skip the endpoint prompt)
  --api-key KEY         Override API key (skip the API key prompt)
  --verify-only         Skip install/config phase; only run the 5-check verification
  --non-interactive     Do not prompt; use existing .env / env vars / overrides
  --local               Force local build + tarball install (skip npm registry)
  --skip-install        Skip the SDK install step (assume node_modules already present)
  --verbose             Show full HTTP responses during verification
  --help, -h            Show this help

Behavior:
  1. Probe and (optionally) install Node.js (>= 20) and pnpm.
  2. Detect existing .env; ask before overwriting.
  3. Collect endpoint, auth method (DefaultAzureCredential or API key),
     and model deployment names. Probes the Foundry resource for existing
     model defaults to prefill answers when possible.
  4. Write .env (gitignored) at the package root, preserving other keys.
  5. Install the SDK in samples/v1/javascript/ (npm registry, or local
     pnpm build + tarball if the package is not yet published).
  6. Copy .env into the samples directory so 'dotenv/config' can load it.
  7. Run a 5-step verification against the live endpoint and report results.
EOF
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --help|-h)         show_help; exit 0 ;;
        --endpoint)        [[ $# -ge 2 ]] || { echo "Error: --endpoint requires a value"; exit 1; }; ENDPOINT_OVERRIDE="$2"; shift 2 ;;
        --api-key)         [[ $# -ge 2 ]] || { echo "Error: --api-key requires a value"; exit 1; }; APIKEY_OVERRIDE="$2"; shift 2 ;;
        --verify-only)     VERIFY_ONLY=1; shift ;;
        --non-interactive) NON_INTERACTIVE=1; shift ;;
        --local)           FORCE_LOCAL=1; shift ;;
        --skip-install)    SKIP_INSTALL=1; shift ;;
        --verbose)         VERBOSE=1; shift ;;
        *)                 echo -e "${RED}Unknown option: $1${NC}"; show_help; exit 1 ;;
    esac
done

# ─── Output helpers ───────────────────────────────────────────────────────────
PASS=0
FAIL=0
section() { echo; echo -e "${BOLD}$1${NC}"; }
pass()    { echo -e "  ${GREEN}✓${NC} $1"; PASS=$((PASS + 1)); }
fail()    { echo -e "  ${RED}✗${NC} $1"; FAIL=$((FAIL + 1)); }
info()    { echo -e "  ${DIM}$1${NC}"; }
warn()    { echo -e "  ${YELLOW}⚠${NC} $1"; }
fix()     { echo -e "    ${YELLOW}Fix:${NC} $1"; }
prompt()  {
    local p="$1" var=$2 def="${3:-}"; local r=""
    if [ -n "$def" ]; then read -r -p "  $p [$def]: " r || r=""; r="${r:-$def}"
    else read -r -p "  $p: " r || r=""
    fi
    printf -v "$var" '%s' "$r"
}

# ─── Phase 1: Probe + install Node.js ─────────────────────────────────────────
install_node() {
    local os; os="$(uname -s)"
    case "$os" in
        Darwin)
            if command -v brew >/dev/null 2>&1; then
                echo "    Running: brew install node"
                brew install node || return 1
            else
                echo "    (Homebrew not found — install from https://brew.sh/ then re-run.)"
                return 1
            fi
            ;;
        Linux)
            if command -v apt-get >/dev/null 2>&1; then
                echo "    Running: nvm-style installer to ~/.nvm and Node 20 LTS"
                if ! command -v curl >/dev/null 2>&1; then
                    echo "    (curl is required to install Node via nvm.)"
                    return 1
                fi
                # shellcheck disable=SC2016
                curl -sSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash || return 1
                export NVM_DIR="$HOME/.nvm"
                # shellcheck disable=SC1091
                [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                nvm install --lts || return 1
            else
                echo "    (No apt-get detected — install Node.js 20+ with your distro's package manager.)"
                return 1
            fi
            ;;
        *)
            echo "    (Unsupported platform for auto-install: $os)"
            return 1
            ;;
    esac
    hash -r 2>/dev/null || true
    return 0
}

probe_node() {
    if ! command -v node >/dev/null 2>&1; then return 1; fi
    local v major
    v="$(node --version 2>/dev/null | sed 's/^v//')" || return 1
    major="${v%%.*}"
    [ "$major" -ge 20 ] 2>/dev/null
}

if [ "$VERIFY_ONLY" -eq 0 ]; then
    section "Step 1: Node.js"
    if probe_node; then
        pass "node $(node --version)"
    else
        if command -v node >/dev/null 2>&1; then
            warn "Found Node $(node --version), need >= 20."
        else
            warn "Node.js not found on PATH."
        fi
        if [ "$NON_INTERACTIVE" -eq 1 ]; then
            fail "Node.js >= 20 is required. Install it and re-run."
            exit 1
        fi
        read -r -p "  Install Node.js LTS now? (y/N): " reply || reply="n"
        if [[ "$reply" =~ ^[Yy]$ ]]; then
            if install_node && probe_node; then
                pass "node $(node --version)"
            else
                fail "Install failed or version still < 20. Install manually then re-run."
                info "  macOS:  brew install node"
                info "  Linux:  https://nodejs.org/ or use nvm"
                info "  Windows: winget install OpenJS.NodeJS.LTS"
                exit 1
            fi
        else
            fail "Install Node.js >= 20 manually then re-run."
            exit 1
        fi
    fi
    if ! command -v npm >/dev/null 2>&1; then
        fail "npm not found (should ship with Node.js)."
        exit 1
    fi
    pass "npm $(npm --version)"
    if command -v pnpm >/dev/null 2>&1; then
        pass "pnpm $(pnpm --version)"
    else
        warn "pnpm not found (only required for --local build path)."
        info "  Install with: npm install -g pnpm"
    fi
fi

# ─── Helpers: .env read/write ─────────────────────────────────────────────────
read_env() {
    local key="$1" default="${2:-}"
    if [ -f "$ENV_FILE" ]; then
        local v
        v="$(grep -E "^${key}=" "$ENV_FILE" 2>/dev/null | tail -n1 | cut -d= -f2- | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")"
        if [ -n "$v" ]; then echo "$v"; return; fi
    fi
    echo "$default"
}

write_env_value() {
    local key="$1" val="$2"
    if sed --version 2>/dev/null | grep -q GNU; then
        SED_INPLACE=(sed -i)
    else
        SED_INPLACE=(sed -i '')
    fi
    if [ -f "$ENV_FILE" ] && grep -qE "^${key}=" "$ENV_FILE" 2>/dev/null; then
        # Escape | and & for sed replacement
        local esc
        esc="$(printf '%s' "$val" | sed -e 's/[&|\\]/\\&/g')"
        "${SED_INPLACE[@]}" "s|^${key}=.*|${key}=${esc}|" "$ENV_FILE"
    else
        printf '%s=%s\n' "$key" "$val" >> "$ENV_FILE"
    fi
}

# ─── HTTP helper (curl + az token or API key) ─────────────────────────────────
http_get() {
    local url="$1" token="${2:-}" key="${3:-}" tmp http_code body t0 t1 elapsed
    tmp="$(mktemp)"
    t0="$(date +%s%N 2>/dev/null || date +%s)"
    local args=(-sS -m 30 -o "$tmp" -w '%{http_code}' -H "Content-Type: application/json")
    if [ -n "$key" ]; then
        args+=(-H "Ocp-Apim-Subscription-Key: $key")
    elif [ -n "$token" ]; then
        args+=(-H "Authorization: Bearer $token")
    fi
    http_code="$(curl "${args[@]}" "$url" 2>/dev/null || echo 000)"
    body="$(cat "$tmp" 2>/dev/null || echo "")"
    rm -f "$tmp"
    t1="$(date +%s%N 2>/dev/null || date +%s)"
    if [[ "$t0" == *N ]]; then elapsed=0; else elapsed=$(( (t1 - t0) / 1000000 )); fi
    HTTP_CODE="$http_code"; HTTP_BODY="$body"; HTTP_TIME="$elapsed"
}

# ─── Phase 2: Detect existing state + collect values ──────────────────────────
ENDPOINT=""
APIKEY=""
GPT41=""
GPT41MINI=""
EMBEDDING=""
SKIP_UPDATE_DEFAULTS=0

if [ "$VERIFY_ONLY" -eq 0 ]; then
    section "Step 2: Existing configuration"
    EXISTING_ENDPOINT="$(read_env CONTENTUNDERSTANDING_ENDPOINT)"
    EXISTING_KEY="$(read_env CONTENTUNDERSTANDING_KEY)"
    EXISTING_G1="$(read_env GPT_4_1_DEPLOYMENT)"
    EXISTING_G1M="$(read_env GPT_4_1_MINI_DEPLOYMENT)"
    EXISTING_EMB="$(read_env TEXT_EMBEDDING_3_LARGE_DEPLOYMENT)"
    if [ -f "$ENV_FILE" ]; then
        info "Existing .env detected at $ENV_FILE"
        [ -n "$EXISTING_ENDPOINT" ] && info "  CONTENTUNDERSTANDING_ENDPOINT = $EXISTING_ENDPOINT"
        [ -n "$EXISTING_KEY" ] && info "  CONTENTUNDERSTANDING_KEY      = ${EXISTING_KEY:0:4}…(masked)"
        [ -n "$EXISTING_G1" ] && info "  GPT_4_1_DEPLOYMENT            = $EXISTING_G1"
        [ -n "$EXISTING_G1M" ] && info "  GPT_4_1_MINI_DEPLOYMENT       = $EXISTING_G1M"
        [ -n "$EXISTING_EMB" ] && info "  TEXT_EMBEDDING_3_LARGE_DEPLOYMENT = $EXISTING_EMB"
    elif [ -f "$SAMPLE_ENV_FILE" ]; then
        info "No .env yet; will create from sample.env."
    fi
    [ -n "${CONTENTUNDERSTANDING_ENDPOINT:-}" ] && warn "Env var CONTENTUNDERSTANDING_ENDPOINT='$CONTENTUNDERSTANDING_ENDPOINT' overrides .env at runtime."
    [ -n "${CONTENTUNDERSTANDING_KEY:-}" ] && warn "Env var CONTENTUNDERSTANDING_KEY is set; it overrides .env at runtime."

    # Ensure .env exists (copy from sample.env if needed)
    if [ ! -f "$ENV_FILE" ] && [ -f "$SAMPLE_ENV_FILE" ]; then
        cp "$SAMPLE_ENV_FILE" "$ENV_FILE"
        info "Created .env from sample.env"
    fi

    section "Step 3: Endpoint and credentials"
    if [ -n "$ENDPOINT_OVERRIDE" ]; then
        ENDPOINT="${ENDPOINT_OVERRIDE%/}"
        info "Using --endpoint override: $ENDPOINT"
    elif [ "$NON_INTERACTIVE" -eq 1 ]; then
        ENDPOINT="${EXISTING_ENDPOINT%/}"
        [ -z "$ENDPOINT" ] && { fail "No endpoint configured (use --endpoint or run interactively)."; exit 1; }
    else
        prompt "Microsoft Foundry endpoint URL (e.g. https://my-foundry.services.ai.azure.com/)" ENDPOINT "$EXISTING_ENDPOINT"
        ENDPOINT="${ENDPOINT%/}"
        [ -z "$ENDPOINT" ] && { fail "Endpoint is required."; exit 1; }
    fi

    if [ -n "$APIKEY_OVERRIDE" ]; then
        APIKEY="$APIKEY_OVERRIDE"
        info "Using --api-key override (DefaultAzureCredential disabled)."
    elif [ "$NON_INTERACTIVE" -eq 1 ]; then
        APIKEY="$EXISTING_KEY"
    else
        echo
        echo "  Authentication method:"
        echo "    A) DefaultAzureCredential (recommended; uses 'az login')"
        echo "    B) API Key"
        read -r -p "  Select [A/b]: " auth_choice || auth_choice="A"
        if [[ "$auth_choice" =~ ^[Bb]$ ]]; then
            prompt "API key (CONTENTUNDERSTANDING_KEY)" APIKEY "$EXISTING_KEY"
        else
            APIKEY=""
            if ! command -v az >/dev/null 2>&1; then
                warn "Azure CLI ('az') not found. Install it before running samples that use DefaultAzureCredential."
            elif ! az account show >/dev/null 2>&1; then
                warn "Not signed in. Run 'az login' before running samples."
            fi
        fi
    fi

    # ─── Probe existing model defaults via az + curl ────────────────────────
    section "Step 4: Probing existing model defaults"
    PROBE_RC=1
    DETECTED_G1=""; DETECTED_G1M=""; DETECTED_EMB=""
    AZ_TOKEN=""
    if [ -z "$APIKEY" ] && command -v az >/dev/null 2>&1; then
        AZ_TOKEN="$(az account get-access-token --resource https://cognitiveservices.azure.com --query accessToken -o tsv 2>/dev/null || true)"
    fi
    if [ -z "$AZ_TOKEN" ] && [ -z "$APIKEY" ]; then
        warn "Cannot probe: no access token (run 'az login') and no API key supplied."
        PROBE_RC=3
    else
        http_get "$ENDPOINT/contentunderstanding/defaults?api-version=$API_VERSION" "$AZ_TOKEN" "$APIKEY"
        case "$HTTP_CODE" in
            200)
                if command -v node >/dev/null 2>&1; then
                    OUT="$(printf '%s' "$HTTP_BODY" | node -e '
                        let s=""; process.stdin.on("data",c=>s+=c); process.stdin.on("end",()=>{
                            try { const d=(JSON.parse(s).modelDeployments||{});
                                const keys=["gpt-4.1","gpt-4.1-mini","text-embedding-3-large"];
                                console.log(keys.map(k=>k+"="+(d[k]||"" )).join(";"));
                            } catch(e){ process.exit(1); }
                        });
                    ' 2>/dev/null || true)"
                    if [ -n "$OUT" ]; then
                        DETECTED_G1="$(echo "$OUT" | tr ';' '\n' | sed -n 's/^gpt-4\.1=//p' | head -n1)"
                        DETECTED_G1M="$(echo "$OUT" | tr ';' '\n' | sed -n 's/^gpt-4\.1-mini=//p' | head -n1)"
                        DETECTED_EMB="$(echo "$OUT" | tr ';' '\n' | sed -n 's/^text-embedding-3-large=//p' | head -n1)"
                    fi
                fi
                if [ -n "$DETECTED_G1" ] && [ -n "$DETECTED_G1M" ] && [ -n "$DETECTED_EMB" ]; then
                    PROBE_RC=0
                elif [ -n "$DETECTED_G1$DETECTED_G1M$DETECTED_EMB" ]; then
                    PROBE_RC=10
                else
                    PROBE_RC=2
                fi
                ;;
            401|403) PROBE_RC=3 ;;
            *) PROBE_RC=1 ;;
        esac
    fi

    case "$PROBE_RC" in
        0)
            pass "All defaults detected: gpt-4.1=$DETECTED_G1, gpt-4.1-mini=$DETECTED_G1M, text-embedding-3-large=$DETECTED_EMB"
            if [ "$NON_INTERACTIVE" -eq 1 ]; then
                GPT41="$DETECTED_G1"; GPT41MINI="$DETECTED_G1M"; EMBEDDING="$DETECTED_EMB"; SKIP_UPDATE_DEFAULTS=1
            else
                read -r -p "  Use these detected values? (Y/n): " use_det || use_det="y"
                if [[ ! "$use_det" =~ ^[Nn]$ ]]; then
                    GPT41="$DETECTED_G1"; GPT41MINI="$DETECTED_G1M"; EMBEDDING="$DETECTED_EMB"; SKIP_UPDATE_DEFAULTS=1
                fi
            fi
            ;;
        10) info "Partial defaults detected; missing entries will be prompted."
            GPT41="$DETECTED_G1"; GPT41MINI="$DETECTED_G1M"; EMBEDDING="$DETECTED_EMB" ;;
        2)  info "No model defaults configured on the resource yet (will be set by updateDefaults.js)." ;;
        3)  warn "Probe authentication failed. Run 'az login' and ensure 'Cognitive Services User' role is assigned. Continuing with manual entry." ;;
        *)  warn "Probe failed. Continuing with manual entry." ;;
    esac

    section "Step 5: Model deployment names"
    if [ "$NON_INTERACTIVE" -eq 1 ]; then
        [ -z "$GPT41" ]     && GPT41="${EXISTING_G1:-gpt-4.1}"
        [ -z "$GPT41MINI" ] && GPT41MINI="${EXISTING_G1M:-gpt-4.1-mini}"
        [ -z "$EMBEDDING" ] && EMBEDDING="${EXISTING_EMB:-text-embedding-3-large}"
    else
        if [ -z "$GPT41" ]; then prompt "GPT_4_1_DEPLOYMENT" GPT41 "${EXISTING_G1:-gpt-4.1}"; else echo "  Using detected GPT_4_1_DEPLOYMENT=$GPT41"; fi
        if [ -z "$GPT41MINI" ]; then prompt "GPT_4_1_MINI_DEPLOYMENT" GPT41MINI "${EXISTING_G1M:-gpt-4.1-mini}"; else echo "  Using detected GPT_4_1_MINI_DEPLOYMENT=$GPT41MINI"; fi
        if [ -z "$EMBEDDING" ]; then prompt "TEXT_EMBEDDING_3_LARGE_DEPLOYMENT" EMBEDDING "${EXISTING_EMB:-text-embedding-3-large}"; else echo "  Using detected TEXT_EMBEDDING_3_LARGE_DEPLOYMENT=$EMBEDDING"; fi
    fi

    section "Step 6: Writing .env"
    write_env_value CONTENTUNDERSTANDING_ENDPOINT "$ENDPOINT"
    write_env_value CONTENTUNDERSTANDING_KEY      "$APIKEY"
    write_env_value GPT_4_1_DEPLOYMENT             "$GPT41"
    write_env_value GPT_4_1_MINI_DEPLOYMENT        "$GPT41MINI"
    write_env_value TEXT_EMBEDDING_3_LARGE_DEPLOYMENT "$EMBEDDING"
    pass "Wrote $ENV_FILE"
fi

# ─── Phase 3: Install SDK in samples directory ────────────────────────────────
install_npm() {
    cd "$JS_SAMPLES_DIR"
    if npm install --silent 2>/dev/null; then
        if [ -d "$JS_SAMPLES_DIR/node_modules/$PACKAGE_NAME" ]; then
            pass "Installed $PACKAGE_NAME from npm registry"
            return 0
        fi
    fi
    return 1
}

install_local() {
    if ! command -v pnpm >/dev/null 2>&1; then
        fail "pnpm is required for local build but was not found."
        info "  Install with: npm install -g pnpm"
        return 1
    fi
    info "  Building $PACKAGE_NAME locally..."
    cd "$REPO_ROOT"
    if ! pnpm install --silent >/dev/null 2>&1; then
        fail "pnpm install at repo root failed."
        return 1
    fi
    if ! pnpm turbo build --filter="$PACKAGE_NAME..." --token 1 >/dev/null 2>&1; then
        fail "Local build via 'pnpm turbo build' failed."
        return 1
    fi
    cd "$PACKAGE_ROOT"
    rm -f /tmp/azure-ai-content-understanding-*.tgz
    if ! pnpm pack --pack-destination /tmp >/dev/null 2>&1; then
        fail "'pnpm pack' failed."
        return 1
    fi
    cd "$JS_SAMPLES_DIR"
    if ! npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz >/dev/null 2>&1; then
        fail "Installing local tarball into samples failed."
        return 1
    fi
    pass "Installed $PACKAGE_NAME from local build (tarball)"
    return 0
}

if [ "$VERIFY_ONLY" -eq 0 ] && [ "$SKIP_INSTALL" -eq 0 ]; then
    section "Step 7: Installing SDK in samples directory"
    if [ ! -d "$JS_SAMPLES_DIR" ]; then
        warn "$JS_SAMPLES_DIR does not exist; skipping install step."
    else
        if [ "$FORCE_LOCAL" -eq 1 ]; then
            info "  --local flag: skipping npm registry, building locally"
            install_local || true
        elif install_npm; then
            :
        else
            info "  Package not on npm registry yet; falling back to local build..."
            install_local || true
        fi
    fi

    section "Step 8: Copying .env into samples directory"
    if [ -f "$ENV_FILE" ] && [ -d "$JS_SAMPLES_DIR" ]; then
        cp "$ENV_FILE" "$SAMPLE_ENV_TARGET"
        pass "Copied .env to $SAMPLE_ENV_TARGET"
    else
        warn "Skipped (missing .env or samples directory)."
    fi
fi

# ─── Phase 4: Verification (5 checks) ─────────────────────────────────────────
PASS=0
FAIL=0

if [ "$VERIFY_ONLY" -eq 1 ]; then
    if [ -n "$ENDPOINT_OVERRIDE" ]; then
        ENDPOINT="${ENDPOINT_OVERRIDE%/}"
    else
        ENDPOINT="${CONTENTUNDERSTANDING_ENDPOINT:-$(read_env CONTENTUNDERSTANDING_ENDPOINT)}"
        ENDPOINT="${ENDPOINT%/}"
    fi
    if [ -n "$APIKEY_OVERRIDE" ]; then
        APIKEY="$APIKEY_OVERRIDE"
    else
        APIKEY="${CONTENTUNDERSTANDING_KEY:-$(read_env CONTENTUNDERSTANDING_KEY)}"
    fi
fi

echo
echo -e "${BOLD}=== Verification ===${NC}"

ACCESS_TOKEN=""
AUTH_METHOD=""
if [ -n "$APIKEY" ]; then
    AUTH_METHOD="API Key"
elif command -v az >/dev/null 2>&1; then
    ACCESS_TOKEN="$(az account get-access-token --resource https://cognitiveservices.azure.com --query accessToken -o tsv 2>/dev/null || true)"
    [ -n "$ACCESS_TOKEN" ] && AUTH_METHOD="DefaultAzureCredential (az cli)"
fi

section "[1/5] Credentials"
if [ -z "$ENDPOINT" ]; then
    fail "CONTENTUNDERSTANDING_ENDPOINT not configured"
    fix "Re-run this script without --verify-only, or set the value in $ENV_FILE."
    echo; echo -e "${RED}Cannot proceed without an endpoint. Fix and re-run.${NC}"; exit 1
else
    pass "Endpoint: $ENDPOINT"
fi
if [ -n "$AUTH_METHOD" ]; then
    pass "Auth method: $AUTH_METHOD"
else
    fail "No credentials available (no API key, az login failed)"
    fix "Run 'az login' or set CONTENTUNDERSTANDING_KEY in $ENV_FILE."
fi

section "[2/5] Endpoint reachable"
DEFAULTS_BODY=""
if [ -z "$AUTH_METHOD" ]; then
    fail "Skipped — no valid credentials (fix step 1 first)"
else
    http_get "$ENDPOINT/contentunderstanding/defaults?api-version=$API_VERSION" "$ACCESS_TOKEN" "$APIKEY"
    [ "$VERBOSE" = "1" ] && info "HTTP $HTTP_CODE (${HTTP_TIME}ms) $HTTP_BODY"
    case "$HTTP_CODE" in
        200) pass "GET /contentunderstanding/defaults → 200 OK (${HTTP_TIME}ms)"; DEFAULTS_BODY="$HTTP_BODY" ;;
        401) fail "HTTP 401 — auth failed"; fix "Assign 'Cognitive Services User' role; if using API key, verify it in Azure Portal" ;;
        403) fail "HTTP 403 — authz failed"; fix "Assign 'Cognitive Services User' role" ;;
        404) fail "HTTP 404 — Content Understanding may not be available in this region"; fix "https://learn.microsoft.com/azure/ai-services/content-understanding/language-region-support" ;;
        000) fail "Connection failed"; fix "Check endpoint URL: $ENDPOINT" ;;
        *)   fail "HTTP $HTTP_CODE — Unexpected response" ;;
    esac
fi

section "[3/5] Model deployments"
if [ -z "$DEFAULTS_BODY" ]; then
    fail "Skipped — could not retrieve defaults"
else
    for m in gpt-4.1 gpt-4.1-mini text-embedding-3-large; do
        dep=""
        if command -v node >/dev/null 2>&1; then
            dep="$(printf '%s' "$DEFAULTS_BODY" | node -e "
                let s=''; process.stdin.on('data',c=>s+=c); process.stdin.on('end',()=>{
                    try { const d=(JSON.parse(s).modelDeployments||{});
                        console.log(d['$m']||'');
                    } catch(e){}
                });" 2>/dev/null || true)"
        fi
        if [ -n "$dep" ]; then pass "$m → $dep"; else fail "$m — not mapped"; fi
    done
fi

section "[4/5] Prebuilt analyzers"
if [ -z "$AUTH_METHOD" ]; then
    fail "Skipped — no valid credentials"
else
    http_get "$ENDPOINT/contentunderstanding/analyzers?api-version=$API_VERSION" "$ACCESS_TOKEN" "$APIKEY"
    if [ "$HTTP_CODE" = "200" ]; then
        if command -v node >/dev/null 2>&1; then
            COUNTS="$(printf '%s' "$HTTP_BODY" | node -e "
                let s=''; process.stdin.on('data',c=>s+=c); process.stdin.on('end',()=>{
                    try { const d=JSON.parse(s); const items=d.value||[];
                        const pb=items.filter(i=>(i.analyzerId||'').startsWith('prebuilt-')).map(i=>i.analyzerId);
                        const preview=pb.slice(0,5).join(', ')+(pb.length>5?', ...':'');
                        console.log(items.length+'|'+pb.length+'|'+preview);
                    } catch(e){ console.log('0|0|'); }
                });" 2>/dev/null || echo "0|0|")"
            TOTAL="$(echo "$COUNTS" | cut -d'|' -f1)"
            PB="$(echo "$COUNTS" | cut -d'|' -f2)"
            PREVIEW="$(echo "$COUNTS" | cut -d'|' -f3-)"
            pass "$TOTAL analyzers found ($PB prebuilt: $PREVIEW)"
        else
            pass "200 OK (install node for analyzer breakdown)"
        fi
    else
        fail "HTTP $HTTP_CODE listing analyzers"
    fi
fi

section "[5/5] Quick smoke test"
if [ -z "$AUTH_METHOD" ]; then
    fail "Skipped — no valid credentials"
else
    http_get "$ENDPOINT/contentunderstanding/analyzers/prebuilt-read?api-version=$API_VERSION" "$ACCESS_TOKEN" "$APIKEY"
    if [ "$HTTP_CODE" = "200" ]; then
        pass "prebuilt-read analyzer exists (${HTTP_TIME}ms)"
    elif [ "$HTTP_CODE" = "404" ]; then
        fail "prebuilt-read not found"; fix "Verify the endpoint region supports Content Understanding."
    else
        fail "HTTP $HTTP_CODE querying prebuilt-read"
    fi
fi

# ─── Summary ──────────────────────────────────────────────────────────────────
echo
TOTAL_CHECKS=$((PASS + FAIL))
echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
if [ "$FAIL" -eq 0 ]; then
    echo -e "${GREEN}Result: $PASS / $TOTAL_CHECKS checks passed ✓${NC}"
    if [ "$VERIFY_ONLY" -eq 0 ]; then
        echo
        echo "Next steps:"
        echo "  1. cd $JS_SAMPLES_DIR"
        if [ "$SKIP_UPDATE_DEFAULTS" = "1" ]; then
            echo "  2. (Skipped) updateDefaults.js — defaults already configured."
        else
            echo "  2. Configure model defaults (one-time per Foundry resource):"
            echo "       node updateDefaults.js"
        fi
        echo "  3. Run a sample:"
        echo "       node analyzeUrl.js"
        echo "     Or use the helper script (sources .env automatically):"
        echo "       .github/skills/cu-sdk-sample-run/scripts/run_sample.sh analyzeUrl"
    fi
else
    echo -e "${RED}Result: $FAIL failed, $PASS passed (out of $TOTAL_CHECKS checks)${NC}"
    echo -e "${YELLOW}Fix the issues above and re-run with --verify-only to recheck.${NC}"
fi
echo

exit $FAIL
