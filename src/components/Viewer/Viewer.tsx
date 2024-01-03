// "use client";

// import { RenderingEngine, Types, Enums } from "@cornerstonejs/core";
// import {
//   initDemo,
//   createImageIdsAndCacheMetaData,
//   setTitleAndDescription,
//   ctVoiRange,
// } from "@/utils/demo/helpers";
// import { useEffect } from "react";

// const { ViewportType } = Enums;
// type Props = {};
// // ======== Set up page ======== //

// const Viewer = (props: Props) => {
//   async function run() {
//     console.log("RUNNUNG");

//     const content = document.getElementById("content");
//     const element = document.createElement("div");
//     element.id = "cornerstone-element";
//     element.style.width = "500px";
//     element.style.height = "500px";
//     content?.appendChild(element);
//     // Init Cornerstone and related libraries
//     await initDemo();

//     // Get Cornerstone imageIds and fetch metadata into RAM
//     const imageIds = await createImageIdsAndCacheMetaData({
//       StudyInstanceUID:
//         "1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463",
//       SeriesInstanceUID:
//         "1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561",
//       wadoRsRoot: "https://d3t6nz73ql33tx.cloudfront.net/dicomweb",
//     });

//     // Instantiate a rendering engine
//     const renderingEngineId = "myRenderingEngine";
//     const renderingEngine = new RenderingEngine(renderingEngineId);

//     // Create a stack viewport
//     const viewportId = "CT_STACK";
//     // const viewportInput = {
//     //   viewportId,
//     //   type: ViewportType.STACK,
//     //   element,
//     //   defaultOptions: {
//     //     background: [0.2, 0, 0.2],
//     //   },
//     // };
//     const viewportInput = {
//       viewportId,
//       type: ViewportType.STACK,
//       element,
//       defaultOptions: {
//         background: [0.2, 0, 0.2] as [number, number, number], // Explicitly specify the type
//       },
//     };


//     renderingEngine.enableElement(viewportInput);

//     // Get the stack viewport that was created
//     const viewport = renderingEngine.getViewport(viewportId);

//     // Define a stack containing a single image
//     const stack = [imageIds[0]];

//     // Set the stack on the viewport
//     await viewport.setStack(stack);

//     // Set the VOI of the stack
//     viewport.setProperties({ voiRange: ctVoiRange });

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

// export default Viewer;







"use client"

import React, { useEffect } from "react";
import { RenderingEngine, Enums } from "@cornerstonejs/core";
import {
  initDemo,
  createImageIdsAndCacheMetaData,
  ctVoiRange,
} from "@/utils/demo/helpers";

const { ViewportType } = Enums;

type Props = {};

const Viewer: React.FC<Props> = () => {
  useEffect(() => {
    async function run() {
      console.log("RUNNING");

      const content = document.getElementById("content");
      if (!content) return;

      const element = document.createElement("div");
      element.id = "cornerstone-element";
      element.style.width = "500px";
      element.style.height = "500px";
      content.appendChild(element);

      // Init Cornerstone and related libraries
      await initDemo();

      // Get Cornerstone imageIds and fetch metadata into RAM
      const imageIds = await createImageIdsAndCacheMetaData({
        StudyInstanceUID:
          "1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463",
        SeriesInstanceUID:
          "1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561",
        wadoRsRoot: "https://d3t6nz73ql33tx.cloudfront.net/dicomweb",
      });

      // Instantiate a rendering engine
      const renderingEngineId = "myRenderingEngine";
      const renderingEngine = new RenderingEngine(renderingEngineId);

      // Create a stack viewport
      const viewportId = "CT_STACK";
      const viewportInput: ViewportInput = {
        viewportId,
        type: ViewportType.STACK,
        element,
        defaultOptions: {
          background: [0.2, 0, 0.2] as [number, number, number], // Explicitly specify the type
        },
      };

      renderingEngine.enableElement(viewportInput);

      // Get the stack viewport that was created
      const viewport = renderingEngine.getViewport(viewportId);

      // Define a stack containing a single image
      const stack = [imageIds[0]];

      // Set the stack on the viewport
      // await viewport.setStack(stack);

      // // Set the VOI of the stack
      // viewport.setProperties({ voiRange: ctVoiRange });
      // Assuming there's a method like setSeriesImages on IViewport
      await (viewport as any).setSeriesImages(stack);

      // Or if there's a setSeries method
      await (viewport as any).setSeries(stack);

      // Render the image
      viewport.render();
    }

    run();
  }, []);

  return (
    <div className="bg-gray-500">
      <section style={{ width: "500px", height: "500px" }} id="content"></section>
    </div>
  );
};

export default Viewer;

interface ViewportInput {
  viewportId: string;
  type: Enums.ViewportType;
  element: HTMLDivElement;
  defaultOptions: {
    background: [number, number, number];
  };
}
