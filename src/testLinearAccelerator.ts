import { LinearAccelerator } from "./LinearAccelerator";
import awaitTimeout from "./awaitTimeout";

const motor = new LinearAccelerator();
motor.open().then(async () => {
  await motor.startDown();
  await awaitTimeout(10000);
  await motor.startUp();
  await awaitTimeout(10000);
  await motor.stop();
});
