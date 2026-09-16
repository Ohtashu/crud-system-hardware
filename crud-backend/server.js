const express = require ('express');
const cors = require('cors');
const componentsRoutes = require('./routes/components');
const reportRoutes = require('./routes/report');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/components', componentsRoutes);
app.use('/api/report', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});