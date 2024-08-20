import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const products = await Product.find();
      return response.status(200).json(products);
    } catch (error) {
      return response.status(500).json({ error: "Failed to fetch products" });
    }
  } else if (request.method === "POST") {
    try {
      const productData = request.body;
      await Product.create(productData);
      return response.status(201).json({ status: "Product created." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  } else {
    response.setHeader("Allow", ["GET", "POST"]);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}