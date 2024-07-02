import { useState } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import { Image, Loader2, MousePointerSquareDashed } from 'lucide-react';
import { useToast } from '../../../components/ui/use-toast';
import { cn } from '../../../lib/utils';
import { Progress } from '../../../components/ui/progress';

const Page = () => {
  const { toast } = useToast();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);
    toast({
      title: `${file.file.type} type is not supported.`,
      description: 'Please choose a PNG, JPG, or JPEG image instead.',
      variant: 'destructive',
    });
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    setIsUploading(true);
    setIsDragOver(false);

    // Simulating upload progress
    setTimeout(() => {
      setIsUploading(false);
      setUploadProgress(0);
      handleUpload(acceptedFiles);
    }, 1000);
  };

  const handleUpload = async (files: File[]) => {
    const formData = new FormData();
    formData.append('image', files[0]); // Assuming only one file is uploaded

    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      // Handle successful upload
      toast({
        title: 'Image uploaded successfully!',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Failed to upload image',
        description: 'Please try again later.',
        variant: 'error',
      });
    }
  };

  return (
    <div
      className={cn(
        'relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center',
        {
          'ring-blue-900/25 bg-blue-900/10': isDragOver,
        }
      )}
    >
      <div className='relative flex flex-1 flex-col items-center justify-center w-full'>
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg', '.jpg'],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className='h-full w-full flex-1 flex flex-col items-center justify-center'
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className='h-6 w-6 text-zinc-500 mb-2' />
              ) : isUploading ? (
                <Loader2 className='animate-spin h-6 w-6 text-zinc-500 mb-2' />
              ) : (
                <Image className='h-6 w-6 text-zinc-500 mb-2' />
              )}
              <div className='flex flex-col justify-center mb-2 text-sm text-zinc-700'>
                {isUploading ? (
                  <div className='flex flex-col items-center'>
                    <p>Uploading...</p>
                    <Progress value={uploadProgress} className='mt-2 w-40 h-2 bg-gray-300' />
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className='font-semibold'>Drop file</span> to upload
                  </p>
                ) : (
                  <p>
                    <span className='font-semibold'>Click to upload</span> or drag and drop
                  </p>
                )}
              </div>
              {!isUploading && (
                <p className='text-xs text-zinc-500'>PNG, JPG, JPEG</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default Page;
