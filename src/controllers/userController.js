import User from "../models/User.js";

// GET /api/users - Obtener todos los usuarios y filtrar
const getAllUsers = async (req, res, next) => {
    try {
        const { search } = req.query;

        const filters = {};

        // Buscar por nombre o correo
        if (search) {
            filters.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ];
        }

        const users = await User.find(filters)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (error) {
        next(error);
    }
};


// GET /api/users/:id - Obtener usuario por ID
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        next(error);
    }
};


// POST /api/users - Crear usuario
const createUser = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            success: true,
            message: "Usuario creado correctamente",
            data: newUser
        });

    } catch (error) {
        next(error);
    }
};


// PUT /api/users/:id - Actualizar usuario
const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            message: "Usuario actualizado correctamente",
            data: updatedUser
        });

    } catch (error) {
        next(error);
    }
};


// DELETE /api/users/:id - Eliminar usuario
const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            message: "Usuario eliminado correctamente",
            data: deletedUser
        });

    } catch (error) {
        next(error);
    }
};


export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
