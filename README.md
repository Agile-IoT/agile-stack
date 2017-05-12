# Agile-stack, resinOS and Docker-compose

This is an easy way to develop with the agile stack on real hardware.

## Overview:

We use a [Raspberry pi](https://www.raspberrypi.org/) as a remote to [docker-compose](https://docs.docker.com/compose/overview/) on our work machine. This allows us to work as we would on our x86 machine and push changes over the local network to the docker engine running on the arm device (the Raspberry pi), which rebuilds/restarts the containers and gives us back the logs.

## Usage:
It's a simple 3 step process (I wont count [requirements](#requirements))
  1. [Setup your resinOS device](#setup-your-resinos-device)
  2. [Start the agile services](#start-the-agile-services)
  3. [Developing](#/developing)

*<b>important</b>: These instructions are for *NIX based systems. Windows will require some minor modifications, a PR for windows instructions will be greatly appreciated.*

### Requirements:
- Software:
  * [docker + docker-compose](https://docs.docker.com/compose/install/)
  * [Node.js + npm](https://nodejs.org/en/)
  * [resin CLI](https://www.npmjs.com/package/resin-cli)
  * [etcher](https://etcher.io/)
- Hardware:
  * Raspberry pi 2 or 3
  * SD card `>= 8gb`
  * Wifi dongle or ethernet cable *optional if you have the pi3*
  * Bluetooth dongle *optional if you have the pi3*

### Setup your resinOS device

* Sign up with [resin.io](https://dashboard.resin.io/signup)

* Share your account email with [craig-mulligan](mailto:craig@resin.io) and I'll add you as a collaborator on the agile application.

* Download your app image.

__NOTE__ ensure you download a `-dev` image. The dev image exposes the hostOS ports and allows us to do local builds.

* Burn the image to and SD card. There are a variety of ways to do this. I suggest using [etcher](https://etcher.io/).

* Boot the device, and check the resin dashboard. In ~30s you should see a device in the dashboard.

* In the resin.io dashboard select application, select device, select actions -> enable `local-mode`.

* Ensure you have the CLI installed `$ npm i -g resin-cli`

* Check if the device is accessible on your local network `$ resin local scan`.

* If the scan returns nothing, check the devices IP address on the resin dashboard.

### Start the agile services
* First clone this repo:
```
git clone https://github.com/agile-iot/agile-stack & cd /agile-stack
```

* Copy `example.env` to `.env` and customize it by adding your devices hostname. (default is `resin.local`)

* Disable BLE
```
ssh root@resin.local '/usr/bin/hciattach /dev/ttyAMA0 bcm43xx 921600 noflow - ; systemctl stop bluetooth'
```

* Deploy
```
docker-compose up
```

### Logging in and trying Node-RED

Go to <IP-address>:8000 and login with  user: agile and password: secret  through the OSJS interface.

Then you can deploy the following flow to get the user information for the user who is currently logged in:
```
[{"id":"b92b4272.3dc098","type":"idm-token","z":"6a9908eb.920a4","name":"","tokensource":"session","idm":"http://localhost:3000","x":204.5,"y":187.75,"wires":[["d0c1ae6.805175","297051af.53cc36"]]},{"id":"edca8fbb.5813d8","type":"inject","z":"6a9908eb.920a4","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":111.5,"y":107.25,"wires":[["b92b4272.3dc098"]]},{"id":"d0c1ae6.805175","type":"debug","z":"6a9908eb.920a4","name":"","active":false,"console":"false","complete":"true","x":382.5,"y":186.5,"wires":[]},{"id":"fd27bce8.50d0a8","type":"http request","z":"6a9908eb.920a4","name":"","method":"GET","ret":"txt","url":"","tls":"","x":292.5,"y":353.75,"wires":[["6eb9381e.e3f24"]]},{"id":"297051af.53cc36","type":"function","z":"6a9908eb.920a4","name":"","func":"msg.headers = {\"Authorization\": \"bearer \"+msg.token};\nmsg.url = \"http://agile-idm:3000/oauth2/api/userinfo\"\nmsg.method = \"GET\";\nreturn msg;","outputs":1,"noerr":0,"x":252.5,"y":265.75,"wires":[["fd27bce8.50d0a8"]]},{"id":"6eb9381e.e3f24","type":"debug","z":"6a9908eb.920a4","name":"","active":true,"console":"false","complete":"false","x":470.5,"y":354.5,"wires":[]}]
```

### Developing

`docker-compose.yml` holds the configuration for the containers, you'll see currently all the images use a prebuilt container from [Dockerhub](https://hub.docker.com/u/agileiot/) eg:
```
agile-core:
  image: agileiot/agile-core-armv7l
```

However when we are developing a new or existing service will, of course, want to build the container locally instead of publishing it online for every change.

#### Developing with an existing service:

* Clone the source to the `/apps` directory

```
$ cd /apps && git clone https://github.com/Agile-IoT/agile-core.git
```

* Then tell `docker-compose` to build from source by commenting out the image key and uncommenting the build key.
```
agile-core:
  # image: agileiot/agile-core-armv7l
  build: apps/agile-core
```
* Deploy :tada
```
bash push.sh
```

The docker engine will cache builds so things will be a lot quicker after the first run.

#### Developing with a new service:

It follows the same procedure as above however you'll need to create a new entry in the `docker-compose.yml`.

* Clone your source to `/apps` & add a Dockerfile if you don't already have one.
```
cd /apps && git clone https://github.com/Agile-IoT/agile-my-service.git
```

* Add an entry for the new service to `docker-compose.yml`. The simplest configuration would be. You can read more about docker-compose options [here](https://docs.docker.com/compose/compose-file/):
```
agile-my-service:
  build: apps/agile-my-service
```

I've also included a simple `agile-example` service to serve as a guide.

#### Ssh'ing

You may want to see what's going on in during runtime:

To ssh into the host:
```
$ ssh root@resin.local -p22222
```

To ssh into one of the containers:
```
$ resin local ssh resin.local
```

#### Troubleshooting

* Can't ping `resin.local`?

`resin.local` won't work across subnets, your device maybe on a `2.4gz` network and your work machine maybe on the `5gz`.
