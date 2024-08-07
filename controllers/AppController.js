import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  constructor() {
    this.db = dbClient;
    this.redis = redisClient;
  }

  getStatus(req, res) {
    if (this.redis.isAlive() && this.redis.isAlive()) {
      return res.status(200).json({ redis: true, db: true });
    }

    return res.status(503).json({ redis: this.redis.isAlive(), db: this.db.isAlive() });
  }

  getStats(req, res) {
    return res.status(200).json({ users: this.db.nbUsers(), files: this.db.nbFiles() });
  }
}

export default AppController;
