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
  * [resin device toolbox (`rdt`)](https://www.npmjs.com/package/resin-device-toolbox)
- Hardware:
  * Raspberry pi 2 or 3
  * SD card `>= 8gb`
  * Wifi dongle or ethernet cable
  * Bluetooth dongle

### Setup your resinOS device

* Download the OS:
```
wget https://files.resin.io/resinos/raspberry-pi2/2.0.0-beta.1/resin-dev.zip
```

* Unzip the image download to find `resin.img`

* Configure the image (*only needed if you are using wifi*)
```
rdt configure ~/Downloads/resin.img
```

* Plug in your SD card
* Flash the image (use arrow keys to select correct drive)
```
$ sudo rdt flash ~/Downloads/resin.img
Password:
? Select drive (Use arrow keys)
❯ /dev/disk3 (7.9 GB) - STORAGE DEVICE
```

* Boot the device
* Check that it's on the local network: `$ ping resin.local` or `$ rdt scan`.
* If it is not on the local network, you can still use the device, but you need to know its IP address.

### Start the agile services
* First clone this repo:
```
git clone https://github.com/agile-iot/agile-resin & cd /agile-resin
```

* Deploy agile services:
```
bash push.sh
```

If the gateway is not on the local network:
```
bash push.sh <IP-address>
```

* If everything looks good. Turn on the protocol discovery.
```
curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" "resin.local:8080/api/protocols/discovery"
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
$ rdt ssh resin.local
```
