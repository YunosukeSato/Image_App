import { useState } from "react";

function ImageDisplay({ imageUrl }: { imageUrl: string }) {
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = e.currentTarget;
    setImageSize({ width: img.width, height: img.height });
  };

  let displayStyle = "";

  if (imageUrl === "") {
    displayStyle = "none";
  } else {
    displayStyle = "flex";
  }

  return (
    <div
      className="image-container"
      style={{
        width: imageSize ? imageSize.width : undefined,
        height: imageSize ? imageSize.height : undefined,
        display: displayStyle,
      }}
    >
      <img src={imageUrl} alt="upload image" onLoad={handleImageLoad} />
    </div>
  );
}

export default ImageDisplay;
