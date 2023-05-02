import { Prisma } from "../prisma.js";

export const crearPedido = async (req, res) => {
    const data = req.body;
  
    try {
      const nuevoPedido = await Prisma.pedido.create({ 
        data: {
        ...data,
        fecha: new Date(data.fecha),
      },
     });
  
      return res.status(201).json({
        content: nuevoPedido,
        message: "Pedido creado exitosamente",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Error al crear el pedido",
        content: error.message,
      });
    }
  };