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

export const crearDetallePedido = async (req, res) => {
    const data = req.body;
    console.log("data",data)
    try {
      const nuevoDetallePedido = await Prisma.detallePedido.create({ data });
      const producto = await Prisma.producto.findUnique({
        where:{
          id: data.productoId
        }
      })
      console.log("producto",producto)
  
      return res.status(201).json({
        content: nuevoDetallePedido,
        message: "DetallePedido creado exitosamente",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Error al crear el pedido",
        content: error.message,
      });
    }
  };

 