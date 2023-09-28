import * as StableStudio from "@stability/stablestudio-plugin";

import http from "../../stablestudio-ui/src/api";

export const createPlugin = StableStudio.createPlugin<{
  imagesGeneratedSoFar: number;
  settings: {
    exampleSetting: StableStudio.PluginSettingString;
  };
}>(({ set, get, context }) => ({
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

  getStableDiffusionDefaultInput: () => ({
    prompts: [
      {
        text: context.getStableDiffusionRandomPrompt(),
        weight: 1,
      },

      {
        text: "",
        weight: -1,
      },
    ],

    model: "stable-diffusion-xl-beta-v2-2-2",
    sampler: { id: "auto", name: "自动选择" },
    style: "none",

    width: 512,
    height: 512,

    cfgScale: 7,
    steps: 30,
  }),

  getStableDiffusionModels: () => {
    return [
      {
        id: "stable-diffusion-xl-beta-v2-2-2",
        name: "SDXL Beta",
      },
      {
        id: "stable-diffusion-xl-1024-v1-0",
        name: "Stable Diffusion XL v1.0",
      },
      {
        id: "stable-inpainting-512-v2-0",
        name: "Stable Inpainting v2.0",
      },
    ];
  },

  getStableDiffusionSamplers: () => [
    { id: "auto", name: "自动选择" },
    { id: "DDIM", name: "DDIM" },
    { id: "DDPM", name: "DDPM" },
    { id: "K_EULER", name: "K Euler" },
    { id: "K_EULER_ANCESTRAL", name: "K Euler Ancestral" },
    { id: "K_HEUN", name: "K Heun" },
    { id: "K_DPM_2", name: "K DPM 2" },
    { id: "K_DPM_2_ANCESTRAL", name: "K DPM 2 Ancestral" },
    { id: "K_LMS", name: "K LMS" },
    { id: "K_DPMPP_2S_ANCESTRAL", name: "K DPM++ 2S Ancestral" },
    { id: "K_DPMPP_2M", name: "K DPM++ 2M" },
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
        return http.post("/api/draw/remove-img", { small, pid });
      })
    );
  },

  createStableDiffusionImages: async (options) => {
    // const image = await fetch(`${window.location.origin}/DummyImage.png`);
    // const blob = await image.blob();
    // const createdAt = new Date();

    const { initialImage, style, maskImage, height, width } =
      options?.input ?? {};
    const form = new FormData();
    const engine = options?.input?.model;
    if (engine) form.append("engine", engine);
    if (height) form.append("height", String(height));
    if (width) form.append("width", String(width));
    // console.log({ engine, height, width });

    // img 可选，类型是[File](https://developer.mozilla.org/en-US/docs/Web/API/File), 表示用户上传的底图
    if (initialImage?.blob) {
      form.append("img", initialImage?.blob);
    }
    const image_strength = Number(initialImage?.weight);
    if (!Number.isNaN(image_strength)) {
      form.append("image_strength", String(image_strength));
    }
    if (maskImage?.blob) {
      form.append("mask_image", maskImage?.blob);
    }
    // samples 是整数，表示要生成的图的数量，范围是1-4
    const samples = options?.count;
    form.append("samples", `${samples}`);
    // // prompt 表示提示词，如果没选底图，那么必须传prompt
    const prompt = options?.input?.prompts?.[0]?.text as string;
    if (prompt) form.append("prompt", prompt.trim());

    const negativePrompt = options?.input?.prompts?.[1]?.text as string;
    // negative_prompt 表示反向提示词，表示不希望图中出现的元素，可不填
    if (negativePrompt) form.append("negative_prompt", negativePrompt.trim());
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

    if (style && style !== "none") {
      form.append("style", style);
    }

    // seed 表示种子,整数,范围[ 0 .. 4294967295 ]，默认值为0，表示随机生成
    if (options?.input?.seed) {
      form.append("seed", options?.input?.seed as unknown as string);
    }

    if (options?.input?.steps) {
      form.append("steps", options?.input?.steps as unknown as string);
    }
    // steps 表示步数，整数，默认值为 30，取值范围[ 10 .. 150 ]

    //sampler 表示采样器，可不填，可选值为以下之一
    // DDIM DDPM K_DPMPP_2M K_DPMPP_2S_ANCESTRAL K_DPM_2 K_DPM_2_ANCESTRAL K_EULER K_EULER_ANCESTRAL K_HEUN K_LMS
    const sampler = options?.input?.sampler?.id;
    if (sampler && sampler !== "auto") {
      form.append("sampler", sampler);
    }

    const prompt_strength = Number(options?.input?.cfgScale);
    if (!Number.isNaN(prompt_strength)) {
      form.append("prompt_strength", String(prompt_strength));
    }

    let responseData: any;
    try {
      responseData = await http.post("/api/draw/create", form);
    } catch (e: any) {
      if (e.response?.data === "请先登录") {
        window.location.href = "/draw-studio/signin";
      } else if (e.response?.data === "请先绑定手机号") {
        setTimeout(() => {
          window.location.href = "/draw-studio/account";
        }, 1000);
      }
    }

    const images = [];
    if (responseData) {
      const {
        imgs,
        ctime,
        prompt,
        negative_prompt,
        steps,
        engine,
        style,
        pid,
        exclusiveStartImageID,
      } = responseData;
      for (let i = 0; i < imgs.length; i++) {
        const imageInfo = imgs[i];
        const createdAt = new Date(ctime);
        const stableDiffusionImage = {
          id: `${pid}|${imageInfo.small}`,
          exclusiveStartImageID,
          createdAt,
          src: imageInfo.small,
          input: {
            prompts: [
              {
                text: prompt,
                weight: 1,
              },
              {
                text: negative_prompt || "",
                weight: -1,
              },
            ],
            style,
            steps,
            seed: imageInfo.seed,
            model: engine,
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
    const responseData: any = await http.post("/api/draw/list-studio", {
      ...options,
    });
    const images = [];
    if (responseData) {
      const {
        imgs,
        ctime,
        steps,
        engine,
        prompt,
        negative_prompt,
        style,
        pid,
        exclusiveStartImageID,
      } = responseData;
      for (let i = 0; i < imgs.length; i++) {
        const imageInfo = imgs[i];
        const createdAt = new Date(ctime);

        const stableDiffusionImage = {
          id: `${pid}|${imageInfo.small}`,
          exclusiveStartImageID: exclusiveStartImageID,
          createdAt: createdAt,
          src: imageInfo.small,
          input: {
            prompts: [
              {
                text: prompt,
                weight: 1,
              },
              {
                text: negative_prompt || "",
                weight: -1,
              },
            ],
            style: style,
            steps,
            seed: imageInfo.seed,
            model: engine,
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
