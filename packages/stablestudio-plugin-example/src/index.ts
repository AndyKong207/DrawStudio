import * as StableStudio from "@stability/stablestudio-plugin";
import axios from "axios";

export const createPlugin = StableStudio.createPlugin<{
  imagesGeneratedSoFar: number;
  settings: {
    exampleSetting: StableStudio.PluginSettingString;
  };
}>(({ set, get }) => ({
  imagesGeneratedSoFar: 0,

  manifest: {
    name: "Example Plugin",
    author: "Bobby Joe",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    icon: `${window.location.origin}/DummyImage.png`,
    version: "1.2.3",
    license: "MIT",
    description: "An example plugin for StableStudio",
  },

  createStableDiffusionImages: async () => {
    const image = await fetch(`${window.location.origin}/DummyImage.png`);
    const blob = await image.blob();
    const createdAt = new Date();

    set(({ imagesGeneratedSoFar }) => ({
      imagesGeneratedSoFar: imagesGeneratedSoFar + 4,
    }));

    return {
      id: `${Math.random() * 10000000}`,
      images: [
        {
          id: `${Math.random() * 10000000}`,
          createdAt,
          blob,
        },
        {
          id: `${Math.random() * 10000000}`,
          createdAt,
          blob,
        },
        {
          id: `${Math.random() * 10000000}`,
          createdAt,
          blob,
        },
        {
          id: `${Math.random() * 10000000}`,
          createdAt,
          blob,
        },
      ],
    };
  },

  getStableDiffusionExistingImages: async (options) => {
    const { limit, exclusiveStartImageID } = { limit: 25, ...options };
    const resp = await axios.post("/api/draw/list");
    console.log(resp);
    let responseData = {} as any;
    if (resp && resp.status === 200) {
      responseData = resp.data[0];
    }
    const respImgs = responseData.imgs || [];
    const images = [];

    for (let i = 0; i < respImgs.length; i++) {
      // const blob = await base64ToBlob(responseData[i].content, "image/jpeg");

      // const timestampInSeconds = responseData.ctime;
      // const timestampInMilliseconds = timestampInSeconds * 1000;
      const createdAt = new Date(responseData.ctime);

      const stableDiffusionImage = {
        id: respImgs[i].small,
        createdAt: createdAt,
        // blob: blob,
        src: `${respImgs[i].small}`,
        input: {
          prompts: [
            {
              text: respImgs[i]["prompt"],
              // weight: imageInfo["CFG scale"],
            },
          ],
          style: "",
          steps: -1,
          seed: -1,
          model: "",
          width: respImgs[i].small_dim.width,
          height: respImgs[i].small_dim.height,
        },
      };

      images.push(stableDiffusionImage);
    }

    return [
      {
        id: `${Math.random() * 10000000}`,
        images: images,
      },
    ];
  },

  getStatus: () => {
    const { imagesGeneratedSoFar } = get();
    return {
      indicator: "success",
      text:
        imagesGeneratedSoFar > 0
          ? `${imagesGeneratedSoFar} images generated`
          : "Ready",
    };
  },

  settings: {
    exampleSetting: {
      type: "string" as const,
      default: "Hello, World!",
      placeholder: "Example setting",
    },
  },

  setSetting: (key, value) =>
    set(({ settings }) => ({
      settings: {
        [key]: { ...settings[key], value: value as string },
      },
    })),
}));
