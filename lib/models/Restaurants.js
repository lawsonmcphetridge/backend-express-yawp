const pool = require('../utils/pool');

class Restaurants {
  name;
  cuisine;
  cost;
  image;
  website;
  constructor(row) {
    this.name = row.name;
    this.cuisine = row.cuisine;
    this.cost = row.cost;
    this.image = row.image;
    this.website = row.website;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
         SELECT * FROM restaurants
        `
    );
    return rows.map((row) => new Restaurants(row));
  }
}

module.exports = { Restaurants };
