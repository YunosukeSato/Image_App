import { useEffect, useState } from "react";
import ImageDisplay from "../../ImageDisplay/ImageDisplay";

type image = {
  filename: string;
  data: string;
};

function ImageUploadForm() {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [images, setImages] = useState<image[]>([]);

  // Set the selected file to the selectedFile state when a file is selected in the input field
  // const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setSelectedFile(e.target.files[0]);
  //   }
  // };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/get_images")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error(error));
  });

  const handleSelect = (image: image) => {
    console.log(image);
    setImageSrc(`data:image/jpg;base64,${image.data}`);
  };

  return (
    <>
      <div className="container">
        <ImageDisplay imageUrl={imageSrc} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/* <input type="file" accept="image/*" onChange={handleFileInput} />
          <button disabled={!selectedFile || loading} onClick={handleUpload}>
            Upload
          </button> */}
          {images.map((image, index) => (
            <button key={index} onClick={() => handleSelect(image)}>
              {image.filename}
            </button>
          ))}
        </div>
      </div>
    </>
  );


  // Put previous code below for the reference

  // Send the image file to the API
  // const handleUpload = async () => {
  //   try {
  //     setLoading(true);
  //     const formData = new FormData();
  //     if (selectedFile) {
  //       formData.append("file", selectedFile);
  //     }
  //     const response = await axios.post(
  //       "http://127.0.0.1:8000/upload_image/",
  //       formData,
  //       { responseType: "arraybuffer" } // Determine the response type to get binary data
  //     );
  //     // Convert the response into image url and set it to the imageSrc state
  //     const base64Img = btoa(
  //       new Uint8Array(response.data).reduce(
  //         (data, byte) => data + String.fromCharCode(byte),
  //         ""
  //       )
  //     );
  //     setImageSrc(`data:image/png;base64,${base64Img}`);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
}

export default ImageUploadForm;
