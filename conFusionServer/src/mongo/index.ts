import * as path from 'path';
import {
  MongoClient,
  Db,
  InsertOneWriteOpResult,
  UpdateWriteOpResult,
} from 'mongodb';
import { insertDocument, findDocuments, removeDocument, updateDocument } from './operations';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(`${__dirname}/../config/env/.env`) });
const url      = process.env.MONGO_URI;
const dbName   = process.env.DB_NAME;
const dishes   = process.env.DISHES_COLLECTION;

export default async function mongo() {
  try {
    const client: Db = await MongoClient.connect(url);
    console.log('connected correctly to the server');
    const db: Db = client.db(dbName);
    const document = { name: 'MyPizza', description: 'My pizza description' };
    const insertResult: InsertOneWriteOpResult = await insertDocument(db, document, dishes);
    console.log('Inserted document:', insertResult.ops);
    const docs: any[] = await findDocuments(db, dishes);
    console.log('Found documents: ', docs);
    const updatedDocument: UpdateWriteOpResult = await updateDocument(
      db,
      { name: 'MyPizza' },
      { $set: { description: 'New Pizza description' } },
      dishes,
    );
    console.log('Updated document: ', updatedDocument.result);
    const updatedDocs: any[] = await findDocuments(db, dishes);
    console.log('Found documents ', updatedDocs);
    const dropResult: boolean = await db.dropCollection(dishes);
    console.log('Deleted collection dishes: ', dropResult);
    await client.close();
  } catch (e) {
    console.log(e.message);
  } finally {
    console.log('closed');
  }
}
