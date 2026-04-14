import { createProduct, getAllProducts, getProductById, updateProduct } from "../services/productService.js";
import type { Request, Response } from "express";

export const createProductHandler = async (req: Request, res: Response) => {
    const { name, description, price } = req.body;

    const product = await createProduct(name, description, price);

    res.json(product);
};

export const getProductsHandler = async (req: Request, res: Response) => {
    const products = await getAllProducts();
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