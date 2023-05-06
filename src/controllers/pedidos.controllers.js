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
  console.log("data", data)
  try {
    const nuevoDetallePedido = await Prisma.detallePedido.create({ data });
    const producto = await Prisma.producto.findUnique({
      where: {
        id: data.productoId
      }
    })
    console.log("producto", producto)
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

export const pedidos = async (req, res) => {


  //async function Pedidos(userId, pedidoData, detallePedidosData) {
  // Create a new Pedido record
  //  const pedidoData = req.body;
  /*
    const pedido = await Prisma.pedido.create({
      data: {
        usuarioId: {},
        ...pedidoData,
  
  
      },
    })
  
    */
  // Create DetallePedido records and associate them with the new Pedido record
  const detallePedidos = await Promise.all(
    detallePedidos.map(async (detalle_pedidos) => {
      const productoId = detalle_pedidos.productoId
      const producto = await Prisma.producto.findUnique({ where: { id: productoId } })

      return Prisma.detalle_pedidos.create({
        data: {
          //  pedidoId: pedido.id,
          productoId,
          cantidad: detalle_pedidos.cantidad,
          precio: producto.precio,
        },
      })
    })
  )

  // Calculate and update the Pedido total based on the DetallePedido records
  /*
   const subtotal = detallePedidos.reduce((acc, detalle_pedidos) => {
     return acc + detalle_pedidos.cantidad * detalle_pedidos.precio
   }, 0)
 
   const total = subtotal
   await Prisma.pedido.update({
     where: { id: pedido.id },
     data: { subtotal, total },
   })
 */
  return pedido
}



//async function guardarPedido(pedido) {
export const guardarPedido = async (req, res) => {

  const nuevoPedido = await Prisma.pedido.create({
    data: {

      cliente: pedidos.usuarioId,
      estado: pedidos.status,
      subtotal: pedidos.subTotal,
      metodo: pedidos.metodoPago,
      descuentos: pedidos.descuento,

      detallePedidos: {
        createMany: {
          data:
          {
            producto: detalle.productoId,
            cantidad: detalle.cantidad,
            precio: detalle.precio,
            total: detalle.precio,

          }
        }
      }
    },
    include: {
      detallePedidos: true,
    }
  });
  return nuevoPedido;
}


async function agregarItemAlCarrito(usuario, item) {
  const carrito = await prisma.carrito.findUnique({
    where: {
      usuario: usuario
    },
    include: {
      items: true
    }
  });

  if (!carrito) {
    const nuevoCarrito = await prisma.carrito.create({
      data: {
        usuario: usuario,
        items: {
          create: [{
            producto: item.producto,
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario
          }]
        }
      },
      include: {
        items: true
      }
    });
    return nuevoCarrito;
  }

  const itemExistente = carrito.items.find((i) => i.producto === item.producto);

  if (itemExistente) {
    const itemActualizado = await prisma.carritoItem.update({
      where: {
        id: itemExistente.id
      },
      data: {
        cantidad: itemExistente.cantidad + item.cantidad
      }
    });
    return carrito;
  }

  const nuevoItem = await prisma.carritoItem.create({
    data: {
      producto: item.producto,
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario,
      carrito: {
        connect: {
          id: carrito.id
        }
      }
    }
  });
  return carrito;
}

async function actualizarItemEnCarrito(usuario, item) {
  const carrito = await prisma.carrito.findUnique({
    where: {
      usuario: usuario
    },
    include: {
      items: true
    }
  });

  const itemExistente = carrito.items.find((i) => i.producto === item.producto);

  if (itemExistente) {
    const itemActualizado = await prisma.carritoItem.update({
      where: {
        id: itemExistente.id
      },
      data: {
        cantidad: item.cantidad
      }
    });
    return carrito;
  }

  throw new Error("El item no se encuentra en el carrito");
}

async function eliminarItemDelCarrito(usuario, producto) {
  const carrito = await prisma.carrito.findUnique({
    where: {
      usuario: usuario
    },
    include: {
      items: true
    }
  });

  const itemExistente = carrito.items.find((i) => i.producto === producto);

  if (itemExistente) {
    const itemEliminado = await prisma.carritoItem.delete({
      where: {
        id: itemExistente.id
      }
    });
    return carrito;
  }

  throw new Error("El item no se encuentra en el carrito");
}

/*
model Carrito {
  id          Int         @id @default(autoincrement())
  usuario     String
  items       CarritoItem[]
}

model CarritoItem {
  id            Int     @id @default(autoincrement())
  producto      String
  cantidad      Int
  precioUnitario Float
  carrito       Carrito @relation(fields: [carritoId], references: [id])
  carritoId     Int
}

*/

export const darPedido = async (req, res) => {

  //async function addOrderDetail(orderId, detail) {
  const pedido = await Prisma.pedido.findUnique({

    where: {
      id: { ...pedido }
    },
    include: {
      detallePedidos: true
    }
  });

  const existeDetalle = pedido.detallePedidos.find((d) => d.productoId === detallePedidos.producto);

  if (existeDetalle) {
    const actualizaDetalle = await Prisma.detallePedidos.update({
      where: {
        id: existeDetalle.id
      },
      data: {
        cantidad: existeDetalle.cantidad + detallePedidos.cantidad
      }
    });
    return actualizaDetalle;
  }

  const nuevoDetalle = await Prisma.detallePedidos.create({
    data: {
      producto: detalle.producto,
      cantidad: detalle.cantidad,
      precio: detalle.precio,
      pedido: {
        connect: {
          id: ordenId
        }
      }
    }
  });
  return nuevoDetalle;
}



export const hacerPedido = async (req, res) => {

  const verpedido = await Prisma.usuario.findMany({

    include: {
      pedido: {
        select: {
          usuario: true,
          status: true,
          metodoPago: true,
          usuarioId: true,
          descuento: true,
        }
      }
    }
  }
  );
  res.json({ verpedido })

}


