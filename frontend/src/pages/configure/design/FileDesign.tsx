import  { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Crop } from 'react-image-crop';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useImageContext } from '../../../contexts/ImageContext';
import Steps from '../../../components/Steps';
import iphoneImage from '/phone-template.png'; // Adjust the path as per your project structure

const FileDesign = () => {
  const [crop, setCrop] = useState<Crop>({ aspect: 1024 / 1024 }); // Maintain aspect ratio
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const { imageId } = useImageContext();
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/images/upload/${imageId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        const data = await response.json();
        const fullImageUrl = `http://localhost:4000${data.imageUrl}`;
        setImageUrl(fullImageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
    fetchImage();
  }, [imageId]);

  const onCropComplete = useCallback((croppedArea: Crop) => {
    makeClientCrop(croppedArea);
  }, []);

  const makeClientCrop = async (croppedArea: Crop) => {
    try {
      if (imageUrl) {
        const croppedImageUrl = await getCroppedImg(imageUrl, croppedArea);
        setCroppedImageUrl(croppedImageUrl);
      }
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  const getCroppedImg = async (src: string, crop: Crop): Promise<string> => {
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

  const handleSave = async () => {
    if (!croppedImageUrl) {
      alert('Please crop the image before saving');
      return;
    }

    try {
      // Example: Save cropped image using axios post request
      const formData = new FormData();
      formData.append('croppedImage', croppedImageUrl);

      await axios.post('http://localhost:4000/save-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Image saved successfully');
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image');
    }
  };

  return (
    <div>
      <Steps />
      {imageUrl && (
        <div>
          <div style={{ position: 'relative', width: '375px', height: '812px' }}> {/* iPhone dimensions */}
            <ReactCrop
              src={imageUrl}
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={onCropComplete}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
            <img
              src={iphoneImage}
              alt='iPhone'
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            />
          </div>
          <button onClick={handleSave}>Save Cropped Image</button>
        </div>
      )}
    </div>
  );
};

export default FileDesign;
