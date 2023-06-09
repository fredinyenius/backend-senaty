import { Prisma } from "../prisma.js";

export const crearCategoria = async (req, res) => {
  const data = req.body;

  try {
    const nuevoProducto = await Prisma.categoria.create({ data });

    return res.status(201).json({
      content: nuevoProducto,
      message: "Producto creado exitosamente",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear el producto",
      content: error.message,
    });
  }
};