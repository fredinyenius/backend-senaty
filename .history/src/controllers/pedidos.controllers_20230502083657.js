import { Prisma } from "../prisma.js";

export const crearPedido = async (req, res) => {
    const data = req.body;
  
    try {
      const nuevoPedido = await Prisma.pedidos.create({ data });
  
      return res.status(201).json({
        content: nuevoPedido,
        message: "Producto creado exitosamente",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Error al crear el producto",
        content: error.message,
      });
    }
  };