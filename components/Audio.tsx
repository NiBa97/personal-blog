import React from 'react'

interface AudioProps {
  src: string
}

export const AudioComponent: React.FC<AudioProps> = ({ src }) => (
  <audio controls>
    <source src={src} type="audio/mp3" />
    Your browser does not support the audio element.
  </audio>
)
