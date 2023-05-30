//const Chaiwala = require("../Model/items.json");
//const { route } = require('../Route');

// exports.getchaiwala = (req, res) => {
//   //Chaiwala.find()
//     // response => {
//       res
//         .status(200)
//         .json({ message: "SUceesfully fetched details", detail: Chaiwala });
// };

const Items = require("../Model/items");
const Users = require("../Model/users");
const { param } = require("../Route");

exports.getchaiwala = (req, res) => {
  try {
    Items.find()
      .then((response) => {
        res.status(200).send({ details: response });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(401).send(error);
  }
};

exports.postitems = async (req, res) => {
  try {
    console.log(req.body);
    const { id, name, description, qty, price } = req.body;

    const email = req.user.email;
    //const email = 'pramodmukane@gmail.com'
    console.log("You are here1");
    console.log(email);

    let findemail = await Users.findOne({ email: email });
    console.log("You are here2");
    console.log(findemail);

    let insertitems = await new Items({
      userId: findemail._id,
      id: id,
      name: name,
      description: description,
      qty: qty,
      price: price,
    });

    insertitems.save();

    console.log(insertitems);
    res.status(200).send({ insertitems });
  } catch (error) {
    res.status(401).send({ message: "error found", details: error.message });
  }
};

exports.deleteitems = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  Items.deleteOne({ _id: id })
    .then((response) =>
      res
        .status(200)
        .json({ message: "Suceesfully Deleted", details: response })
    )
    .catch((error) => res.send(error));
  //let index = await Items.findIndex(item => item.id === req.query.id);

  //let data1 = Items.findIndex( ch => ch.id == details.id );

  //Items.splice(data,1);

  // console.log(details);
  // res.send(details);
  // }
  // catch (error) {
  //   res.status(401).send({ message: "Error found", details: error.message });
  // }
};

exports.getItemdetails = async (req, res) => {
  console.log(req.params._id);
  const { _id } = req.params;

  let details = await Items.findById({ _id: _id });
  console.log(details);
  res.send(details);
};

exports.putdetails = async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);

    const { _id } = req.params;

    //let details = await Items.findById({ _id: _id });

    let updateit = await Items.updateOne(
      { _id:_id },
      { $set: req.body }
    );

    console.log(updateit);

    res.send(updateit);
  } catch (error) {console.log(error)}
};
