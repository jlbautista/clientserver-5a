const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { Sequelize } = require("sequelize");

// Create user
exports.createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({
            where: { [Sequelize.Op.or]: [{ email }, { username }] },
        });

        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, message: "User already exists" });
        }

        const user = await User.create({ username, email, password, role });
        const userData = user.get({ plain: true });
        delete userData.password;

        res.status(201).json({ success: true, data: userData });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] },
        });
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        await user.update(req.body);
        const updatedUser = user.get({ plain: true });
        delete updatedUser.password;

        res.json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        await user.destroy();
        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
