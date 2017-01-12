# Agile-ble runs the bluetooth service so we must stop the hosts
ssh root@resin.local -p22222 'systemctl stop bluetooth'

export DOCKER_API_VERSION=1.22
export DOCKER_HOST=tcp://resin.local:2375
# Because resinos is read-only fs we must write to /mnt/data/
export DATA=/mnt/data/.agile
export DBUS_SYSTEM_SOCKET=/var/run/dbus/system_bus_socket
export DBUS_SESSION_SOCKET_DIR=$DATA/agile_bus/
export DBUS_SESSION_SOCKET_NAME=agile_bus_socket
export DBUS_SESSION_SOCKET=$DBUS_SESSION_SOCKET_DIR/$DBUS_SESSION_SOCKET_NAME
export DBUS_SESSION_BUS_ADDRESS=unix:path=$DBUS_SESSION_SOCKET

docker-compose build && docker-compose up
