import { useState } from "react";
import axios from "axios";
import ImageDisplay from "../../ImageDisplay/ImageDisplay";

function ImageUploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  // Set the selected file to the selectedFile state when a file is selected in the input field
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Send the image file to the API
  const handleUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      const response = await axios.post(
        "http://127.0.0.1:8000/upload_image/",
        formData,
        { responseType: "arraybuffer" } // Determine the response type to get binary data
      );
      // Convert the response into image url and set it to the imageSrc state
      const base64Img = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setImageSrc(`data:image/png;base64,${base64Img}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <ImageDisplay imageUrl={imageSrc} loading={loading} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input type="file" accept="image/*" onChange={handleFileInput} />
          <button disabled={!selectedFile || loading} onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </>
  );
}

export default ImageUploadForm;
