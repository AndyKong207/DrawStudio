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
    const resp = await axios.post("/api/draw/list-studio", {
      ...options,
    });
    const images = [];
    let responseData = {} as any;
    console.log(responseData);
    if (resp && resp.status === 200) {
      responseData = resp.data;
    }
    if (responseData) {
      const { imgs, ctime, prompt, style, pid } = responseData;
      for (let i = 0; i < imgs.length; i++) {
        const imageInfo = imgs[i];
        const createdAt = new Date(ctime);

        const stableDiffusionImage = {
          id: pid,
          createdAt: createdAt,
          src: imageInfo.small,
          input: {
            prompts: [
              {
                text: prompt,
                // weight: imageInfo["CFG scale"],
              },
            ],
            style: style,
            steps: 30,
            seed: -1,
            model: imageInfo["Model"] ?? "",
            width: imageInfo["small_dim"].width,
            height: imageInfo["small_dim"].height,
          },
        };

        images.push(stableDiffusionImage);
      }
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
