import { LinearAccelerator } from "./LinearAccelerator";

const motor = new LinearAccelerator();
motor.open().then(async () => {
  await motor.startDown();
  setTimeout(async () => {
    await motor.startUp();
    setTimeout(async () => {
      await motor.stop();
    }, 1000);
  }, 1000);
})
