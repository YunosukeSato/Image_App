function ImageDisplay({ imageUrl }: { imageUrl: string }) {
  let displayStyle = "";

  // Check if the image has been selected
  if (imageUrl === "") {
    displayStyle = "none";
  } else {
    displayStyle = "flex";
  }

  return (
    <div
      className="image-container"
      style={{
        width: "100vw",
        height: "100vh",
        display: displayStyle,
      }}
    >
      {
        <img
          src={imageUrl}
          alt="upload image"
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
        />
      }
    </div>
  );
}

export default ImageDisplay;
