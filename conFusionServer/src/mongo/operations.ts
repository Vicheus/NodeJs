import {
  Db,
  Collection,
  InsertOneWriteOpResult,
  DeleteWriteOpResultObject,
  UpdateWriteOpResult,
} from 'mongodb';

export async function insertDocument(db: Db, document: any, collection: string) {
  try {
    const coll: Collection = db.collection(collection);
    const result: InsertOneWriteOpResult = await coll.insertOne(document);
    console.log(`Inserted Result: ${result.result.n} documents into collection ${collection}`);
    return result;
  } catch (e) {
    console.log(e.message);
  }
}

export async function findDocuments(db: Db, collection: string) {
  try {
    const coll: Collection = db.collection(collection);
    return coll.find({}).toArray();
  } catch (e) {
    console.log(e.message);
  }
}

export async function removeDocument(db: Db, document: any, collection: string) {
  try {
    const coll: Collection = db.collection(collection);
    const result: DeleteWriteOpResultObject = await coll.deleteOne(document);
    console.log(`Removed the document: ${result}`);
    return result;
  } catch (e) {
    console.log(e.message);
  }
}

export async function updateDocument(db: Db, document: any, update: any, collection: string) {
  try {
    const coll: Collection = db.collection(collection);
    const result: UpdateWriteOpResult = await coll.updateOne(document, update, { upsert: true});
    console.log('Updated the document: ', document, 'to the document ', update);
    return result;
  } catch (e) {
    console.log(e.message);
  }
}
