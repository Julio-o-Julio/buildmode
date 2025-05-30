import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log:
        process.env.NODE_ENV === 'dev'
          ? ['query', 'error', 'warn']
          : ['error'],
    });

    this.enableShutdownHooks();
  }

  private enableShutdownHooks() {
    // Captura o encerramento do processo para desconectar do banco
    process.on('beforeExit', async () => {
      await this.$disconnect();
    });

    process.on('SIGINT', async () => {
      await this.$disconnect();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await this.$disconnect();
      process.exit(0);
    });
  }
}
