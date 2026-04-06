import React from 'react';
import LoaderOne from './loader-one';

interface ComponentLoaderProps {
  height?: string;
}

const ComponentLoader: React.FC<ComponentLoaderProps> = ({ height = "280px" }) => {
  return (
    <div 
      className="glass-card rounded-xl flex items-center justify-center"
      style={{ height }}
    >
      <div className="text-center">
        <LoaderOne />
        <p className="mt-6 text-muted-foreground text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default ComponentLoader;
