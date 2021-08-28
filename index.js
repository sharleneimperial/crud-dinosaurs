const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');

const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.use(ejsLayouts);


app.get('/dinosaurs', function(req, res) {
    res.render('dinosaurs/index');
});



app.listen(PORT, () => {
    console.log(`Server running on PORT:`, PORT);
});