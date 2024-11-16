"use client";
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function BoxMove() {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "build/build.loader.js",
    dataUrl: "build/build.data",
    frameworkUrl: "build/build.framework.js",
    codeUrl: "build/build.wasm",
  });
  const loadingPercentage = Math.round(loadingProgression * 100);

  return (
    <div className="w-full h-screen">
      {/* {isLoaded === false && (
        <div className="flex justify-center items-center top-[40vh]">
          <p>Loading... ({loadingPercentage}%)</p>
        </div>
      )} */}
      <Unity className="w-full h-full" unityProvider={unityProvider} />
    </div>
  );
}

export default BoxMove;
