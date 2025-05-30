import { fastifyCors } from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import 'dotenv/config';
import { fastify } from 'fastify';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { userRoutes } from './infra/http/modules/user/userRoutes';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: '*' });

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'BuildMode API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: '/api/v1/docs',
});

app.register((app) => userRoutes(app), {
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
