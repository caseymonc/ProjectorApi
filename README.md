# Projector Control API

## Raspberry Pi Setup
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
