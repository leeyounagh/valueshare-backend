const { Category } = require("../db/model/index");

const findCategoryList = async () => {
	try {
		const categoryList = await Category.find({});
		return categoryList;
	} catch (err) {
		throw new Error(err);
	}
};

const createCategory = async (categoryNewData) => {
	try {
		const { categoryName } = categoryNewData;
		if (!categoryName) {
			throw new Error("필수 입력 정보를 확인하세요");
		}
		const isExist = await Category.findOne({ categoryName });
		if (isExist) {
			throw new Error("동일한 카테고리가 이미 존재하여 등록할 수 없습니다.");
		}
		const newCategory = await Category.create({
			categoryName,
		});
		return newCategory;
	} catch (err) {
		throw new Error(err);
	}
};

const updateCategory = async (shortId, categoryNewData) => {
	try {
		const { categoryName } = categoryNewData;
		const isExist = await Category.findOne({ categoryName });
		if (isExist) {
			throw new Error("동일한 카테고리가 이미 존재하여 수정할 수 없습니다.");
		}
		const result = await Category.findOneAndUpdate(
			{ shortId },
			{ categoryName },
			{ new: true },
		);
		if (!result) {
			throw new Error("카테고리 정보 업데이트에 오류가 있습니다.");
		}
		return result;
	} catch (err) {
		throw new Error(err);
	}
};

const deleteCategory = async (shortId) => {
	try {
		const result = await Category.findOneAndDelete({ shortId });
		if (!result) {
			throw new Error("카테고리 삭제에 오류가 있습니다.");
		}
		return result;
	} catch (err) {
		throw new Error(err);
	}
};
module.exports = {
	findCategoryList,
	createCategory,
	updateCategory,
	deleteCategory,
};
