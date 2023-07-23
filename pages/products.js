/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Upload from "../components/icons/Upload";
import axios from "axios";
import { useRouter } from "next/router";
import { ReactSortable } from "react-sortablejs";
import Spinner from "../components/Spinner";

const ProductsPage = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
   const router = useRouter();

  async function saveToDatabase(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
    };
      await axios.post("/api/products", data);
        setGoToProducts(true);

    
  }
  useEffect(() => {
    if (goToProducts) {
      router.push("/");
    }
  }, [goToProducts,router]);

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
      <form
        onSubmit={saveToDatabase}
        className="bg-gray-100 flex flex-col   mx-20 mt-10 p-4"
      >
        <h1 className="text-xl mb-4">New product</h1>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label htmlFor="photos">Photos</label>
        <div className=" flex gap-1">
          {isUploading && (
            <div className="h-24 flex items-center ">
              <Spinner />
            </div>
          )}
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
          <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-green-600 rounded-sm bg-white shadow-sm border border-green-600">
            <Upload></Upload>
            <div>Photos</div>

            <input type="file" onChange={uploadImages} className="hidden" />
          </label>
        </div>

        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
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
    </div>
  );
};

export default ProductsPage;
