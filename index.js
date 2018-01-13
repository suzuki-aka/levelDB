const level = require('level');

var db = level('./db', { valueEncoding: 'json', keyEncoding: 'json' });

db.batch()
    .put({ id: 0, table: 'article' }, { 'firstName': 'Anh', 'lastName': 'Nguyen' }) // 
    .put({ id: 10, table: 'article' }, { 'firstName': 'Anh', 'lastName': 'Nguyen' }) // 
    .put('ten', { 'firstName': 'Anh', 'lastName': 'Nguyen' }) // 
    .write(() => console.log('Done'));

db.get('ten', function (err, value) {
    if (err) console.log(err);
    console.log(value);
});