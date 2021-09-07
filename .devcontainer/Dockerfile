# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.145.0/containers/codespaces-linux/.devcontainer/base.Dockerfile

FROM mcr.microsoft.com/vscode/devcontainers/universal:1-linux

RUN npm install -g "@microsoft/rush"

USER root

COPY library-scripts/*.sh /tmp/library-scripts/
RUN sudo apt-get update && /bin/bash /tmp/library-scripts/docker-in-docker-debian.sh
ENTRYPOINT ["/usr/local/share/docker-init.sh"]
VOLUME [ "/var/lib/docker" ]
CMD ["sleep", "infinity"]

USER ${USERNAME}
