# ResinOS and Docker-compose

This is a POC to develop the agile stack with a [resinOS device](https://resinos.io/) as a remote host to [docker-compose](https://docs.docker.com/compose/overview/).

## Usage

### Setup your resinOS device.
Head over to the getting started page of resinOS (https://resinos.io/docs/raspberry-pi2/gettingstarted/)
1. Download one of the resinOS device images, in this example we use the raspberry pi 2.
2. **[Optional]** Configure the image for wifi connection, to do this you will first have to [install `rdt`](https://resinos.io/docs/raspberrypi3/gettingstarted/#install-resin-device-toolbox).
3. Power up the device and `ping resin.local` to make sure its connected to the network.

### Get Docker and Docker-compose Installed
Install docker + docker compose on your laptop, following this guide: https://docs.docker.com/compose/install/

### Spin up the services
1. First clone this repo:
```
git clone https://github.com/agile-iot/agile-resin
```

2. Deploy your services:
From the project directory run the following.
```
DOCKER_API_VERSION=1.22 DOCKER_HOST=tcp://resin.local:2375 docker-compose up
```

#### Profit $$$
Point the browser on your laptop to resin.local:1337

## Warnings and Limitations.

* You need to make sure that the base images used in your services **match the architecture** of the device you are
running the containers on. In this example, we target a raspberry pi 3, so we need our base images to be `armhf`, the
regular/official `amd64` images on dockerhub won't work.
