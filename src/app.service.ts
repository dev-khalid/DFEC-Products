import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { RedisOptions } from 'ioredis';
import * as assert from 'node:assert';
@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  async redisHealthCheck() {
    const redisConfig: RedisOptions = {
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
      password: this.configService.get('REDIS_PASSWORD'),
    };
    const redis = new Redis(redisConfig);
    try {
      const response = await redis.ping();
      assert.deepEqual(response, 'PONG', 'Redis health check failed');
      return 'Redis health check passed';
    } catch (error) {
      console.log('what is the error', error);
      throw error;
    } finally {
      redis.disconnect();
    }
  }
  async getHealth() {
    return {
      status: 'UP',
      uptime: `${(process.uptime() / 60).toFixed(2)} minutes`,
      redisHealth: await this.redisHealthCheck(),
    };
  }
}
