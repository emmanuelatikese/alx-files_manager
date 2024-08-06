import dotenv from 'dotenv';
import { Mongoclient } from 'mongodb';

dotenv.config();

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'file_manager';
    this.isConnected = false;
    this.client = new Mongoclient(`mongodb://${host}:${port}`);
    this.client.connect(() => {
      this.isConnected = true;
    });
    this.db = this.client.db(database);
  }
}
const dbClient = new DBClient();
export default dbClient;
