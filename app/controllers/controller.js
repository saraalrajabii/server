const User = require("../models/user.model.js");
const Item = require("../models/item.model.js");


//add items to our database 
exports.addItem = (req, res) => {
  // Validate request

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(".......",req.body);   //the object (data) which we get from front end     having id 
  // items send by the front end 
  const item = ({
       category: req.body.category,
      quantity: req.body.quantity,
      description: req.body.description,
      weight: req.body.weight,
      image: req.body.image,
      price: req.body.price
  });

  // Save Customer in the database
  Item.addItem(item, (err, data) => {
    console.log(item)
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Item."
      });
    else res.send(data);
    console.log("data:",data)
  });
};


// Update a items identified by the itemsId in the request
exports.updateitems = (req, res) => {
  // Validate Request
  console.log(req.body)
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
// update the items in our database
  Item.updateById(
    req.params.id,
    new Item(req.body),
    (err, data) => {
      console.log("id", req.params.id)
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

//retrieve all the items in our database
exports.findAll = (req, res) => {
  Item.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};



// Delete a specific item from the database
exports.deleteItem = (req, res) => {
  Item.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Item with id ${req.params.itemId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Item with id " + req.params.itemId
        });
      }
    } else res.send({ message: `Item was deleted successfully!` });
  });
};