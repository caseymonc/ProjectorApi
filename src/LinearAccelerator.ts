import GPIO from 'rpi-gpio';

const ENA = 11;
const IN1 = 13;
const IN2 = 15;

export class LinearAccelerator {
  async open() {
    console.log('Setup ENA');
    await GPIO.promise.setup(ENA, GPIO.DIR_OUT);
    console.log('Setup IN1');
    await GPIO.promise.setup(IN1, GPIO.DIR_OUT);
    console.log('Setup IN2');
    await GPIO.promise.setup(IN2, GPIO.DIR_OUT);
    console.log('Setup Done');
  }

  async startDown() {
    console.log('Starting Motor Down');
    await GPIO.promise.write(ENA,true);
    await GPIO.promise.write(IN1,true);
    await GPIO.promise.write(IN2,false);
    console.log('Started Motor Down');
  }

  startUp() {
    console.log('Starting Motor Up');
    GPIO.promise.write(ENA,true);
    GPIO.promise.write(IN1,false);
    GPIO.promise.write(IN2,true);
    console.log('Started Motor Down');
  }

  stop() {
    console.log('Stopping Motor');
    GPIO.promise.write(ENA,true);
    GPIO.promise.write(IN1,false);
    GPIO.promise.write(IN2,false);
    console.log('Stopped Motor');
  }
}