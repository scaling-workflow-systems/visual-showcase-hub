
import React, { useState } from 'react';
import { Image as ImageIcon, Video, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProductDemo = () => {
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [isPlaying, setIsPlaying] = useState(false);

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
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <Play className="w-4 h-4 mr-2" />
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
        )}
      </div>
      <div className="aspect-video bg-gray-900/30 flex items-center justify-center">
        <p className="text-gray-400">Drop your {mediaType} here or click to upload</p>
      </div>
    </div>
  );
};

export default ProductDemo;
