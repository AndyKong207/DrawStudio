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

  getStableDiffusionModels: () => {
    return [
      {
        id: "stable-diffusion-xl-beta-v2-2-2",
        name: "stable-diffusion-xl-beta-v2-2-2",
      },
      {
        id: "stable-diffusion-xl-1024-v0-9",
        name: "stable-diffusion-xl-1024-v0-9",
      },
      {
        id: "stable-inpainting-512-v2-0",
        name: "stable-inpainting-512-v2-0",
      },
    ];
  },

  getStableDiffusionSamplers: () => [
    { id: "0", name: "DDIM" },
    { id: "1", name: "DDPM" },
    { id: "2", name: "K Euler" },
    { id: "3", name: "K Euler Ancestral" },
    { id: "4", name: "K Heun" },
    { id: "5", name: "K DPM 2" },
    { id: "6", name: "K DPM 2 Ancestral" },
    { id: "7", name: "K LMS" },
    { id: "8", name: "K DPM++ 2S Ancestral" },
    { id: "9", name: "K DPM++ 2M" },
    { id: "10", name: "K DPM++ SDE" },
  ],

  getStableDiffusionStyles: () => [
    {
      id: "enhance",
      name: "增强风格",
      image:
        "https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E9%A3%8E%E6%A0%BC%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E5%90%8E/%E5%8E%8B%E7%BC%A9%E5%90%8E/2%E5%A2%9E%E5%BC%BA%E9%A3%8E%E6%A0%BCenhance-50.png",
    },
    {
      id: "anime",
      name: "动漫风格",
      image:
        "https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E9%A3%8E%E6%A0%BC%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E5%90%8E/%E5%8E%8B%E7%BC%A9%E5%90%8E/3%E5%8A%A8%E6%BC%AB%E9%A3%8E%E6%A0%BCanime-50.png",
    },
    {
      id: "photographic",
      name: "照片摄影",
      image:
        "https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E9%A3%8E%E6%A0%BC%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E5%90%8E/%E5%8E%8B%E7%BC%A9%E5%90%8E/4%E7%85%A7%E7%89%87%E6%91%84%E5%BD%B1potographic-50.png",
    },
    {
      id: "digital-art",
      name: "数码艺术",
      image:
        "https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E9%A3%8E%E6%A0%BC%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E5%90%8E/%E5%8E%8B%E7%BC%A9%E5%90%8E/5%E6%95%B0%E7%A0%81%E8%89%BA%E6%9C%AF.png",
    },
    {
      id: "comic-book",
      name: "漫画风格",
      image:
        "https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E9%A3%8E%E6%A0%BC%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E5%90%8E/%E5%8E%8B%E7%BC%A9%E5%90%8E/6%E6%BC%AB%E7%94%BB%E9%A3%8E%E6%A0%BCcomic-book-50.png",
    },
    {
      id: "fantasy-art",
      name: "奇幻艺术",
      image:
        "https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E9%A3%8E%E6%A0%BC%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E5%90%8E/%E5%8E%8B%E7%BC%A9%E5%90%8E/7%E5%A5%87%E5%B9%BB%E8%89%BA%E6%9C%AF.png",
    },
    {
      id: "analog-film",
      name: "老胶片风",
      image:
        "https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E9%A3%8E%E6%A0%BC%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E5%90%8E/%E5%8E%8B%E7%BC%A9%E5%90%8E/8%E8%80%81%E8%83%B6%E7%89%87%E9%A3%8Eanalog-film-50.png",
    },
    {
      id: "neon-punk",
      name: "霓虹朋克",
      image:
        "https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E9%A3%8E%E6%A0%BC%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E5%90%8E/%E5%8E%8B%E7%BC%A9%E5%90%8E/9%E9%9C%93%E8%99%B9%E6%9C%8B%E5%85%8Bneon-punk-50.png",
    },
    {
      id: "isometric",
      name: "等距风格",
      image:
        "https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E9%A3%8E%E6%A0%BC%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E5%90%8E/%E5%8E%8B%E7%BC%A9%E5%90%8E/10%E7%AD%89%E8%B7%9D%E9%A3%8E%E6%A0%BCIsometric-50.png",
    },
    {
      id: "low-poly",
      name: "低多边形",
      image:
        "https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E9%A3%8E%E6%A0%BC%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E5%90%8E/%E5%8E%8B%E7%BC%A9%E5%90%8E/11%E4%BD%8E%E5%A4%9A%E8%BE%B9%E5%BD%A2low-poly-50.png",
    },
    {
      id: "origami",
      name: "折纸艺术",
      image:
        "https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E9%A3%8E%E6%A0%BC%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E5%90%8E/%E5%8E%8B%E7%BC%A9%E5%90%8E/12%E6%8A%98%E7%BA%B8%E8%89%BA%E6%9C%AF.png",
    },
    {
      id: "line-art",
      name: "线描艺术",
      image:
        "https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E9%A3%8E%E6%A0%BC%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E5%90%8E/%E5%8E%8B%E7%BC%A9%E5%90%8E/13%E7%BA%BF%E6%8F%8F%E8%89%BA%E6%9C%AF.png",
    },
    {
      id: "modeling-compound",
      name: "橡皮泥风",
      image:
        "https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E9%A3%8E%E6%A0%BC%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E5%90%8E/%E5%8E%8B%E7%BC%A9%E5%90%8E/14%E6%A9%A1%E7%9A%AE%E6%B3%A5%E9%A3%8Emodeling-compound-50.png",
    },
    {
      id: "cinematic",
      name: "电影风格",
      image:
        "https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E9%A3%8E%E6%A0%BC%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E5%90%8E/%E5%8E%8B%E7%BC%A9%E5%90%8E/15%E7%94%B5%E5%BD%B1%E9%A3%8E%E6%A0%BCcinematic-50.png",
    },
    {
      id: "3d-model",
      name: "3D模型",
      image:
        "https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E9%A3%8E%E6%A0%BC%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E5%90%8E/%E5%8E%8B%E7%BC%A9%E5%90%8E/16-3D%E6%A8%A1%E5%9E%8B3D-model-50.png",
    },
    {
      id: "pixel-art",
      name: "像素风格",
      image:
        "https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E9%A3%8E%E6%A0%BC%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E5%90%8E/%E5%8E%8B%E7%BC%A9%E5%90%8E/17%E5%83%8F%E7%B4%A0%E9%A3%8E%E6%A0%BCpixel-art-50.png",
    },
    {
      id: "title-texture",
      name: "瓷砖纹理",
      image:
        "https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E9%A3%8E%E6%A0%BC%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E5%90%8E/%E5%8E%8B%E7%BC%A9%E5%90%8E/18%E7%93%B7%E7%A0%96%E7%BA%B9%E7%90%86title-texture-50.png",
    },
  ],

  deleteStableDiffusionImages: async (options) => {
    const imageIDs = options?.imageIDs || [];
    await Promise.all(
      imageIDs.map((v) => {
        const [pid, small] = v.split("|");
        return axios.post("/api/draw/remove-img", { small, pid });
      })
    );
  },

  getStableDiffusionDefaultCount: () => 4,

  createStableDiffusionImages: async (options) => {
    // const image = await fetch(`${window.location.origin}/DummyImage.png`);
    // const blob = await image.blob();
    // const createdAt = new Date();

    const { initialImage, style, maskImage } = options?.input ?? {};

    const form = new FormData();

    // img 可选，类型是[File](https://developer.mozilla.org/en-US/docs/Web/API/File), 表示用户上传的底图
    if (initialImage?.blob) {
      form.append("img", initialImage?.blob);
    }
    if (maskImage?.blob) {
      form.append("mask_image", maskImage?.blob);
    }
    // samples 是整数，表示要生成的图的数量，范围是1-4
    const samples = options?.count ?? getStableDiffusionDefaultCount();
    form.append("samples", `${samples}`);
    // // prompt 表示提示词，如果没选底图，那么必须传prompt
    const prompt = options?.input?.prompts?.[0]?.text as string;
    form.append("prompt", prompt);
    // // image_strength 表示底图对结果影响的权重
    const weight = initialImage?.weight;
    if (weight) form.append("image_strength", `${weight}`);
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
          // id: pid,
          id: `${pid}|${imageInfo.small}`,
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
          // id: pid,
          id: `${pid}|${imageInfo.small}`,
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
