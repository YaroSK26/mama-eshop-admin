/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Header from "./Header";
import Upload from "./icons/Upload";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";


const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) => {
  const [productInfo, setProductInfo] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [goToProducts, setGoToProducts] = useState(false);
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
    const [isUploading, setIsUploading] = useState(false);

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
      setTitle(response.data.title || "");
      setDescription(response.data.description || "");
      setPrice(response.data.price || "");
      setLoaded(false);
    });
  }, [id]);

  async function saveToDatabaseEdit(ev) {
    ev.preventDefault();

    const data = {
      title,
      description,
      price,
      images,
    };
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/");
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }
  function updateImagesOrder(images) {
    setImages(images);
  }


  
      function handlePriceChange(ev) {
        const inputPrice = ev.target.value;

        const numericRegex = /^\d*\.?\d*$/;
        if (numericRegex.test(inputPrice)) {
          setPrice(inputPrice);
        }
      }


  return (
    <div>
      <Header></Header>
      {loaded && <Spinner></Spinner>}
      {productInfo && (
        <form
          onSubmit={saveToDatabaseEdit}
          className="bg-gray-100 flex flex-col   mx-20 mt-10 p-4"
        >
          <h1 className="text-xl mb-4">Edit product</h1>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={title}
            placeholder="Name"
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <label htmlFor="photos">Photos</label>
          <div className="flex ">
            <ReactSortable
              list={images}
              className="flex flex-wrap gap-1"
              setList={updateImagesOrder}
            >
              {!!images?.length &&
                images.map((link) => (
                  <div
                    key={link}
                    className=" bg-white p-4 shadow-sm rounded-sm border border-gray-200 mr-1"
                  >
                    <img src={link} alt="" className="w-16 h-16 " />
                  </div>
                ))}
            </ReactSortable>
            {isUploading && (
              <div className="h-24 flex items-center">
                <Spinner />
              </div>
            )}
            <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-green-600 rounded-sm bg-white shadow-sm border border-green-600">
              <Upload></Upload>
              <div>Add image</div>

              <input type="file" onChange={uploadImages} className="hidden" />
            </label>
          </div>

          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="Description"
          />
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={handlePriceChange}
            placeholder="Price (in EUR)"
          />
          <button className="primary">Save</button>
        </form>
      )}
    </div>
  );
};

export default ProductForm;
