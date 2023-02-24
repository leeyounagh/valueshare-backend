const { Order } = require("../db/model/index");

// 유저 주문 내역 생성
const createOrder = async (orderData, newUser) => {
	try {
		const {
			email,
			name,
			phone,
			shipAdr,
			shipNote,
			products,
			totalPrice,
			shipStatus,
			cancelNote,
		} = orderData;

		products.forEach((i) => {
			i.productBrand = i.productBrand.brandName;
		});

		const newOrder = await Order.create({
			email,
			name,
			phone,
			shipAdr,
			shipNote,
			shipStatus,
			products,
			totalPrice,
			cancelNote,
			userId: newUser,
			orderNumber: newUser.orderNumber,
		});

		return newOrder;
	} catch (err) {
		throw new Error(err);
	}
};

// 유저 주문 완료 후 바로 주문 내역 응답
// 어드민 주문 상세 조회
const findOrderDetail = async (_id) => {
	try {
		const oneOrder = await Order.findById({ _id });
		if (!oneOrder) {
			throw new Error("해당하는 주문 정보가 없습니다.");
		}
		const imageArr = oneOrder.products
			.map((i) => i.productImage)
			.flat(Infinity);
		// 주문 상품 이미지
		// 같이 응답해야함
		// console.log(imageArr);

		return oneOrder;
	} catch (err) {
		throw new Error(err);
	}
};

// 어드민 주문 목록 조회
const findOrderList = async () => {
	try {
		const orderList = await Order.find({}).sort({ createdAt: -1 });
		if (!orderList) {
			throw new Error("주문 목록을 불러올 수 없습니다");
		}
		return orderList;
	} catch (err) {
		throw new Error(err);
	}
};

// 비회원 주문내역 보기 조회
const findOrderDetailForUser = async (_id, body) => {
	try {
		const oneOrder = await Order.findById({ _id });
		if (!oneOrder) {
			throw new Error("해당하는 주문 정보가 없습니다.");
		}
		if (oneOrder.email !== body.eamil) {
			throw new Error("올바른 이메일을 입력해주세요");
		}
		if (oneOrder.orderNumber !== body.orderNumber) {
			throw new Error("올바른 주문번호를 입력해주세요");
		}
		return oneOrder;
	} catch (err) {
		throw new Error(err);
	}
};

// 어드민 주문 내역 수정
const updateOrderDetail = async (_id, newOrderDetail) => {
	try {
		const {
			orderNumber,
			email,
			name,
			phone,
			shipStatus,
			shipAdr,
			shipNote,
			cancelNote,
		} = newOrderDetail;
		const updatedOrderDetail = await Order.findOneAndUpdate(
			{ _id },
			{
				orderNumber,
				email,
				name,
				phone,
				shipStatus,
				shipAdr,
				shipNote,
				cancelNote,
			},
			{ new: true },
		);
		if (!updatedOrderDetail) {
			throw new Error("주문 정보 업데이트에 오류가 있습니다.");
		}
		return updatedOrderDetail;
	} catch (err) {
		throw new Error(err);
	}
};

// 비회원 검증 후 주문 수정
const updateOrderDetailForUser = async (_id, newOrderDetail) => {
	try {
		const { email, name, phone, shipAdr, shipNote, orderNumber } =
			newOrderDetail;
		const accessValid = await Order.findById({ _id });

		if (!accessValid) {
			throw new Error("해당하는 주문 정보가 없습니다.");
		}
		if (accessValid.email !== email) {
			throw new Error("올바른 이메일을 입력해주세요");
		}
		console.log(accessValid);
		console.log(orderNumber);
		if (accessValid.orderNumber !== orderNumber) {
			throw new Error("올바른 주문번호를 입력해주세요");
		}
		console.log(updateInfo);
		const updatedOrderDetail = await Order.findOneAndUpdate(
			{ _id },
			{
				email,
				name,
				phone,
				shipAdr,
				shipNote,
			},
			{ new: true },
		);

		if (!updatedOrderDetail) {
			throw new Error("주문 정보 업데이트에 오류가 있습니다.");
		}

		return updatedOrderDetail;
	} catch (err) {
		throw new Error(err);
	}
};

// 주문 후 즉시 주문 내역 수정
const editOrder = async (_id, body) => {
	try {
		const { email, name, phone, shipAdr, shipNote } = body;
		const targetOrder = await Order.findOneAndUpdate(
			{ _id },
			{
				email,
				name,
				phone,
				shipAdr,
				shipNote,
			},
			{ new: true },
		);
		return targetOrder;
	} catch (err) {
		throw new Error("주문을 수정할 수 없습니다");
	}
};

// 주문 후 즉시 주문 내역 취소
const cancelOrder = async (_id) => {
	try {
		const targetOrder = await Order.findOneAndUpdate(
			{ _id },
			{
				shipStatus: "주문 취소",
			},
			{ new: true },
		);
		console.log(targetOrder);
		return targetOrder;
	} catch (err) {
		throw new Error("주문을 수정할 수 없습니다");
	}
};

// 어드민 주문 취소
const closedOrderDetail = async (_id, body) => {
	try {
		const accessValid = await Order.findById({ _id });

		if (!accessValid) {
			throw new Error("해당하는 주문 정보가 없습니다.");
		}
		const orderClosingResult = await Order.findOneAndUpdate(
			{ _id },
			{
				shipStatus: "주문 취소",
			},
		);
		if (!orderClosingResult) {
			throw new Error("주문 취소에 오류가 있습니다.");
		}
	} catch (err) {
		throw new Error(err);
	}
};

// 비회원 검증 후 주문 취소
const closedOrderDetailForUser = async (_id, body) => {
	try {
		const accessValid = await Order.findById({ _id });

		if (!accessValid) {
			throw new Error("해당하는 주문 정보가 없습니다.");
		}
		if (accessValid.email !== body.email) {
			throw new Error("올바른 이메일을 입력해주세요");
		}
		if (accessValid.orderNumber !== body.orderNumber) {
			throw new Error("올바른 주문번호를 입력해주세요");
		}

		const orderClosingResult = await Order.findOneAndUpdate(
			{ _id },
			{
				shipStatus: "주문 취소",
			},
		);
		if (!orderClosingResult) {
			throw new Error("주문 취소에 오류가 있습니다.");
		}
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = {
	createOrder,
	findOrderList,
	findOrderDetail,
	updateOrderDetail,
	closedOrderDetail,
	findOrderDetailForUser,
	updateOrderDetailForUser,
	closedOrderDetailForUser,
	editOrder,
	cancelOrder,
};
