// src/app.ts (or index.ts)
import express from 'express';
import itemRoutes from './web/item.route';

const app = express();
app.use(express.json());

app.use('/api', itemRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
