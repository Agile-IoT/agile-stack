FROM resin/raspberrypi2-debian

# Let's start with some basic stuff.
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    lxc \
    iptables \
    wget \
    git \
    dbus

# Install Docker from hypriot repos
RUN wget https://downloads.hypriot.com/docker-hypriot_1.10.3-1_armhf.deb && \
  dpkg -i docker-hypriot_1.10.3-1_armhf.deb

# Install Docker-compose from hypriot repos
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 37BBEE3F7AD95B3F && \
    echo "deb https://packagecloud.io/Hypriot/Schatzkiste/debian/ wheezy main" > /etc/apt/sources.list.d/hypriot.list && \
    apt-get update && \
    apt-get install -y docker-compose

COPY ./wrapdocker /usr/local/bin/wrapdocker

COPY ./apps /apps
COPY ./scripts /scripts

WORKDIR /apps

#RUN git clone https://github.com/craig-mulligan/agile-ui

# Define additional metadata for our image.
VOLUME /var/lib/docker
COPY start /start

CMD /start
