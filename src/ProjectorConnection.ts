import { SerialPort } from 'serialport';

const PowerOn: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x00, 0x00, 0x5D];
const PowerOff: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x01, 0x00, 0x5E];
const PowerStatus: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x11, 0x00, 0x5E];

type CommandMap = {
  [key: string]: number[];
}

export const ActionCommands: CommandMap = {
  PowerOn,
  PowerOff,
};

export const ReadCommands: CommandMap = {
  PowerStatus
}

export class ProjectorConnection {
  #path: string;
  #baudRate: number;
  #port?: SerialPort;
  constructor(path: string, baudRate: number) {
    this.#path = path;
    this.#baudRate = baudRate;
    this.#port = undefined;
  }

  async open() {
    const port = new SerialPort({ path: this.#path, baudRate: this.#baudRate, autoOpen: false });
    await new Promise<void>((resolve, reject) => {
      port.open((err) => {
        if (err) return reject(err);
        resolve();
      })
    });
    this.#port = port;
  }

  async doAction(command: string) {
    if (!this.#port) throw "Must call open on ProjectorConnection before using it.";
    const data = ActionCommands[command];
    if (!data) throw "Invalid Command";
    return await new Promise<void>((resolve, reject) => {
      this.#port?.write(data, undefined, (err) => {
        if (err) return reject(err);
        this.#port?.drain((err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    });
  }

  async read(command: string): Promise<any> {
    if (!this.#port) throw "Must call open on ProjectorConnection before using it.";
    const data = ReadCommands[command];
    if (!data) throw "Invalid Command";
    return await new Promise<any>((resolve, reject) => {
      this.#port?.write(data, undefined, (err) => {
        if (err) return reject(err);
        this.#port?.drain((err) => {
          if (err) return reject(err);
          let response =  this.#port?.read(2);
          while (response === null) response = this.#port?.read(2);
          console.log(response);
          resolve(response);
        });
      });
    });
  }
}