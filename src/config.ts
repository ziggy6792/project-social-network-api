const uri = process.env.MONGO_DB_URI || 'mongodb://localhost:27016/';
console.log('Setting MONGO_DB_URI', uri);

export const MONGO_DB_URI = uri;
