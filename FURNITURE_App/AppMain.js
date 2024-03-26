const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT

app.use(express.json());

// DATABASE CONNECTION
async function main() {
   await mongoose.connect(process.env.MONGO_DB)
}
main()
.then(() => console.log('DB is connected'))
.catch(err => console.log(err));

const adminsRoutes = require('./routes/admin/index.routes' );
app.use('/api/admin', adminsRoutes);

app.listen(port,async () => {
   console.log(`Server start at http://localhost:${port}`)
})

