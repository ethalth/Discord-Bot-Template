import Database from 'better-sqlite3';
import {fileURLToPath} from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Db = new Database(path.resolve(__dirname,'./database.db'));

export default Db