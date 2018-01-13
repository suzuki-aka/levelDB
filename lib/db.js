/**
 * Init Colection
 * @param {String} locationPath - Location (Path foler database)
 */
function Database(locationPath) {
    const level = require('level');
    this.db = level(locationPath, { valueEncoding: 'json', keyEncoding: 'json' });
    this.colectionIds = [];
};

/**
 * Use a colection in databse
 * If colection not exits, we create it.
 * @param {String} colectionName - Colection Name
 */
Database.prototype.use = function (colectionName) {
    var self = this;
    this.colectionName = colectionName;
    this.get();
};

Database.prototype.makeId = function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

Database.prototype.get = function () {
    var self = this;
    this.listRecords = [];
    this.db.get(this.colectionName, function (err, colectionIds) {
        if (err) {
            self.db.put(self.colectionName, []);
        }
        if (colectionIds && Array.isArray(colectionIds)) {
            self.colectionIds = colectionIds;
            colectionIds.forEach((item) => {
                self.db.get(item, function (er, record) {
                    console.log(record);
                    self.listRecords.push(record);
                });
            });
        }
    });
    return self.listRecords;
};

/**
 * Insert data to colection
 * @param {Object} records A record or records.
 */
Database.prototype.insert = function (records, key) {
    var self = this;
    if (Array.isArray(records)) {
        records.forEach(record => {
            var itemId = record[key] || this.makeId(8);
            if (typeof record === 'object') {
                record.$__id = itemId;
                self.db.put(`${self.colectionName}_${itemId}`, record);
                self.colectionIds.push(`${self.colectionName}_${itemId}`);
            }
        });
        self.db.put(self.colectionName, self.colectionIds);
    }
};


Database.prototype.update = () => {

};

module.exports = Database;