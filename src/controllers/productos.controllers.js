import { Prisma } from "../prisma.js";

export const crearProducto = async (req, res) => {
  const data = req.body;

  try {
    const nuevoProducto = await Prisma.producto.create({ data });

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


export const listarProductos = async (req, res) => {
  // agregarlo
  const productos = await Prisma.producto.findMany();
  res.json(productos);

}



export const DevolverProducto = async (req, res) => {

  const { id } = req.params;

  const productoEncontrado = await Prisma.producto.findFirst({

      where: { id: +id },
    //  include: { categoria: true },
  });

  if (!productoEncontrado) {
      return res.status(400).json({
          message: "Producto no existe",
      });
  }

  return res.json({
      content: productoEncontrado,
  });

};




export const actualizarProducto = async (req, res) => {

  const { id } = req.params;
  const productos = await Prisma.producto.findUnique({ where: { id: parseInt(id) } });

  if (!productos) {
      return res.status(404).json({ error: "Producto no encontrado" });
  }
  const { categoriaId, ...rest } = req.body;

  const actualizarProductos = await Prisma.producto.update({
      where: { id: parseInt(id) },
      data: {
          ...rest,
          categoria: { connect: { id: parseInt(categoriaId) } },
          
      },
  });
  res.json(actualizarProductos);

}


export const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  const producto = await Prisma.producto.findFirst({
    where: {
      id: +id,
    },
    select: {
      id: true,
    },
  });

  if (!producto) {
    return res.status(400).json({
      message: "El producto no existe",
    });
  }

  const productoEliminado = await Prisma.producto.delete({
    where: { id: +id },
  });

  return res.json({
    message: "Producto eliminada exitosamente",
    content: productoEliminado,
  });
};