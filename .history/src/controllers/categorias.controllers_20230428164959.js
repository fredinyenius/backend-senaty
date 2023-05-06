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

export const eliminarCategoria = async (req, res) => {
    const { id } = req.params;
  
    const categoria = await Prisma.producto.findFirst({
      where: {
        id: +id,
      },
      select: {
        id: true,
      },
    });
  
    if (!categoria) {
      return res.status(400).json({
        message: "El producto no existe",
      });
    }
  
    const categoriaEliminada = await Prisma.producto.delete({
      where: { id: +id },
    });
  
    return res.json({
      message: "Producto eliminada exitosamente",
      content: categoriaEliminada,
    });
  };