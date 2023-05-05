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
      await Prisma.producto.update({
        where:{
          id: data.productoId
        },
        data:{
          stock:{
            decrement: data.cantidad
          }
        }
      })
  
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

export const pedidos = async (req, res)  => {

  
  //async function Pedidos(userId, pedidoData, detallePedidosData) {
    // Create a new Pedido record
    const pedido = await Prisma.pedido.create({
        data: {
            usuarioId: userId,
            ...pedidoData,
        },
    })

    // Create DetallePedido records and associate them with the new Pedido record
    const detallePedidos = await Promise.all(
      detallePedidos.map(async (detalle_pedidos) => {
            const productoId = detalle_pedidos.productoId
            const producto = await Prisma.producto.findUnique({ where: { id: productoId } })

            return Prisma.detalle_pedidos.create({
                data: {
                    pedidoId: pedido.id,
                    productoId,
                    cantidad: detalle_pedidos.cantidad,
                    precio: producto.precio,
                },
            })
        })
    )

    // Calculate and update the Pedido total based on the DetallePedido records
    const subtotal = detallePedidos.reduce((acc, detalle_pedidos) => {
        return acc + detalle_pedidos.cantidad * detalle_pedidos.precio
    }, 0)
    const impuestos = subtotal * 0.18 // 18% taxes
    const total = subtotal + impuestos - (pedido.descuento || 0)
    await Prisma.pedido.update({
        where: { id: pedido.id },
        data: { subtotal, impuestos, total },
    })

    return pedido
}