#!/bin/bash
# Docker entrypoint for demo recording
set -e

export VHS_NO_SANDBOX=true

# Write environment variables to bashrc so VHS subshells can access them
echo "export GH_TOKEN=\"$GH_TOKEN\"" >> ~/.bashrc
echo "export GITHUB_TOKEN=\"$GH_TOKEN\"" >> ~/.bashrc
echo "export OPENAI_API_KEY=\"$OPENAI_API_KEY\"" >> ~/.bashrc
echo "export DOTNET_CLI_TELEMETRY_OPTOUT=1" >> ~/.bashrc

# Record the demo from workspace directory
cd /workspace
vhs /workspace/demo/demo.tape

echo "Demo recorded to demo/demo.gif"
