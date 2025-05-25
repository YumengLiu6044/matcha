"use client"

import dynamic from 'next/dynamic';
import React from 'react';

// This disables SSR for the Network component
const NetworkComponent = dynamic(() => import('@/components/force-graph'), {
  ssr: false,
  loading: () => <p>Loading graph...</p>, // Optional fallback
});


export default function Network() {
  return (
    <div>
      <NetworkComponent></NetworkComponent>
    </div>
  )
}
