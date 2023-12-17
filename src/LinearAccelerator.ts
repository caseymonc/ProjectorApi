import GPIO from 'rpi-gpio';

const ENA = 11;
const IN1 = 13;
const IN2 = 15;

export class LinearAccelerator {
  constructor() {
    GPIO.setup(ENA, GPIO.DIR_OUT);
    GPIO.setup(IN1, GPIO.DIR_OUT);
    GPIO.setup(IN2, GPIO.DIR_OUT);
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