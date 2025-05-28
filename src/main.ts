import 'dotenv/config';
import fastify from 'fastify';
import { createUserModule } from './infra/http/modules/user/userModule';
import { userRoutes } from './infra/http/modules/user/userRoutes';

const app = fastify();

const { userController } = createUserModule();

app.register((app) => userRoutes(app, userController), {
  prefix: '/api/v1/',
});

const port = Number(process.env.API_V1_PORT || 3000);

app
  .ready()
  .then(() => {
    console.log(app.printRoutes());
    return app.listen({ port });
  })
  .then(() => {
    console.log(`Servidor rodando 🚀 na porta ${port}`);
  });
