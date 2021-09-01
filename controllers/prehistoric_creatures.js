const express = require('express');
const router = express.Router();
const fs = require('fs');
router.use(express.urlencoded({extended: false}));

router.get('/', function(req, res) {
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    let creatureData = JSON.parse(creatures);
  
    let nameFilter = req.query.nameFilter;
  
    if (nameFilter) {
      creatureData = creatureData.filter(function(creature) {
        return creature.name.toLowerCase() === nameFilter.toLowerCase();
      });
    }
  
    res.render('prehistoric_creatures/index', {myCreatures: creatureData});
});

router.get('/new', function(req, res){
    res.render('prehistoric_creatures/new');
});

router.get('/:idx', function(req, res) {
    // get dinosaurs
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    let creatureData = JSON.parse(creatures);
  
    //get array index from url parameter
    let creaturesIndex = parseInt(req.params.idx);
  
    //render page with data of the specified animal
    res.render('prehistoric_creatures/show', {myCreature: creatureData[creaturesIndex]});
});

router.post('/', function(req, res) {
    // read dinosaurs file
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    creatures = JSON.parse(creatures);
  
    // add item to dinosaurs array
    creatures.push(req.body);
  
    // save dinosaurs to the data.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatures));
  
    //redirect to the GET /dinosaurs route (index)
    res.redirect('/prehistoric_creatures');
  });
  

router.get('/edit/:idx', function(req, res){
      let creatures = fs.readFileSync('./prehistoric_creatures.json');
      let creatureData = JSON.parse(creatures);
      res.render('prehistoric_creatures/edit', {creature: creatureData[req.params.idx], creatureId: req.params.idx});
    });
  
router.put('/:idx', function(req, res){
      let creatures = fs.readFileSync('./prehistoric_creatures.json');
      let creatureData = JSON.parse(creatures);
    
      //re-assign the name and type fields of the dinosaur to be editted
      creatureData[req.params.idx].img_url = req.body.img_url;
      creatureData[req.params.idx].type = req.body.type;
    
       // save the editted dinosaurs to the data.json file
      fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));
      res.redirect('/prehistoric_creatures');
    });

router.delete('/:idx', function(req, res){
      let creatures = fs.readFileSync('./prehistoric_creatures.json');
      let creatureData = JSON.parse(creatures);
    
      // remove the deleted dinosaur from the dinosaurs array
      creatureData.splice(req.params.idx, 1)
    
      // save the new dinosaurs to the data.json file
      fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));
    
      //redirect to the GET /dinosaurs route (index)
      res.redirect('/prehistoric_creatures');
    });

module.exports = router;