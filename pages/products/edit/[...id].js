
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../../../components/ProductForm";
import Spinner from "../../../components/Spinner";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    setLoaded(true);
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
      setLoaded(false);
    });
  }, [id]);
  return (
    <div>
      {loaded && <Spinner></Spinner>}
      {productInfo && <ProductForm {...productInfo} />}
    </div>
  );
}
