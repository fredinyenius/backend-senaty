model Order {
id Int @id @default(autoincrement())
date DateTime
customer String
details OrderDetail[]
}

model OrderDetail {
id Int @id @default(autoincrement())
order Order @relation(fields: [orderId], references: [id])
orderId Int
product String
quantity Int
unitPrice Float
}

async function addOrderDetail(orderId, detail) {
const order = await prisma.order.findUnique({
where: {
id: orderId
},
include: {
details: true
}
});

const existingDetail = order.details.find((d) => d.product === detail.product);

if (existingDetail) {
const updatedDetail = await prisma.orderDetail.update({
where: {
id: existingDetail.id
},
data: {
quantity: existingDetail.quantity + detail.quantity
}
});
return order;
}

const newDetail = await prisma.orderDetail.create({
data: {
product: detail.product,
quantity: detail.quantity,
unitPrice: detail.unitPrice,
order: {
connect: {
id: orderId
}
}
}
});
return order;
}

async function updateOrderDetail(detailId, quantity) {
const detail = await prisma.orderDetail.findUnique({
where: {
id: detailId
},
include: {
order: true
}
});

const updatedDetail = await prisma.orderDetail.update({
where: {
id: detailId
},
data: {
quantity: quantity
}
});
return detail.order;
}

async function deleteOrderDetail(detailId) {
const detail = await prisma.orderDetail.findUnique({
where: {
id: detailId
},
include: {
order: true
}
});

const deletedDetail = await prisma.orderDetail.delete({
where: {
id: detailId
}
});
return detail.order;
}

app.post("/orders", async (req, res) => {
try {
const date = new Date();
const customer = req.body.customer;
const newOrder = await prisma.order.create({
data: {
date: date,
customer: customer
}
});
res.json(newOrder);
} catch (error) {
res.status(500).json({ error: error.message });
}
});

app.post("/orders/:id/details", async (req, res) => {
try {
const orderId = parseInt(req.params.id);
const detail = req.body;
const order = await addOrderDetail(orderId, detail);
res.json(order);
} catch (error) {
res.status(500).json({ error: error.message });
}
});

app.patch("/details/:id", async (req, res) => {
try {
const

const productWithTagsCreated = await prisma.product.create({
data: {
name: 'Macbook Pro 2020 16 Inch',
slug: 'macbook-pro-2020-16-inch',
isAvailable: true,
price: 2799,
extras: {
storage: '512GB',
memory: '16GB',
hasThunderbolt: true,
osVersion: 11.2,
},
visibility: 'FEATURED',
pictures: {
'picture_one.png': 'picture_one_storage_path',
'picture_two.png': 'picture_two_storage_path',
},
categoryId: 1,
productTags: {
createMany: {
data: [{ tagId: 1 }, { tagId: 2 }],
},
},
},
include: {
productTags: true, // include product tags in the object returned
category: true, // also include category
},
});

console.log(productWithTagsCreated);
}

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
// const pedidoData = req.body;
/\*
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
/_
const subtotal = detallePedidos.reduce((acc, detalle_pedidos) => {
return acc + detalle_pedidos.cantidad _ detalle_pedidos.precio
}, 0)

const total = subtotal
await Prisma.pedido.update({
where: { id: pedido.id },
data: { subtotal, total },
})
\*/
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

/\*
model Carrito {
id Int @id @default(autoincrement())
usuario String
items CarritoItem[]
}

model CarritoItem {
id Int @id @default(autoincrement())
producto String
cantidad Int
precioUnitario Float
carrito Carrito @relation(fields: [carritoId], references: [id])
carritoId Int
}

\*/

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
        where:{
          id: data.productoId
      }
      });
      console.log("producto", producto)
      const nuevoDetallePedido = await Prisma.detallePedido.create({ data:
      {
        ...data,
        total: data.cantidad * producto.precio,
        precio: 0,
      }
      });
       console.log("data", data);


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
      console.log("nuevoDetallePedido", nuevoDetallePedido);
     await Prisma.pedido.update({
        where: {
          id:data.pedidoId
        },
        data:{
          subTotal:{
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
