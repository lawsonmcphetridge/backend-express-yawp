const pool = require('../utils/pool');
const { Reviews } = require('./Reviews');

class Restaurants {
  id;
  name;
  cuisine;
  cost;
  image;
  website;
  reviews;
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.cuisine = row.cuisine;
    this.cost = row.cost;
    this.image = row.image;
    this.website = row.website;
    this.reviews = row.reviews;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
         SELECT * FROM restaurants
        `
    );
    return rows.map((row) => new Restaurants(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * from restaurants WHERE id = $1
        `,
      [id]
    );
    return new Restaurants(rows[0]);
  }

  async addReviews() {
    const { rows } = await pool.query(
      `
        SELECT * from reviews where restaurant_id = $1
        
        `,
      [this.id]
    );
    this.reviews = rows.map((row) => new Reviews(row));
  }
}

module.exports = { Restaurants };
