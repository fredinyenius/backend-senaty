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

export const reporteProductosMasVendidos = async (req, res) => {
  //format yyyy-mm-dd
  const parseDate = (dateString = "") => {
    const [year, month, day] = dateString.split('-')
    return new Date(year, month - 1, day)
  }
  const stringifyRawQuery = (jsonObject) => {
    return JSON.stringify(jsonObject, (key, value) => {
      if (typeof value === 'bigint') {
        return Number(value)
      }
    })
  }
  try {
    const startDate = parseDate(req.query.startDate)
    const endDate = parseDate(req.query.endDate)
    const result = await Prisma.$queryRaw`
      SELECT po.id, po.nombre, SUM(dp.cantidad)::integer AS sumCantidad
      FROM pedidos p
      INNER JOIN detalle_pedidos dp ON p.id = dp.pedido_id
      INNER JOIN productos po ON po.id = dp.producto_id
      WHERE p.status = 'vendido' AND (p.fecha >= ${startDate} AND p.fecha < ${endDate})
      GROUP BY (po.id, po.nombre);
    `
    return res.json({
      data: result
    })
  } catch (error) {
    return res.status(400).json({
      message: "Error al obtener reporte",
      content: error.message,
    });
  }

}