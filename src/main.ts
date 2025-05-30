import { fastifyCors } from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
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
import { authRoutes } from './infra/http/modules/auth/authRoutes';
import { userRoutes } from './infra/http/modules/user/userRoutes';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: '*' });

app.register(fastifyJwt, {
  secret: String(process.env.JWT_SECRET),
});

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

app.register((app) => authRoutes(app), {
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
