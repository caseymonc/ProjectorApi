import express, { Request, Response } from 'express';
import { ProjectorConnection } from './ProjectorConnection';

const projector = new ProjectorConnection('/dev/ttyAMA0', 115200);
projector.open().then(() => {
  const app = express();
  const port = process.env.PORT || 3040;

  app.get('/projector/:commandd', async (req: Request, res: Response) => {
    await projector.read(req.params.command);
  });

  app.post('/projector/:command', async (req: Request, res: Response) => {
    await projector.doAction(req.params.command);
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});

