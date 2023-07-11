import * as StableStudio from "@stability/stablestudio-plugin";
import axios from "axios";

const getStableDiffusionDefaultCount = () => 4;
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

  getStableDiffusionDefaultCount: () => 4,

  createStableDiffusionImages: async (options) => {
    // const image = await fetch(`${window.location.origin}/DummyImage.png`);
    // const blob = await image.blob();
    // const createdAt = new Date();

    const { initialImage, style } = options?.input ?? {};

    const form = new FormData();

    // img 可选，类型是[File](https://developer.mozilla.org/en-US/docs/Web/API/File), 表示用户上传的底图
    if (initialImage?.blob) {
      form.append("img", initialImage?.blob);
    }
    // samples 是整数，表示要生成的图的数量，范围是1-4
    const samples = options?.count ?? getStableDiffusionDefaultCount();
    form.append("samples", `${samples}`);
    // // prompt 表示提示词，如果没选底图，那么必须传prompt
    const prompt = options?.input?.prompts?.[0]?.text as string;
    form.append("prompt", prompt);
    // // image_strength 表示底图对结果影响的权重
    const weight = initialImage?.weight;
    form.append("image_strength", `${weight}`);
    // style 表示作图风格，可选值是下面这个对象的所有key，在页面展示的话用对应的value
    // {
    //   '3d-model': '3D模型',
    //   'analog-film': '模拟胶片',
    //   anime: '动画风格',
    //   cinematic: '电影风格',
    //   'comic-book': '漫画风格',
    //   'digital-art': '数码艺术',
    //   enhance: '增强风格',
    //   'fantasy-art': '奇幻艺术',
    //   isometric: '等距风格',
    //   'line-art': '线描艺术',
    //   'low-poly': '扁平化风',
    //   'modeling-compound': '模型粘土',
    //   'neon-punk': '霓虹朋克',
    //   origami: '折纸艺术',
    //   photographic: '摄影风格',
    //   'pixel-art': '像素风格',
    //   'tile-texture': '瓷砖纹理'
    // }
    if (style) {
      form.append("style", style);
    }

    const resp = await axios.post("/api/draw/create", form);

    const images = [];
    let responseData = {} as any;
    if (resp && resp.status === 200) {
      responseData = resp.data;
    }
    if (responseData) {
      const { imgs, ctime, prompt, style, pid, exclusiveStartImageID } =
        responseData;
      for (let i = 0; i < imgs.length; i++) {
        const imageInfo = imgs[i];
        const createdAt = new Date(ctime);

        const stableDiffusionImage = {
          id: pid,
          exclusiveStartImageID: exclusiveStartImageID,
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

    return {
      id: `${Math.random() * 10000000}`,
      images: images,
    };

    // set(({ imagesGeneratedSoFar }) => ({
    //   imagesGeneratedSoFar: imagesGeneratedSoFar + 4,
    // }));

    // return {
    //   id: `${Math.random() * 10000000}`,
    //   images: [
    //     {
    //       id: `${Math.random() * 10000000}`,
    //       createdAt,
    //       blob,
    //     },
    //     {
    //       id: `${Math.random() * 10000000}`,
    //       createdAt,
    //       blob,
    //     },
    //     {
    //       id: `${Math.random() * 10000000}`,
    //       createdAt,
    //       blob,
    //     },
    //     {
    //       id: `${Math.random() * 10000000}`,
    //       createdAt,
    //       blob,
    //     },
    //   ],
    // };
  },

  getStableDiffusionExistingImages: async (options) => {
    const resp = await axios.post("/api/draw/list-studio", {
      ...options,
    });
    const images = [];
    let responseData = {} as any;
    if (resp && resp.status === 200) {
      responseData = resp.data;
    }
    if (responseData) {
      const { imgs, ctime, prompt, style, pid, exclusiveStartImageID } =
        responseData;
      for (let i = 0; i < imgs.length; i++) {
        const imageInfo = imgs[i];
        const createdAt = new Date(ctime);

        const stableDiffusionImage = {
          id: pid,
          exclusiveStartImageID: exclusiveStartImageID,
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
        exclusiveStartImageID:
          images?.[images.length - 1]?.exclusiveStartImageID,
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
