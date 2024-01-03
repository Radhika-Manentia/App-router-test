// "use client";

// import React, { useEffect } from "react";

// import {
//   RenderingEngine,
//   Types,
//   Enums,
//   volumeLoader,
//   getRenderingEngine,
// } from "@cornerstonejs/core";
// import {
//   StackScrollMouseWheelTool,
//   ToolGroupManager,
//   addTool,
//   Enums as csToolsEnums,
//   ZoomTool,
// } from "@cornerstonejs/tools";
// import {
//   initDemo,
//   createImageIdsAndCacheMetaData,
//   setTitleAndDescription,
//   addDropdownToToolbar,
// } from "@/utils/demo/helpers";
// const { MouseBindings } = csToolsEnums;
// const { ViewportType } = Enums;

// const renderingEngineId = "myRenderingEngine";
// const viewportId = "PROSTATE_X";

// // Define a unique id for the volume
// const volumeName = "PROSTATE_VOLUME"; // Id of the volume less loader prefix
// const volumeLoaderScheme = "cornerstoneStreamingImageVolume"; // Loader id which defines which volume loader to use
// const volumeId = `${volumeLoaderScheme}:${volumeName}`; // VolumeId with loader id + volume id

// type Props = {};

// const VolumeViewer = (props: Props) => {
//   async function run() {
//     const content = document.getElementById("content");
//     const element = document.createElement("div");
//     element.id = "cornerstone-element";
//     element.style.width = "500px";
//     element.style.height = "500px";
//     element.oncontextmenu = () => false;
//     content?.appendChild(element);

//     // Init Cornerstone and related libraries
//     await initDemo();
//     addTool(StackScrollMouseWheelTool);
//     addTool(ZoomTool);

//     // Using a oblique acquired image to demonstrate the orientation of the volume
//     // in default (acquisition plane mode)
//     const imageIds = await createImageIdsAndCacheMetaData({
//       StudyInstanceUID:
//         "1.3.6.1.4.1.14519.5.2.1.7009.2403.871108593056125491804754960339",
//       SeriesInstanceUID:
//         "1.3.6.1.4.1.14519.5.2.1.7009.2403.367700692008930469189923116409",
//       wadoRsRoot: "https://d33do7qe4w26qo.cloudfront.net/dicomweb",
//     });

//     // create toolGroup
//     const toolGroup = ToolGroupManager.createToolGroup("myToolGroup");
//     toolGroup?.addTool(StackScrollMouseWheelTool.toolName);
//     toolGroup?.addTool(ZoomTool.toolName);

//     toolGroup?.setToolActive(StackScrollMouseWheelTool.toolName);
//     toolGroup?.setToolActive(ZoomTool.toolName, {
//       bindings: [
//         {
//           mouseButton: MouseBindings.Secondary,
//         },
//       ],
//     });
//     toolGroup?.addViewport(viewportId, renderingEngineId);

//     // Instantiate a rendering engine
//     const renderingEngine = new RenderingEngine(renderingEngineId);

//     // Create a stack viewport
//     const viewportInput: Types.PublicViewportInput = {
//       viewportId,
//       type: ViewportType.ORTHOGRAPHIC,
//       element,
//       defaultOptions: {
//         orientation: Enums.OrientationAxis.SAGITTAL,
//         background: [0.2, 0, 0.2],
//       },
//     };

//     renderingEngine.enableElement(viewportInput);

//     // Get the stack viewport that was created
//     const viewport = renderingEngine.getViewport(viewportId);

//     // Define a volume in memory
//     const volume = await volumeLoader.createAndCacheVolume(volumeId, {
//       imageIds,
//     });

//     // Set the volume to load
//     volume.load();

//     // Set the volume on the viewport
//     // viewport?.setVolumes([{ volumeId }]);
//     // renderingEngine.displayVolumes([{ volumeId }], viewportId);
//     const newStack = {
//       currentImageIdIndex: 0, // You may need to adjust this based on your requirements
//       imageIds,
//     };
//     viewport.stack = newStack;
//     viewport.updateImage();

//     // Render the image
//     viewport.render();
//   }

//   useEffect(() => {
//     run();
//   }, []);

//   return (
//     <div className="bg-gray-500">
//       <section
//         style={{ width: "500px", height: "500px" }}
//         id="content"
//       ></section>
//     </div>
//   );
// };
// export default VolumeViewer;






"use strict";

import {
  RenderingEngine,
  Types,
  Enums,
  volumeLoader,
  getRenderingEngine,
} from "@cornerstonejs/core";
import {
  StackScrollMouseWheelTool,
  ToolGroupManager,
  addTool,
  Enums as csToolsEnums,
  ZoomTool,
} from "@cornerstonejs/tools";

const { MouseBindings } = csToolsEnums;
const { ViewportType } = Enums;

const renderingEngineId = "myRenderingEngine";
const viewportId = "PROSTATE_X";

const volumeName = "PROSTATE_VOLUME";
const volumeLoaderScheme = "cornerstoneStreamingImageVolume";
const volumeId = `${volumeLoaderScheme}:${volumeName}`;

async function run() {
  const element = document.createElement("div");
  element.id = "cornerstone-element";
  element.style.width = "500px";
  element.style.height = "500px";
  document.getElementById("content").appendChild(element);

  await initDemo();
  addTool(StackScrollMouseWheelTool);
  addTool(ZoomTool);

  const toolGroup = ToolGroupManager.createToolGroup("myToolGroup");
  toolGroup?.addTool(StackScrollMouseWheelTool.toolName);
  toolGroup?.addTool(ZoomTool.toolName);
  toolGroup?.setToolActive(StackScrollMouseWheelTool.toolName);
  toolGroup?.setToolActive(ZoomTool.toolName, {
    bindings: [{ mouseButton: MouseBindings.Secondary }],
  });
  toolGroup?.addViewport(viewportId, renderingEngineId);

  const renderingEngine = new RenderingEngine(renderingEngineId);

  const viewportInput = {
    viewportId,
    type: ViewportType.ORTHOGRAPHIC,
    element,
    defaultOptions: {
      orientation: Enums.OrientationAxis.SAGITTAL,
      background: [0.2, 0, 0.2],
    },
  };

  renderingEngine.enableElement(viewportInput);

  const viewport = renderingEngine.getViewport(viewportId);

  const imageIds = await createImageIdsAndCacheMetaData({
    StudyInstanceUID:
      "1.3.6.1.4.1.14519.5.2.1.7009.2403.871108593056125491804754960339",
    SeriesInstanceUID:
      "1.3.6.1.4.1.14519.5.2.1.7009.2403.367700692008930469189923116409",
    wadoRsRoot: "https://d33do7qe4w26qo.cloudfront.net/dicomweb",
  });

  const volume = await volumeLoader.createAndCacheVolume(volumeId, {
    imageIds,
  });

  volume.load();

  const newStack = {
    currentImageIdIndex: 0,
    imageIds,
  };
  viewport.stack = newStack;
  viewport.updateImage();
  viewport.render();
}

run();
