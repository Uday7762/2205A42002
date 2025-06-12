const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const averageRouter = require('./routes/average');
app.use('/calculate-average', averageRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
