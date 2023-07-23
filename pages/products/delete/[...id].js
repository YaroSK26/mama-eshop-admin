import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/Header";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  });
  function goBack() {
    router.push("/");
  }
  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goBack();
  }
  return (
    <div>
        <Header></Header>
      <h1 className="text-center">
        Do you really want to delete product &nbsp; &quot;{productInfo?.title}
         &quot;
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="primary-yes" onClick={deleteProduct}>
          Yes
        </button>
        <button className="primary-no" onClick={goBack}>
          No
        </button>
        </div>
    </div>
    
  );
}
