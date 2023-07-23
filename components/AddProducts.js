import React, { useEffect, useState } from "react";
import Edit from "./icons/Edit";
import Delete from "./icons/Delete";
import Link from "next/link";
import Spinner from "./Spinner";
import axios from "axios";

const AddProducts = () => {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
      setLoaded(false);
    });
  }, []);

  return (
    <div>
      <Link href="/products" className="primary-absolute">
        Add product
      </Link>
      <div className="flex justify-around flex-col">
        <table className="basic my-10 mx-96">
          <thead>
            <tr>
              <td colSpan={2}>Products</td>
            </tr>
          </thead>
          <tbody>
            {loaded && (
              <tr>
                <td colSpan={2}>
                  <div className="p-4">
                    <Spinner fullWidth={true}></Spinner>
                  </div>
                </td>
              </tr>
            )}

            {products.map((product) => (
              <tr key={product.title}>
                <td className="py-2 pl-16 whitespace-nowrap  ">
                  {product.title}
                </td>

                <td className="flex gap-3  absolute left-96">
                  <Link href={"/products/edit/" + product._id} className="edit">
                    <Edit /> Edit
                  </Link>
                  <Link
                    className="delete"
                    href={"/products/delete/" + product._id}
                  >
                    <Delete /> Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddProducts;
