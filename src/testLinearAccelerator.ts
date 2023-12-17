import { LinearAccelerator } from "./LinearAccelerator";

const motor = new LinearAccelerator();
motor.open().then(() => {
  motor.startDown();
  setTimeout(() => {
    motor.startUp();
    setTimeout(() => {
      motor.stop();
    }, 1000);
  }, 1000);
})
