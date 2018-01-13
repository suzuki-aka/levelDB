const LevelDB = require('./lib/db');
var db = new LevelDB('./db');

db.use('article');
db.insert([
    { id: '10', name: '1000' },
    { id: '11', name: '2132432' },
]);
db.get();
console.log(db.listRecords);