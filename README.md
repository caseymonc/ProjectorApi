# Projector Control API
This is an express api for controlling a ViewSonic PJD5255 projector. It is run on a Raspberry Pi which connects to the projector using the RS232 Serial port.  It also has some API endpoints for controlling a linear actuator that will allow the projector to be hidden in the ceiling and dropped down when in use.

## Raspberry Pi Setup

### Install the OS
1. Use Raspberry Pi Imager
2. Choose the Raspberry Pi version that you have
3. Select the OS (Raspberry Pi OS (Legacy) Lite)
4. Install on sd card


### Install Node.JS
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
In order to use the serial port hat, we will need to disable the bluetooth, since Raspberry Pi uses the same ports for Bluetooth as the serial port hat.
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

## Start Server
```
npm start
```