import GPIO from 'rpi-gpio';

const ENA = 11;
const IN1 = 13;
const IN2 = 15;

export class LinearAccelerator {
  async open() {
    await GPIO.promise.setup(ENA, GPIO.DIR_OUT);
    await GPIO.promise.setup(IN1, GPIO.DIR_OUT);
    await GPIO.promise.setup(IN2, GPIO.DIR_OUT);
  }

  startDown() {
    GPIO.output(ENA,true);
    GPIO.output(IN1,true);
    GPIO.output(IN2,false);
  }

  startUp() {
    GPIO.output(ENA,true);
    GPIO.output(IN1,false);
    GPIO.output(IN2,true);
  }

  stop() {
    GPIO.output(ENA,true);
    GPIO.output(IN1,false);
    GPIO.output(IN2,false);
  }
}