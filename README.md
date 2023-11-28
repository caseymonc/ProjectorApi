# Projector Control API

## Raspberry Pi Setup

### Install Node
```
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get update
sudo apt-get install nodejs -y
```

### Disable Bluetooth
```
sudo vim /boot/config.txt
```

Add the line
```
dtoverlay=pi3-disable-bt
```

Then run the following command:
```
sudo systemctl disable hciuart
sudo reboot
```

### Setup Serial Port
```
sudo cp /boot/cmdline.txt /boot/cmdline.txt.backup
```

Now we can edit the original:
```
sudo vim /boot/cmdline.txt
```

You then need to remove the following text:
```
console=serial0,115200
```

Now we have stopped the Pi from using the serial to output its console data, we can use the serial port with our own device.


## Setup

```
npm install
```

## Lint

```
npm run lint
```
