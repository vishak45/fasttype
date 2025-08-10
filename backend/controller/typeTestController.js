const Tests = require("../model/testModel");

const getTypes = async (req, res) => {
    try {
        const types = await Tests.find();
        res.status(200).json(types);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const getTypeById = async (req, res) => {
    try {
        const type = await Tests.findById(req.params.id);
        if (!type) {
            return res.status(404).json({ message: "Type not found" });
        }
        res.status(200).json(type);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTypes, getTypeById };