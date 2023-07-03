const { MongoClient } = require("mongodb");
const Db = process.env.MONGO_URI;

console.log(Db);

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;
const initialData = require("./flights.json");

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (db) {
        _db = db.db("flybooker");
        console.log("Successfully connected to MongoDB");
        insertInitialData();
      }
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  },
};

function insertInitialData() {
  const collection = _db.collection("flights");
  collection.deleteMany({}, (err) => {
    if (err) throw err;
    console.log("Deleted previous data");
    collection.insertMany(initialData, (err, res) => {
      if (err) throw err;
      console.log(`Insterted ${res.insertedCount} initial data to database`);
    });
  });
}
