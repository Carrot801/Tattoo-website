export async function uploadImage (file,type){
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", type);
    formData.append("title", "Tattoo Image");
    formData.append("description", "Tattoo description");

    try {
      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.error || "Image upload failed");
        return;
      }
      return data.image;
    } catch (err) {
      console.log(err.message);
    }
};