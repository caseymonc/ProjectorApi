import express, { Request, Response } from 'express';
import { ProjectorConnection } from './ProjectorConnection';

const projector = new ProjectorConnection('/dev/ttyAMA0', 115200);
projector.open().then(() => {
  const app = express();
  const port = process.env.PORT || 3040;

  app.get('/projector/:command', async (req: Request, res: Response) => {
    try {
      const value = await projector.read(req.params.command);
      return res.json({ value });
    } catch (e) {
      console.log("error", e)
      return res.send("Failed ");
    }
  });

  app.post('/projector/:command/toggle', async (req: Request, res: Response) => {
    try {
      const value = await projector.read(req.params.command);
      if (value === 1) {
        const command = projector.negativeCommand(req.params.command);
        if (!command) return res.send("Failed, invalid command ");
        await projector.doAction(command);
      } else {
        const command = projector.positiveCommand(req.params.command);
        if (!command) return res.send("Failed, invalid command ");
        await projector.doAction(command);
      }
      return res.json({ value });
    } catch (e) {
      console.log("error", e)
      return res.send("Failed ");
    }
  });

  app.post('/projector/:command/toggle', async (req: Request, res: Response) => {
    try {
      await projector.doAction(req.params.command);
      return res.send("OK");
    } catch (e) {
      console.log("error", e)
      return res.send("Failed ");
    }
  });

  app.post('/projector/:command/set', async (req: Request, res: Response) => {
    try {
      const value = req.body.value;
      const currentValue = await projector.read(req.params.command);
      if (typeof currentValue !== 'number') return res.send("Failed, invalid current value");
      if (typeof value !== 'number') return res.send("Failed, invalid value");
      const diff = value - currentValue;
      if (diff < 0) {
        const command = projector.negativeCommand(req.params.command);
        if (!command) return res.send("Failed, invalid command ");
        for (let i = 0; i < diff * -1; i++) {
          await projector.doAction(command);
        }
      } else {
        const command = projector.positiveCommand(req.params.command);
        if (!command) return res.send("Failed, invalid command ");
        for (let i = 0; i < diff; i++) {
          await projector.doAction(command);
        }
      }
      return res.send("OK");
    } catch (e) {
      console.log("error", e)
      return res.send("Failed ");
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});

