import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Crop } from 'react-image-crop';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useImageContext } from '../../../contexts/ImageContext';
import Steps from '../../../components/Steps';

const FileDesign = () => {
  const [crop, setCrop] = useState<Crop | undefined>(); // Ensure crop can be undefined
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const { imageId } = useImageContext();
  const [imageUrl, setImageUrl] = useState(''); // Correctly destructure useState

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/images/upload/${imageId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch image');
        }
        const fullImageUrl = `http://localhost:4000${data.imageUrl}`;
        setImageUrl(fullImageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [imageUrl]); // Empty dependency array ensures useEffect runs only once

  const onCropComplete = useCallback((crop: Crop, pixelCrop:any) => {
    makeClientCrop(crop);
  }, []);

  const makeClientCrop = async (crop: Crop) => {
    if (imageUrl && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(imageUrl, crop);
      setCroppedImageUrl(croppedImageUrl);
    }
  };

  const getCroppedImg = async (src: string, crop: Crop) => {
    const image = new Image();
    image.src = src;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width!;
    canvas.height = crop.height!;

    ctx?.drawImage(
      image,
      crop.x! * scaleX,
      crop.y! * scaleY,
      crop.width! * scaleX,
      crop.height! * scaleY,
      0,
      0,
      crop.width!,
      crop.height!
    );

    return new Promise<string>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create blob for cropped image'));
          return;
        }
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };

//   const handleSave = async () => {
//     if (!croppedImageUrl) {
//       alert('Please crop the image before saving');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('croppedImage', croppedImageUrl);

//       await axios.post('http://localhost:4000/design', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       alert('Image saved successfully');
//     } catch (error) {
//       console.error('Error saving image:', error);
//       alert('Failed to save image');
//     }
//   };

  return (
    <div>
      <Steps/>
      {imageUrl && (
        <div className='mt-10'>
          <ReactCrop src={imageUrl}
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={onCropComplete}
          />
          {/* <button onClick={handleSave}>Save Cropped Image</button> */}
        </div>
      )}
    </div>
  );
};

// return(
//   <div>
//       <h2>Image from API</h2>
//       {imageUrl && <img src={imageUrl} alt="Uploaded Image" style={{ maxWidth: '100%' }} />}
//     </div>
// )
// }

export default FileDesign;
