const pool = require('../utils/pool');

class Reviews {
  id;
  user_id;
  restaurant_id;
  stars;
  detail;
  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.restaurant_id = row.restaurant_id;
    this.stars = row.stars;
    this.detail = row.detail;
  }

  static async insertReview({ restaurantId, userId, detail }) {
    const { rows } = await pool.query(
      `
      INSERT INTO reviews (restaurant_id, user_id, detail) VAULES ($1, $2, $3) returning *   
        `,
      [restaurantId, userId, detail]
    );
    return new Reviews(rows[0]);
  }
}
