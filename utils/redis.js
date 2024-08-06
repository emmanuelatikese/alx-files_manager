import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.isConnected = true;
    this.client = createClient();
    this.client.on('error', (err) => {
      this.isConnected = false;
      console.error('Error:', err);
    });
  }

  isAlive() {
    return this.isConnected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, res) => {
        if (err) {
          reject(err);
        }
        return resolve(res);
      });
    });
  }

  async set(key, value, time) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, time, value, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve(value);
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve(key);
      });
    });
  }
}

const redisClient = new RedisClient();

export default redisClient;
