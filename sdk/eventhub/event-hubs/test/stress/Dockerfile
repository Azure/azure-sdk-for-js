# Using Azure Linux base Node.js images instead of deprecated MCR mirror
# All users (internal and public) now use the same Azure Linux base image
FROM mcr.microsoft.com/azurelinux/base/nodejs:20
RUN mkdir -p /app/src/
ADD ./app/src/*.ts /app/src/
ADD ./app/package.json /app/package.json
ADD ./app/tsconfig.json /app/tsconfig.json
WORKDIR /app
RUN npm install && npm run build
RUN ls
ENTRYPOINT ["node"];
