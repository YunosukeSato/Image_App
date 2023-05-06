import { useState } from "react";
import axios from "axios";
import ImageDisplay from "../../ImageDisplay/ImageDisplay";

function ImageUploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  // 選択されたファイルを変数に設定
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // APIにファイルを送信
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
        { responseType: "arraybuffer" } // バイナリデータを取得するためにresponseTypeを指定
      );
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
        <ImageDisplay imageUrl={imageSrc} />
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
