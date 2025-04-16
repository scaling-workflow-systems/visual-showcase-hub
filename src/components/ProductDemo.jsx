
import { useState } from 'react';
import { Image as ImageIcon, Video, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const ProductDemo = () => {
  const [mediaType, setMediaType] = useState('image');
  const [isPlaying, setIsPlaying] = useState(false);

  // Example media URLs - replace these with your actual content
  const demoImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";
  const demoVideo = "https://www.w3schools.com/html/mov_bbb.mp4";

  // Handle video play/pause
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    
    // Get the video element and control it
    const videoElement = document.querySelector('video');
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex gap-4">
          <Button
            variant={mediaType === 'image' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setMediaType('image')}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Image
          </Button>
          <Button
            variant={mediaType === 'video' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setMediaType('video')}
          >
            <Video className="w-4 h-4 mr-2" />
            Video
          </Button>
        </div>
        {mediaType === 'video' && (
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlayback}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 mr-2" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
        )}
      </div>
      <div className="aspect-video bg-gray-900/30">
        {mediaType === 'image' ? (
          <AspectRatio ratio={16 / 9}>
            <img
              src={demoImage}
              alt="Product demo"
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        ) : (
          <AspectRatio ratio={16 / 9}>
            <video
              src={demoVideo}
              className="w-full h-full object-cover"
              controls={true}
              autoPlay={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </AspectRatio>
        )}
      </div>
    </div>
  );
};

export default ProductDemo;
