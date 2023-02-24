const brandSrvc = require("../services/brandSrvc");

const getBrandList = async (req, res, next) => {
	try {
		const brandList = await brandSrvc.findBrandList();
		res.json({ result: brandList });
	} catch (err) {
		next(err);
	}
};

const addBrand = async (req, res, next) => {
	try {
		const brandNewData = req.body;
		const newBrand = await brandSrvc.createBrand(brandNewData);
		res.json({ result: newBrand });
	} catch (err) {
		next(err);
	}
};

const editBrand = async (req, res, next) => {
	try {
		const { brandName } = req.params;
		const brandNewData = req.body;
		const editedBrand = await brandSrvc.updateBrand(brandName, brandNewData);
		res.json({ result: editedBrand });
	} catch (err) {
		next(err);
	}
};
const removeBrand = async (req, res, next) => {
	try {
		const { brandName } = req.params;
		await brandSrvc.deleteBrand(brandName);
		res.json({ message: "브랜드 삭제가 완료되었습니다." });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getBrandList,
	addBrand,
	editBrand,
	removeBrand,
};
