import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from './firebase';
import { v4 } from 'uuid';

function Upload() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, 'images/');

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref); // Return the promise
      })
      .then((url) => {
        setImageUrls((prev) => [...prev, url]);
        setImageUpload(null); // Reset image upload state
      })
      .catch((error) => {
        console.error('Upload failed:', error);
      });
  };

  useEffect(() => {
    listAll(imagesListRef)
      .then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item)
            .then((url) => {
              setImageUrls((prev) => [...prev, url]);
            })
            .catch((error) => {
              console.error('Error getting download URL:', error);
            });
        });
      })
      .catch((error) => {
        console.error('Error listing images:', error);
      });
  }, []);

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}>Upload Image</button>
      <div>
        {imageUrls.map((url, index) => {
          return <img key={index} src={url} alt="uploaded" />;
        })}
      </div>
    </div>
  );
}

export default Upload;
