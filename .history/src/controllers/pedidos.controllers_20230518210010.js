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
    // const detallePedido = await Prisma.detallePedido.findUnique({
    //  where:{
    //    id: data.detallePedidoId
    //  }
    //});
    //console.log(detallePedido);
    //
    //await Prisma.detallePedido.update({
    //  where:{
    //    id: data.detallePedidoId
    //  },
    //  data:{
    //    subTotal:20
    //  }
    //})


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

  try {
    const producto = await Prisma.producto.findUnique({
      where: {
        id: data.productoId
      }
    });
    console.log("producto", producto)
    const nuevoDetallePedido = await Prisma.detallePedido.create({
      data:
      {
        ...data,
        total: data.cantidad * producto.precio,
        precio: 0,
      }
    });
    console.log("data", data);


    await Prisma.producto.update({
      where: {
        id: data.productoId
      },
      data: {
        stock: {
          decrement: data.cantidad
        }
      }
    })
    console.log("nuevoDetallePedido", nuevoDetallePedido);
    await Prisma.pedido.update({
      where: {
        id: data.pedidoId
      },
      data: {
        subTotal: {
          increment: nuevoDetallePedido.total,
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
export const listarPedido = async (req, res) => {
  // agregarlo
  const pedidos = await Prisma.pedido.findMany();
  //res.json(productos);
  return res.json({
    data: pedidos,
  });

};