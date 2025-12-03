const db = require('../config/db');

class Product {
  // Updated getAll with Pagination
  static async getAll(searchQuery = '', page = 1, limit = 5) {
    const offset = (page - 1) * limit;
    let sql = 'SELECT * FROM products';
    let countSql = 'SELECT COUNT(*) as total FROM products';
    let params = [];

    if (searchQuery) {
      const filter = ` WHERE name LIKE ?`;
      sql += filter;
      countSql += filter;
      params.push(`%${searchQuery}%`);
    }

    sql += ' ORDER BY createdAt DESC LIMIT ? OFFSET ?';
    // We add limit and offset to the parameters
    // Note: limit/offset must be integers, not strings
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await db.query(sql, params);
    const [countResult] = await db.query(countSql, searchQuery ? [`%${searchQuery}%`] : []);
    
    return {
      products: rows,
      total: countResult[0].total
    };
  }

  // ... (Keep getById, create, update, delete, bulkCreate exactly the same as before)
  static async getById(id) {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(product) {
    const { name, price, category } = product;
    const [result] = await db.execute(
      'INSERT INTO products (name, price, category) VALUES (?, ?, ?)',
      [name, price, category]
    );
    return result.insertId;
  }

  static async update(id, product) {
    const { name, price, category } = product;
    const [result] = await db.execute(
      'UPDATE products SET name = ?, price = ?, category = ? WHERE id = ?',
      [name, price, category, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows;
  }

  static async bulkCreate(productsArray) {
    if (!productsArray || productsArray.length === 0) return 0;
    const values = productsArray.map(p => {
      if (!p.name || !p.price || !p.category) throw new Error(`Missing fields`);
      return [p.name, p.price, p.category];
    });
    const sql = 'INSERT INTO products (name, price, category) VALUES ?';
    const [result] = await db.query(sql, [values]);
    return result.affectedRows;
  }
}

module.exports = Product;