import { createProduct, getAllProducts, getProductById, updateProduct } from "../services/productService.js";
import type { Request, Response } from "express";

export const createProductHandler = async (req: Request, res: Response) => {
    const { name, description, price } = req.body;

    const product = await createProduct(name, description, price);

    res.json(product);
};

export const getProductsHandler = async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
    const maxPrice = req.query.minPrice ? Number(req.query.maxPrice) : undefined;

    const offset = (page - 1) * limit;

    const products = await getAllProducts(limit, offset, minPrice, maxPrice);

    res.json(products);
};

export const getProductHandler = async (req: Request, res: Response) => {
    const product = await getProductById(Number(req.params.id));
    res.json(product);
};

export const updateProductHandler = async (req: Request, res: Response) => {
    const {name, description, price } = req.body;

    const product = await updateProduct(
        Number(req.params.id),
        name,
        description, 
        price
    );

    res.json(product);
}