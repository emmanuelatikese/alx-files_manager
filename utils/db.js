// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'file_manager';
    const url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.isConnected = false;
    this.client.connect()
      .then(() => {
        this.isConnected = true;
        this.db = this.client.db(dbName);
      })
      .catch((err) => console.error(err));
  }

  isAlive() {
    return this.isConnected;
  }

  async nbUsers() {
    try {
      const count = await this.db.collection('users').countDocuments();
      return count;
    } catch (err) {
      throw new Error(err);
    }
  }

  async nbFiles() {
    try {
      const count = await this.db.collection('files').countDocuments();
      return count;
    } catch (err) {
      throw new Error(err);
    }
  }
}
const dbClient = new DBClient();
export default dbClient;
