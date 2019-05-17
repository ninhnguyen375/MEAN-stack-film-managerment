const Manufacturers = require('../../models/Manufacturer.model');

module.exports.getManufacturers = async (req, res) => {
  const manufacturers = await Manufacturers.find();
  res.json(manufacturers);
};

module.exports.getManufacturer = async (req, res) => {
  const { id } = req.params;
  try {
    const manufacturer = await Manufacturers.findById(id);
    if (!manufacturer) {
      res.status(404);
      return res.send({ err: 'This manufacturer Does Not Exist' });
    } else {
      res.status(200);
      return res.send({ manufacturer });
    }
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.send('Some thing wrong, please try again.');
  }
};
