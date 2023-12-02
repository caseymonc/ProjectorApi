import { InterByteTimeoutParser, SerialPort } from 'serialport';

const PowerOn: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x00, 0x00, 0x5D];
const PowerOff: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x01, 0x00, 0x5E];
const Power: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x11, 0x00, 0x5E];

const ResetAllSettings: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x02, 0x00, 0x5F];
const ResetColorSettings: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x2A, 0x00, 0x87];

const SplashScreenBlack: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x0A, 0x00, 0x67];
const SplashScreenBlue: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x0A, 0x01, 0x68];
const SplashScreenViewSonic: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x0A, 0x02, 0x69];
const SplashScreenScreenCapture: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x0A, 0x03, 0x6A];
const SplashScreenOff: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x0A, 0x04, 0x6B];
const SplashScreen: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x11, 0x0A, 0x68];

const QuickPowerOffOn: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x0B, 0x00, 0x68];
const QuickPowerOffOff: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x0B, 0x01, 0x69];
const QuickPowerOff: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x11, 0x0B, 0x69];

const HighAltitudeModeOn: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x0C, 0x00, 0x69];
const HighAltitudeModeOff: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x0C, 0x01, 0x6A];
const HighAltitudeMode: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x11, 0x0C, 0x6A];

const LampModeNormal: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x10, 0x00, 0x6D];
const LampModeEco: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x10, 0x01, 0x6E];
const LampModeDynamic: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x10, 0x02, 0x6F];
const LampModeSleep: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x10, 0x03, 0x70];
const LampMode: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x11, 0x10, 0x6E];

const ProjectorPositionTableFront: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x00, 0x00, 0x5E];
const ProjectorPositionTableBack: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x00, 0x01, 0x5F];
const ProjectorPositionCeilingFont: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x00, 0x02, 0x60];
const ProjectorPositionCeilingBack: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x00, 0x03, 0x61];
const ProjectorPosition: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x12, 0x00, 0x5F];

const ContrastDecrease: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x02, 0x00, 0x60];
const ContrastIncrease: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x02, 0x01, 0x61];
const Contrast: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x12, 0x02, 0x61];

const BrightnessDecrease: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x03, 0x00, 0x61];
const BrightnessIncrease: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x03, 0x01, 0x62];
const Brightness: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x12, 0x03, 0x62];

const AspectRatioAuto: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x04, 0x00, 0x62];
const AspectRatio4x3: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x04, 0x02, 0x64];
const AspectRatio16x9: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x04, 0x03, 0x65];
const AspectRatio16x10: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x04, 0x04, 0x66];
const AspectRatioAnamorphic: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x04, 0x05, 0x67];
const AspectRatioWide: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x04, 0x06, 0x68];
const AspectRatio235x1: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x04, 0x07, 0x69];
const AspectRatioPanorama: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x04, 0x08, 0x6A];
const AspectRatio: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x12, 0x04, 0x63];

const HorizontalPositionLeft: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x06, 0x01, 0x65];
const HorizontalPositionRight: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x06, 0x00, 0x64];
const HorizontalPosition: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x12, 0x06, 0x65];

const VerticalPositionUp: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x07, 0x00, 0x65];
const VerticalPositionDown: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x07, 0x01, 0x66];
const VerticalPosition: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x12, 0x07, 0x66];

const ColorTemperatureWarm: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x08, 0x00, 0x66];
const ColorTemperatureNormal: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x08, 0x01, 0x67];
const ColorTemperatureNeutral: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x08, 0x02, 0x68];
const ColorTemperatureCool: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x08, 0x03, 0x69];
const ColorTemperature: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x12, 0x08, 0x67];

const BlankOn: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x09, 0x01, 0x68];
const BlankOff: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x09, 0x00, 0x67];
const Blank: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x12, 0x09, 0x68];

const KeystoneVerticalIncrease: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x0A, 0x00, 0x68];
const KeystoneVerticalDecrease: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x0A, 0x01, 0x69];
const KeystoneVertical: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x12, 0x0A, 0x69];
const KeystoneHorizontalIncrease: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x31, 0x00, 0x8E];
const KeystoneHorizontalDecrease: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x31, 0x01, 0x8F];
const KeystoneHorizontal: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x11, 0x31, 0x8F];

const ColorModeBrightest: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x0B, 0x00, 0x69];
const ColorModeMovie: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x0B, 0x01, 0x6A];
const ColorModeStandard: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x0B, 0x04, 0x6D];
const ColorModeViewMatch: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x0B, 0x05, 0x6E];
const ColorModeDynamic: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x0B, 0x08, 0x71];
const ColorMode: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x12, 0x0B, 0x6A];

const HueDecrease: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x11, 0x00, 0x6F];
const HueIncrease: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x11, 0x01, 0x70];
const Hue: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x12, 0x11, 0x70];

const SaturationDecrease: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x12, 0x00, 0x70];
const SaturationIncrease: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x12, 0x01, 0x71];
const Saturation: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x12, 0x12, 0x71];

const GainDecrease: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x13, 0x00, 0x71];
const GainIncrease: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x12, 0x13, 0x01, 0x72];
const Gain: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x12, 0x13, 0x72];

const FreezeOn: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x13, 0x00, 0x01, 0x60];
const FreezeOff: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x13, 0x00, 0x00, 0x5F];
const Freeze: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x13, 0x00, 0x60];

const InputVGA1: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x13, 0x01, 0x00, 0x60];
const InputVGA2: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x13, 0x01, 0x08, 0x68];
const InputHDMI: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x13, 0x01, 0x03, 0x63];
const InputComposite: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x13, 0x01, 0x05, 0x65];
const InputSVideo: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x13, 0x01, 0x06, 0x66];
const Input: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x13, 0x01, 0x61];

const QuickAutoSearchOn: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x13, 0x02, 0x01, 0x62];
const QuickAutoSearchOff: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x13, 0x02, 0x00, 0x61];
const QuickAutoSearch: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x13, 0x02, 0x62];

const MuteOn: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x14, 0x00, 0x01, 0x61];
const MuteOff: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x14, 0x00, 0x00, 0x60];
const Mute: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x14, 0x00, 0x61];

const VolumeUp: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x14, 0x01, 0x00, 0x61];
const VolumeDown: number[] = [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x14, 0x02, 0x00, 0x62];
const Volume: number[] = [0x07, 0x14, 0x00, 0x05, 0x00, 0x34, 0x00, 0x00, 0x14, 0x03, 0x64];


type CommandMap = {
  [key: string]: number[];
}

export const ActionCommands: CommandMap = {
  PowerOn,
  PowerOff,

  ResetAllSettings,
  ResetColorSettings,

  SplashScreenBlack,
  SplashScreenBlue,
  SplashScreenViewSonic,
  SplashScreenScreenCapture,
  SplashScreenOff,

  QuickPowerOffOn,
  QuickPowerOffOff,

  HighAltitudeModeOn,
  HighAltitudeModeOff,

  LampModeNormal,
  LampModeEco,
  LampModeDynamic,
  LampModeSleep,

  ProjectorPositionTableFront,
  ProjectorPositionTableBack,
  ProjectorPositionCeilingFont,
  ProjectorPositionCeilingBack,

  ContrastDecrease,
  ContrastIncrease,

  BrightnessDecrease,
  BrightnessIncrease,

  AspectRatioAuto,
  AspectRatio4x3,
  AspectRatio16x9,
  AspectRatio16x10,
  AspectRatioAnamorphic,
  AspectRatioWide,
  AspectRatio235x1,
  AspectRatioPanorama,

  HorizontalPositionLeft,
  HorizontalPositionRight,

  VerticalPositionUp,
  VerticalPositionDown,

  ColorTemperatureWarm,
  ColorTemperatureNormal,
  ColorTemperatureNeutral,
  ColorTemperatureCool,

  BlankOn,
  BlankOff,

  KeystoneVerticalIncrease,
  KeystoneVerticalDecrease,

  KeystoneHorizontalIncrease,
  KeystoneHorizontalDecrease,

  ColorModeBrightest,
  ColorModeMovie,
  ColorModeStandard,
  ColorModeViewMatch,
  ColorModeDynamic,

  HueDecrease,
  HueIncrease,

  SaturationDecrease,
  SaturationIncrease,

  GainDecrease,
  GainIncrease,

  FreezeOn,
  FreezeOff,

  InputVGA1,
  InputVGA2,
  InputHDMI,
  InputComposite,
  InputSVideo,

  QuickAutoSearchOn,
  QuickAutoSearchOff,

  MuteOn,
  MuteOff,

  VolumeUp,
  VolumeDown
};

export const ReadCommands: CommandMap = {
  Power,
  SplashScreen,
  QuickPowerOff,
  HighAltitudeMode,
  LampMode,
  ProjectorPosition,
  Contrast,
  Brightness,
  AspectRatio,
  HorizontalPosition,
  VerticalPosition,
  ColorTemperature,
  Blank,
  KeystoneVertical,
  KeystoneHorizontal,
  ColorMode,
  Hue,
  Saturation,
  Gain,
  Freeze,
  Input,
  QuickAutoSearch,
  Mute,
  Volume
}

type ReadMapType = {
  [key: string]: (value: number) => number;
}

const ReadMap: ReadMapType = {
  QuickPowerOff: (v) => v === 1 ? 0 : 1,
  HighAltitudeMode: (v) => v === 1 ? 0 : 1,
  KeystoneVertical: (v) => (v > 40 ? v - 256 : v) * -1,
  KeystoneHorizontal: (v) => (v > 40 ? v - 256 : v) * -1,
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

  async read(command: string): Promise<number | string> {
    if (!this.#port) throw "Must call open on ProjectorConnection before using it.";
    const data = ReadCommands[command];
    if (!data) throw "Invalid Command";
    return await new Promise<any>((resolve, reject) => {
      const listener = (buffer: any) => {
        this.#port?.off('data', listener);
        let value = buffer.at(buffer.length - 1) || 0;
        if (ReadMap[command]) value = ReadMap[command](value);
        resolve(value);
      }
      const parser = this.#port?.pipe(new InterByteTimeoutParser({ interval: 1000 }))
      this.#port?.on('data', listener);
      this.#port?.write(data, undefined, (err) => {
        if (err) {
          this.#port?.off('data', listener);
          return reject(err);
        }
      });
    });
  }
}