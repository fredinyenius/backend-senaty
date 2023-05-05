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
