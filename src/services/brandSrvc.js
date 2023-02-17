const { Brand } = require("../db/model/index");

const findBrandList = async () => {
	try {
		const brandList = await Brand.find({});
		return brandList;
	} catch (err) {
		throw new Error(err);
	}
};

const createBrand = async (brandNewData) => {
	try {
		const { brandName } = brandNewData;
		if (!brandName) {
			throw new Error("필수 입력 정보를 확인하세요");
		}
		const isExist = await Brand.findOne({ brandName });
		if (isExist) {
			throw new Error("동일한 브랜드가 이미 존재합니다.");
		}
		const newBrand = await Brand.create({
			brandName,
		});
		return newBrand;
	} catch (err) {
		throw new Error(err);
	}
};

const updateBrand = async (shortId, brandNewData) => {
	try {
		const { brandName } = brandNewData;
		const result = await Brand.findOneAndUpdate(
			{ shortId },
			{ brandName },
			{ new: true },
		);
		if (!result) {
			throw new Error("브랜드 정보 업데이트에 오류가 있습니다.");
		}
		return result;
	} catch (err) {
		throw new Error(err);
	}
};

const deleteBrand = async (shortId) => {
	try {
		const result = await Brand.findOneAndDelete({ shortId });
		if (!result) {
			throw new Error("브랜드 삭제에 오류가 있습니다.");
		}
		return result;
	} catch (err) {
		throw new Error(err);
	}
};
module.exports = {
	findBrandList,
	createBrand,
	updateBrand,
	deleteBrand,
};
