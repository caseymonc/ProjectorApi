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

  app.post('/projector/:command', async (req: Request, res: Response) => {
    try {
      await projector.doAction(req.params.command);
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

