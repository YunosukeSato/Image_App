function ImageDisplay({
  imageUrl,
}: // loading,
{
  imageUrl: string;
  // loading: boolean;
}) {
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
      {/* {loading && (
        <div
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <p style={{ paddingTop: "20%" }}>Loading...</p>
        </div>
      )} */}
    </div>
  );
}

export default ImageDisplay;
