import Products from "../Modules/products.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res) {

    if (!isAdmin(req)) {
        return res.status(403).json({ massage: "Access Denied... Admin Only..." });
    }

    const product = new Products(req.body);

    try {
        const response = await product.save();

        res.json({
            massage: "Product Created Successfully...",
            product: product
        })

    } catch (err) {
        res.json({
            massage: "Failed to Ctreate Product..."
        })
        console.log(err);
        return;
    }

}


export async function getProduct(req, res) {

    try {
        if (isAdmin(req)) {
            const products = await Products.find();
            return res.json(products);
        } else {
            const products = await Products.find({ isAvailible: true });
            return res.json(products);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ massage: "Failed to fetch products..." });
    }

}


export async function deleteProduct(req, res) {

    if (!isAdmin(req)) {
        return res.status(403).json({ massage: "Access Denied... Admin Only..." });
    }

    try {
        const productId = req.params.productId;

        await Products.deleteOne({
            productId: productId
        });

        res.json({
            massage: "Product deleted successfully..."
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ massage: "Failed to delete products..." });
    }
}


export async function updateProduct(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ massage: "Access Denied... Admin Only..." });
    }

    const data = req.body;
    const productId = req.params.productId;
    data.productId = productId;

    try {
        await Products.updateOne(
            {
                productId: productId
            },
            data
        );
        res.json({ massage: "Product updated successfully..." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ massage: "Failed to update products..." });
    }
}


export async function getProductInfo(req, res) {
    try {
        const productId = req.params.productId;
        const product = await Products.findOne({ productId: productId });
        if (product == null) {
            res.status(404).json({ massage: "Product not found..." })
            return;
        }
        if (isAdmin(req)) {
            res.json(product);
        } else {
            if (product.isAvailible) {
                res.json(product);
            } else {
                res.status(404).json({ massage: "Product not availible..." });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ massage: "Failed to fetch products..." });
    }
}



