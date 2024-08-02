import { PerspectiveCamera, useVideoTexture } from "@react-three/drei";

export const VideoMesh = ({ videoUrl, onVideoTimeUpdate }) => {
  const texture = useVideoTexture(videoUrl, { start: true, muted: true });

  useEffect(() => {
    if (texture.image) {
      const video = texture.image;
      const handleTimeUpdate = () => {
        if (onVideoTimeUpdate) {
          onVideoTimeUpdate(video.currentTime);
        }
      };
      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [texture.image, onVideoTimeUpdate]);

  return (
    <PerspectiveCamera position={[0, 0, 10]}>
      {(texture) => (
        <mesh geometry={plane}>
          <meshBasicMaterial map={texture} />
        </mesh>
      )}
    </PerspectiveCamera>
  );
};
