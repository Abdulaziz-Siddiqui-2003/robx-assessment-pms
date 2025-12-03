const Product = require('./models/productModel');

const dummyData = [
  { name: 'Laptop Pro', price: 1200, category: 'Electronics' },
  { name: 'Gaming Mouse', price: 50, category: 'Electronics' },
  { name: 'Office Chair', price: 150, category: 'Furniture' },
  { name: 'Office Chair', price: 150, category: 'Furniture' },
  { name: 'Office Chair', price: 150, category: 'Furniture' },
  { name: 'Office Chair', price: 150, category: 'Furniture' },
  { name: 'Office Chair', price: 150, category: 'Furniture' },
  { name: 'Office Chair', price: 150, category: 'Furniture' },
  { name: 'Office Chair', price: 150, category: 'Furniture' },
  { name: 'Office Chair', price: 150, category: 'Furniture' },
  { name: 'Office Chair', price: 150, category: 'Furniture' },
  { name: 'Office Chair', price: 150, category: 'Furniture' },
  { name: 'Office Chair', price: 150, category: 'Furniture' },
  { name: 'Office Chair', price: 150, category: 'Furniture' },
  { name: 'Laptop Pro', price: 1200, category: 'Electronics' },
  { name: 'Gaming Mouse', price: 50, category: 'Electronics' },
  { name: 'Laptop Pro', price: 1200, category: 'Electronics' },
  { name: 'Gaming Mouse', price: 50, category: 'Electronics' },
  { name: 'Laptop Pro', price: 1200, category: 'Electronics' },
  { name: 'Gaming Mouse', price: 50, category: 'Electronics' },
  { name: 'Laptop Pro', price: 1200, category: 'Electronics' },
  { name: 'Gaming Mouse', price: 50, category: 'Electronics' },
  { name: 'Laptop Pro', price: 1200, category: 'Electronics' },
  { name: 'Gaming Mouse', price: 50, category: 'Electronics' },
  { name: 'Laptop Pro', price: 1200, category: 'Electronics' },
  { name: 'Gaming Mouse', price: 50, category: 'Electronics' },
  { name: 'Laptop Pro', price: 1200, category: 'Electronics' },
  { name: 'Gaming Mouse', price: 50, category: 'Electronics' },
  { name: 'Laptop Pro', price: 1200, category: 'Electronics' },
  { name: 'Gaming Mouse', price: 50, category: 'Electronics' },
];

async function runSeed() {
  try {
    const count = await Product.bulkCreate(dummyData);
    console.log(`✅ Successfully created ${count} products!`);
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

runSeed();