import { Prisma } from "../prisma.js";

export const crearCategoria = async (req, res) => {
  const data = req.body;

  try {
    const nuevaCategoria = await Prisma.categoria.create({ data });

    return res.status(201).json({
      content: nuevaCategoria,
      message: "Categoria creado exitosamente",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear el Categoria",
      content: error.message,
    });
  }
};

export const listarCategoria = async (req, res) => {
  // agregarlo
  const categorias = await Prisma.categoria.findMany();
  res.json(categorias);

}

export const devolverCategoria = async (req, res) => {

  const { id } = req.params;

  const categoriaEncontrado = await Prisma.categoria.findFirst({

      where: { id: +id },
    //  include: { categoria: true },
  });

  if (!categoriaEncontrado) {
      return res.status(400).json({
          message: "Categoria no existe",
      });
  }

  return res.json({
      content: categoriaEncontrado,
  });

};

export const eliminarCategoria = async (req, res) => {
    const { id } = req.params;
  
    const categoria = await Prisma.categoria.findFirst({
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
  
    const categoriaEliminada = await Prisma.categoria.delete({
      where: { id: +id },
    });
  
    return res.json({
      message: "Producto eliminada exitosamente",
      content: categoriaEliminada,
    });
  };