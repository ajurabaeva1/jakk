const { db } = require("../models/index.js");

// const main = async () => {
//   await db.sync({ force: true });
//   process.exit();
// };

const reset = async () => {
  try {
    await db.sync({ force: true })
    console.log('Finished')
  } catch (e) {
   console.log('e')
  }
}

const main = async () => {
  await reset()
  process.exit()
}
main();